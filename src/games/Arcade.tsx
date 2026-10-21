import { useEffect, useRef, useState } from 'react';
import { config } from '../data/config';
import { Photo } from '../components/ui';

const W = 360, H = 480;
const cfg = config.games;

function heartPath(g: CanvasRenderingContext2D, x: number, y: number, s: number) {
  g.beginPath(); g.moveTo(x, y + s * 0.35);
  g.bezierCurveTo(x - s, y - s * 0.5, x - s * 0.2, y - s * 1.1, x, y - s * 0.4);
  g.bezierCurveTo(x + s * 0.2, y - s * 1.1, x + s, y - s * 0.5, x, y + s * 0.35); g.fill();
}

function Catch() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'idle' | 'play' | 'done'>('idle');
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(cfg.catch.seconds);
  useEffect(() => {
    if (phase !== 'play') return;
    const c = ref.current!, g = c.getContext('2d')!;
    const hearts: { x: number; y: number; v: number }[] = [];
    const keys = { l: false, r: false };
    let px = W / 2, pts = 0, el = 0, spawn = 0, last = performance.now(), raf = 0, shown = cfg.catch.seconds;
    const kd = (e: KeyboardEvent, d: boolean) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') { keys.l = d; e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') { keys.r = d; e.preventDefault(); }
    };
    const down = (e: KeyboardEvent) => kd(e, true), up = (e: KeyboardEvent) => kd(e, false);
    const pm = (e: PointerEvent) => { const r = c.getBoundingClientRect(); px = ((e.clientX - r.left) / r.width) * W; };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); c.addEventListener('pointermove', pm); c.addEventListener('pointerdown', pm);
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; el += dt; spawn -= dt;
      if (keys.l) px -= 380 * dt; if (keys.r) px += 380 * dt;
      px = Math.max(35, Math.min(W - 35, px));
      if (spawn <= 0) { hearts.push({ x: 20 + Math.random() * (W - 40), y: -10, v: 130 + el * 6 + Math.random() * 40 }); spawn = Math.max(0.3, 0.85 - el * 0.014); }
      g.clearRect(0, 0, W, H);
      g.fillStyle = '#F1B9DA';
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i]; h.y += h.v * dt;
        if (h.y > H - 40 && h.y < H - 12 && Math.abs(h.x - px) < 42) { hearts.splice(i, 1); pts++; setScore(pts); continue; }
        if (h.y > H + 20) { hearts.splice(i, 1); continue; }
        heartPath(g, h.x, h.y, 14);
      }
      g.fillStyle = '#BDA7FF'; g.beginPath(); g.roundRect(px - 38, H - 30, 76, 12, 6); g.fill();
      const rem = Math.max(0, Math.ceil(cfg.catch.seconds - el));
      if (rem !== shown) { shown = rem; setLeft(rem); }
      if (el >= cfg.catch.seconds) { setScore(pts); setPhase('done'); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); c.removeEventListener('pointermove', pm); c.removeEventListener('pointerdown', pm); };
  }, [phase]);
  const begin = () => { setScore(0); setLeft(cfg.catch.seconds); setPhase('play'); };
  return (
    <div className="game">
      <p className="lead">Move with the arrow keys (or A/D), or drag across the board. Catch as many hearts as you can in {cfg.catch.seconds} seconds.</p>
      {phase !== 'idle' && <p className="hud" aria-live="off">Score {score} · Time {left}s</p>}
      <div className="board">
        <canvas ref={ref} width={W} height={H} aria-label="Catch My Hearts game board" />
        {phase === 'idle' && <div className="cover"><button className="cta" onClick={begin}>Start</button></div>}
        {phase === 'done' && (
          <div className="cover" role="status">
            <h3>You caught {score}</h3>
            <p>{score >= cfg.catch.unlockScore ? cfg.catch.message : `Catch ${cfg.catch.unlockScore} to unlock a message from me.`}</p>
            <button className="cta" onClick={begin}>Play again</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Guess() {
  const [q, setQ] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const items = cfg.guess;
  if (q >= items.length) return (
    <div className="game"><h3>You got {score} of {items.length}</h3>
      <button className="cta" onClick={() => { setQ(0); setPick(null); setScore(0); }}>Play again</button></div>
  );
  const it = items[q], ph = config.photos[it.photo];
  const answer = (i: number) => { if (pick !== null) return; setPick(i); if (i === it.answer) setScore((s) => s + 1); };
  return (
    <div className="game">
      <p className="lead">Question {q + 1} of {items.length}. Score {score}.</p>
      <div className="crop">
        <Photo src={ph.src} alt={pick === null ? 'A zoomed-in part of one of our photos' : ph.caption} imgStyle={pick === null ? { transform: 'scale(3)', transformOrigin: '30% 35%' } : undefined} />
      </div>
      <h3>{it.question}</h3>
      <div className="opts">
        {it.options.map((o, i) => (
          <button key={i} disabled={pick !== null} className={pick === null ? '' : i === it.answer ? 'right' : i === pick ? 'wrong' : ''} onClick={() => answer(i)}>{o}</button>
        ))}
      </div>
      {pick !== null && (
        <div role="status"><p><strong>{pick === it.answer ? 'Yes, that is it!' : 'Not quite.'}</strong> {ph.story}</p>
          <button className="cta" onClick={() => { setQ(q + 1); setPick(null); }}>{q + 1 < items.length ? 'Next' : 'See score'}</button></div>
      )}
    </div>
  );
}

function Hidden() {
  const [found, setFound] = useState<number[]>([]);
  const [cur, setCur] = useState<number | null>(null);
  const list = cfg.hidden;
  const all = found.length === list.length;
  return (
    <div className="game">
      <p className="lead">Explore the sky by scrolling or dragging sideways. {list.length} hearts are hidden. Found {found.length} of {list.length}.</p>
      <div className="scene" tabIndex={0} aria-label="Scrollable night sky">
        <div className="scene-in">
          <i className="p p1" /><i className="p p2" /><i className="p p3" />
          {list.map((h, i) => (
            <button key={i} className={`hid ${found.includes(i) ? 'on' : ''}`} style={{ left: `${h.x}%`, top: `${h.y}%` }} aria-label={found.includes(i) ? `Found: ${h.label}` : h.label}
              onClick={() => { setCur(i); setFound((f) => (f.includes(i) ? f : [...f, i])); }} />
          ))}
        </div>
      </div>
      <p className="reason" aria-live="polite">{cur === null ? 'Nothing found yet.' : list[cur].message}</p>
      {all && <div className="finale" role="status"><p>{cfg.hiddenFinal}</p></div>}
      {found.length > 0 && <button className="ghost" onClick={() => { setFound([]); setCur(null); }}>Reset the hunt</button>}
    </div>
  );
}

export function Arcade() {
  const [tab, setTab] = useState<'catch' | 'guess' | 'hidden'>('catch');
  const tabs = [['catch', 'Catch My Hearts'], ['guess', 'Guess Our Memory'], ['hidden', 'Find the Hidden Heart']] as const;
  return (
    <>
      <div className="tabs" role="tablist">
        {tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'sel' : ''} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === 'catch' ? <Catch /> : tab === 'guess' ? <Guess /> : <Hidden />}
    </>
  );
}
