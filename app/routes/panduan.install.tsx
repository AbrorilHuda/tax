import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CodeBlock } from "~/components/CodeBlock";
import { osOptions, guide, type OS } from "~/lib/guide-data";
import type { Route } from "./+types/panduan.install";

export function meta({ }: Route.MetaArgs) {
    const title = "Panduan Instalasi — TAX";
    const description =
        "Panduan instalasi dan penggunaan template LaTeX TAX untuk Windows, macOS, Linux, dan Overleaf.";
    const url = "https://tax.dcnunira.dev/panduan/install";
    const image = "https://tax.dcnunira.dev/og-image.png";

    return [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:site_name", content: "TAX UNIRA" },
        { property: "og:locale", content: "id_ID" },
    ];
}

export default function PanduanInstall() {
    const [activeOS, setActiveOS] = useState<OS>("windows");
    const { editor, steps } = guide[activeOS];

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
                    <Link to="/">
                        <Button variant="heroOutline" size="sm" className="gap-1.5 sm:gap-2 shrink-0">
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span className="hidden xs:inline">Kembali</span>
                        </Button>
                    </Link>
                    <div className="min-w-0">
                        <h1 className="text-sm font-semibold text-foreground truncate">
                            Panduan Instalasi
                        </h1>
                        <p className="text-xs text-muted-foreground truncate">TAX — Template Academic Xpress</p>
                    </div>
                </div>
            </div>

            {/* Tab nav */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 flex gap-1 pb-0">
                <span className="px-4 py-2 text-xs font-medium text-foreground border-b-2 border-primary transition-all cursor-default">
                    Instalasi
                </span>
                <Link
                    to="/panduan/penulisan"
                    className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border/50 transition-all"
                >
                    Penulisan
                </Link>
            </div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
                {/* Header */}
                <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Cara <span className="text-gradient">Penggunaan</span> Template
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                        Panduan instalasi ini berlaku untuk semua template TAX (Laporan KP
                        maupun Skripsi). Langkah-langkahnya sama — yang berbeda hanya
                        template yang digunakan.
                    </p>
                </div>

                {/* OS Switcher */}
                <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Pilih sistem operasi / platform
                    </p>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                        {osOptions.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveOS(id)}
                                className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all border ${activeOS === id
                                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                    : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/30"
                                    }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {label}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Editor yang direkomendasikan:{" "}
                        <span className="text-foreground font-medium">{editor}</span>
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-4 sm:space-y-6">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="flex gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors"
                        >
                            {/* Number */}
                            <div className="shrink-0 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs sm:text-sm font-mono">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="font-semibold text-sm sm:text-base text-foreground">{step.title}</h3>
                                {step.notes && (
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {step.notes}
                                    </p>
                                )}
                                {step.commands && <CodeBlock lines={step.commands} />}
                                {step.link && (
                                    <a
                                        href={step.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 mt-2 text-xs sm:text-sm text-primary hover:underline underline-offset-2"
                                    >
                                        {step.link.label}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overleaf note */}
                {activeOS === "overleaf" && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                        ⚠️ Script{" "}
                        <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
                            compile.sh
                        </code>{" "}
                        tidak tersedia di Overleaf. Gunakan compiler bawaan Overleaf yang
                        sudah terintegrasi langsung di browser.
                    </div>
                )}

                {/* Back to templates CTA */}
                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-foreground">Siap mulai?</p>
                        <p className="text-sm text-muted-foreground">
                            Download template yang kamu butuhkan dari halaman utama.
                        </p>
                    </div>
                    <Link to="/#templates">
                        <Button variant="hero" size="sm" className="gap-2 shrink-0">
                            Lihat Template
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
