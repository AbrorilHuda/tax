import { useInView } from "~/lib/use-in-view";
import { IdentityEditor } from "~/components/IdentityEditor";
import CodePreview from "./CodePreview";

const steps = [
  {
    num: "01",
    title: "Clone atau Download Template",
    code: `git clone <url-repository-template>
cd <nama-folder-template>`,
  },
  {
    num: "02",
    title: "Install LaTeX (jika belum)",
    code: `it ada di documentasi kami di tax.dcnunira.dev/panduan/install`,
  },
  {
    num: "03",
    title: "Edit Data Identitas & Konten",
    code: `# Buka file identitas, isi data dirimu
nano a0-identitas.tex`,
  },
  {
    num: "04",
    title: "Compile ke PDF",
    code: `bash compile.sh
# Output: laporan.pdf ✓`,
  },
];

const GuideSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="panduan"
      className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Cara Penggunaan
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Empat langkah sederhana untuk semua template TAX.
          </p>
        </div>



        <CodePreview />


        {/*  style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s var(--ease-out-quart) 400ms, transform 0.7s var(--ease-out-quart) 400ms",
          }} */}
        <div
          className="mt-12 sm:mt-16 space-y-4"
        >
          <div className="text-center space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Coba langsung
            </p>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Edit <span className="text-gradient">a0-identitas.tex</span> & lihat preview sampul
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Ubah nama, NIM, judul — preview diperbarui otomatis NB: ini cuman simulasi.
            </p>
          </div>
          <IdentityEditor />
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
