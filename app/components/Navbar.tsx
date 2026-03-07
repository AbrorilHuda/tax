import { Zap, Github } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">
            TAX{" "}
            <span className="text-muted-foreground font-normal text-sm">
              UNIRA
            </span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#fitur" className="hover:text-foreground transition-colors">
            Fitur
          </a>
          <a
            href="#templates"
            className="hover:text-foreground transition-colors"
          >
            Template
          </a>
          <a
            href="#preview"
            className="hover:text-foreground transition-colors"
          >
            Preview
          </a>
          <a
            href="#panduan"
            className="hover:text-foreground transition-colors"
          >
            Panduan
          </a>
        </div>
        <a
          href="https://github.com/CodeCampUnira"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
