"use client";

import { Play } from "lucide-react";
import { useState } from "react";

const VideoPlayer = ({ src, title, isVertical = false }: { src: string; title: string; isVertical?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative group">
      {/* Video container with frosted glass effect */}
      <div className="frosted-glass rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className={`relative bg-gradient-to-br from-background/50 to-secondary/50 ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          <video
            className="w-full h-full object-contain"
            controls
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom play button overlay (shows when not playing) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/30 to-secondary/30 backdrop-blur-sm transition-opacity duration-300 hover:opacity-90">
              <button
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center shadow-glow-cyan hover:shadow-glow-strong transition-all duration-300 transform hover:scale-110"
                onClick={(e) => {
                  const video = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                  video?.play();
                }}
              >
                <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Video title */}
      {title && (
        <h3 className="mt-4 text-center font-display text-lg md:text-xl font-semibold text-foreground">
          {title}
        </h3>
      )}
    </div>
  );
};

export const VideoSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Learn More
          </h2>
        </div>

        {/* Videos stacked vertically */}
        <div className="flex flex-col gap-8 lg:gap-12 max-w-4xl mx-auto relative">
          {/* Decorative snowflakes */}
          <div className="absolute -top-4 -left-4 text-4xl opacity-60 pointer-events-none animate-pulse hidden lg:block">❄️</div>
          <div className="absolute -top-6 -right-6 text-3xl opacity-50 pointer-events-none animate-pulse delay-100 hidden lg:block">❄️</div>
          <div className="absolute -bottom-4 -left-6 text-3xl opacity-50 pointer-events-none animate-pulse delay-200 hidden lg:block">❄️</div>
          <div className="absolute -bottom-6 -right-4 text-4xl opacity-60 pointer-events-none animate-pulse delay-300 hidden lg:block">❄️</div>
          
          <VideoPlayer src="/intro-video.mp4" title="" />
          <VideoPlayer src="/intro-video-2.mp4" title="" isVertical={true} />
        </div>
      </div>
    </section>
  );
};
