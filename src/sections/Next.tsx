import { useState } from 'react';
import { config } from '../data/config';

export function Next() {
  const [liked, setLiked] = useState<string[]>([]);
  const toggle = (id: string) => setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  return (
    <>
      <p className="lead">Tap the ones that sound good to you. {liked.length ? `${liked.length} chosen.` : 'Nothing is chosen yet.'}</p>
      <div className="worlds">
        {config.future.map((f, i) => (
          <button key={f.id} className={`world w${i % 5} ${liked.includes(f.id) ? 'on' : ''}`} aria-pressed={liked.includes(f.id)} onClick={() => toggle(f.id)}>
            <span className="orb" aria-hidden="true" />
            <strong>{f.title}</strong><span>{f.text}</span>
            <em>{liked.includes(f.id) ? 'I would love this' : 'Tap if you would like this'}</em>
          </button>
        ))}
      </div>
    </>
  );
}
