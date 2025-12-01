import { NextRequest, NextResponse } from 'next/server';

// Map challenge days to GitHub discussion numbers
const DISCUSSION_MAP: Record<number, number> = {
  0: 5919, // Day 0 test discussion
  1: 5919, // TODO: Replace with actual Day 1 discussion number
  // Add more as discussions are created
};

export async function GET(
  request: NextRequest,
  { params }: { params: { day: string } }
) {
  const day = parseInt(params.day);
  
  if (isNaN(day) || !DISCUSSION_MAP[day]) {
    return NextResponse.json(
      { error: 'Challenge not found' },
      { status: 404 }
    );
  }

  const discussionNumber = DISCUSSION_MAP[day];
  
  try {
    // Fetch discussion from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/block/goose/discussions/${discussionNumber}`,
      {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const discussion = await response.json();

    return NextResponse.json({
      day,
      title: discussion.title,
      body: discussion.body,
      url: discussion.html_url,
      createdAt: discussion.created_at,
      author: discussion.user.login,
      comments: discussion.comments,
      reactions: discussion.reactions,
    });
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenge' },
      { status: 500 }
    );
  }
}
