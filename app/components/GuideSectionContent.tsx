const GuideSectionContent = ({ ref, steps, inView }: { ref: React.RefObject<HTMLDivElement>, steps: any[], inView: boolean }) => {
    return (
        <div ref={ref} className="relative space-y-6 sm:space-y-8">
            {/* Vertical connector line */}
            <div
                className="absolute left-5 sm:left-6 top-10 bottom-10 w-px bg-linear-to-b from-primary/40 via-primary/20 to-transparent"
                aria-hidden="true"
            />

            {steps.map((step, i) => (
                <div
                    key={step.num}
                    className="flex gap-4 sm:gap-6"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(20px)",
                        transition: `opacity 0.7s var(--ease-out-quart) ${i * 100}ms, transform 0.7s var(--ease-out-quart) ${i * 100}ms`,
                    }}
                >
                    <div className="relative z-10 shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base sm:text-lg font-mono ring-4 ring-background">
                        {step.num}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-3 pt-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">
                            {step.title}
                        </h3>
                        <div className="code-block p-3 sm:p-4 hover:border-primary/30 transition-colors">
                            <pre className="text-xs sm:text-sm leading-relaxed overflow-x-auto">
                                <code className="text-muted-foreground">{step.code}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GuideSectionContent;