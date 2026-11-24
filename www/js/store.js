// Progress, settings, XP, streaks. Saved in localStorage; backup/restore as a JSON file.
const KEY = 'afrikaans.v1';

export const dayKey = (t = Date.now()) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);

const fresh = () => ({
  v: 1, created: Date.now(), onboarded: false, lastBackup: 0,
  settings: { goal: 30, newPerDay: 12, retention: 0.9, slow: false, autoplay: true, speak: true, listen: true, english: false, sfx: true, track: 'HT' },
  cards: {}, done: {}, days: {}, badges: {}, journal: [],
  streak: { count: 0, best: 0, last: '', freezes: 0 },
  stats: { listen: 0, read: 0, write: 0, speak: 0, correct: 0, total: 0, stories: 0, sounds: 0 },
});

export let S = load();
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw?.v === 1) {
      const f = fresh();
      return { ...f, ...raw, settings: { ...f.settings, ...raw.settings }, stats: { ...f.stats, ...raw.stats }, streak: { ...f.streak, ...raw.streak } };
    }
  } catch { /* corrupt or missing: start fresh */ }
  return fresh();
}
export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage full */ }
}
export function reset() { S = fresh(); save(); }

export const today = () => (S.days[dayKey()] ||= { xp: 0, new: 0, rev: 0 });

// Streak: a day counts when the daily goal is met. Freezes (earned every 7 days, max 2)
// cover missed days automatically, so one bad day does not wipe out weeks of work.
export function streakNow() {
  const st = S.streak, t = dayKey();
  if (!st.last) return 0;
  const gap = daysBetween(st.last, t);
  return gap <= 1 + st.freezes ? st.count : 0;
}

export function addXp(n) {
  const d = today();
  const before = d.xp;
  d.xp += n;
  let event = null;
  if (before < S.settings.goal && d.xp >= S.settings.goal) {
    const st = S.streak, t = dayKey();
    if (st.last !== t) {
      const gap = st.last ? daysBetween(st.last, t) : 1;
      if (gap === 1) st.count++;
      else if (gap - 1 <= st.freezes) { st.freezes -= gap - 1; st.count++; event = 'freeze'; }
      else st.count = 1;
      st.last = t;
      st.best = Math.max(st.best, st.count);
      if (st.count % 7 === 0 && st.freezes < 2) { st.freezes++; event = 'earnFreeze'; }
      event = event || 'goal';
    }
  }
  save();
  return event;
}

export function backupJson() {
  S.lastBackup = Date.now(); save();
  return JSON.stringify(S);
}
export async function importBackup(file) {
  const data = JSON.parse(await file.text());
  if (data?.v !== 1 || !data.cards) throw new Error('bad file');
  localStorage.setItem(KEY, JSON.stringify(data));
  S = load();
}
