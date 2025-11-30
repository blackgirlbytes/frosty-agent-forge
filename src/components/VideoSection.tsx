"use client";

const VideoPlayer = ({ youtubeId, title, isVertical = false }: { youtubeId: string; title: string; isVertical?: boolean }) => {
  return (
    <div className="relative group">
      {/* Video container with frosted glass effect */}
      <div className="frosted-glass rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className={`relative bg-gradient-to-br from-background/50 to-secondary/50 ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
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
          
          <VideoPlayer youtubeId="kitgGx37v88" title="" />
          <VideoPlayer youtubeId="f8W8HaH6v18" title="" isVertical={true} />
        </div>
      </div>
    </section>
  );
};
