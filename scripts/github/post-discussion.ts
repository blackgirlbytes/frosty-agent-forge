import { readFileSync } from 'fs';
import { join } from 'path';
import { CHALLENGE_TITLES } from '../../src/lib/challenge-utils';

interface GraphQLResponse {
  data?: {
    repository?: {
      id?: string;
      discussionCategories?: {
        nodes: Array<{
          id: string;
          name: string;
        }>;
      };
    };
    createDiscussion?: {
      discussion: {
        id: string;
        url: string;
        title: string;
      };
    };
  };
  errors?: Array<{
    message: string;
    type: string;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID;
const TARGET_REPOSITORY = process.env.TARGET_REPOSITORY || 'block/goose';
const CHALLENGE_DAY = process.env.CHALLENGE_DAY || '1';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required');
  console.error('   Set it in your environment or .env.local file');
  process.exit(1);
}

if (!DISCUSSION_CATEGORY_ID) {
  console.error('❌ DISCUSSION_CATEGORY_ID environment variable is required');
  console.error('   Set it in your GitHub repository secrets');
  process.exit(1);
}

const [OWNER, REPO] = TARGET_REPOSITORY.split('/');

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

async function getCategoryId(categoryName: string): Promise<string> {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        discussionCategories(first: 10) {
          nodes {
            id
            name
          }
        }
      }
    }
  `;

  const result = await graphqlRequest(query, { owner: OWNER, repo: REPO });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  const categories = result.data?.repository?.discussionCategories?.nodes || [];
  const category = categories.find(c => c.name === categoryName);

  if (!category) {
    throw new Error(`Category "${categoryName}" not found. Available: ${categories.map(c => c.name).join(', ')}`);
  }

  return category.id;
}

async function getRepositoryId(): Promise<string> {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        id
      }
    }
  `;

  const result = await graphqlRequest(query, { owner: OWNER, repo: REPO });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  const repoId = result.data?.repository?.id;
  if (!repoId) {
    throw new Error('Repository ID not found');
  }

  return repoId;
}

async function createDiscussion(
  repositoryId: string,
  categoryId: string,
  title: string,
  body: string
): Promise<{ id: string; url: string; title: string }> {
  const mutation = `
    mutation($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: {
        repositoryId: $repositoryId,
        categoryId: $categoryId,
        title: $title,
        body: $body
      }) {
        discussion {
          id
          url
          title
        }
      }
    }
  `;

  const result = await graphqlRequest(mutation, {
    repositoryId,
    categoryId,
    title,
    body,
  });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  const discussion = result.data?.createDiscussion?.discussion;
  if (!discussion) {
    throw new Error('Discussion creation failed');
  }

  return discussion;
}

interface PinnedDiscussion {
  id: string;
  discussion: {
    id: string;
    title: string;
    category: {
      name: string;
    };
  };
}

