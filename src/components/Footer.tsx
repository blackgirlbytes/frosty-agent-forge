import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-gradient-cyan mb-2">
              Advent of AI
            </h3>
            <p className="text-sm text-muted-foreground">
              From automation to orchestration with{" "}
              <a href="https://block.github.io/goose" target="_blank" rel="noopener noreferrer" className="text-primary font-bold no-underline hover:text-primary/90 transition-colors">goose</a>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground justify-center md:justify-end">
            <a href="https://github.com/block/goose" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              GitHub
            </a>
            <a href="https://discord.gg/goose-oss" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              Discord
            </a>
            <a href="https://block.github.io/goose/docs/quickstart" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              Docs
            </a>
            <a href="https://www.youtube.com/@goose-oss" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              YouTube
            </a>
            <a href="https://www.linkedin.com/company/goose-oss" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              LinkedIn
            </a>
            <a href="https://x.com/goose_oss" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              X
            </a>
            <a href="https://bsky.app/profile/opensource.block.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              BlueSky
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Image 
            src="/goose-logo.png" 
            alt="goose logo" 
            width={24} 
            height={24}
            className="opacity-80"
          />
          <span>made by goose</span>
        </div>
      </div>
    </footer>
  );
};
