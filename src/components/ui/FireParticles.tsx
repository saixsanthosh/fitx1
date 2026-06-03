"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
}

export function FireParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animId = useRef<number>(0);

  const createParticle = useCallback((w: number, h: number): Particle => {
    return {
      x: Math.random() * w,
      y: h + 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 3 + 1.5),
      size: Math.random() * 3 + 1,
      life: 0,
      maxLife: Math.random() * 80 + 40,
      hue: Math.random() * 30,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      if (particles.current.length < 100 && Math.random() < 0.3) {
        particles.current.push(createParticle(w, h));
      }

      particles.current = particles.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.99;
        p.vx += (Math.random() - 0.5) * 0.1;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
        const currentSize = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${p.hue + 10}, 90%, 40%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue + 20}, 80%, 20%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fill();

        return p.life < p.maxLife;
      });

      animId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
