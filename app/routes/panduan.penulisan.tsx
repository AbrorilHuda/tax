import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CodeBlock } from "~/components/CodeBlock";
import { writingSections } from "~/lib/writing-data";
import type { Route } from "./+types/panduan.penulisan";

export function meta({ }: Route.MetaArgs) {
    const title = "Panduan Penulisan — TAX";
    const description =
        "Panduan lengkap penulisan dokumen LaTeX menggunakan template TAX untuk Laporan KP dan Skripsi mahasiswa UNIRA.";
    const url = "https://tax.dcnunira.dev/panduan/penulisan";
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

export default function PanduanPenulisan() {
    const [activeSection, setActiveSection] = useState(writingSections[0].id);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isClickScrolling = useRef(false);


    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (isClickScrolling.current) return;
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
        );

        const sections = writingSections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];

        sections.forEach((el) => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, []);

    const handleNavClick = (id: string) => {
        setActiveSection(id);
        setSidebarOpen(false);
        isClickScrolling.current = true;

        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        setTimeout(() => {
            isClickScrolling.current = false;
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background">

            <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
                    <Link to="/">
                        <Button variant="heroOutline" size="sm" className="gap-1.5 sm:gap-2 shrink-0">
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span className="hidden xs:inline">Kembali</span>
                        </Button>
                    </Link>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-sm font-semibold text-foreground truncate">
                            Panduan Penulisan
                        </h1>
                        <p className="text-xs text-muted-foreground truncate">TAX — Template Academic Xpress</p>
                    </div>


                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex lg:hidden items-center justify-center h-8 w-8 rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground shrink-0"
                        aria-label="Toggle navigasi"
                    >
                        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>


                <div className="mx-auto max-w-6xl px-4 sm:px-6 flex gap-1 pb-0">
                    <Link
                        to="/panduan/install"
                        className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border/50 transition-all"
                    >
                        Instalasi
                    </Link>
                    <span className="px-4 py-2 text-xs font-medium text-foreground border-b-2 border-primary transition-all cursor-default">
                        Penulisan
                    </span>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
                <div className="flex gap-8">
                    {/* Sidebar — desktop */}
                    <aside className="hidden lg:block w-56 shrink-0">
                        <div className="sticky top-[108px] space-y-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
                                Topik
                            </p>
                            {writingSections.map(({ id, title, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => handleNavClick(id)}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${activeSection === id
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span className="truncate">{title}</span>
                                    {activeSection === id && (
                                        <ChevronRight className="h-3 w-3 ml-auto shrink-0 text-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>


                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}
                    <div
                        className={`fixed left-0 top-[108px] bottom-0 z-10 w-64 bg-card border-r border-border p-4 overflow-y-auto transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
                            Topik
                        </p>
                        {writingSections.map(({ id, title, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => handleNavClick(id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all mb-1 ${activeSection === id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span>{title}</span>
                            </button>
                        ))}
                    </div>


                    <main className="flex-1 min-w-0 space-y-16">

                        <div className="space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                                Panduan <span className="text-gradient">Penulisan</span>
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                                Referensi lengkap cara menggunakan template TAX — mulai dari mengisi identitas,
                                menyusun bab, memasukkan gambar & tabel, hingga menulis daftar pustaka.
                            </p>
                        </div>


                        {writingSections.map((section) => {
                            const SectionIcon = section.icon;
                            return (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-32 space-y-6"
                                >

                                    <div className="flex items-start gap-3 pb-4 border-b border-border">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                                            <SectionIcon className="h-4.5 w-4.5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-0.5">{section.description}</p>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-6">
                                        {section.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-primary/20 transition-colors"
                                            >
                                                <h4 className="font-semibold text-sm sm:text-base text-foreground">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                    {item.description}
                                                </p>

                                                {/* Code examples */}
                                                {item.examples?.map((ex, i) => (
                                                    <div key={i} className="space-y-1">
                                                        {ex.label && (
                                                            <p className="text-xs text-muted-foreground font-mono">
                                                                {ex.label}
                                                            </p>
                                                        )}
                                                        <CodeBlock lines={ex.code.split("\n")} />
                                                    </div>
                                                ))}

                                                {/* Tips */}
                                                {item.tips && item.tips.length > 0 && (
                                                    <ul className="space-y-1.5 pt-1">
                                                        {item.tips.map((tip, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex gap-2 text-xs text-muted-foreground"
                                                            >
                                                                <span className="text-primary mt-0.5 shrink-0">›</span>
                                                                <span className="leading-relaxed">{tip}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}


                        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold text-foreground">Butuh template-nya?</p>
                                <p className="text-sm text-muted-foreground">
                                    Download template TAX langsung dari halaman utama.
                                </p>
                            </div>
                            <Link to="/#templates">
                                <Button variant="hero" size="sm" className="gap-2 shrink-0">
                                    Lihat Template
                                </Button>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
