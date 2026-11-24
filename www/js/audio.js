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
export const canRecord = () => !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let stopFlag = false;
export const stopUtterance = () => { stopFlag = true; };

// Records one spoken answer and stops by itself ~1.2 s after you stop talking.
// Bluetooth headsets (AirPods) need up to ~1.5 s to switch to their microphone, so we wait
// for real signal before saying "Praat nou", and release the mic afterwards so the headset
// returns to high-quality playback before the recording is played back.
export async function recordUtterance({ onReady, onLevel, maxMs = 9000 } = {}) {
  stop();
  stopFlag = false;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  const ac = audioCtx();
  await ac.resume().catch(() => {});
  const src = ac.createMediaStreamSource(stream), an = ac.createAnalyser();
  an.fftSize = 1024; src.connect(an);
  const buf = new Float32Array(an.fftSize);
  const level = () => { an.getFloatTimeDomainData(buf); let s = 0; for (const v of buf) s += v * v; return Math.sqrt(s / buf.length); };
  try {
    for (const t0 = Date.now(); Date.now() - t0 < 1500 && level() === 0;) await sleep(50); // headset warm-up
    let floor = 0;
    for (let i = 0; i < 6; i++) { floor = Math.max(floor, level()); await sleep(30); }
    const thr = Math.min(0.04, Math.max(0.01, floor * 2.5)); // capped: the "noise" sample may already be speech
    const rec = new MediaRecorder(stream), chunks = [];
    rec.ondataavailable = e => e.data.size && chunks.push(e.data);
    const stopped = new Promise(r => { rec.onstop = r; });
    rec.start(250);
    onReady?.();
    let heard = false, last = Date.now();
    for (const t0 = Date.now(); !stopFlag && Date.now() - t0 < maxMs;) {
      const l = level(), t = Date.now();
      onLevel?.(Math.min(1, l / (thr * 4)));
      if (l > thr) { heard = true; last = t; }
      if (heard && t - last > 1200) break;
      await sleep(50);
    }
    rec.stop();
    await stopped;
    return { url: chunks.length ? URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' })) : null, heard };
  } finally {
    src.disconnect();
    stream.getTracks().forEach(t => t.stop());
  }
}
// Short pause first: the headset switches back from microphone mode to playback mode.
export async function playUrl(url) { stop(); const my = token; await sleep(400); return playSrc(url, 1, my); }

// ---------- speech recognition (only where the browser offers Afrikaans) ----------
// Safari and iOS app web views expose the API but have no Afrikaans model, so they record instead.
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const appleWebKit = /iP(hone|ad|od)/.test(navigator.userAgent) || (/Safari/.test(navigator.userAgent) && !/Chrome|Chromium|Edg/.test(navigator.userAgent)) || !!window.Capacitor;
export const canRecognise = () => !!SR && !appleWebKit && navigator.onLine;
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
const audioCtx = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
function tone(freqs, dur = 0.12, type = 'sine', gap = 0.09) {
  if (!sfxOn) return;
  try {
    audioCtx();
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
