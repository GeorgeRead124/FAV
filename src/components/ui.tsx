import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { setVolume, toggleMute, togglePlay, url, useAudio } from '../audio';
import { config } from '../data/config';

/** Image with a real-file-first, placeholder-second strategy. Placeholders are always labelled. */
export function Photo({ src, alt, imgStyle }: { src: string; alt: string; imgStyle?: CSSProperties }) {
  const [bad, setBad] = useState(false);
  return (
    <span className="photo">
      <img src={url(bad ? src.replace(/\.\w+$/, '.svg') : src)} alt={alt} style={imgStyle} loading="lazy" onError={() => setBad(true)} />
      {bad && <span className="ph">Placeholder</span>}
    </span>
  );
}

const nested = () => !!document.querySelector('.lightbox');

export function Panel({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape' && !nested()) onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="panel">
        <header><h2>{title}</h2><button ref={btn} className="icon" aria-label="Close" onClick={onClose}><X /></button></header>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export interface Item { src: string; caption: string; date: string; story: string }
export function Lightbox({ items, index, onIndex, onClose }: { items: Item[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const it = items[index];
  const n = items.length;
  const go = (d: number) => onIndex((index + d + n) % n);
  const x0 = useRef(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (n > 1 && e.key === 'ArrowRight') go(1);
      if (n > 1 && e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
  return (
    <div className="overlay lightbox" role="dialog" aria-modal="true" aria-label={it.caption}
      onPointerDown={(e) => { x0.current = e.clientX; }}
      onPointerUp={(e) => { const d = e.clientX - x0.current; if (n > 1 && Math.abs(d) > 60) go(d < 0 ? 1 : -1); }}>
      <button className="icon close" aria-label="Close photo" onClick={onClose} autoFocus><X /></button>
      {n > 1 && <button className="icon nav prev" aria-label="Previous photo" onClick={() => go(-1)}><ChevronLeft /></button>}
      <figure key={index} className="lb-fig">
        <Photo src={it.src} alt={it.caption} />
        <figcaption><strong>{it.caption}</strong><small>{it.date}</small><p>{it.story}</p></figcaption>
      </figure>
      {n > 1 && <button className="icon nav next" aria-label="Next photo" onClick={() => go(1)}><ChevronRight /></button>}
    </div>
  );
}

export function MiniPlayer() {
  const a = useAudio();
  return (
    <div className="mini" role="region" aria-label="Music player">
      <button className="icon" aria-label={a.playing ? 'Pause song' : 'Play our song'} onClick={() => void togglePlay()}>{a.playing ? <Pause /> : <Play />}</button>
      <span className="state" aria-live="polite">
        {a.blocked && !a.playing ? 'Your browser blocked playback. Tap play.' : a.missing ? 'Song file not found yet' : a.playing ? `Playing: ${config.song.title}` : 'Paused'}
      </span>
      <button className="icon" aria-label={a.muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>{a.muted ? <VolumeX /> : <Volume2 />}</button>
      <input type="range" min={0} max={1} step={0.01} value={a.muted ? 0 : a.volume} aria-label="Volume" onChange={(e) => setVolume(+e.target.value)} />
    </div>
  );
}
