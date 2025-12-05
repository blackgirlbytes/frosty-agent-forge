import Link from 'next/link';
import { CHALLENGE_TITLES } from '@/lib/challenge-utils';

export default function AdminChallengesPage() {
  const challenges = Array.from({ length: 17 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(210_60%_15%),_transparent_50%),_radial-gradient(circle_at_70%_80%,_hsl(190_80%_25%),_transparent_50%)] opacity-40" />

      <div className="relative z-10">
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                  🔐 Admin: All Challenges
                </h1>
                <p className="text-muted-foreground">
                  View all challenges regardless of unlock status
                </p>
              </div>
              <Link
                href="/"
                className="px-4 py-2 frosted-glass hover:bg-white/10 rounded-lg transition-colors font-medium"
              >
                Back to Calendar
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((day) => (
              <Link
                key={day}
                href={`/challenges/${day}?preview=internal2025`}
                className="frosted-glass rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="frosted-glass rounded-lg px-3 py-1">
                    <span className="font-display text-lg font-bold text-gradient-cyan">
                      Day {String(day).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {CHALLENGE_TITLES[day]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click to view challenge
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 frosted-glass rounded-xl p-6 border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">
                  Admin Access Only
                </h3>
                <p className="text-sm text-muted-foreground">
                  This page bypasses unlock restrictions. Regular users will only see challenges
                  that have been unlocked according to the schedule.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
