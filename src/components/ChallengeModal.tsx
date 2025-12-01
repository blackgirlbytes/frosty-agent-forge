'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChallengeData {
  day: number;
  title: string;
  body: string;
  url: string;
  createdAt: string;
  author: string;
  comments: number;
  reactions: any;
}

interface ChallengeModalProps {
  day: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ChallengeModal = ({ day, isOpen, onClose }: ChallengeModalProps) => {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && day) {
      fetchChallenge();
    }
  }, [isOpen, day]);

  const fetchChallenge = async () => {
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-primary/20 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {loading ? (
                <div className="h-8 w-48 bg-primary/10 animate-pulse rounded" />
              ) : (
                <>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-cyan">
                    {challenge?.title || `Day ${day}`}
                  </h2>
                  {challenge && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Posted by {challenge.author} • {challenge.comments} comments
                    </p>
                  )}
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {loading && (
            <div className="space-y-4">
              <div className="h-4 bg-primary/10 animate-pulse rounded w-3/4" />
              <div className="h-4 bg-primary/10 animate-pulse rounded w-full" />
              <div className="h-4 bg-primary/10 animate-pulse rounded w-5/6" />
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              {error}
            </div>
          )}

          {challenge && (
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
                  code: ({ inline, children }: any) => 
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
          )}
        </div>

        {/* Footer */}
        {challenge && (
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-primary/20 p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={challenge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Share Your Solution
              </a>
              <a
                href={challenge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary/20 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
