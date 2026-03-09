import {
    FileText,
    BookOpen,
    Image,
    Quote,
    Sigma,
    Lightbulb,
} from "lucide-react";
import type React from "react";

export interface CodeExample {
    label?: string;
    code: string;
}

export interface WritingItem {
    id: string;
    title: string;
    description: string;
    examples?: CodeExample[];
    tips?: string[];
}

export interface WritingSection {
    id: string;
    title: string;
    icon: React.ElementType;
    description: string;
    items: WritingItem[];
}

export const writingSections: WritingSection[] = [
    {
        id: "struktur",
        title: "Struktur Dokumen",
        icon: FileText,
        description:
            "Cara mengisi identitas dan informasi dasar pada template TAX.",
        items: [
            {
                id: "identitas",
                title: "Mengisi Identitas Mahasiswa",
                description:
                    "Buka file laporan.tex dan cari bagian konfigurasi di awal file. Isi dengan data dirimu sesuai kolom yang tersedia.",
                examples: [
                    {
                        label: "laporan.tex — bagian identitas",
                        code: `\\newcommand{\\penulis}{Nama Lengkap Kamu}
\\newcommand{\\nim}{12345678}
\\newcommand{\\prodi}{Teknik Informatika}
\\newcommand{\\fakultas}{Fakultas Teknik}
\\newcommand{\\tahun}{2025}`,
                    },
                ],
            },
            {
                id: "judul",
                title: "Mengisi Judul & Judul Singkat",
                description:
                    "Isi judul lengkap laporan dan judul singkat yang tampil di header halaman.",
                examples: [
                    {
                        label: "laporan.tex — judul",
                        code: `\\newcommand{\\judul}{%
  Implementasi Sistem Informasi Akademik
  Berbasis Web di SMK Nusantara
}
\\newcommand{\\judulsingkat}{Sistem Informasi Akademik}`,
                    },
                ],
            },
            {
                id: "pembimbing",
                title: "Mengisi Dosen Pembimbing",
                description:
                    "Isi nama dosen pembimbing dan co-pembimbing (jika ada). Kosongkan \\pembimbingdua jika hanya satu pembimbing.",
                examples: [
                    {
                        label: "laporan.tex — pembimbing",
                        code: `\\newcommand{\\pembimbingsatu}{Dr. Nama Dosen, M.Kom.}
\\newcommand{\\pembimbingdua}{} % kosongkan jika tidak ada`,
                    },
                ],
            },
        ],
    },
    {
        id: "bab",
        title: "Bab & Sub-bab",
        icon: BookOpen,
        description:
            "Cara membuat struktur bab, sub-bab, dan sub-sub-bab pada dokumen LaTeX.",
        items: [
            {
                id: "bab-baru",
                title: "Membuat Bab Baru",
                description:
                    "Setiap bab berada di file terpisah dalam folder Bab/. Buat file baru lalu sertakan di laporan.tex menggunakan \\include.",
                examples: [
                    {
                        label: "bab1.tex — isi bab",
                        code: `\\chapter{Pendahuluan}

Paragraf pertama bab ini ditulis di sini.
Tidak perlu indent manual, LaTeX akan menanganinya.`,
                    },
                ],
            },
            {
                id: "subbab",
                title: "Sub-bab & Sub-sub-bab",
                description:
                    "Gunakan \\section untuk sub-bab dan \\subsection untuk sub-sub-bab. LaTeX otomatis memberi nomor.",
                examples: [
                    {
                        label: "Contoh struktur",
                        code: `\\chapter{Tinjauan Pustaka}

\\section{Landasan Teori}
Teks sub-bab di sini.

\\subsection{Pengertian Sistem Informasi}`,
                    },
                ],
            },
            {
                id: "paragraf",
                title: "Penulisan Paragraf",
                description:
                    "Pisahkan paragraf dengan satu baris kosong. Jangan gunakan \\newline atau \\\\ untuk memisahkan paragraf — LaTeX akan mengatur indentasi otomatis.",
                examples: [
                    {
                        label: "Paragraf yang benar",
                        code: `Ini adalah paragraf pertama. Teks mengalir
hingga akhir paragraf dengan sendirinya.

Ini adalah paragraf kedua. Dipisahkan
dengan satu baris kosong di atas.`,
                    },
                ],
                tips: [
                    "Hindari \\\\  di akhir paragraf biasa — gunakan hanya di tabel atau persamaan.",
                    "Gunakan \\noindent jika tidak mau indentasi di awal paragraf tertentu.",
                ],
            },
        ],
    },
    {
        id: "gambar",
        title: "Gambar & Tabel",
        icon: Image,
        description:
            "Cara menyisipkan gambar dan membuat tabel yang sesuai format TAX.",
        items: [
            {
                id: "sisipkan-gambar",
                title: "Menyisipkan Gambar",
                description:
                    "Simpan gambar di folder Gambar/ lalu gunakan environment figure. Gunakan \\centering agar gambar di tengah dan selalu isi caption serta label.",
                examples: [
                    {
                        label: "Contoh menyisipkan gambar",
                        code: `\\begin{figure}[H]
  \\centering
  \\includegraphics[width=0.8\\textwidth]{Gambar/diagram-alur.png}
  \\caption{Diagram Alur Sistem}
  \\label{fig:diagram-alur}
\\end{figure}`,
                    },
                ],
                tips: [
                    "Gunakan [H] agar gambar muncul tepat di posisi kode, bukan floating.",
                    "Format gambar yang didukung: PNG, JPG, PDF.",
                    "Referensikan gambar di teks dengan: lihat Gambar \\ref{fig:diagram-alur}.",
                ],
            },
            {
                id: "buat-tabel",
                title: "Membuat Tabel",
                description:
                    "Gunakan environment table + tabular. Template TAX sudah menyediakan style tabel yang rapi.",
                examples: [
                    {
                        label: "Contoh tabel sederhana",
                        code: `\\begin{table}[H]
  \\centering
  \\caption{Spesifikasi Perangkat}
  \\label{tab:spesifikasi}
  \\begin{tabular}{|l|l|}
    \\hline
    \\textbf{Komponen} & \\textbf{Spesifikasi} \\\\
    \\hline
    Prosesor & Intel Core i5 Gen 11 \\\\
    RAM      & 8 GB DDR4 \\\\
    Storage  & 256 GB SSD \\\\
    \\hline
  \\end{tabular}
\\end{table}`,
                    },
                ],
                tips: [
                    "Caption tabel diletakkan di atas tabel (berbeda dengan gambar yang di bawah).",
                    "Referensikan di teks: lihat Tabel \\ref{tab:spesifikasi}.",
                ],
            },
        ],
    },
    {
        id: "pustaka",
        title: "Daftar Pustaka",
        icon: Quote,
        description:
            "Cara menambahkan referensi menggunakan BibTeX dan cara menyitir di dalam teks.",
        items: [
            {
                id: "tambah-referensi",
                title: "Menambah Referensi di daftar-pustaka.bib",
                description:
                    "Semua referensi dikelola di file daftar-pustaka.bib. Pilih tipe entri yang sesuai: @article, @book, @inproceedings, @misc, dll.",
                examples: [
                    {
                        label: "Contoh entri buku",
                        code: `@book{pressman2014,
  author    = {Roger S. Pressman},
  title     = {Software Engineering: A Practitioner's Approach},
  edition   = {8th},
  publisher = {McGraw-Hill Education},
  year      = {2014}
}`,
                    },
                    {
                        label: "Contoh entri website/online",
                        code: `@misc{kemendikbud2023,
  author       = {{Kemendikbudristek}},
  title        = {Panduan Merdeka Belajar},
  year         = {2023},
  howpublished = {\\url{https://merdekabelajar.kemdikbud.go.id}},
  note         = {Diakses: 10 Januari 2024}
}`,
                    },
                ],
            },
            {
                id: "cara-cite",
                title: "Menyitir di Dalam Teks",
                description:
                    "Gunakan \\cite{key} untuk menyitir referensi. Key harus sama persis dengan yang ada di file .bib. Referensi akan otomatis muncul di Daftar Pustaka.",
                examples: [
                    {
                        label: "Cara menyitir",
                        code: `% Sitiran di akhir kalimat
Rekayasa perangkat lunak adalah disiplin ilmu yang ... \\cite{pressman2014}.

% Nama penulis di awal kalimat
\\citeauthor{pressman2014} mendefinisikan bahwa ...

% Sitir beberapa sekaligus
Beberapa penelitian terdahulu \\cite{pressman2014, kemendikbud2023}
menunjukkan bahwa ...`,
                    },
                ],
                tips: [
                    "Selalu compile minimal 2x setelah mengubah referensi agar nomor sitiran terupdate.",
                    "Gunakan tools seperti Zotero atau Mendeley untuk export ke format BibTeX dengan mudah.",
                ],
            },
        ],
    },
    {
        id: "persamaan",
        title: "Persamaan Matematika",
        icon: Sigma,
        description:
            "Cara menulis rumus dan persamaan matematika di dalam dokumen LaTeX.",
        items: [
            {
                id: "inline-math",
                title: "Persamaan Inline (dalam kalimat)",
                description:
                    "Gunakan tanda dolar $ ... $ untuk persamaan yang berada di dalam kalimat.",
                examples: [
                    {
                        label: "Contoh inline",
                        code: `Nilai akurasi dihitung dengan rumus $A = \\frac{TP + TN}{TP + TN + FP + FN}$.

Dimana $n$ adalah jumlah data dan $\\mu$ adalah nilai rata-rata.`,
                    },
                ],
            },
            {
                id: "block-math",
                title: "Persamaan Block (berdiri sendiri)",
                description:
                    "Gunakan environment equation untuk persamaan yang dinomori, atau equation* jika tidak perlu nomor.",
                examples: [
                    {
                        label: "Persamaan bernomor",
                        code: `\\begin{equation}
  \\label{eq:akurasi}
  A = \\frac{TP + TN}{TP + TN + FP + FN} \\times 100\\%
\\end{equation}

Seperti terlihat pada Persamaan \\ref{eq:akurasi}, ...`,
                    },
                    {
                        label: "Persamaan tanpa nomor",
                        code: `\\begin{equation*}
  f(x) = ax^2 + bx + c
\\end{equation*}`,
                    },
                ],
            },
        ],
    },
    {
        id: "tips",
        title: "Tips & Troubleshooting",
        icon: Lightbulb,
        description:
            "Kumpulan tips berguna dan cara mengatasi error umum saat menggunakan template TAX.",
        items: [
            {
                id: "compile-error",
                title: "Error Saat Compile",
                description:
                    "Beberapa error umum yang sering muncul dan cara mengatasinya.",
                tips: [
                    '! Undefined control sequence → Kamu salah ketik nama command, cek kembali ejaannya.',
                    '! File `xxx.sty\' not found → Package belum terinstall. Di MikTeX, aktifkan auto-install. Di Linux, jalankan: sudo apt-get install texlive-full',
                    "Gambar tidak muncul → Pastikan path file gambar benar dan format file didukung (PNG/JPG/PDF).",
                    "Referensi [?] → Compile ulang 2x, atau jalankan BibTeX terlebih dahulu.",
                ],
            },
            {
                id: "karakter-khusus",
                title: "Karakter Khusus",
                description:
                    "Beberapa karakter memiliki makna khusus di LaTeX dan harus di-escape dengan backslash.",
                examples: [
                    {
                        label: "Cara menulis karakter khusus",
                        code: `% Karakter yang harus di-escape:
\\%   → tanda persen
\\&   → ampersand
\\$   → tanda dolar
\\_   → underscore
\\{   → kurung kurawal
\\}   → kurung kurawal
\\#   → tanda pagar`,
                    },
                ],
                tips: [
                    "Tanda kutip Indonesia: gunakan `` (dua backtick) untuk buka dan '' (dua apostrof) untuk tutup.",
                    "Tanda pisah panjang (em dash): gunakan --- bukan -.",
                ],
            },
            {
                id: "struktur-folder",
                title: "Struktur Folder Template",
                description:
                    "Pahami letak file-file penting dalam template TAX agar tidak salah mengedit.",
                examples: [
                    {
                        label: "Struktur folder",
                        code: `Project/
├── laporan.tex          ← File utama, compile dari sini
├── daftar-pustaka.bib   ← Semua referensi
├── compile.sh           ← Script compile (Linux/macOS)
|
│── bab1.tex         ← Bab 1 Pendahuluan
│── bab2.tex         ← Bab 2 Tinjauan Pustaka
│── ...
├── Gambar/
│   └── (simpan gambar di sini)`,
                    },
                ],
                tips: [
                    "Jangan rename file laporan.tex tanpa mengupdate referensi di compile.sh.",
                    "Selalu kerja dari folder root Project/, bukan dari subfolder.",
                ],
            },
        ],
    },
];
