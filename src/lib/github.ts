import fs from 'fs';
import path from 'path';

interface CreateDiscussionResponse {
  discussionUrl: string;
  discussionNumber: number;
}

/**
 * Create a GitHub Discussion using GraphQL API
 */
export async function createGitHubDiscussion(
  day: number
): Promise<CreateDiscussionResponse> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'block';
  const repo = process.env.GITHUB_REPO || 'goose';
  const categoryId = process.env.GITHUB_DISCUSSION_CATEGORY_ID;

  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  if (!categoryId) {
    throw new Error('GITHUB_DISCUSSION_CATEGORY_ID environment variable is not set');
  }

  // Read challenge content
  const challengePath = path.join(process.cwd(), 'data', 'challenges', `day-${day}.md`);
  
  if (!fs.existsSync(challengePath)) {
    throw new Error(`Challenge file not found: ${challengePath}`);
  }

  const content = fs.readFileSync(challengePath, 'utf-8');
  
  // Extract title from markdown (first # heading)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : `Day ${day} Challenge`;

  // Get repository ID first
  const repoQuery = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        id
      }
    }
  `;

  const repoResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: repoQuery }),
  });

  if (!repoResponse.ok) {
    const errorText = await repoResponse.text();
    throw new Error(`Failed to fetch repository ID: ${repoResponse.status} ${errorText}`);
  }

  const repoData = await repoResponse.json();
  
  if (repoData.errors) {
    throw new Error(`GitHub API error fetching repository: ${JSON.stringify(repoData.errors)}`);
  }
  
  if (!repoData.data || !repoData.data.repository) {
    throw new Error(`Repository not found or no access: ${owner}/${repo}. Response: ${JSON.stringify(repoData)}`);
  }
  
  const repositoryId = repoData.data.repository.id;

  // Create discussion using GraphQL mutation
  const mutation = `
    mutation {
      createDiscussion(input: {
        repositoryId: "${repositoryId}",
        categoryId: "${categoryId}",
        title: "${title}",
        body: ${JSON.stringify(content)}
      }) {
        discussion {
          url
          number
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create discussion: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GitHub API error: ${JSON.stringify(data.errors)}`);
  }

  const discussion = data.data.createDiscussion.discussion;

  return {
    discussionUrl: discussion.url,
    discussionNumber: discussion.number,
  };
}

/**
 * Get discussion category ID by name
 * Helper function to find the "Advent of AI" category ID
 */
export async function getDiscussionCategoryId(
  categoryName: string = 'Advent of AI'
): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'block';
  const repo = process.env.GITHUB_REPO || 'goose';

  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
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

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch categories: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GitHub API error: ${JSON.stringify(data.errors)}`);
  }

  interface Category {
    id: string;
    name: string;
    slug: string;
  }

  const categories = data.data.repository.discussionCategories.nodes as Category[];
  const category = categories.find((cat: Category) => cat.name === categoryName);

  return category ? category.id : null;
}
