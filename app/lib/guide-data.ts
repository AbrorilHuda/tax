import { Monitor, Apple, Terminal, Globe } from "lucide-react";
import type React from "react";

export type OS = "windows" | "macos" | "linux" | "overleaf";

export interface Step {
    title: string;
    commands?: string[];
    notes?: string;
    link?: { label: string; url: string };
}

export interface OSOption {
    id: OS;
    label: string;
    icon: React.ElementType;
}

export const osOptions: OSOption[] = [
    { id: "windows", label: "Windows", icon: Monitor },
    { id: "macos", label: "macOS", icon: Apple },
    { id: "linux", label: "Linux", icon: Terminal },
    { id: "overleaf", label: "Overleaf", icon: Globe },
];

export const guide: Record<OS, { editor: string; steps: Step[] }> = {
    windows: {
        editor: "MikTeX + TeXstudio",
        steps: [
            {
                title: "Install MikTeX",
                notes:
                    'Pilih "For All Users" saat instalasi dan aktifkan opsi "Always install missing packages" agar package LaTeX terunduh otomatis.',
                link: { label: "Download MikTeX →", url: "https://miktex.org/download" },
            },
            {
                title: "Install TeXstudio",
                notes: "TeXstudio adalah editor LaTeX yang mudah digunakan di Windows.",
                link: {
                    label: "Download TeXstudio →",
                    url: "https://www.texstudio.org/",
                },
            },
            {
                title: "Update MikTeX",
                notes:
                    "Buka MikTeX Console dari Start Menu, lalu klik Check for updates dan install semua update yang tersedia.",
            },
            {
                title: "Clone atau Download Template",
                commands: [
                    "git clone <url-repository-template>",
                    "cd <nama-folder-template>",
                ],
                notes: "Atau download file ZIP langsung dari halaman GitHub.",
            },
            {
                title: "Buka & Compile",
                notes:
                    "Buka file laporan.tex di TeXstudio, lalu klik tombol Build & View (F5) untuk menghasilkan laporan.pdf.",
            },
        ],
    },
    macos: {
        editor: "MacTeX + VS Code",
        steps: [
            {
                title: "Install MacTeX",
                commands: ["brew install --cask mactex"],
                notes: "Atau download installer manual dari situs MacTeX.",
                link: {
                    label: "Download MacTeX →",
                    url: "https://www.tug.org/mactex/",
                },
            },
            {
                title: "Install VS Code",
                link: {
                    label: "Download VS Code →",
                    url: "https://code.visualstudio.com/",
                },
            },
            {
                title: "Install Ekstensi LaTeX Workshop",
                notes:
                    "Di VS Code, buka Extensions (Cmd+Shift+X), cari LaTeX Workshop, lalu klik Install.",
            },
            {
                title: "Clone Template",
                commands: [
                    "git clone <url-repository-template>",
                    "cd <nama-folder-template>",
                ],
            },
            {
                title: "Compile",
                commands: ["cd Project/", "./compile.sh"],
                notes: "Atau gunakan shortcut Ctrl+Alt+B di dalam VS Code.",
            },
        ],
    },
    linux: {
        editor: "TeX Live + TeXstudio / VS Code",
        steps: [
            {
                title: "Install TeX Live",
                commands: [
                    "sudo apt-get update",
                    "sudo apt-get install texlive-full",
                ],
            },
            {
                title: "Install Editor (pilih salah satu)",
                commands: [
                    "# TeXstudio",
                    "sudo apt-get install texstudio",
                    "",
                    "# VS Code",
                    "sudo snap install code --classic",
                ],
            },
            {
                title: "Clone Template",
                commands: [
                    "git clone <url-repository-template>",
                    "cd <nama-folder-template>",
                ],
            },
            {
                title: "Compile",
                commands: ["cd Project/", "./compile.sh"],
                notes: "Script compile.sh akan menghasilkan laporan.pdf secara otomatis.",
            },
        ],
    },
    overleaf: {
        editor: "Browser (tanpa instalasi)",
        steps: [
            {
                title: "Download Template",
                notes:
                    "Unduh file ZIP template dari tombol Download di halaman Template.",
            },
            {
                title: "Upload ke Overleaf",
                notes:
                    "Login ke Overleaf, klik New Project → Upload Project, lalu upload file ZIP yang sudah didownload.",
                link: { label: "Buka Overleaf →", url: "https://www.overleaf.com" },
            },
            {
                title: "Set Main Document",
                notes:
                    "Di panel kiri Overleaf, klik kanan laporan.tex lalu pilih Set as Main File.",
            },
            {
                title: "Compile",
                notes:
                    "Klik tombol Compile (hijau) di pojok kiri atas untuk melihat hasilnya.",
            },
        ],
    },
};
