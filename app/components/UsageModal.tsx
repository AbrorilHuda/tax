import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CodeBlock } from "~/components/CodeBlock";
import { osOptions, guide, type OS } from "~/lib/guide-data";

interface UsageModalProps {
  open: boolean;
  onClose: () => void;
  templateTitle: string;
}

export default function UsageModal({ open, onClose, templateTitle }: UsageModalProps) {
  const [activeOS, setActiveOS] = useState<OS>("windows");

  if (!open) return null;

  const { steps } = guide[activeOS];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Cara Penggunaan</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{templateTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* OS Tabs */}
        <div className="flex gap-1 p-4 pb-0">
          {osOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveOS(id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeOS === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              {/* Step number */}
              <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                {step.notes && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.notes}</p>
                )}
                {step.commands && <CodeBlock lines={step.commands} />}
                {step.link && (
                  <a
                    href={step.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-primary hover:underline underline-offset-2"
                  >
                    → {step.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}

          {activeOS === "overleaf" && (
            <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3 border border-border">
              ⚠️ Script <code className="font-mono">compile.sh</code> tidak tersedia di Overleaf. Gunakan compiler bawaan Overleaf.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 pt-0">
          <Button
            variant="heroOutline"
            size="sm"
            className="w-full"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
