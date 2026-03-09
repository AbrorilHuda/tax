import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12 px-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/4 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground group">
          <Zap className="h-4 w-4 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
          <span className="text-sm">
            {new Date().getFullYear()} TAX — Template Academic Xpress UNIRA
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Dibuat oleh{" "}
          <a
            href="https://dcnunira.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-2 transition-colors"
          >
            DCN UNIRA
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
