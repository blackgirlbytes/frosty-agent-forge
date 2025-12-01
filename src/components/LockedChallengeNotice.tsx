"use client";

import { useEffect, useState } from "react";
import { Lock, X } from "lucide-react";
import { formatUnlockDate, CHALLENGE_TITLES } from "@/lib/challenge-utils";

interface LockedChallengeNoticeProps {
  day: number;
}

export const LockedChallengeNotice = ({ day }: LockedChallengeNoticeProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible || isNaN(day) || day < 1 || day > 17) {
    return null;
  }

  const title = CHALLENGE_TITLES[day];
  const unlockDate = formatUnlockDate(day);

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="frosted-glass-strong rounded-2xl p-6 md:p-8 border border-yellow-500/30 relative">
          <button
            onClick={() => setVisible(false)}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close notice"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="frosted-glass rounded-lg p-3">
              <Lock className="w-6 h-6 text-yellow-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold mb-2 text-yellow-400">
                Challenge Locked
              </h3>
              <p className="text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">{title}</span> is not available yet.
              </p>
              <p className="text-sm text-muted-foreground">
                This challenge unlocks on <span className="font-semibold text-foreground">{unlockDate}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Sign up above to be notified when challenges unlock! 🎄
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
