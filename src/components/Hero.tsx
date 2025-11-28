import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("You're on the list! We'll notify you when challenges unlock.");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Aurora background effect */}
      <div className="absolute inset-0 bg-gradient-aurora opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Lock badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full frosted-glass-strong glow-on-hover">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">17 Challenges Locked Until Dec 1, 2025</span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block mb-2">Advent of AI</span>
          <span className="text-gradient-cyan">17 Days of Mastery</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Daily hands-on challenges to build real AI agent proficiency. Learn{" "}
          <span className="text-primary font-semibold">goose</span> framework through{" "}
          <span className="text-accent font-semibold">agentic workflows</span>. Weekdays only, December 1-24.
        </p>

        {/* Email signup form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-secondary/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow-cyan hover:shadow-glow-strong transition-all duration-300"
          >
            {isSubmitting ? "Joining..." : "Get Notified"}
          </Button>
        </form>

        {/* Small trust indicator */}
        <p className="text-sm text-muted-foreground">
          Join developers preparing for the challenge
        </p>
      </div>
    </section>
  );
};
