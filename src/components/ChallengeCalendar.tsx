"use client";

import Link from "next/link";
import { Lock, Unlock } from "lucide-react";
import { CHALLENGE_DATES, isChallengeUnlocked } from "@/lib/challenge-utils";

export const ChallengeCalendar = () => {
  // Generate 17 challenges (weekdays Dec 1-23)
  const challenges = Array.from({ length: 17 }, (_, i) => {
    const day = i + 1;
    return {
      id: day,
      day,
      date: CHALLENGE_DATES[day],
      locked: !isChallengeUnlocked(day),
    };
  });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Your Advent Calendar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock 17 challenges each weekday from December 1-23. Build your AI agent expertise through hands-on projects. Solution videos release the following day.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {challenges.map((challenge) => {
            const ChallengeCard = (
              <div
                className={`aspect-square frosted-glass rounded-xl p-6 md:p-8 flex flex-col items-center justify-center group relative overflow-hidden transition-all duration-300 ${
                  challenge.locked
                    ? 'cursor-not-allowed opacity-80'
                    : 'cursor-pointer hover:scale-105 hover:shadow-2xl glow-on-hover'
                }`}
              >
                {/* Frost overlay effect */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  challenge.locked 
                    ? 'bg-gradient-frost opacity-50 group-hover:opacity-70' 
                    : 'bg-gradient-to-br from-primary/20 to-accent/20 opacity-30 group-hover:opacity-50'
                }`} />
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-1">
                  {challenge.locked ? (
                    <Lock className="w-7 h-7 md:w-8 md:h-8 text-primary mb-2 group-hover:text-accent transition-colors duration-300" />
                  ) : (
                    <Unlock className="w-7 h-7 md:w-8 md:h-8 text-accent mb-2 group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <span className={`font-display text-3xl md:text-4xl font-bold ${
                    challenge.locked ? 'text-gradient-cyan' : 'text-gradient-cyan animate-pulse'
                  }`}>
                    {String(challenge.day).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground/80 font-medium">
                    DEC {challenge.date}
                  </span>
                  <span className={`text-xs mt-1 uppercase tracking-wider font-semibold ${
                    challenge.locked ? 'text-muted-foreground' : 'text-accent'
                  }`}>
                    {challenge.locked ? 'Locked' : 'Unlocked'}
                  </span>
                </div>

                {/* Glow effect on hover */}
                {!challenge.locked && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-accent/10 blur-xl" />
                  </div>
                )}
              </div>
            );

            return challenge.locked ? (
              <div key={challenge.id}>
                {ChallengeCard}
              </div>
            ) : (
              <Link key={challenge.id} href={`/challenges/${challenge.day}`}>
                {ChallengeCard}
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base md:text-lg text-muted-foreground">
            <a href="#hero" className="text-gradient-cyan font-bold no-underline hover:opacity-80 transition-opacity">Sign up</a> above to be notified when the first challenge unlocks on December 1st, 2025
          </p>
        </div>
      </div>
    </section>
  );
};
