import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.DISCUSSIONS_TOKEN;
const GITHUB_REPOSITORY = 'block/goose';
const [OWNER, REPO] = GITHUB_REPOSITORY.split('/');

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
      };
    };
  };
  errors?: Array<{
    message: string;
    type: string;
  }>;
}

async function graphqlRequest(query: string, variables: Record<string, any>): Promise<GraphQLResponse> {
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
          comments {
            totalCount
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
  { params }: { params: { day: string } }
) {
  try {
    const day = parseInt(params.day, 10);

    if (isNaN(day) || day < 1 || day > 17) {
      return NextResponse.json(
        { error: 'Invalid day parameter. Must be 1-17.' },
        { status: 400 }
      );
    }

    // Try to read discussion metadata from saved file
    const metadataPath = join(process.cwd(), 'data', `day${day}-discussion.json`);
    let discussionId: string;

    try {
      const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
      discussionId = metadata.id;
    } catch (error) {
      // If metadata doesn't exist, try reading from challenges file directly
      // This is a fallback for testing before the discussion is posted
      const challengePath = join(process.cwd(), 'challenges', `day${day}.md`);
      
      try {
        const challengeContent = readFileSync(challengePath, 'utf-8');
        const html = await marked(challengeContent);
        
        return NextResponse.json({
          title: `Day ${day} Challenge`,
          url: `https://github.com/${GITHUB_REPOSITORY}/discussions`,
          body: html,
          commentCount: 0,
          author: {
            login: 'goose-oss',
            avatarUrl: 'https://github.com/goose-oss.png',
          },
          createdAt: new Date().toISOString(),
          preview: true,
        });
      } catch (fallbackError) {
        return NextResponse.json(
          { 
            error: `Discussion not yet posted for Day ${day}. Check back at noon ET!`,
            day,
          },
          { status: 404 }
        );
      }
    }

    // Fetch discussion from GitHub
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    const discussion = await getDiscussionById(discussionId);

    if (!discussion) {
      return NextResponse.json(
        { error: `Discussion not found for Day ${day}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: discussion.title,
      url: discussion.url,
      body: discussion.bodyHTML,
      commentCount: discussion.comments.totalCount,
      author: {
        login: discussion.author.login,
        avatarUrl: discussion.author.avatarUrl,
      },
      createdAt: discussion.createdAt,
    });

  } catch (error) {
    console.error('Error fetching discussion:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch discussion',
      },
      { status: 500 }
    );
  }
}
