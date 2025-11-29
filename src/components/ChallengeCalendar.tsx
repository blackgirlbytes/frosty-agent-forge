import { Lock } from "lucide-react";

export const ChallengeCalendar = () => {
  // Generate 17 challenges (weekdays Dec 1-24)
  const challenges = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    day: i + 1,
    locked: true,
  }));

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Your Advent Calendar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock 17 challenges each weekday from December 1-24. Build your AI agent expertise through hands-on projects. Solution videos release the following day.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="aspect-square frosted-glass glow-on-hover rounded-xl p-6 flex flex-col items-center justify-center cursor-not-allowed group relative overflow-hidden"
            >
              {/* Frost overlay effect */}
              <div className="absolute inset-0 bg-gradient-frost opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <Lock className="w-8 h-8 text-primary mb-3 group-hover:text-accent transition-colors duration-300" />
                <span className="font-display text-2xl font-bold text-gradient-cyan">
                  {String(challenge.day).padStart(2, "0")}
                </span>
                <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                  Locked
                </span>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-primary/5 blur-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <a href="#hero" className="text-gradient-cyan font-bold no-underline hover:opacity-80 transition-opacity">Sign up</a> above to be notified when the first challenge unlocks on December 1st, 2025
          </p>
        </div>
      </div>
    </section>
  );
};
