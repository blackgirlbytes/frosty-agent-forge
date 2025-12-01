import { NextRequest, NextResponse } from 'next/server';

// Map challenge days to GitHub discussion numbers
const DISCUSSION_MAP: Record<number, number> = {
  0: 5919, // Day 0 test discussion
  1: 5919, // TODO: Replace with actual Day 1 discussion number
  // Add more as discussions are created
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ day: string }> }
) {
  const { day: dayParam } = await params;
  const day = parseInt(dayParam);
  
  console.log('🔍 [API] Challenge request for day:', day);
  console.log('🔍 [API] GITHUB_TOKEN exists:', !!process.env.GITHUB_TOKEN);
  console.log('🔍 [API] GITHUB_TOKEN length:', process.env.GITHUB_TOKEN?.length);
  console.log('🔍 [API] GITHUB_TOKEN prefix:', process.env.GITHUB_TOKEN?.substring(0, 7));
  
  if (isNaN(day) || !DISCUSSION_MAP[day]) {
    console.log('❌ [API] Challenge not found for day:', day);
    return NextResponse.json(
      { error: 'Challenge not found' },
      { status: 404 }
    );
  }

  const discussionNumber = DISCUSSION_MAP[day];
  console.log('✅ [API] Found discussion number:', discussionNumber);
  
  try {
    const apiUrl = `https://api.github.com/repos/block/goose/discussions/${discussionNumber}`;
    console.log('🌐 [API] Fetching from:', apiUrl);
    
    // Fetch discussion from GitHub API
    // TEMPORARY: Hardcoded token for testing
    const token = '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';
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    console.log('📡 [API] GitHub response status:', response.status);
    console.log('📡 [API] GitHub response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [API] GitHub API error response:', errorText);
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }

    const discussion = await response.json();
    console.log('✅ [API] Successfully fetched discussion:', discussion.title);

    // Fetch comments using GraphQL API
    let commentsList = [];
    if (discussion.comments > 0) {
      try {
        const graphqlQuery = {
          query: `
            query($discussionNumber: Int!) {
              repository(owner: "block", name: "goose") {
                discussion(number: $discussionNumber) {
                  comments(first: 10) {
                    nodes {
                      id
                      body
                      createdAt
                      author {
                        login
                        avatarUrl
                      }
                      replies(first: 5) {
                        nodes {
                          id
                          body
                          createdAt
                          author {
                            login
                            avatarUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            discussionNumber: discussionNumber
          }
        };

        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(graphqlQuery),
        });

        if (graphqlResponse.ok) {
          const graphqlData = await graphqlResponse.json();
          commentsList = graphqlData.data?.repository?.discussion?.comments?.nodes || [];
          console.log('✅ [API] Fetched', commentsList.length, 'comments');
        }
      } catch (err) {
        console.error('⚠️ [API] Failed to fetch comments:', err);
        // Continue without comments
      }
    }

    return NextResponse.json({
      day,
      title: discussion.title,
      body: discussion.body,
      url: discussion.html_url,
      createdAt: discussion.created_at,
      author: discussion.user.login,
      commentCount: discussion.comments,
      reactions: discussion.reactions,
      comments: commentsList,
    });
  } catch (error) {
    console.error('💥 [API] Error fetching challenge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenge', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
