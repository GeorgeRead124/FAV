import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { config } from '../data/config';

interface Letter { title: string; body: string[] }
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function LetterReader({ letter, onClose }: { letter: Letter; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="overlay lightbox" role="dialog" aria-modal="true" aria-label={letter.title}>
      <article className="paper">
        <button className="icon close" aria-label="Close letter" onClick={onClose} autoFocus><X /></button>
        <h3>{letter.title}</h3>
        {letter.body.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </div>
  );
}

export function Letters() {
  const all = [...config.letters, { id: 'final', ...config.finalLetter }];
  const [anim, setAnim] = useState<string | null>(null);
  const [read, setRead] = useState<string | null>(null);
  const [opened, setOpened] = useState<string[]>([]);
  const open = (id: string) => {
    setAnim(id);
    setOpened((o) => (o.includes(id) ? o : [...o, id]));
    window.setTimeout(() => { setRead(id); setAnim(null); }, reduced() ? 0 : 750);
  };
  const letter = all.find((l) => l.id === read);
  return (
    <>
      <p className="lead">Six envelopes. Open whichever one you need, whenever you need it.</p>
      <div className="envelopes">
        {all.map((l) => (
          <button key={l.id} className={`env ${anim === l.id || opened.includes(l.id) ? 'open' : ''} ${l.id === 'final' ? 'final' : ''}`} onClick={() => open(l.id)} aria-label={`Open letter: ${l.title}`}>
            <span className="flap" /><span className="front" /><span className="label">{l.title}</span>
          </button>
        ))}
      </div>
      {letter && <LetterReader letter={letter} onClose={() => setRead(null)} />}
    </>
  );
}
