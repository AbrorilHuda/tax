import { useTheme } from "~/providers/theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { toggleTheme, resolvedTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="h-9 w-9 animate-pulse rounded-md bg-muted" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground ring-offset-background transition-all hover:bg-muted hover:glow-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all ${resolvedTheme === "dark"
          ? "scale-0 rotate-90 opacity-0"
          : "scale-100 rotate-0 opacity-100"
          }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all ${resolvedTheme === "dark"
          ? "scale-100 rotate-0 opacity-100"
          : "scale-0 -rotate-90 opacity-0"
          }`}
      />
    </button>
  );
}


