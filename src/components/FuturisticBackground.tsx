import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  pulse: number; pulseSpeed: number;
}

export const FuturisticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const CONNECT_DIST = 140;
    const MOUSE_DIST = 110;
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = isMobile ? 40 : 70;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.5 + 0.25,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        // Mouse repulsion
        const dxm = p.x - mx;
        const dym = p.y - my;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < MOUSE_DIST && dm > 0) {
          const force = ((MOUSE_DIST - dm) / MOUSE_DIST) * 0.25;
          p.vx += (dxm / dm) * force;
          p.vy += (dym / dm) * force;
        }

        // Dampen & clamp velocity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx = Math.max(-2, Math.min(2, p.vx));
        p.vy = Math.max(-2, Math.min(2, p.vy));

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Soft wrap edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Pulsing opacity
        const op = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        // Glow dot
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(0,255,255,${op})`);
        grad.addColorStop(0.4, `rgba(0,220,255,${op * 0.5})`);
        grad.addColorStop(1, "rgba(0,255,255,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,255,255,${op})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.18;
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, `rgba(0,255,255,${alpha})`);
            grad.addColorStop(0.5, `rgba(0,200,255,${alpha * 1.3})`);
            grad.addColorStop(1, `rgba(0,255,255,${alpha})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.45,
      }}
    />
  );
};
