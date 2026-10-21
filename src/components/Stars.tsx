import { useEffect, useRef } from 'react';

interface Star { x: number; y: number; r: number; a: number; p: number; d: number }
interface Shoot { x: number; y: number; vx: number; vy: number; l: number }

export function Stars({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, g = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, mx = 0, my = 0, tx = 0, ty = 0;
    let stars: Star[] = [];
    const shoots: Shoot[] = [];
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(420, (w * h) / 3600));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.25, a: Math.random() * 0.6 + 0.3, p: Math.random() * 6.28, d: Math.random() }));
      if (reduced) draw(0);
    };
    const draw = (t: number) => {
      g.clearRect(0, 0, w, h);
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      g.fillStyle = '#DDE8FF';
      for (const s of stars) {
        g.globalAlpha = s.a * (reduced ? 1 : 0.65 + 0.35 * Math.sin(t / 900 + s.p));
        g.beginPath();
        g.arc((s.x + mx * s.d * 24 + w) % w, (s.y + my * s.d * 24 + h) % h, s.r, 0, 6.283);
        g.fill();
      }
      if (!reduced) {
        if (Math.random() < 0.004 && shoots.length < 2) shoots.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: 6 + Math.random() * 4, vy: 2.5 + Math.random() * 2, l: 1 });
        g.strokeStyle = '#FFF3E8'; g.lineWidth = 1.5;
        for (let i = shoots.length - 1; i >= 0; i--) {
          const s = shoots[i];
          s.x += s.vx; s.y += s.vy; s.l -= 0.014;
          g.globalAlpha = Math.max(s.l, 0);
          g.beginPath(); g.moveTo(s.x, s.y); g.lineTo(s.x - s.vx * 9, s.y - s.vy * 9); g.stroke();
          if (s.l <= 0) shoots.splice(i, 1);
        }
        raf = requestAnimationFrame(draw);
      }
      g.globalAlpha = 1;
    };
    const move = (e: PointerEvent) => { tx = e.clientX / w - 0.5; ty = e.clientY / h - 0.5; };
    resize();
    if (!reduced) { raf = requestAnimationFrame(draw); window.addEventListener('pointermove', move); }
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); };
  }, [reduced]);
  return (
    <div className="sky" aria-hidden="true">
      <div className="nebula" />
      <canvas ref={ref} />
      <div className="halo" />
      <svg className="moon" viewBox="0 0 200 200">
        <defs>
          <radialGradient id="mg" cx=".3" cy=".3"><stop offset="0" stopColor="#FFF3E8" /><stop offset="1" stopColor="#BDA7FF" /></radialGradient>
          <mask id="mm"><rect width="200" height="200" fill="#fff" /><circle cx="128" cy="86" r="76" fill="#000" /></mask>
        </defs>
        <circle cx="88" cy="102" r="78" fill="url(#mg)" mask="url(#mm)" />
      </svg>
    </div>
  );
}
