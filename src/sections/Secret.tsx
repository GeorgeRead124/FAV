import { useState } from 'react';
import { config } from '../data/config';
import { Photo } from '../components/ui';
import { LetterReader } from './Letters';

export function Secret() {
  const [letter, setLetter] = useState(false);
  return (
    <div className="secret">
      <div className="burst" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ ['--a' as string]: `${i * 25.7}deg`, animationDelay: `${i * 0.12}s` }} />)}</div>
      <div className="polaroid fav"><Photo src={config.photos[config.secret.photo].src} alt="Our favorite photograph" /><span className="cap">Our favorite photograph</span></div>
      <p className="msg">{config.secret.message}</p>
      <p className="closing">{config.secret.closing}</p>
      <button className="cta" onClick={() => setLetter(true)}>Read my letter</button>
      {letter && <LetterReader letter={config.finalLetter} onClose={() => setLetter(false)} />}
    </div>
  );
}
