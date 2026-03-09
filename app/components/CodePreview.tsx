import { useState, useEffect } from "react";
import { useInView } from "~/lib/use-in-view";

const TERMINAL_LINES = [
  { text: "#!/bin/bash", type: "comment", delay: 300 },
  { text: "# Compile laporan", type: "comment", delay: 400 },
  { text: "git clone <repo_url_template>", type: "command", delay: 600 },
  { text: "cd <nama_folder_template>", type: "command", delay: 400 },
  { text: "# Edit file identitas", type: "comment", delay: 500 },
  { text: "nano a0-identitas.tex", type: "command", delay: 700 },
  { text: "# Compile PDF", type: "comment", delay: 400 },
  { text: "bash compile.sh", type: "command", delay: 1000 },
  { text: "✓ laporan.pdf generated successfully", type: "success", delay: 0 },
];

const CodePreview = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5, once: true });
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!inView || visibleLines >= TERMINAL_LINES.length) return;

    setIsTyping(true);
    const delay = TERMINAL_LINES[visibleLines].delay;
    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, visibleLines]);

  useEffect(() => {
    if (visibleLines === TERMINAL_LINES.length) {
      setIsTyping(false);
    }
  }, [visibleLines]);

  return (
    <div ref={ref} className="code-block p-6 glow-soft relative overflow-hidden">
      {/* Blinking cursor effect at the top when starting */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border relative z-10">
        <div className="h-3 w-3 rounded-full bg-destructive/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-muted-foreground">compile.sh</span>
      </div>

      <pre className="text-sm leading-relaxed overflow-x-auto relative z-10 min-h-[280px]">
        <code className="flex flex-col gap-1.5">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out-quart">
              {line.type === "comment" && <span className="text-muted-foreground">{line.text}</span>}
              {line.type === "command" && (
                <>
                  <span className="text-primary mr-2">$</span>
                  <span className="text-foreground">{line.text}</span>
                </>
              )}
              {line.type === "success" && <span className="text-green-400 font-semibold">{line.text}</span>}
            </div>
          ))}
          {isTyping && inView && (
            <div className="flex items-center h-5 mt-1">
              <span className="w-2 h-4 bg-primary/70 animate-pulse" />
            </div>
          )}
        </code>
      </pre>
    </div>
  );
};

export default CodePreview;
