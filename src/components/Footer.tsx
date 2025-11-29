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
              17 days of AI agent mastery through goose framework
            </p>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              FAQ
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Contact
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
