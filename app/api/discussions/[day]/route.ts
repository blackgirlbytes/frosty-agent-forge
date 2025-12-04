import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.DISCUSSIONS_TOKEN;
const GITHUB_REPOSITORY = 'block/goose';
const [REPO_OWNER, REPO_NAME] = GITHUB_REPOSITORY.split('/');

interface Discussion {
  id: string;
  title: string;
  url: string;
  body: string;
  bodyHTML: string;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  comments: {
    totalCount: number;
    nodes: Array<{
      id: string;
      bodyHTML: string;
      createdAt: string;
      author: {
        login: string;
        avatarUrl: string;
        url: string;
      };
      url: string;
    }>;
  };
}

interface SearchGraphQLResponse {
  data?: {
    repository?: {
      discussions: {
        nodes: Discussion[];
      };
    };
  };
  errors?: Array<{
    message: string;
    type: string;
  }>;
}

interface NodeGraphQLResponse {
  data?: {
    node?: Discussion;
  };
  errors?: Array<{
    message: string;
    type: string;
  }>;
}

async function graphqlRequest<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    // Cache for 60 seconds to avoid hitting rate limits
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Search for a discussion by day number in the title using GitHub's search API
async function findDiscussionByDay(day: number): Promise<Discussion | null> {
  // First, we need to get the category ID for "Advent of AI"
  const categoryQuery = `
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        discussionCategories(first: 20) {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  `;

  interface CategoryResponse {
    data?: {
      repository?: {
        discussionCategories: {
          nodes: Array<{
            id: string;
            name: string;
            slug: string;
          }>;
        };
      };
    };
    errors?: Array<{ message: string }>;
  }

  const categoryResult = await graphqlRequest<CategoryResponse>(categoryQuery, {
    owner: REPO_OWNER,
    name: REPO_NAME,
  });

  if (categoryResult.errors) {
    console.error('Failed to fetch categories:', categoryResult.errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(categoryResult.errors)}`);
  }

  const adventCategory = categoryResult.data?.repository?.discussionCategories.nodes.find(
    c => c.slug === 'advent-of-ai' || c.name.toLowerCase().includes('advent')
  );

  if (!adventCategory) {
    console.error('Could not find Advent of AI category');
    return null;
  }

  console.log(`Found Advent of AI category: ${adventCategory.id}`);

  // Now fetch discussions from that category
  const query = `
    query($owner: String!, $name: String!, $categoryId: ID!) {
      repository(owner: $owner, name: $name) {
        discussions(first: 20, categoryId: $categoryId, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            body
            bodyHTML
            createdAt
            author {
              login
              avatarUrl
            }
            comments(first: 10) {
              totalCount
              nodes {
                id
                bodyHTML
                createdAt
                author {
                  login
                  avatarUrl
                  url
                }
                url
              }
            }
          }
        }
      }
    }
  `;

  const result = await graphqlRequest<SearchGraphQLResponse>(query, {
    owner: REPO_OWNER,
    name: REPO_NAME,
    categoryId: adventCategory.id,
  });

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  const discussions = result.data?.repository?.discussions.nodes || [];
  
  console.log(`Found ${discussions.length} discussions in Advent of AI category`);
  discussions.forEach(d => console.log(`  - ${d.title}`));

  // Search patterns that match "Day X:" or "Day X " in the title
  // This ensures we match "Day 3:" but not "Day 13:"
  const searchPatterns = [
    `Day ${day}:`,
    `Day ${day} `,
  ];

  const discussion = discussions.find(d => 
    searchPatterns.some(pattern => d.title.includes(pattern))
  );

  if (discussion) {
    console.log(`Matched discussion: ${discussion.title}`);
  }

  return discussion || null;
}

// Fallback: get discussion by ID (for backwards compatibility with metadata files)
async function getDiscussionById(discussionId: string): Promise<Discussion | null> {
  const query = `
    query($id: ID!) {
      node(id: $id) {
        ... on Discussion {
          id
          title
          url
          body
          bodyHTML
          createdAt
          author {
            login
            avatarUrl
          }
          comments(first: 10) {
            totalCount
            nodes {
              id
              bodyHTML
              createdAt
              author {
                login
                avatarUrl
                url
              }
              url
            }
          }
        }
      }
    }
  `;

  const result = await graphqlRequest<NodeGraphQLResponse>(query, { id: discussionId });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data?.node || null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ day: string }> }
) {
  try {
    const { day: dayParam } = await params;
    const day = parseInt(dayParam, 10);

    if (isNaN(day) || day < 1 || day > 17) {
      return NextResponse.json(
        { error: 'Invalid day parameter. Must be 1-17.' },
        { status: 400 }
      );
    }

    // Read challenge content from markdown file
    const challengePath = join(process.cwd(), 'challenges', `day${day}.md`);
    
    let challengeContent: string;
    try {
      challengeContent = readFileSync(challengePath, 'utf-8');
    } catch {
      return NextResponse.json(
        { 
          error: `Challenge not found for Day ${day}`,
          day,
        },
        { status: 404 }
      );
    }

    // Default values
    let discussionUrl = `https://github.com/${GITHUB_REPOSITORY}/discussions`;
    let commentCount = 0;
    let comments: Discussion['comments']['nodes'] = [];

    if (GITHUB_TOKEN) {
      try {
        // First, try to find the discussion by searching for "Day X" in the title
        console.log(`Searching for Day ${day} discussion...`);
        let discussion = await findDiscussionByDay(day);

        // Fallback: check for legacy metadata file
        if (!discussion) {
          const metadataPath = join(process.cwd(), 'data', `day${day}-discussion.json`);
          try {
            const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
            if (metadata.id) {
              console.log(`Using metadata file for Day ${day}, ID: ${metadata.id}`);
              discussion = await getDiscussionById(metadata.id);
            }
          } catch {
            // No metadata file, that's fine
          }
        }

        if (discussion) {
          console.log(`Found discussion: ${discussion.title}`);
          discussionUrl = discussion.url;
          commentCount = discussion.comments.totalCount;
          comments = discussion.comments.nodes;
        } else {
          console.log(`No discussion found for Day ${day}`);
        }
      } catch (error) {
        console.error('Failed to fetch discussion:', error);
        // Continue without comments - we still have the challenge content
      }
    } else {
      console.warn('No GITHUB_TOKEN or DISCUSSIONS_TOKEN found - cannot fetch comments');
    }

    return NextResponse.json({
      title: `Day ${day} Challenge`,
      url: discussionUrl,
      body: challengeContent,
      commentCount,
      comments,
      author: {
        login: 'goose-oss',
        avatarUrl: 'https://github.com/goose-oss.png',
      },
      createdAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error loading challenge:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to load challenge',
      },
      { status: 500 }
    );
  }
}
