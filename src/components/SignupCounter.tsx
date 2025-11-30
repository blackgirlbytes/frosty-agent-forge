"use client";

import { useState, useEffect } from "react";

export const SignupCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/signups/count');
        const data = await response.json();
        
        if (data.success) {
          setCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch signup count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-sm font-medium text-muted-foreground">
          Loading...
        </span>
      </div>
    );
  }

  if (count === null) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      <span className="text-sm font-medium text-foreground">
        <span className="text-primary font-bold">{count.toLocaleString()}</span> {count === 1 ? 'developer' : 'developers'} signed up
      </span>
    </div>
  );
};