async function getPinnedDiscussions(): Promise<PinnedDiscussion[]> {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        pinnedDiscussions(first: 10) {
          nodes {
            id
            discussion {
              id
              title
              category {
                name
              }
            }
          }
        }
      }
    }
  `;

  const result = await graphqlRequest(query, { owner: OWNER, repo: REPO });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return (result.data as any)?.repository?.pinnedDiscussions?.nodes || [];
}

async function unpinDiscussion(pinnedDiscussionId: string): Promise<void> {
  const mutation = `
    mutation($pinnedDiscussionId: ID!) {
      unpinDiscussion(input: { pinnedDiscussionId: $pinnedDiscussionId }) {
        pinnedDiscussion {
          id
        }
      }
    }
  `;

  const result = await graphqlRequest(mutation, { pinnedDiscussionId });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }
}

async function pinDiscussion(discussionId: string): Promise<void> {
  const mutation = `
    mutation($discussionId: ID!) {
      pinDiscussion(input: { discussionId: $discussionId }) {
        discussion {
          id
        }
      }
    }
  `;

  const result = await graphqlRequest(mutation, { discussionId });

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }
}

async function main() {
  console.log('🎄 Advent of AI - Challenge Posting Script');
  console.log('==========================================\n');

  // Validate inputs
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }

  const dayNum = parseInt(CHALLENGE_DAY, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 17) {
    throw new Error(`Invalid challenge day: ${CHALLENGE_DAY}. Must be 1-17.`);
  }

  console.log(`📅 Posting challenge for Day ${dayNum}`);
  console.log(`📦 Target Repository: ${TARGET_REPOSITORY}`);

  // Read challenge markdown file
  const markdownPath = join(process.cwd(), `challenges/day${dayNum}.md`);
  let challengeContent: string;
  
  try {
    challengeContent = readFileSync(markdownPath, 'utf-8');
    console.log(`✅ Loaded challenge content from ${markdownPath}`);
  } catch (error) {
    // Fallback to day1-balanced.md for Day 1
    if (dayNum === 1) {
      const fallbackPath = join(process.cwd(), 'day1-balanced.md');
      try {
        challengeContent = readFileSync(fallbackPath, 'utf-8');
        console.log(`✅ Loaded challenge content from ${fallbackPath} (fallback)`);
      } catch (fallbackError) {
        throw new Error(`Could not find challenge file at ${markdownPath} or ${fallbackPath}`);
      }
    } else {
      throw new Error(`Could not find challenge file at ${markdownPath}`);
    }
  }

  // Get repository ID (for block/goose)
  console.log('\n🔍 Fetching block/goose repository information...');
  const repositoryId = await getRepositoryId();
  console.log(`✅ Repository ID: ${repositoryId}`);

  // Use category ID from environment variable
  console.log('\n✅ Using discussion category ID from environment');
  const categoryId = DISCUSSION_CATEGORY_ID;
  console.log(`✅ Category ID: ${categoryId}`);

  // Create discussion
  const title = CHALLENGE_TITLES[dayNum];
  console.log(`\n📝 Creating discussion: "${title}"`);
  
  const discussion = await createDiscussion(
    repositoryId,
    categoryId,
    title,
    challengeContent
  );

  console.log('\n✅ SUCCESS! Discussion created:');
  console.log(`   Title: ${discussion.title}`);
  console.log(`   URL: ${discussion.url}`);
  console.log(`   ID: ${discussion.id}`);

  // Try to manage pinning, but don't fail if it doesn't work
  try {
    console.log('\n📌 Managing pinned discussions...');
    
    // Unpin any existing Advent of AI discussions
    const pinnedDiscussions = await getPinnedDiscussions();
    for (const pinned of pinnedDiscussions) {
      if (pinned.discussion.category.name === "Advent of AI") {
        await unpinDiscussion(pinned.id);
        console.log(`   Unpinned: ${pinned.discussion.title}`);
      }
    }
    
    // Pin the new discussion
    await pinDiscussion(discussion.id);
    console.log(`   ✅ Pinned: ${discussion.title}`);
    
  } catch (pinError) {
    // Log the error but don't fail the workflow
    console.warn(`⚠️  Pinning failed (discussion was still posted): ${(pinError as Error).message}`);
  }

  // Save discussion metadata
  const metadata = {
    day: dayNum,
    title: discussion.title,
    url: discussion.url,
    id: discussion.id,
    postedAt: new Date().toISOString(),
  };

  const metadataPath = join(process.cwd(), 'data', `day${dayNum}-discussion.json`);
  try {
    const { writeFileSync, mkdirSync } = await import('fs');
    mkdirSync(join(process.cwd(), 'data'), { recursive: true });
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`\n💾 Saved metadata to ${metadataPath}`);
  } catch (error) {
    console.warn(`⚠️  Could not save metadata: ${error}`);
  }

  console.log('\n🎉 Challenge posted successfully!');
}

main().catch((error) => {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
});
