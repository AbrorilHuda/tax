const CodePreview = () => {
  return (
    <div className="code-block p-6 glow-soft">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <div className="h-3 w-3 rounded-full bg-destructive/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-muted-foreground">compile.sh</span>
      </div>
      <pre className="text-sm leading-relaxed overflow-x-auto">
        <code>
          <span className="text-muted-foreground">#!/bin/bash</span>
          {"\n"}
          <span className="text-muted-foreground"># Compile laporan KP</span>
          {"\n\n"}
          <span className="text-primary">$</span> git clone{" "}
          <span className="text-green-400">
            https://github.com/CodeCampUnira/
          </span>
          {"\n"}
          {"  "}
          <span className="text-green-400">
            Template-laporan-kerja-praktik-TI-unira.git
          </span>
          {"\n\n"}
          <span className="text-primary">$</span> cd
          Template-laporan-kerja-praktik-TI-unira{"\n\n"}
          <span className="text-muted-foreground"># Edit file identitas</span>
          {"\n"}
          <span className="text-primary">$</span> nano a0-identitas.tex{"\n\n"}
          <span className="text-muted-foreground"># Compile PDF</span>
          {"\n"}
          <span className="text-primary">$</span> bash compile.sh{"\n\n"}
          <span className="text-green-400">
            ✓ laporan.pdf generated successfully
          </span>
        </code>
      </pre>
    </div>
  );
};

export default CodePreview;
