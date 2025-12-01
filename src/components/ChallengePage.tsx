"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Loader2, MessageSquare, Calendar, Clock } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChallengePageProps {
  day: number;
}

interface DiscussionData {
  title: string;
  url: string;
  body: string;
  commentCount: number;
  comments: Array<{
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
  author: {
    login: string;
    avatarUrl: string;
  };
  createdAt: string;
}

export const ChallengePage = ({ day }: ChallengePageProps) => {
  const [discussion, setDiscussion] = useState<DiscussionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscussion = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/discussions/${day}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch discussion: ${response.statusText}`);
        }

        const data = await response.json();
        setDiscussion(data);
      } catch (err) {
        console.error('Error fetching discussion:', err);
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussion();
  }, [day]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(210_60%_15%),_transparent_50%),_radial-gradient(circle_at_70%_80%,_hsl(190_80%_25%),_transparent_50%)] opacity-40" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Calendar</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-12">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
              <p className="text-xl text-muted-foreground">Loading challenge...</p>
            </div>
          )}

          {error && (
            <div className="frosted-glass rounded-2xl p-8 border border-red-500/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Challenge</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Calendar
              </Link>
            </div>
          )}

          {discussion && (
            <div className="space-y-8">
              {/* Challenge Header */}
              <div className="frosted-glass-strong rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="frosted-glass rounded-lg px-4 py-2">
                    <span className="font-display text-2xl font-bold text-gradient-cyan">
                      Day {String(day).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
                  {discussion.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(discussion.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(discussion.createdAt).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        timeZoneName: 'short',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{discussion.commentCount} comments</span>
                  </div>
                </div>
              </div>

              {/* Challenge Content */}
              <div className="frosted-glass rounded-2xl p-8 md:p-10">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-invert prose-cyan prose-lg max-w-none
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
                    prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0
                    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-muted/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                    prose-ul:text-muted-foreground prose-ul:my-4 prose-ol:text-muted-foreground prose-ol:my-4
                    prose-li:my-2 prose-li:marker:text-primary
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:pl-4
                    prose-hr:border-white/10 prose-hr:my-8
                    prose-table:border-collapse prose-table:w-full
                    prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                    prose-td:border prose-td:border-white/10 prose-td:p-3"
                >
                  {discussion.body}
                </ReactMarkdown>
              </div>

              {/* Comments Section */}
              {discussion.comments && discussion.comments.length > 0 && (
                <div className="frosted-glass rounded-2xl p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">
                      Recent Comments
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      Showing {discussion.comments.length} of {discussion.commentCount}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {discussion.comments.map((comment) => (
                      <div key={comment.id} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                        <div className="flex items-start gap-4">
                          <a
                            href={comment.author.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <img
                              src={comment.author.avatarUrl}
                              alt={comment.author.login}
                              className="w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-colors"
                            />
                          </a>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <a
                                href={comment.author.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                {comment.author.login}
                              </a>
                              <span className="text-sm text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div
                              className="prose prose-invert prose-sm max-w-none
                                prose-p:text-muted-foreground prose-p:leading-relaxed
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-foreground
                                prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                                prose-pre:bg-muted/50 prose-pre:border prose-pre:border-white/10 prose-pre:text-sm
                                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                                prose-li:marker:text-primary"
                              dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}
                            />
                            <a
                              href={comment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              View on GitHub
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {discussion.commentCount > 5 && (
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                      <a
                        href={discussion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 frosted-glass hover:bg-white/10 rounded-lg transition-colors font-medium"
                      >
                        View all {discussion.commentCount} comments on GitHub
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="frosted-glass rounded-2xl p-6">
                <a
                  href="https://github.com/block/goose/discussions/categories/advent-of-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 w-full"
                >
                  <MessageSquare className="w-5 h-5" />
                  Submit Your Solution
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
