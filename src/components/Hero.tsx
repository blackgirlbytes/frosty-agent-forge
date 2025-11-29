"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snowflakes, setSnowflakes] = useState<Array<{
    left: string;
    fontSize: string;
    animationDuration: string;
    animationDelay: string;
  }>>([]);

  // Generate snowflakes only on client side to avoid hydration mismatch
  useEffect(() => {
    const flakes = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 10 + 10}px`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage("You're on the list! Check your inbox (and spam folder) for confirmation.");
        setEmail("");
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage("Failed to sign up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Aurora background effect with shimmer */}
      <div 
        className="absolute inset-0 bg-gradient-aurora opacity-30" 
        style={{ 
          animation: 'aurora-shift 12s ease-in-out infinite'
        }} 
      />
      
      {/* Snowflakes */}
      {snowflakes.map((flake, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: flake.left,
            fontSize: flake.fontSize,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        >
          ❄
        </div>
      ))}
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block mb-2">Advent of AI</span>
          <span className="text-gradient-cyan">Build with Agents</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          An advent calendar of AI engineering challenges. Learn{" "}
          <a href="https://block.github.io/goose" target="_blank" rel="noopener noreferrer" className="text-primary font-bold no-underline hover:text-primary/90 transition-colors">goose</a>{" "}
          by building real projects from CI automation to multi-agent orchestration.
        </p>

        {/* Weekdays info */}
        <p className="text-base md:text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto">
          Weekdays only, December 1-24.
        </p>

        {/* Email signup form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
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

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="max-w-md mx-auto mb-4 p-4 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <p className="text-sm font-medium text-primary">
              ✅ {successMessage}
            </p>
          </div>
        )}
        
        {errorMessage && (
          <div className="max-w-md mx-auto mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
            <p className="text-sm font-medium text-red-400">
              ❌ {errorMessage}
            </p>
          </div>
        )}

        {/* Small trust indicator */}
        {!successMessage && !errorMessage && (
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            Join developers preparing for the challenge
          </p>
        )}
      </div>
    </section>
  );
};
