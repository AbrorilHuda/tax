import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

const PARTICLE_COUNT = 55;
const CONNECTION_DISTANCE = 120;
const SPEED = 0.25;

function createParticle(w: number, h: number): Particle {
    const angle = Math.random() * Math.PI * 2;
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * SPEED * (0.5 + Math.random()),
        vy: Math.sin(angle) * SPEED * (0.5 + Math.random()),
        radius: 1 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.5,
    };
}

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let particles: Particle[] = [];
        let rafId: number;
        let paused = false;

        const init = () => {
            canvas.width = width;
            canvas.height = height;
            particles = Array.from({ length: PARTICLE_COUNT }, () =>
                createParticle(width, height)
            );
        };

        const draw = () => {
            if (paused) {
                rafId = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, width, height);

            // Update + draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(270 95% 75% / ${p.opacity})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `hsl(270 95% 70% / ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            rafId = requestAnimationFrame(draw);
        };

        const onResize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            init();
        };

        const onVisibility = () => {
            paused = document.hidden;
        };

        init();
        draw();
        window.addEventListener("resize", onResize);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}
