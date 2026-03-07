import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "~/components/Toaster";

interface CodeBlockProps {
    lines: string[];
}

export function CodeBlock({ lines }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const { showToast } = useToast();

    const handleCopy = () => {
        const text = lines.filter((l) => !l.startsWith("#") && l !== "").join("\n");
        navigator.clipboard.writeText(text);
        setCopied(true);
        showToast("Disalin! ✓");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-xl bg-muted/60 border border-border mt-3 group">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Copy perintah"
                aria-label="Copy perintah"
            >
                {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                    <Copy className="h-3.5 w-3.5" />
                )}
            </button>
            <pre className="text-sm p-4 pr-10 overflow-x-auto font-mono leading-relaxed">
                {lines.map((line, i) =>
                    line.startsWith("#") ? (
                        <span key={i} className="text-muted-foreground/60 block">
                            {line}
                            {"\n"}
                        </span>
                    ) : line === "" ? (
                        <span key={i} className="block">
                            {"\n"}
                        </span>
                    ) : (
                        <span key={i} className="text-primary block">
                            {line}
                            {"\n"}
                        </span>
                    )
                )}
            </pre>
        </div>
    );
}

export default CodeBlock;
