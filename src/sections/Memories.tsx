import { useState } from 'react';
import { Star } from 'lucide-react';
import { config } from '../data/config';
import { Lightbox, Photo } from '../components/ui';

export function Memories() {
  const [i, setI] = useState<number | null>(null);
  const [star, setStar] = useState(false);
  return (
    <>
      <p className="lead">Tap a memory to open it. Swipe or use the arrow keys to move between them.</p>
      <button className="starbtn" onClick={() => setStar(true)}><Star size={18} /> A memory behind the stars</button>
      <div className="polaroids">
        {config.photos.map((p, k) => (
          <button key={k} className="polaroid" style={{ transform: `rotate(${(k % 2 ? 1 : -1) * (1 + (k % 3))}deg)` }} onClick={() => setI(k)} aria-label={`Open memory: ${p.caption}`}>
            <Photo src={p.src} alt={p.caption} />
            <span className="cap">{p.caption}</span>
          </button>
        ))}
      </div>
      {i !== null && <Lightbox items={config.photos} index={i} onIndex={setI} onClose={() => setI(null)} />}
      {star && <Lightbox items={[config.photos[config.starMemory]]} index={0} onIndex={() => undefined} onClose={() => setStar(false)} />}
    </>
  );
}
