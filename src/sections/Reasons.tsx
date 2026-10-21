import { useState } from 'react';
import { config } from '../data/config';

const N = config.reasons.length;
const pts = config.reasons.map((_, i) => {
  const t = (2 * Math.PI * i) / N;
  const x = 16 * Math.sin(t) ** 3;
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: 50 + x * 2.7, y: 46 - y * 2.7 };
});

export function Reasons() {
  const [found, setFound] = useState<number[]>([]);
  const [cur, setCur] = useState<number | null>(null);
  const open = (i: number) => { setCur(i); setFound((f) => (f.includes(i) ? f : [...f, i])); };
  const done = found.length === N;
  return (
    <>
      <p className="lead">{found.length} of {N} stars discovered. Tap a star to read why.</p>
      <div className={`heart ${done ? 'complete' : ''}`}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {pts.map((p, i) => { const q = pts[(i + 1) % N]; return found.includes(i) && found.includes((i + 1) % N) ? <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} /> : null; })}
        </svg>
        {pts.map((p, i) => (
          <button key={i} className={`rstar ${found.includes(i) ? 'on' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => open(i)}
            aria-label={found.includes(i) ? `Reason ${i + 1}, discovered` : `Undiscovered star ${i + 1}`} />
        ))}
      </div>
      <p className="reason" aria-live="polite">{cur === null ? 'Choose a star.' : config.reasons[cur]}</p>
      {done && <p className="lead">Every star is lit. That is the whole sky of reasons.</p>}
      {found.length > 0 && (
        <details><summary>Revisit what you have found ({found.length})</summary>
          <ol>{[...found].sort((a, b) => a - b).map((i) => <li key={i}>{config.reasons[i]}</li>)}</ol>
        </details>
      )}
    </>
  );
}
