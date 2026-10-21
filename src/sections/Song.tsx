import { useEffect, useRef } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { config } from '../data/config';
import { Photo, } from '../components/ui';
import { getAnalyser, seek, setVolume, toggleMute, togglePlay, useAudio } from '../audio';

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function Song() {
  const a = useAudio();
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!, g = c.getContext('2d')!;
    let raf = 0;
    const data = new Uint8Array(32);
    const loop = () => {
      const an = getAnalyser();
      if (an && !a.missing) an.getByteFrequencyData(data); else data.fill(0);
      g.clearRect(0, 0, c.width, c.height);
      g.fillStyle = '#F1B9DA';
      const bw = c.width / data.length;
      data.forEach((v, i) => { const h = 3 + (v / 255) * (c.height - 6); g.fillRect(i * bw + 2, c.height - h, bw - 4, h); });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [a.missing]);
  return (
    <div className="song">
      <Photo src={config.song.art} alt={`Album artwork for ${config.song.title}`} />
      <h3>{config.song.title}</h3>
      <p className="artist">{config.song.artist}</p>
      <canvas ref={cv} width={320} height={64} role="img" aria-label="Audio spectrum of the song that is playing" />
      {a.missing && <p className="note">The song file was not found at <code>{config.song.file}</code>, so the sound is silent. See the README.</p>}
      <div className="seek">
        <span>{fmt(a.time)}</span>
        <input type="range" min={0} max={a.duration || 1} step={0.1} value={a.time} aria-label="Seek" disabled={!a.duration || a.missing} onChange={(e) => seek(+e.target.value)} />
        <span>{fmt(a.duration)}</span>
      </div>
      <div className="row">
        <button className="icon big" aria-label={a.playing ? 'Pause' : 'Play'} onClick={() => void togglePlay()}>{a.playing ? <Pause /> : <Play />}</button>
        <button className="icon" aria-label={a.muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>{a.muted ? <VolumeX /> : <Volume2 />}</button>
        <input type="range" min={0} max={1} step={0.01} value={a.muted ? 0 : a.volume} aria-label="Volume" onChange={(e) => setVolume(+e.target.value)} />
      </div>
      <p className="msg">{config.song.message}</p>
    </div>
  );
}
