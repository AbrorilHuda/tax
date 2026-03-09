import { useState, useCallback, useEffect, useRef } from "react";
import { Eye, Code2, RotateCcw } from "lucide-react";
interface IdentityFields {
    judul: string;
    penulis: string;
    nim: string;
    prodi: string;
    fakultas: string;
    tahun: string;
    jenisLaporan: string;
}

const DEFAULT_CODE = `% ============================================
%  a0-identitas.tex — TAX Template Academic Xpress
%  Edit bagian ini untuk mengisi identitas Anda
% ============================================

% Jenis laporan: "Skripsi" atau "Laporan Kerja Praktik"
\\newcommand{\\jenisLaporan}{Laporan Kerja Praktik}

% Judul laporan (bisa multi-baris dengan \\\\)
\\newcommand{\\judul}{%
  Implementasi Sistem Informasi Akademik\\\\
  Berbasis Web di UNIRA Pamekasan%
}

% Identitas mahasiswa
\\newcommand{\\penulis}{Nama Lengkap Mahasiswa}
\\newcommand{\\nim}{220401010001}
\\newcommand{\\prodi}{Teknik Informatika}
\\newcommand{\\fakultas}{Fakultas Teknik}
\\newcommand{\\tahun}{2025}
`.trimStart();


function parseIdentity(code: string): IdentityFields {
    const get = (key: string, fallback: string): string => {
        const pattern = new RegExp(
            `\\\\newcommand\\{\\\\${key}\\}\\{%?([\\s\\S]*?)\\}`,
            "m"
        );
        const match = code.match(pattern);
        if (!match) return fallback;
        return match[1]
            .replace(/%$/gm, "")
            .replace(/\\\\/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    };

    return {
        judul: get("judul", "Judul Laporan"),
        penulis: get("penulis", "Nama Mahasiswa"),
        nim: get("nim", "000000000000"),
        prodi: get("prodi", "Program Studi"),
        fakultas: get("fakultas", "Fakultas"),
        tahun: get("tahun", new Date().getFullYear().toString()),
        jenisLaporan: get("jenisLaporan", "Laporan Kerja Praktik"),
    };
}



function CoverPreview({ fields }: { fields: IdentityFields }) {
    return (
        <div className="h-full flex items-start justify-center overflow-y-auto py-4 px-3">
            {/* A4-ish paper */}
            <div
                className="relative w-full max-w-[260px] bg-white text-black shadow-2xl rounded-sm"
                style={{ fontFamily: "'Times New Roman', Georgia, serif", minHeight: "370px" }}
            >
                <div className="px-6 py-6 flex flex-col items-center gap-0 text-center" style={{ minHeight: "370px" }}>

                    {/* Jenis Laporan */}
                    <p className="text-[9px] font-bold uppercase tracking-wide"
                        style={{ textDecoration: "underline", marginBottom: "10px" }}>
                        {fields.jenisLaporan || "Laporan Kerja Praktik"}
                    </p>

                    {/* Judul */}
                    <h2 className="text-[9px] font-bold uppercase leading-snug"
                        style={{ textDecoration: "underline", marginBottom: "12px" }}>
                        {fields.judul || "JUDUL LAPORAN"}
                    </h2>


                    <div className="my-3 flex items-center justify-center">
                        <div className="relative w-[70px] h-[70px]">
                            <img
                                src="/logo-unira.png"
                                alt="Logo UNIRA"
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                        </div>
                    </div>


                    <div className="mt-3 space-y-0.5">
                        <p className="text-[8px] italic">Oleh:</p>
                        <p className="text-[9px] font-bold uppercase">
                            {fields.penulis || "Nama Mahasiswa"}
                        </p>
                        <p className="text-[8px]">NIM {fields.nim || "000000000000"}</p>
                    </div>


                    <div className="flex-1" />


                    <div className="mt-4 space-y-0.5">
                        <p className="text-[8.5px] font-bold uppercase">
                            PROGRAM STUDI {fields.prodi?.toUpperCase() || "PROGRAM STUDI"}
                        </p>
                        <p className="text-[8.5px] font-bold uppercase">
                            {fields.fakultas?.toUpperCase() || "FAKULTAS"}
                        </p>
                        <p className="text-[8.5px] font-bold uppercase">
                            UNIVERSITAS MADURA
                        </p>
                        <p className="text-[8.5px] font-bold mt-0.5">
                            {fields.tahun || new Date().getFullYear()}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}



export function IdentityEditor() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [activeTab, setActiveTab] = useState<"split" | "code" | "preview">("split");
    const [isUpdating, setIsUpdating] = useState(false);
    const prevCodeRef = useRef(code);
    const fields = parseIdentity(code);

    useEffect(() => {
        if (code !== prevCodeRef.current) {
            setIsUpdating(true);
            const t = setTimeout(() => setIsUpdating(false), 300);
            prevCodeRef.current = code;
            return () => clearTimeout(t);
        }
    }, [code]);

    const handleReset = useCallback(() => setCode(DEFAULT_CODE), []);

    return (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">

            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs font-mono text-muted-foreground">
                        a0-identitas.tex
                    </span>
                </div>

                <div className="flex items-center gap-1">

                    <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                        <button
                            onClick={() => setActiveTab("split")}
                            className={`px-2.5 py-1 transition-colors ${activeTab === "split"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary"
                                }`}
                        >
                            Split
                        </button>
                        <button
                            onClick={() => setActiveTab("code")}
                            className={`px-2.5 py-1 flex items-center gap-1 transition-colors border-l border-border ${activeTab === "code"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary"
                                }`}
                        >
                            <Code2 className="h-3 w-3" />
                            Kode
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`px-2.5 py-1 flex items-center gap-1 transition-colors border-l border-border ${activeTab === "preview"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary"
                                }`}
                        >
                            <Eye className="h-3 w-3" />
                            Preview
                        </button>
                    </div>


                    <button
                        onClick={handleReset}
                        title="Reset ke default"
                        className="ml-1 p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>


            <div
                className={`grid ${activeTab === "split"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                    }`}
                style={{ minHeight: "420px", maxHeight: "520px" }}
            >

                {(activeTab === "split" || activeTab === "code") && (
                    <div
                        className={`flex flex-col ${activeTab === "split"
                            ? "border-b md:border-b-0 md:border-r border-border"
                            : ""
                            }`}
                        style={{ minHeight: "420px", maxHeight: "520px" }}
                    >
                        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-border/50 bg-muted/20">
                            <Code2 className="h-3 w-3 text-primary/70" />
                            <span className="text-xs text-muted-foreground">Editor</span>
                            <span className="ml-auto text-xs text-primary/60 font-mono">
                                ← edit & preview langsung
                            </span>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="flex-1 resize-none bg-transparent font-mono text-xs text-foreground p-4 outline-none leading-relaxed overflow-y-auto"
                            style={{
                                tabSize: 2,
                                scrollbarWidth: "thin",
                            }}
                            aria-label="Editor LaTeX identitas"
                        />
                    </div>
                )}


                {(activeTab === "split" || activeTab === "preview") && (
                    <div className="flex flex-col" style={{ minHeight: "420px", maxHeight: "520px" }}>
                        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-border/50 bg-muted/20">
                            <Eye className="h-3 w-3 text-primary/70" />
                            <span className="text-xs text-muted-foreground">Preview Sampul</span>
                            <span className="ml-auto text-xs text-muted-foreground/50">simulasi</span>
                        </div>
                        <div className={`flex-1 overflow-hidden transition-all duration-300 ease-out-quart flex justify-center ${isUpdating ? "bg-primary/5 opacity-80 scale-[0.98] glow-soft" : "bg-muted/30 opacity-100 scale-100"}`}>
                            <CoverPreview fields={fields} />
                        </div>
                    </div>
                )}
            </div>


            <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">
                    Preview diperbarui otomatis saat kamu mengedit kode di kiri
                </span>
            </div>
        </div>
    );
}

export default IdentityEditor;
