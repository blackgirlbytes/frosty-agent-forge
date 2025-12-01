"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Loader2, MessageSquare, Calendar, Clock } from "lucide-react";

interface ChallengePageProps {
  day: number;
}

interface DiscussionData {
  title: string;
  url: string;
  body: string;
  commentCount: number;
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
                <article 
                  className="prose prose-invert prose-cyan prose-lg max-w-none
                    prose-headings:font-display prose-headings:font-bold
                    prose-h1:text-4xl prose-h1:mb-6
                    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-muted/50 prose-pre:border prose-pre:border-white/10
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-li:marker:text-primary
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                    prose-hr:border-white/10"
                  dangerouslySetInnerHTML={{ __html: discussion.body }}
                />
              </div>

              {/* Action Buttons */}
              <div className="frosted-glass rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={discussion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View on GitHub
                  </a>
                  <a
                    href={`${discussion.url}#discussioncomment-top`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 frosted-glass hover:bg-white/10 rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Join Discussion ({discussion.commentCount})
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                {day > 1 ? (
                  <Link
                    href={`/challenges/${day - 1}`}
                    className="flex items-center gap-2 px-4 py-2 frosted-glass hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Day {day - 1}</span>
                  </Link>
                ) : (
                  <div />
                )}

                {day < 17 && (
                  <Link
                    href={`/challenges/${day + 1}`}
                    className="flex items-center gap-2 px-4 py-2 frosted-glass hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <span className="font-medium">Day {day + 1}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
