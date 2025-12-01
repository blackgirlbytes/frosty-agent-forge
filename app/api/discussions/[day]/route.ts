import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.DISCUSSIONS_TOKEN;
const GITHUB_REPOSITORY = 'block/goose';

interface GraphQLResponse {
  data?: {
    node?: {
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
    };
  };
  errors?: Array<{
    message: string;
    type: string;
  }>;
}

async function graphqlRequest(query: string, variables: Record<string, unknown>): Promise<GraphQLResponse> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function getDiscussionById(discussionId: string) {
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
          comments(first: 5) {
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

  const result = await graphqlRequest(query, { id: discussionId });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data?.node;
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
    
    try {
      const challengeContent = readFileSync(challengePath, 'utf-8');
      
      // Try to read discussion metadata for URL and comment count
      const metadataPath = join(process.cwd(), 'data', `day${day}-discussion.json`);
      let discussionUrl = `https://github.com/${GITHUB_REPOSITORY}/discussions`;
      let discussionId: string | null = null;
      let commentCount = 0;
      
      try {
        const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
        discussionUrl = metadata.url;
        discussionId = metadata.id;
      } catch {
        // Metadata doesn't exist yet - discussion not posted
      }

      // If we have a discussion ID, fetch comments from GitHub
      let comments: Array<{
        id: string;
        bodyHTML: string;
        createdAt: string;
        author: {
          login: string;
          avatarUrl: string;
          url: string;
        };
        url: string;
      }> = [];

      console.log('Debug - discussionId:', discussionId);
      console.log('Debug - GITHUB_TOKEN exists:', !!process.env.GITHUB_TOKEN);
      console.log('Debug - DISCUSSIONS_TOKEN exists:', !!process.env.DISCUSSIONS_TOKEN);
      console.log('Debug - Final GITHUB_TOKEN exists:', !!GITHUB_TOKEN);
      console.log('Debug - Token length:', GITHUB_TOKEN?.length);

      if (discussionId && GITHUB_TOKEN) {
        try {
          console.log('Fetching comments for discussion:', discussionId);
          const discussion = await getDiscussionById(discussionId);
          if (discussion) {
            commentCount = discussion.comments.totalCount;
            comments = discussion.comments.nodes;
            console.log('Successfully fetched', commentCount, 'comments');
          }
        } catch (error) {
          console.error('Failed to fetch comments:', error);
          // Continue without comments
        }
      } else {
        if (!discussionId) console.warn('No discussion ID found');
        if (!GITHUB_TOKEN) console.warn('No GITHUB_TOKEN or DISCUSSIONS_TOKEN found');
      }

      return NextResponse.json({
        title: `Day ${day} Challenge`,
        url: discussionUrl,
        body: challengeContent, // Return raw markdown for react-markdown
        commentCount,
        comments,
        author: {
          login: 'goose-oss',
          avatarUrl: 'https://github.com/goose-oss.png',
        },
        createdAt: new Date().toISOString(),
      });
    } catch {
      return NextResponse.json(
        { 
          error: `Challenge not found for Day ${day}`,
          day,
        },
        { status: 404 }
      );
    }

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
