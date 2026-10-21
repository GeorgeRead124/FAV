import { useCallback, useState, type ReactNode } from 'react';
import { Compass, Gamepad2, Image, Mail, Music, Sparkles, Star } from 'lucide-react';
import { config } from './data/config';
import { startMusic, useAudio } from './audio';
import { Stars } from './components/Stars';
import { MiniPlayer, Panel } from './components/ui';
import { Memories } from './sections/Memories';
import { Reasons } from './sections/Reasons';
import { Song } from './sections/Song';
import { Arcade } from './games/Arcade';
import { Letters } from './sections/Letters';
import { Next } from './sections/Next';
import { Secret } from './sections/Secret';

type View = 'memories' | 'reasons' | 'song' | 'arcade' | 'letters' | 'next' | 'secret';
const NAV: { id: View; label: string; title: string; icon: ReactNode; el: ReactNode }[] = [
  { id: 'memories', label: 'Memories', title: 'Our Galaxy of Memories', icon: <Image />, el: <Memories /> },
  { id: 'reasons', label: 'Reasons', title: 'A Sky Full of Reasons', icon: <Sparkles />, el: <Reasons /> },
  { id: 'song', label: 'Our song', title: 'Our Song', icon: <Music />, el: <Song /> },
  { id: 'arcade', label: 'Arcade', title: 'Love Arcade', icon: <Gamepad2 />, el: <Arcade /> },
  { id: 'letters', label: 'Letters', title: 'Letters From My Heart', icon: <Mail />, el: <Letters /> },
  { id: 'next', label: 'Next chapter', title: 'Our Next Chapter', icon: <Compass />, el: <Next /> },
];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function App() {
  const [started, setStarted] = useState(false);
  const [view, setView] = useState<View | null>(null);
  const [visited, setVisited] = useState<View[]>([]);
  const a = useAudio();
  const close = useCallback(() => setView(null), []);
  const start = () => { void startMusic(); setStarted(true); }; // play() runs inside the click
  const go = (v: View) => { setView(v); setVisited((x) => (x.includes(v) ? x : [...x, v])); };
  const unlocked = visited.length >= 3;
  const cur = NAV.find((n) => n.id === view);
  return (
    <>
      <Stars reduced={reduced} />
      {!started ? (
        <main className="intro">
          <h1>{config.heading}</h1>
          <p>{config.subtitle}</p>
          <button className="cta" onClick={start}>{config.startLabel}</button>
        </main>
      ) : (
        <main className="home">
          <h1 className="small">{config.title}</h1>
          <p className="welcome">{config.welcome}</p>
          {a.blocked && !a.playing && <p className="note">Your browser blocked the music. Use the play button below.</p>}
          <nav aria-label="Sections">
            {NAV.map((n) => <button key={n.id} onClick={() => go(n.id)}>{n.icon}<span>{n.label}</span></button>)}
            {unlocked && <button className="finalstar" onClick={() => go('secret')}><Star /><span>The final star</span></button>}
          </nav>
          {!unlocked && <p className="hint">Keep exploring. A final star appears once you have opened {3 - visited.length} more {3 - visited.length === 1 ? 'section' : 'sections'}.</p>}
          <MiniPlayer />
        </main>
      )}
      {cur && <Panel title={cur.title} onClose={close}>{cur.el}</Panel>}
      {view === 'secret' && <Panel title="The Final Star" onClose={close}><Secret /></Panel>}
    </>
  );
}
