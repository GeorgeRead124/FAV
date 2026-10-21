import { useSyncExternalStore } from 'react';
import { config } from './data/config';

const base = import.meta.env.BASE_URL;
export const url = (p: string) => base + p;

/** One audio element for the whole site: it never restarts when sections open or close. */
export const audio = new Audio();
audio.loop = true;
audio.preload = 'auto';
audio.src = url(config.song.file);

export interface AudioState { playing: boolean; missing: boolean; blocked: boolean; time: number; duration: number; volume: number; muted: boolean }
let state: AudioState = { playing: false, missing: false, blocked: false, time: 0, duration: 0, volume: 0.8, muted: false };
const subs = new Set<() => void>();
const emit = () => {
  state = { ...state, playing: !audio.paused, time: audio.currentTime || 0, duration: Number.isFinite(audio.duration) ? audio.duration : 0, muted: audio.muted };
  subs.forEach((f) => f());
};
let fell = false;
let want = false;
audio.addEventListener('error', () => {
  if (fell) return;
  fell = true; // real song missing: switch to the silent fallback and say so in the UI
  state = { ...state, missing: true };
  audio.src = url(config.song.fallback);
  audio.load();
  if (want) audio.play().catch(() => undefined);
  emit();
});
['play', 'pause', 'timeupdate', 'loadedmetadata', 'durationchange', 'volumechange'].forEach((ev) => audio.addEventListener(ev, emit));

let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
function ensureGraph() {
  try {
    if (!ctx) {
      ctx = new AudioContext();
      const src = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      analyser.connect(ctx.destination);
    }
    void ctx.resume();
  } catch { /* analyser is optional; audio still plays */ }
}
export const getAnalyser = () => analyser;

let fade: number | undefined;
function fadeTo(v: number, ms = 2500) {
  window.clearInterval(fade);
  const from = audio.volume, t0 = performance.now();
  fade = window.setInterval(() => {
    const k = Math.min(1, (performance.now() - t0) / ms);
    audio.volume = from + (v - from) * k;
    if (k === 1) window.clearInterval(fade);
  }, 50);
}
const onDenied = (e: unknown) => {
  if ((e as Error)?.name === 'NotAllowedError') { want = false; state = { ...state, blocked: true }; }
  emit();
  return false;
};
const tryPlay = () => {
  want = true;
  ensureGraph();
  audio.volume = 0;
  return audio.play().then(() => { state = { ...state, blocked: false }; fadeTo(state.volume); emit(); return true; }).catch(onDenied);
};
/** Call synchronously from a click handler so browser autoplay rules are satisfied. */
export const startMusic = tryPlay;
export const togglePlay = () => { if (audio.paused) return tryPlay(); want = false; audio.pause(); return Promise.resolve(false); };
export const setVolume = (v: number) => { window.clearInterval(fade); state = { ...state, volume: v }; audio.volume = v; audio.muted = false; emit(); };
export const toggleMute = () => { audio.muted = !audio.muted; emit(); };
export const seek = (t: number) => { audio.currentTime = t; };
export const useAudio = () => useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f); }; }, () => state);
