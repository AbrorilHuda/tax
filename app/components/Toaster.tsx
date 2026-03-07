import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

interface Toast {
    id: number;
    message: string;
}

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within <Toaster>");
    return ctx;
}

export function Toaster({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const idRef = useRef(0);

    const showToast = useCallback((message: string) => {
        const id = ++idRef.current;
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2200);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast container */}
            <div
                className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"
                aria-live="polite"
                aria-atomic="false"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="flex items-center gap-2 rounded-xl border border-border bg-card/95 backdrop-blur-sm px-4 py-2.5 text-sm text-foreground shadow-xl shadow-black/20"
                        style={{ animation: "toast-in 0.3s ease forwards" }}
                    >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                            <Check className="h-3 w-3 text-primary" />
                        </span>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
