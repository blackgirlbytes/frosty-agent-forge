/**
 * GitHub API utilities for updating email-list.json in the auto repo
 */

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'blackgirlbytes';
const REPO_NAME = 'auto';
const FILE_PATH = 'data/email-list.json';
const BRANCH = 'master';

interface Signup {
  email: string;
  subscribed: number;
  created_at: string;
  id: number;
}

interface GitHubFileResponse {
  content: string;
  sha: string;
}

/**
 * Get the current email-list.json from GitHub
 */
async function getEmailList(): Promise<{ signups: Signup[]; sha: string }> {
  const token = process.env.AUTO_PAT || process.env.GITHUB_PAT;
  
  if (!token) {
    throw new Error('GITHUB_PAT environment variable not set');
  }

  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch email list: ${response.status} ${error}`);
  }

  const data: GitHubFileResponse = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  const signups: Signup[] = JSON.parse(content);

  return { signups, sha: data.sha };
}

/**
 * Update email-list.json on GitHub
 */
async function updateEmailList(signups: Signup[], sha: string, commitMessage: string): Promise<void> {
  const token = process.env.AUTO_PAT || process.env.GITHUB_PAT;
  
  if (!token) {
    throw new Error('GITHUB_PAT environment variable not set');
  }

  const content = Buffer.from(JSON.stringify(signups, null, 2)).toString('base64');

  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: content,
        sha: sha,
        branch: BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update email list: ${response.status} ${error}`);
  }
}

/**
 * Unsubscribe an email by updating email-list.json on GitHub
 * Returns true if successful, false if email not found
 */
export async function unsubscribeFromGitHub(email: string): Promise<{ success: boolean; alreadyUnsubscribed?: boolean }> {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Fetch current list
  const { signups, sha } = await getEmailList();
  
  // Find the email
  const index = signups.findIndex(s => s.email.toLowerCase() === normalizedEmail);
  
  if (index === -1) {
    return { success: false };
  }
  
  // Check if already unsubscribed
  if (signups[index].subscribed === 0) {
    return { success: true, alreadyUnsubscribed: true };
  }
  
  // Update subscription status
  signups[index].subscribed = 0;
  
  // Commit the change
  await updateEmailList(
    signups,
    sha,
    `Unsubscribe ${normalizedEmail} from email notifications`
  );
  
  return { success: true };
}
