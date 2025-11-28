"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-12-01T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="frosted-glass-strong glow-on-hover rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
        <div className="text-3xl md:text-5xl font-display font-bold text-gradient-cyan">
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-foreground">
          Challenges Unlock In
        </h2>
        <div className="flex justify-center gap-3 md:gap-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
};
