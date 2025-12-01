'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, MessageSquare, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  replies?: {
    nodes: Array<{
      id: string;
      body: string;
      createdAt: string;
      author: {
        login: string;
        avatarUrl: string;
      };
    }>;
  };
}

interface Reactions {
  [key: string]: number;
}

interface ChallengeData {
  day: number;
  title: string;
  body: string;
  url: string;
  createdAt: string;
  author: string;
  commentCount: number;
  reactions: Reactions;
  comments: Comment[];
}

export default function ChallengePage() {
  const params = useParams();
  const day = params.day as string;
  
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenge = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/challenge/${day}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch challenge');
      }
      
      const data = await response.json();
      setChallenge(data);
    } catch (err) {
      setError('Failed to load challenge. Please try again.');
      console.error('Error fetching challenge:', err);
    } finally {
      setLoading(false);
    }
  }, [day]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-primary/20">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Calendar</span>
            </Link>
            
            {challenge && (
              <div className="flex items-center gap-3">
                <a
                  href={challenge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-primary/20 hover:bg-primary/10 rounded-lg transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            {error}
          </div>
        )}

        {challenge && (
          <>
            {/* Challenge Header */}
            <div className="mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-cyan mb-4">
                {challenge.title}
              </h1>
              <p className="text-muted-foreground">
                Posted by {challenge.author} • {challenge.commentCount} comments
              </p>
            </div>

            {/* Challenge Body */}
            <div className="frosted-glass rounded-2xl p-8 mb-8 border border-primary/20">
              <div className="prose prose-invert prose-cyan max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-gradient-cyan mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-primary mt-8 mb-4">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-primary mt-6 mb-3">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>
                    ),
                    code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) => 
                      inline ? (
                        <code className="px-1.5 py-0.5 bg-primary/10 rounded text-primary text-sm">
                          {children}
                        </code>
                      ) : (
                        <code className="block p-4 bg-primary/5 rounded-lg text-sm overflow-x-auto">
                          {children}
                        </code>
                      ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {challenge.body}
                </ReactMarkdown>
              </div>
            </div>

            {/* CTA Section */}
            <div className="frosted-glass rounded-2xl p-6 mb-8 border border-primary/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">Ready to share your solution?</h3>
                  <p className="text-sm text-muted-foreground">Join the discussion on GitHub</p>
                </div>
                <a
                  href={challenge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-5 h-5" />
                  Share Your Solution
                </a>
              </div>
            </div>

            {/* Comments Section */}
            {challenge.comments && challenge.comments.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Comments ({challenge.comments.length})
                </h2>
                <div className="space-y-6">
                  {challenge.comments.map((comment) => (
                    <div key={comment.id} className="frosted-glass rounded-xl p-6 border border-primary/10">
                      {/* Comment Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={comment.author.avatarUrl} 
                          alt={comment.author.login}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-primary">{comment.author.login}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {/* Comment Body */}
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="text-muted-foreground mb-2 leading-relaxed">{children}</p>
                            ),
                            code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) => 
                              inline ? (
                                <code className="px-1.5 py-0.5 bg-primary/10 rounded text-primary text-sm">
                                  {children}
                                </code>
                              ) : (
                                <code className="block p-3 bg-primary/5 rounded-lg text-sm overflow-x-auto my-2">
                                  {children}
                                </code>
                              ),
                          }}
                        >
                          {comment.body}
                        </ReactMarkdown>
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.nodes && comment.replies.nodes.length > 0 && (
                        <div className="mt-4 ml-6 space-y-3 border-l-2 border-primary/20 pl-4">
                          {comment.replies.nodes.map((reply) => (
                            <div key={reply.id} className="bg-background/50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <img 
                                  src={reply.author.avatarUrl} 
                                  alt={reply.author.login}
                                  className="w-6 h-6 rounded-full"
                                />
                                <p className="font-semibold text-sm text-primary">{reply.author.login}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(reply.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown
                                  components={{
                                    p: ({ children }) => (
                                      <p className="text-muted-foreground text-sm">{children}</p>
                                    ),
                                  }}
                                >
                                  {reply.body}
                                </ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
