#!/usr/bin/env tsx

/**
 * Get GitHub Discussion Category ID
 * 
 * This helper script fetches all discussion categories from the repo
 * and displays their IDs so you can find the "Advent of AI" category.
 */

import { getDiscussionCategoryId } from '../src/lib/github';

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'block';
  const repo = process.env.GITHUB_REPO || 'goose';

  if (!token) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is not set');
    console.error('Please add it to your .env.local file');
    process.exit(1);
  }

  console.log(`🔍 Fetching discussion categories from ${owner}/${repo}...`);
  console.log('');

  try {
    const query = `
      query {
        repository(owner: "${owner}", name: "${repo}") {
          discussionCategories(first: 20) {
            nodes {
              id
              name
              slug
              description
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

    const categories = data.data.repository.discussionCategories.nodes;

    console.log('📋 Available Discussion Categories:');
    console.log('');

    categories.forEach((cat: any) => {
      console.log(`Name: ${cat.name}`);
      console.log(`Slug: ${cat.slug}`);
      console.log(`ID: ${cat.id}`);
      if (cat.description) {
        console.log(`Description: ${cat.description}`);
      }
      console.log('---');
    });

    // Try to find "Advent of AI" category
    const adventCategory = categories.find((cat: any) => 
      cat.name.toLowerCase().includes('advent')
    );

    if (adventCategory) {
      console.log('');
      console.log('✅ Found "Advent of AI" category!');
      console.log('');
      console.log('Add this to your .env.local and Railway:');
      console.log(`GITHUB_DISCUSSION_CATEGORY_ID=${adventCategory.id}`);
    } else {
      console.log('');
      console.log('⚠️  Could not find "Advent of AI" category automatically.');
      console.log('Please create it in GitHub or use one of the IDs above.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
