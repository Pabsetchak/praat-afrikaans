// Audio: pre-recorded neural voices (offline), speech-synthesis fallback,
// recording for speaking practice, optional speech recognition, and sound effects.
import { strip } from './course.js';

// FNV-1a 32-bit over UTF-8 bytes. tools/build.mjs uses the same function to name files.
export function hash(str) {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(str)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}
export const audioKey = (text, voice = 'f') => hash(voice + '|' + strip(text).trim());

// One shared element: iOS only lets audio play without a tap once an element has been
// "unlocked" by a tap, so every clip reuses it.
const el = new Audio();
el.preload = 'auto';
const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
let unlocked = false;
export function unlock() {
  if (unlocked) return;
  unlocked = true;
  el.src = SILENT;
  el.play().catch(() => { unlocked = false; });
}
['touchend', 'click', 'keydown'].forEach(e => addEventListener(e, unlock, { capture: true }));

let rate = 1, sfxOn = true, token = 0;
export const setRate = r => { rate = r; };
export const setSfx = on => { sfxOn = on; };

export function stop() {
  token++;
  el.onended = el.onerror = null;
  el.pause();
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

function tts(text, slow) {
  return new Promise(res => {
    if (!('speechSynthesis' in window)) return res(false);
    const v = speechSynthesis.getVoices().find(v => /^af/i.test(v.lang));
    if (!v) return res(false);
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v; u.lang = v.lang; u.rate = slow ? 0.7 : 0.95;
    u.onend = () => res(true); u.onerror = () => res(false);
    speechSynthesis.speak(u);
  });
}

function playSrc(src, speed, my) {
  return new Promise(res => {
    if (my !== token) return res(false);
    el.onended = () => res(true);
    el.onerror = () => res(false);
    el.src = src;
    el.preservesPitch = true;
    el.playbackRate = speed;
    el.play().catch(() => res(false));
  });
}

// voice: 'f' | 'm' | 'any' (random voice: hearing two speakers helps the ear generalise)
export async function play(text, voice = 'any', slow = false) {
  stop();
  const my = token;
  const plain = strip(text).trim();
  const v = voice === 'any' ? (Math.random() < 0.5 ? 'f' : 'm') : voice;
  const speed = slow ? 0.7 : rate;
  const order = voice === 'any' ? [v, v === 'f' ? 'm' : 'f'] : [v];
  for (const x of order) {
    if (await playSrc(`audio/${audioKey(plain, x)}.mp3`, speed, my)) return true;
    if (my !== token) return false;
  }
  return my === token ? tts(plain, slow) : false;
}

// ---------- recording (speaking practice) ----------
let rec = null, chunks = [];
export const canRecord = () => !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  chunks = [];
  rec = new MediaRecorder(stream);
  rec.ondataavailable = e => chunks.push(e.data);
  rec.start();
}
export function stopRecording() {
  return new Promise(res => {
    if (!rec) return res(null);
    rec.onstop = () => {
      rec.stream.getTracks().forEach(t => t.stop());
      res(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' })));
      rec = null;
    };
    rec.stop();
  });
}
export function playUrl(url) { stop(); return playSrc(url, 1, token); }

// ---------- speech recognition (only where the browser offers Afrikaans) ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canRecognise = () => !!SR && navigator.onLine;
export function recognise() {
  return new Promise((res, rej) => {
    const r = new SR();
    r.lang = 'af-ZA'; r.maxAlternatives = 5; r.interimResults = false;
    let got = false;
    r.onresult = e => { got = true; res([...e.results[0]].map(a => a.transcript)); };
    r.onerror = e => rej(e.error);
    r.onend = () => { if (!got) res([]); };
    r.start();
  });
}

// ---------- sound effects (synthesised, no files needed) ----------
let ctx;
function tone(freqs, dur = 0.12, type = 'sine', gap = 0.09) {
  if (!sfxOn) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + i * gap;
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.15, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur + 0.02);
    });
  } catch { /* audio not available */ }
}
export const sfx = {
  good: () => tone([660, 880]),
  bad: () => tone([220, 180], 0.18, 'triangle', 0.12),
  done: () => tone([523, 659, 784, 1047], 0.18, 'sine', 0.11),
};
