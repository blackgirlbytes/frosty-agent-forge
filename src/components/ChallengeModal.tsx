"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, Loader2, MessageSquare } from "lucide-react";

interface ChallengeModalProps {
  day: number;
  isOpen: boolean;
  onClose: () => void;
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

export const ChallengeModal = ({ day, isOpen, onClose }: ChallengeModalProps) => {
  const [discussion, setDiscussion] = useState<DiscussionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchDiscussion = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/discussions/${day}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch discussion: ${response.statusText}`);
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
  }, [day, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] frosted-glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-cyan">
            Day {day}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading challenge...</p>
            </div>
          )}

          {error && (
            <div className="frosted-glass rounded-lg p-6 border border-red-500/20">
              <h3 className="text-xl font-bold text-red-400 mb-2">Error Loading Challenge</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {discussion && (
            <div className="space-y-6">
              {/* Challenge Title */}
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  {discussion.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Posted {new Date(discussion.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Challenge Content */}
              <div 
                className="prose prose-invert prose-cyan max-w-none"
                dangerouslySetInnerHTML={{ __html: discussion.body }}
              />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                <a
                  href={discussion.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on GitHub
                </a>
                <a
                  href={`${discussion.url}#discussioncomment-top`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 frosted-glass hover:bg-white/10 rounded-lg font-medium transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  {discussion.commentCount} Comments
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
