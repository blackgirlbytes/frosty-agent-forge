import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { ChallengeCalendar } from "@/components/ChallengeCalendar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(210_60%_15%),_transparent_50%),_radial-gradient(circle_at_70%_80%,_hsl(190_80%_25%),_transparent_50%)] opacity-40" />
      
      <div className="relative z-10">
        <Hero />
        <Countdown />
        <ChallengeCalendar />
        <Footer />
      </div>
    </div>
  );
}
