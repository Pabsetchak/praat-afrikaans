import { UNITS, SOUNDS, WORDS, SENTENCES, BY_ID, strip } from './course.js';
import { review, retrievability } from './fsrs.js';
import * as A from './audio.js';
import * as St from './store.js';
import { RESOURCES, TIPS } from './resources.js';
import { GROUPS, MODULES, DRILLS } from './curriculum.js';

for (const d of DRILLS) BY_ID[d.id] = d; // curriculum drills are reviewed like words
const MOD = Object.fromEntries(MODULES.map(m => [m.id, m]));

const S = () => St.S; // live progress object (replaced on restore)
const set = () => S().settings;

// ---------------- helpers ----------------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rnd = a => a[Math.random() * a.length | 0];
const chunk = (a, n) => a.reduce((o, x, i) => (i % n ? o[o.length - 1].push(x) : o.push([x]), o), []);
const graphemes = s => (window.Intl?.Segmenter ? [...new Intl.Segmenter().segment(s)].map(x => x.segment) : Array.from(s)).filter(g => g.trim());
const norm = s => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:"“”…()¿¡]/g, ' ').replace(/\s+/g, ' ').trim();
const deaccent = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const hi = mk => esc(mk).replace(/\*([^*]+)\*/g, '<mark>$1</mark>');
const en = txt => set().english && txt ? `<div class="en">EN: ${esc(txt)}</div>` : '';
const now = () => Date.now();

function lev(a, b) {
  const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
// Grade a typed answer: 3 = right, 2 = almost (accent or one slip), 1 = wrong.
function gradeText(input, target) {
  const a = norm(input), b = norm(target);
  if (!a) return { g: 1 };
  if (a === b) return { g: 3 };
  if (deaccent(a) === deaccent(b)) return { g: 2, note: 'Let op die kappie of deelteken: ê ë ô ï' };
  const wa = a.split(' '), wb = b.split(' ');
  if (wb.length > 2 && lev(wa, wb) <= 1) return { g: 2, note: 'Amper! Een woord is anders.' };
  if (b.length >= 4 && lev(a, b) <= Math.max(1, Math.floor(b.length / 12))) return { g: 2, note: 'Amper! Kyk na die spelling.' };
  return { g: 1 };
}

function toast(msg, ms = 2600) {
  const t = document.createElement('div');
  t.className = 'toast'; t.innerHTML = msg;
  document.body.append(t);
  setTimeout(() => t.classList.add('out'), ms);
  setTimeout(() => t.remove(), ms + 500);
}

// ---------------- the learning path ----------------
const KLANKE = { id: 'klanke', t: 'Klanke', i: '🔤' };
const ALL_UNITS = [KLANKE, ...UNITS];
const PATH = [];
chunk(SOUNDS, 4).forEach((g, i) => PATH.push({ key: 'klanke.' + i, unit: 'klanke', type: 'sounds', sounds: g, label: `Klanke ${i + 1}`, icon: '🔤' }));
for (const u of UNITS) {
  const ch = chunk(u.words, 5);
  ch.forEach((c, ci) => {
    PATH.push({ key: `${u.id}.w${ci}`, unit: u.id, type: 'words', ids: c.map(w => w.id), label: `Woorde ${ci + 1}`, icon: '🆕' });
    u.pats.forEach((p, pi) => {
      if (Math.min(pi + 1, ch.length - 1) === ci) PATH.push({ key: `${u.id}.p${pi}`, unit: u.id, type: 'pattern', pat: p, label: p.t, icon: p.i });
    });
  });
  PATH.push({ key: `${u.id}.st`, unit: u.id, type: 'story', story: u.story, label: u.story.t, icon: '📖' });
}
const nextLesson = () => PATH.find(l => !S().done[l.key]);
const unitLessons = id => PATH.filter(l => l.unit === id);

// Dagbegin: on a new day, actively recall what you practised on your last study day.
// (Retrieval the next day, after sleep, strengthens new memories more than re-reading.)
function dayStartItems() {
  const today = St.dayKey(), byDay = {};
  for (const [id, c] of Object.entries(S().cards)) {
    const k = St.dayKey(c.last);
    if (BY_ID[id] && k < today) (byDay[k] ||= []).push(id);
  }
  const last = Object.keys(byDay).sort().pop();
  if (!last) return [];
  return byDay[last].sort((a, b) => retrievability(S().cards[a]) - retrievability(S().cards[b])).slice(0, 15);
}
const dayStartDone = () => S().dayStart?.done === St.dayKey();
function maybeDayStart() {
  const today = St.dayKey();
  if (L || !S().onboarded || S().dayStart?.shown === today || $('.modal-bg')) return;
  const ids = dayStartItems();
  if (!ids.length) return;
  (S().dayStart ||= {}).shown = today; St.save();
  startLesson({ type: 'daystart', ids: shuffle(ids) });
}
// Recall, not recognition: produce the word or sentence from memory.
function recallExercise(item) {
  if (item.kind === 'g') return 'drill';
  const opts = (item.kind === 'w' ? ['typePic', 'dictWord', 'speak'] : ['dictation', 'build', 'speak']).filter(t => allowed(t, item));
  return rnd(opts) || (item.kind === 'w' ? 'picWord' : 'build');
}

const dueCards = () => Object.entries(S().cards).filter(([id, c]) => c.due <= now() && BY_ID[id]).sort((a, b) => a[1].due - b[1].due).map(([id]) => id);
const learnedWords = () => WORDS.filter(w => S().cards[w.id]);
const strongWords = () => WORDS.filter(w => S().cards[w.id]?.s >= 21);

// Word lookup for tap-to-see in stories.
const LEX = new Map(WORDS.map(w => [w.af.toLowerCase(), w]));
function lookup(token) {
  const t = norm(token).replace(/^'n$/, "'n");
  if (!t) return null;
  for (const c of [t, t.replace(/(e|s|'s|ers|tjie|ie|jie)$/, ''), t.replace(/(e|s)$/, ''), t.replace(/te$/, 't'), t.replace(/ge/, '')])
    if (LEX.has(c)) return LEX.get(c);
  return null;
}

// ---------------- exercise choice ----------------
let speakSnoozeUntil = 0;
const needsAudio = ['listenPic', 'dictWord', 'dictation', 'soundQuiz', 'soundDict'];
function allowed(t, item) {
  const st = set();
  if (!st.listen && needsAudio.includes(t)) return false;
  if (t === 'speak' && (!st.speak || now() < speakSnoozeUntil)) return false;
  if (t === 'cloze' && !clozeParts(item)) return false;
  return true;
}
function exerciseFor(item) {
  if (item.kind === 'g') return 'drill';
  const s = S().cards[item.id]?.s || 0;
  let opts;
  if (item.kind === 'w') {
    if (s < 2) opts = ['listenPic', 'readPic', 'picWord'];
    else if (s < 7) opts = ['picWord', 'listenPic', 'cloze', 'readPic', 'speak'];
    else if (s < 21) opts = ['typePic', 'dictWord', 'cloze', 'picWord', 'speak'];
    else opts = ['typePic', 'dictWord', 'speak', 'buildEx'];
  } else {
    opts = s < 3 ? ['build'] : s < 10 ? ['build', 'speak', 'dictation'] : ['dictation', 'speak', 'build'];
  }
  opts = opts.filter(t => allowed(t, item));
  return rnd(opts) || (item.kind === 'w' ? 'readPic' : 'build');
}
const easier = item => item.kind === 'g' ? 'drill' : item.kind === 'w' ? (allowed('listenPic', item) && Math.random() < 0.5 ? 'listenPic' : 'readPic') : 'build';

function distractors(item, n, pool) {
  const used = new Set(graphemes(item.pic));
  const base = pool || [...UNITS.find(u => u.id === item.unit)?.words || [], ...learnedWords(), ...WORDS.slice(0, 60)];
  const out = [], seen = new Set([item.af.toLowerCase()]);
  for (const w of shuffle(base)) {
    if (out.length >= n) break;
    if (seen.has(w.af.toLowerCase()) || graphemes(w.pic).some(g => used.has(g))) continue;
    seen.add(w.af.toLowerCase()); graphemes(w.pic).forEach(g => used.add(g)); out.push(w);
  }
  if (out.length < n && !pool) return [...out, ...distractors(item, n - out.length, WORDS.filter(w => !out.includes(w)))].slice(0, n);
  return out;
}
function clozeParts(item) {
  if (item.kind !== 'w' || !item.ex) return null;
  const toks = item.ex.split(' ');
  const idx = toks.findIndex(t => norm(t) === item.af.toLowerCase());
  return idx < 0 ? null : { toks, idx };
}

// ---------------- lesson engine ----------------
let L = null, updatePending = false;
const lessonEl = () => $('#lesson');

function buildSteps(spec) {
  const steps = [];
  const reviews = (n, exclude = []) => dueCards().filter(id => !exclude.includes(id)).slice(0, n)
    .map(id => ({ t: exerciseFor(BY_ID[id]), item: BY_ID[id] }));
  if (spec.type === 'words') {
    const items = spec.ids.map(id => BY_ID[id]);
    const fresh = items.filter(w => !S().cards[w.id]);
    if (!fresh.length) return items.map(w => ({ t: exerciseFor(w), item: w })).concat(reviews(4, spec.ids));
    const q1 = w => ({ t: allowed('listenPic') ? 'listenPic' : 'readPic', item: w });
    fresh.forEach((w, i) => { steps.push({ t: 'intro', item: w }); if (i) steps.push(q1(fresh[i - 1])); });
    steps.push(q1(fresh[fresh.length - 1]));
    const mix = [...reviews(5, spec.ids), ...fresh.map(w => ({ t: 'picWord', item: w }))];
    steps.push(...shuffle(mix));
    shuffle(fresh).slice(0, 2).forEach(w => steps.push({ t: 'buildEx', item: w }));
    shuffle(fresh).slice(0, 2).forEach(w => steps.push({ t: 'typePic', item: w, hint: true }));
    if (allowed('speak')) steps.push({ t: 'speak', item: rnd(fresh) });
  } else if (spec.type === 'pattern') {
    steps.push({ t: 'pattern', pat: spec.pat });
    spec.pat.sents.forEach(s => steps.push({ t: 'build', item: s }));
    const s2 = shuffle(spec.pat.sents);
    if (allowed('speak')) steps.push({ t: 'speak', item: s2[0] });
    if (allowed('dictation')) steps.push({ t: 'dictation', item: s2[1] || s2[0] });
  } else if (spec.type === 'story') {
    steps.push({ t: 'story', story: spec.story });
    spec.story.q.forEach(q => steps.push({ t: 'question', q }));
  } else if (spec.type === 'sounds') {
    spec.sounds.forEach(s => { steps.push({ t: 'soundIntro', sound: s }); if (allowed('soundQuiz')) steps.push({ t: 'soundQuiz', sound: s }); });
    if (allowed('soundQuiz')) shuffle(spec.sounds).slice(0, 2).forEach(s => steps.push({ t: 'soundQuiz', sound: s }));
    if (allowed('soundDict')) shuffle(spec.sounds).slice(0, 2).forEach(s => steps.push({ t: 'soundDict', sound: s, word: rnd(s.w) }));
  } else if (spec.type === 'module') {
    steps.push({ t: 'module', mod: spec.mod });
    spec.mod.items.forEach(d => steps.push({ t: 'drill', item: d }));
    if (spec.mod.task) steps.push({ t: 'write', mod: spec.mod });
  } else if (spec.type === 'daystart') {
    steps.push({ t: 'dayIntro', ids: spec.ids }, ...spec.ids.map(id => ({ t: recallExercise(BY_ID[id]), item: BY_ID[id] })));
  } else if (spec.type === 'review') {
    steps.push(...spec.ids.map(id => ({ t: exerciseFor(BY_ID[id]), item: BY_ID[id] })));
  }
  return steps;
}

function startLesson(spec) {
  A.stop();
  const steps = buildSteps(spec);
  if (!steps.length) return toast('Niks om te oefen nie. 🎉');
  L = { spec, steps, i: 0, res: {}, retries: {}, xp: 0, ok: 0, n: 0, t0: now(), newIds: new Set() };
  document.body.classList.add('in-lesson');
  lessonEl().hidden = false;
  renderStep();
}

function closeLesson(apply = true) {
  A.stop();
  if (L?.spec.type === 'daystart' && L.i >= L.steps.length) { (S().dayStart ||= {}).done = St.dayKey(); St.save(); }
  if (apply && L) applyResults(false);
  L = null;
  lessonEl().hidden = true;
  document.body.classList.remove('in-lesson');
  render();
  if (updatePending) reloadForUpdate(); // an update arrived during the lesson
}

function applyResults(finished) {
  const d = St.today();
  for (const [id, g] of Object.entries(L.res)) {
    if (!g) continue;
    const isNew = !S().cards[id];
    S().cards[id] = review(S().cards[id] || {}, g, set().retention);
    if (isNew) d.new++; else d.rev++;
  }
  L.res = {};
  if (finished && L.spec.key) S().done[L.spec.key] = now();
  St.save();
}

function renderStep() {
  A.stop();
  const step = L.steps[L.i];
  const el = lessonEl();
  $('.lbar i', el).style.width = `${(L.i / L.steps.length) * 100}%`;
  const body = $('.lbody', el), foot = $('.lfoot', el);
  body.innerHTML = ''; foot.className = 'lfoot'; foot.innerHTML = '';
  body.scrollTop = 0;
  (EX[step.t] || EX.readPic)(step, body, foot);
}

function next() {
  L.i++;
  if (L.i >= L.steps.length) return finishLesson();
  renderStep();
}

// Record an answer and show feedback.
function answer(step, { g, correct = '', note = '', audio = null }) {
  const foot = $('.lfoot', lessonEl());
  if (g != null) {
    L.n++;
    if (g >= 2) L.ok++;
    const id = step.item?.id;
    if (id && !step.retry && step.graded !== false) L.res[id] = Math.min(L.res[id] ?? 3, g);
    const skill = { listenPic: 'listen', soundQuiz: 'listen', readPic: 'read', picWord: 'read', cloze: 'read', question: 'read', typePic: 'write', dictWord: 'write', dictation: 'write', build: 'write', buildEx: 'write', soundDict: 'write', speak: 'speak' }[step.t];
    if (g >= 2) { if (skill) S().stats[skill]++; S().stats.correct++; }
    S().stats.total++;
    L.xp += g === 3 ? 2 : g === 2 ? 1 : 0;
    if (g === 1 && step.item && (L.retries[id] || 0) < 2) {
      L.retries[id] = (L.retries[id] || 0) + 1;
      L.steps.push({ t: easier(step.item), item: step.item, retry: true });
    }
  }
  const cls = g == null ? 'skip' : g === 3 ? 'good' : g === 2 ? 'almost' : 'bad';
  const head = g == null ? '⏭️ Later' : g === 3 ? rnd(['✅ Reg!', '✅ Mooi so!', '✅ Uitstekend!', '✅ Goed gedoen!']) : g === 2 ? '🟠 Amper!' : '❌ Nie heeltemal nie';
  g === 3 || g === 2 ? A.sfx.good() : g === 1 && A.sfx.bad();
  foot.className = 'lfoot ' + cls;
  foot.innerHTML = `<div class="fb"><b>${head}</b>${note ? `<div class="note">${esc(note)}</div>` : ''}
    ${correct && g !== 3 ? `<div class="ans">${correct}${audio ? ' <button class="aud sm" data-a>🔊</button>' : ''}</div>` : ''}</div>
    <button class="btn primary" data-next>Gaan voort ➜</button>`;
  $$('.lbody button, .lbody input, .lbody textarea', lessonEl()).forEach(b => { if (!b.classList.contains('aud')) b.disabled = true; });
  const playA = () => audio && A.play(audio.text, audio.v || 'any');
  $('[data-a]', foot)?.addEventListener('click', playA);
  if (audio && set().autoplay) playA();
  $('[data-next]', foot).addEventListener('click', next);
  $('[data-next]', foot).focus();
}

function continueFoot(foot, label = 'Gaan voort ➜', fn = next) {
  foot.innerHTML = `<span></span><button class="btn primary" data-next>${label}</button>`;
  $('[data-next]', foot).addEventListener('click', fn);
}
function checkFoot(foot, ready, fn) {
  foot.innerHTML = `<span></span><button class="btn primary" data-check ${ready ? '' : 'disabled'}>Kontroleer</button>`;
  $('[data-check]', foot).addEventListener('click', fn);
  return v => { $('[data-check]', foot).disabled = !v; };
}
const audBtns = (text, v = 'any') => `<button class="aud big" data-play="${esc(text)}" data-v="${v}" aria-label="Luister">🔊</button><button class="aud" data-play="${esc(text)}" data-v="${v}" data-slow aria-label="Stadig">🐢</button>`;
function wireAudio(root) {
  $$('[data-play]', root).forEach(b => b.addEventListener('click', () => A.play(b.dataset.play, b.dataset.v || 'any', 'slow' in b.dataset)));
}
function choices(body, opts, render, onPick, cls = '') {
  const box = document.createElement('div');
  box.className = 'choices ' + cls;
  box.innerHTML = opts.map((o, i) => `<button class="choice" data-i="${i}"><kbd>${i + 1}</kbd>${render(o)}</button>`).join('');
  body.append(box);
  $$('.choice', box).forEach(b => b.addEventListener('click', () => {
    if (b.disabled) return;
    onPick(+b.dataset.i, b, box);
  }));
}
function markChoices(box, right, picked) {
  $$('.choice', box).forEach((b, i) => { b.disabled = true; if (i === right) b.classList.add('right'); else if (i === picked) b.classList.add('wrong'); });
}

function accentBar(input) {
  const bar = document.createElement('div');
  bar.className = 'accents';
  bar.innerHTML = ['ê', 'ë', 'é', 'è', 'ô', 'ö', 'û', 'ï', 'î', "'n"].map(c => `<button type="button">${c}</button>`).join('');
  $$('button', bar).forEach(b => b.addEventListener('click', () => {
    const p = input.selectionStart ?? input.value.length;
    input.value = input.value.slice(0, p) + b.textContent + input.value.slice(input.selectionEnd ?? p);
    input.focus(); input.setSelectionRange(p + b.textContent.length, p + b.textContent.length);
    input.dispatchEvent(new Event('input'));
  }));
  return bar;
}
function textInput(body, foot, target, { multi = false, onCheck, hint = '' } = {}) {
  const inp = document.createElement(multi ? 'textarea' : 'input');
  inp.className = 'type'; inp.autocapitalize = 'off'; inp.autocomplete = 'off'; inp.spellcheck = false;
  inp.setAttribute('autocorrect', 'off'); inp.placeholder = 'Skryf hier…'; inp.lang = 'af';
  body.append(inp, accentBar(inp));
  const enable = checkFoot(foot, false, () => onCheck(inp.value));
  inp.addEventListener('input', () => enable(inp.value.trim()));
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && inp.value.trim()) { e.preventDefault(); onCheck(inp.value); } });
  setTimeout(() => inp.focus(), 50);
  return inp;
}

// ---------------- exercise renderers ----------------
const EX = {
  intro(step, body, foot) {
    const w = step.item;
    L.newIds.add(w.id);
    body.innerHTML = `<div class="tag">🆕 Nuwe woord</div>
      <div class="pic huge">${esc(w.pic)}</div>
      <div class="word big">${esc(w.af)}</div>
      <div class="row center">${audBtns(w.af)}</div>${en(w.en)}
      <div class="ex"><button class="aud sm" data-play="${esc(w.ex)}">🔊</button> ${hiWord(w.ex, w.af)}</div>`;
    wireAudio(body);
    continueFoot(foot);
    if (set().autoplay) A.play(w.af, 'f').then(ok => ok && L?.steps[L.i] === step && setTimeout(() => L?.steps[L.i] === step && A.play(w.ex, 'm'), 350));
  },
  listenPic(step, body) {
    const w = step.item, opts = shuffle([w, ...distractors(w, 3)]);
    body.innerHTML = `<div class="tag">👂 Luister. Watter prentjie?</div><div class="row center">${audBtns(w.af)}</div>`;
    wireAudio(body);
    A.play(w.af);
    choices(body, opts, o => `<span class="pic">${esc(o.pic)}</span>`, (i, b, box) => {
      const right = opts.indexOf(w);
      markChoices(box, right, i);
      answer(step, { g: i === right ? 3 : 1, correct: `${esc(w.pic)} <b>${esc(w.af)}</b>`, audio: { text: w.af } });
    }, 'pics');
  },
  readPic(step, body) {
    const w = step.item, opts = shuffle([w, ...distractors(w, 3)]);
    body.innerHTML = `<div class="tag">👀 Lees. Watter prentjie?</div><div class="word big">${esc(w.af)}</div>`;
    choices(body, opts, o => `<span class="pic">${esc(o.pic)}</span>`, (i, b, box) => {
      const right = opts.indexOf(w);
      markChoices(box, right, i);
      answer(step, { g: i === right ? 3 : 1, correct: `${esc(w.pic)} <b>${esc(w.af)}</b>`, audio: { text: w.af } });
    }, 'pics');
  },
  picWord(step, body) {
    const w = step.item, opts = shuffle([w, ...distractors(w, 3)]);
    body.innerHTML = `<div class="tag">🖼️ Watter woord?</div><div class="pic huge">${esc(w.pic)}</div>`;
    choices(body, opts, o => esc(o.af), (i, b, box) => {
      const right = opts.indexOf(w);
      markChoices(box, right, i);
      answer(step, { g: i === right ? 3 : 1, correct: `<b>${esc(w.af)}</b>`, audio: { text: w.af } });
    });
  },
  cloze(step, body) {
    const w = step.item, { toks, idx } = clozeParts(w), opts = shuffle([w, ...distractors(w, 3)]);
    const shown = toks.map((t, i) => i === idx ? `<span class="blank">____${esc(t.replace(/^[^,.!?]+/, ''))}</span>` : esc(t)).join(' ');
    body.innerHTML = `<div class="tag">🧩 Watter woord pas?</div><div class="pic">${esc(w.pic)}</div><div class="sent">${shown}</div>`;
    choices(body, opts, o => esc(o.af), (i, b, box) => {
      const right = opts.indexOf(w);
      markChoices(box, right, i);
      answer(step, { g: i === right ? 3 : 1, correct: esc(w.ex), audio: { text: w.ex } });
    });
  },
  typePic(step, body, foot) {
    const w = step.item;
    let hinted = false;
    body.innerHTML = `<div class="tag">✍️ Skryf die woord</div><div class="pic huge">${esc(w.pic)}</div>
      <div class="row center"><button class="btn ghost sm" data-hint>💡 Wenk</button><span class="hint"></span></div>`;
    $('[data-hint]', body).addEventListener('click', e => {
      hinted = true; e.target.disabled = true;
      $('.hint', body).textContent = w.af[0] + ' _ '.repeat(Math.max(0, w.af.length - 1));
    });
    if (step.hint) $('[data-hint]', body).click();
    textInput(body, foot, w.af, { onCheck: v => {
      const r = gradeText(v, w.af);
      answer(step, { g: hinted && r.g === 3 && !step.hint ? 2 : r.g, note: r.note, correct: `${esc(w.pic)} <b>${esc(w.af)}</b>`, audio: { text: w.af } });
    } });
  },
  dictWord(step, body, foot) {
    const w = step.item;
    body.innerHTML = `<div class="tag">🎧 Luister en skryf</div><div class="row center">${audBtns(w.af)}</div>`;
    wireAudio(body); A.play(w.af);
    textInput(body, foot, w.af, { onCheck: v => {
      const r = gradeText(v, w.af);
      answer(step, { ...r, correct: `${esc(w.pic)} <b>${esc(w.af)}</b>`, audio: { text: w.af } });
    } });
  },
  dictation(step, body, foot) {
    const s = step.item;
    body.innerHTML = `<div class="tag">🎧 Luister en skryf die sin</div><div class="pic">${esc(s.pic)}</div><div class="row center">${audBtns(s.af)}</div>`;
    wireAudio(body); A.play(s.af);
    textInput(body, foot, s.af, { multi: true, onCheck: v => {
      const r = gradeText(v, s.af);
      answer(step, { ...r, correct: hi(s.mk || s.af), audio: { text: s.af } });
    } });
  },
  buildEx(step, body, foot) { EX.build({ ...step, sentence: step.item.ex, pic: step.item.pic }, body, foot, step); },
  build(step, body, foot, orig = step) {
    const text = step.sentence || step.item.af, pic = step.pic || step.item.pic;
    const words = text.split(' ');
    const extra = distractors(step.item.kind === 'w' ? step.item : { af: '~', pic: '' }, 2)
      .map(w => w.af).filter(a => !words.some(x => norm(x) === a.toLowerCase()));
    const tiles = shuffle([...words.map((w, i) => ({ w, i })), ...extra.map(w => ({ w, i: -1 }))]);
    const listen = set().listen;
    body.innerHTML = `<div class="tag">🧱 Bou die sin</div><div class="pic">${esc(pic)}</div>
      ${listen ? `<div class="row center">${audBtns(text)}</div>` : ''}
      <div class="build-line" aria-label="Jou sin"></div><div class="tiles"></div>`;
    wireAudio(body);
    if (listen) A.play(text);
    const line = $('.build-line', body), pool = $('.tiles', body);
    const enable = checkFoot(foot, false, check);
    tiles.forEach(t => {
      const b = document.createElement('button');
      b.className = 'tile'; b.textContent = t.w;
      b.addEventListener('click', () => {
        (b.parentElement === pool ? line : pool).append(b);
        enable(line.children.length > 0);
      });
      pool.append(b);
    });
    function check() {
      const built = [...line.children].map(b => b.textContent).join(' ');
      let g = norm(built) === norm(text) ? 3 : 1;
      // Without audio, any correct sentence made from the same words also counts.
      if (g === 1 && !listen) {
        const key = s => norm(s).split(' ').sort().join(' ');
        if ([...SENTENCES.map(s => s.af), ...WORDS.map(w => w.ex)].some(s => norm(s) === norm(built) && key(s) === key(text))) g = 3;
      }
      answer(orig, { g, correct: step.item.mk ? hi(step.item.mk) : esc(text), audio: { text } });
    }
  },
  speak(step, body, foot) {
    const it = step.item, text = it.kind === 'w' ? it.af : it.af;
    body.innerHTML = `<div class="tag">🗣️ Sê dit hardop</div><div class="pic">${esc(it.pic)}</div>
      <div class="word ${it.kind === 'w' ? 'big' : ''}">${it.mk ? hi(it.mk) : esc(text)}</div>
      <div class="row center">${audBtns(text)}</div>
      <div class="row center"><button class="mic" data-mic aria-label="Neem op">🎙️</button></div>
      <div class="speak-out"></div>`;
    wireAudio(body);
    foot.innerHTML = `<button class="btn ghost" data-skip>⏭️ Nie nou nie</button><span></span>`;
    $('[data-skip]', foot).addEventListener('click', () => { speakSnoozeUntil = now() + 15 * 60e3; answer(step, { g: null }); });
    const out = $('.speak-out', body), mic = $('[data-mic]', body);
    const selfGrade = (mine, note = '') => {
      out.innerHTML = `${note ? `<p class="soft">${note}</p>` : ''}${mine ? `<div class="row center"><button class="btn ghost sm" data-mine>▶️ Jy</button><button class="btn ghost sm" data-model>🔊 Model</button></div>` : ''}
        <div class="tag">Hoe het dit geklink?</div>
        <div class="row center self"><button class="btn" data-g="3">😀 Dieselfde</button><button class="btn" data-g="2">😐 Amper</button><button class="btn" data-g="1">😕 Nog nie</button></div>`;
      $('[data-mine]', out)?.addEventListener('click', () => A.playRecording(mine));
      $('[data-model]', out)?.addEventListener('click', () => A.play(text));
      $$('[data-g]', out).forEach(b => b.addEventListener('click', () => answer(step, { g: +b.dataset.g, correct: esc(text), audio: { text } })));
      if (mine) A.playRecording(mine).then(ok => ok && L?.steps[L.i] === step && A.play(text));
    };
    let busy = false;
    mic.addEventListener('click', async () => {
      if (busy) return A.stopUtterance(); // second tap = "I'm done"
      busy = true; mic.classList.add('on');
      try {
        if (A.canRecognise()) {
          out.innerHTML = '<div class="tag">Ek luister… praat nou</div>';
          try {
            const alts = await A.recognise();
            if (alts.length) {
              const best = alts.map(a => ({ a, ...gradeText(a, text) })).sort((x, y) => y.g - x.g)[0];
              return answer(step, { g: best.g, note: `Ek het gehoor: “${best.a}”`, correct: esc(text), audio: { text } });
            }
          } catch { /* no recogniser for this mic or language: record instead */ }
        }
        if (!A.canRecord()) return selfGrade(null, 'Sê dit hardop en vergelyk met die model.');
        const r = await recordInto(out);
        selfGrade(r.blob && r, r.note);
      } finally { busy = false; mic.classList.remove('on'); }
    });
    if (set().autoplay) A.play(text);
  },
  pattern(step, body, foot) {
    const p = step.pat;
    body.innerHTML = `<div class="tag">🧩 Patroon</div><div class="pic">${esc(p.i)}</div><h2 class="ptitle">${esc(p.t)}</h2>
      <p class="rule">${esc(p.r)}</p>${en(p.en)}
      <ul class="examples">${p.sents.map(s => `<li><button class="aud sm" data-play="${esc(s.af)}">🔊</button><span class="pic sm">${esc(s.pic)}</span><span>${hi(s.mk)}</span></li>`).join('')}</ul>`;
    wireAudio(body);
    continueFoot(foot, 'Probeer dit ➜');
  },
  story(step, body, foot) {
    const st = step.story;
    body.innerHTML = `<div class="tag">📖 Storie</div><h2 class="ptitle">${esc(st.t)}</h2>
      <div class="row center"><button class="btn ghost sm" data-all>▶️ Speel alles</button></div>
      <div class="story">${st.lines.map((l, i) => `<p class="line ${l.v}" data-l="${i}">${l.who ? `<b>${esc(l.who)}:</b> ` : ''}<span>${l.text.split(' ').map(t => `<i class="tok">${esc(t)}</i>`).join(' ')}</span> <button class="aud sm" data-line="${i}">🔊</button></p>`).join('')}</div>
      <div class="gloss" hidden></div><p class="hintline">Tik op ’n woord vir ’n prentjie.</p>`;
    const gloss = $('.gloss', body);
    const playLine = i => { $$('.line', body).forEach(p => p.classList.toggle('now', +p.dataset.l === i)); return A.play(st.lines[i].text, st.lines[i].v); };
    $$('[data-line]', body).forEach(b => b.addEventListener('click', () => playLine(+b.dataset.line)));
    $('[data-all]', body).addEventListener('click', async () => {
      for (let i = 0; i < st.lines.length; i++) { if (!(await playLine(i)) || !L) break; await new Promise(r => setTimeout(r, 300)); }
    });
    $$('.tok', body).forEach(t => t.addEventListener('click', () => {
      const w = lookup(t.textContent);
      gloss.hidden = false;
      gloss.innerHTML = w ? `<span class="pic">${esc(w.pic)}</span> <b>${esc(w.af)}</b> <button class="aud sm" data-play="${esc(w.af)}">🔊</button>${en(w.en)}`
        : `<b>${esc(t.textContent)}</b> <button class="aud sm" data-play="${esc(t.textContent)}">🔊</button> <small>Raai uit die sin! 🤔</small>`;
      wireAudio(gloss);
    }));
    S().stats.stories++;
    L.xp += 10;
    continueFoot(foot, 'Vrae ➜');
  },
  question(step, body) {
    const [q, opts, right] = step.q, order = shuffle(opts.map((o, i) => i));
    body.innerHTML = `<div class="tag">❓ Vraag</div><div class="sent">${esc(q)}</div>`;
    choices(body, order, i => esc(opts[i]), (k, b, box) => {
      const r = order.indexOf(right);
      markChoices(box, r, k);
      answer({ ...step, graded: false }, { g: k === r ? 3 : 1, correct: esc(opts[right]) });
    });
  },
  soundIntro(step, body, foot) {
    const s = step.sound;
    body.innerHTML = `<div class="tag">🔤 Klank</div><div class="grapheme">${esc(s.g)}</div><div class="ipa">${esc(s.ipa)}</div>
      <p class="rule">${esc(s.tip)}</p>${en(s.en)}
      <div class="sound-words">${s.w.map(x => `<button class="sw" data-play="${esc(x)}"><span class="pic">${esc(lookup(x.replace("'n ", ''))?.pic || '🔊')}</span>${esc(x)}</button>`).join('')}</div>`;
    wireAudio(body);
    continueFoot(foot);
    if (set().autoplay) (async () => { for (const x of s.w) { if (!(await A.play(x, 'f')) || L?.steps[L.i] !== step) break; await new Promise(r => setTimeout(r, 250)); } })();
  },
  soundQuiz(step, body) {
    const s = step.sound, target = rnd(s.w);
    const others = shuffle(SOUNDS.filter(o => o !== s).flatMap(o => o.w)).filter(w => w !== target).slice(0, 3);
    const opts = shuffle([target, ...others]);
    body.innerHTML = `<div class="tag">👂 Watter woord hoor jy?</div><div class="row center">${audBtns(target)}</div>`;
    wireAudio(body); A.play(target);
    choices(body, opts, o => esc(o), (i, b, box) => {
      const right = opts.indexOf(target);
      markChoices(box, right, i);
      answer({ ...step, graded: false }, { g: i === right ? 3 : 1, correct: `<b>${esc(target)}</b> – ${esc(s.g)}`, audio: { text: target } });
    });
  },
  soundDict(step, body, foot) {
    const w = step.word;
    body.innerHTML = `<div class="tag">🎧 Luister en skryf</div><div class="row center">${audBtns(w)}</div>`;
    wireAudio(body); A.play(w);
    textInput(body, foot, w, { onCheck: v => answer({ ...step, graded: false }, { ...gradeText(v, w), correct: `<b>${esc(w)}</b>`, audio: { text: w } }) });
  },
};
EX.dayIntro = (step, body, foot) => {
  const h = new Date().getHours(), greet = h < 12 ? 'Goeiemôre' : h < 18 ? 'Goeiemiddag' : 'Goeienaand';
  body.innerHTML = `<div class="pic huge bounce">☀️</div><h2 class="ptitle">${greet}! Dagbegin</h2>
    <p class="rule">Onthou jy nog wat jy laas geleer het? Haal elke antwoord uit jou geheue – dit maak die woorde sterk.</p>
    <div class="ds-pics">${step.ids.map(id => `<span class="pic sm">${esc(BY_ID[id].pic)}</span>`).join('')}</div>
    <p class="soft" style="text-align:center">${step.ids.length} ${step.ids.length === 1 ? 'oefening' : 'oefeninge'} · ±${Math.max(1, Math.round(step.ids.length * 0.4))} min</p>`;
  if (set().autoplay) A.play(`${greet}!`, 'f');
  continueFoot(foot, 'Begin ➜');
};

// ---- curriculum (CAPS) exercises ----
const LV = { EAT: 'EAT + HT', HT: 'HT' };
const isLit = m => m.g === 'lit';
Object.assign(EX, {
  module(step, body, foot) {
    const m = step.mod, g = GROUPS.find(x => x.id === m.g);
    body.innerHTML = `<div class="tag">${g.i} ${esc(g.t)} · <span class="lv">${LV[m.lv]}</span></div>
      <div class="pic">${esc(m.i)}</div><h2 class="ptitle">${esc(m.t)}</h2>
      <p class="rule">${esc(m.r)}</p>${en(m.en)}
      ${m.ex ? `<ul class="examples">${m.ex.map(x => `<li><button class="aud sm" data-play="${esc(strip(x))}" data-v="f">🔊</button><span>${hi(x)}</span></li>`).join('')}</ul>` : ''}
      ${m.text ? `<div class="model">${m.text.split('\n').map(l => l.trim() ? `<p>${isLit(m) ? `<button class="aud sm" data-play="${esc(l)}" data-v="f">🔊</button> ` : ''}${esc(l)}</p>` : '<br>').join('')}</div>` : ''}
      ${m.check ? `<h3 class="sec">✅ Kontrolelys</h3><ul class="check">${m.check.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}`;
    wireAudio(body);
    continueFoot(foot, m.items.length ? 'Oefen ➜' : 'Gaan voort ➜');
  },
  drill(step, body, foot) {
    const d = step.item, m = MOD[d.mod];
    body.innerHTML = `<div class="tag">${esc(m.i)} ${esc(m.t)}</div><div class="sent">${esc(d.af)}</div>`;
    if (d.mc) {
      const opts = shuffle(d.ans);
      choices(body, opts, o => esc(o), (i, b, box) => {
        const right = opts.indexOf(d.ans[0]);
        markChoices(box, right, i);
        answer(step, { g: i === right ? 3 : 1, correct: esc(d.ans[0]) });
      }, 'text');
    } else {
      textInput(body, foot, d.ans[0], { multi: d.ans[0].length > 28, onCheck: v => {
        const best = d.ans.map(a => gradeText(v, a)).sort((x, y) => y.g - x.g)[0];
        answer(step, { ...best, correct: esc(d.ans[0]) });
      } });
    }
  },
  write(step, body, foot) {
    const m = step.mod;
    body.innerHTML = `<div class="tag">✍️ Skryf self</div><p class="rule">${esc(m.task)}</p>
      <textarea class="type essay" rows="10" lang="af" placeholder="Skryf hier…"></textarea><p class="soft wc">0 woorde</p>
      <h3 class="sec">✅ Kyk self na:</h3>${(m.check || []).map(c => `<label class="tog"><span>${esc(c)}</span><input type="checkbox"></label>`).join('')}`;
    const ta = $('textarea', body);
    ta.addEventListener('input', () => { $('.wc', body).textContent = `${ta.value.trim().split(/\s+/).filter(Boolean).length} woorde`; });
    foot.innerHTML = `<button class="btn ghost" data-skip>⏭️ Later</button><button class="btn primary" data-save>💾 Stoor ➜</button>`;
    $('[data-skip]', foot).addEventListener('click', next);
    $('[data-save]', foot).addEventListener('click', () => {
      if (ta.value.trim()) { (S().journal ||= []).unshift({ mod: m.id, t: now(), text: ta.value }); S().stats.write++; L.xp += 10; St.save(); toast('📓 Gestoor in jou skryfboek'); }
      next();
    });
  },
});

function hiWord(ex, word) {
  return ex.split(' ').map(t => norm(t) === word.toLowerCase() ? `<mark>${esc(t)}</mark>` : esc(t)).join(' ');
}

function finishLesson() {
  A.stop();
  const spec = L.spec;
  const acc = L.n ? Math.round((L.ok / L.n) * 100) : 100;
  const perfect = L.n > 3 && acc === 100;
  L.xp += 5 + (perfect ? 5 : 0);
  const newCount = Object.keys(L.res).filter(id => !S().cards[id]).length;
  applyResults(true);
  const ev = St.addXp(L.xp);
  const mins = Math.max(1, Math.round((now() - L.t0) / 60000));
  const newBadges = checkBadges(perfect);
  A.sfx.done();
  const el = lessonEl();
  $('.lbar i', el).style.width = '100%';
  $('.lbody', el).innerHTML = `<div class="done">
    <div class="pic huge bounce">${perfect ? '🏆' : acc >= 80 ? '🎉' : '💪'}</div>
    <h2>${perfect ? 'Perfek!' : acc >= 80 ? 'Les klaar!' : 'Goed geoefen!'}</h2>
    <div class="stats3"><div><b>+${L.xp}</b><span>⭐ XP</span></div><div><b>${acc}%</b><span>🎯 reg</span></div><div><b>${mins}</b><span>⏱️ min</span></div></div>
    ${newCount ? `<p>🆕 ${newCount} nuut geleer</p>` : ''}
    ${ev === 'goal' || ev === 'earnFreeze' || ev === 'freeze' ? `<p class="streak-up">🔥 ${St.streakNow()} ${St.streakNow() === 1 ? 'dag' : 'dae'} op ’n ry!</p>` : ''}
    ${ev === 'earnFreeze' ? '<p>🧊 Jy het ’n ys-blokkie verdien. Dit beskerm jou reeks as jy ’n dag mis.</p>' : ''}
    ${newBadges.map(b => `<p class="badge-new">${b.i} ${esc(b.t)}</p>`).join('')}
    </div>`;
  if (perfect || ev) confetti();
  continueFoot($('.lfoot', el), 'Klaar ➜', () => closeLesson(false));
}

function confetti() {
  const box = document.createElement('div');
  box.className = 'confetti';
  box.innerHTML = Array.from({ length: 40 }, (_, i) => `<i style="left:${Math.random() * 100}%;animation-delay:${Math.random() * 0.6}s;background:hsl(${i * 37 % 360} 85% 60%)"></i>`).join('');
  document.body.append(box);
  setTimeout(() => box.remove(), 2600);
}

// ---------------- badges ----------------
const BADGES = [
  { id: 'first', i: '🎉', t: 'Eerste les', ok: () => Object.keys(S().done).length >= 1 },
  { id: 'w10', i: '🌱', t: '10 woorde', ok: () => learnedWords().length >= 10 },
  { id: 'w50', i: '🌿', t: '50 woorde', ok: () => learnedWords().length >= 50 },
  { id: 'w100', i: '🌳', t: '100 woorde', ok: () => learnedWords().length >= 100 },
  { id: 'w250', i: '🏔️', t: '250 woorde', ok: () => learnedWords().length >= 250 },
  { id: 'all', i: '👑', t: 'Al die woorde', ok: () => learnedWords().length >= WORDS.length },
  { id: 's3', i: '🔥', t: '3 dae op ’n ry', ok: () => S().streak.best >= 3 },
  { id: 's7', i: '🔥', t: '7 dae op ’n ry', ok: () => S().streak.best >= 7 },
  { id: 's30', i: '🌋', t: '30 dae op ’n ry', ok: () => S().streak.best >= 30 },
  { id: 'story1', i: '📖', t: 'Eerste storie', ok: () => S().stats.stories >= 1 },
  { id: 'story10', i: '📚', t: '10 stories', ok: () => S().stats.stories >= 10 },
  { id: 'speak25', i: '🎙️', t: '25 keer gepraat', ok: () => S().stats.speak >= 25 },
  { id: 'write50', i: '✍️', t: '50 keer geskryf', ok: () => S().stats.write >= 50 },
  { id: 'klanke', i: '🔤', t: 'Al die klanke', ok: () => unitLessons('klanke').every(l => S().done[l.key]) },
  { id: 'strong50', i: '💎', t: '50 woorde vas', ok: () => strongWords().length >= 50 },
  { id: 'perfect', i: '🏆', t: 'Perfekte les', ok: p => p },
  { id: 'mod1', i: '🎓', t: 'Eerste kurrikulum-module', ok: () => MODULES.some(m => S().done['m.' + m.id]) },
  { id: 'mod20', i: '🎓', t: '20 kurrikulum-modules', ok: () => MODULES.filter(m => S().done['m.' + m.id]).length >= 20 },
  { id: 'writer', i: '📓', t: 'Eerste skryfstuk', ok: () => (S().journal || []).length >= 1 },
];
function checkBadges(perfect) {
  const got = [];
  for (const b of BADGES) if (!S().badges[b.id] && b.ok(perfect)) { S().badges[b.id] = now(); got.push(b); }
  if (got.length) St.save();
  return got;
}

// ---------------- screens ----------------
let tab = 'home', wordFilter = '', openUnit = null;
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone || !!window.Capacitor;

function render() {
  $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  const v = $('#view');
  v.innerHTML = SCREENS[tab]();
  v.scrollTop = 0;
  BIND[tab]?.(v);
}

function ring(p, label) {
  const r = 18, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="${r}" class="bg"/><circle cx="22" cy="22" r="${r}" class="fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.min(1, p))}"/><text x="22" y="26">${label}</text></svg>`;
}

const SCREENS = {
  home() {
    let dsN;
    const d = St.today(), goal = set().goal, nxt = nextLesson(), due = dueCards().length;
    const unit = nxt && ALL_UNITS.find(u => u.id === nxt.unit);
    const tooMany = nxt?.type === 'words' && d.new >= set().newPerDay;
    const backupNag = learnedWords().length >= 20 && now() - S().lastBackup > 14 * 864e5;
    return `<header class="top">
        <div class="stat" title="Reeks">🔥 <b>${St.streakNow()}</b></div>
        <div class="stat" title="Ys-blokkies">🧊 <b>${S().streak.freezes}</b></div>
        <div class="stat" title="Woorde">📚 <b>${learnedWords().length}</b></div>
        <div class="stat goal" title="Doel vir vandag">${ring(d.xp / goal, '⭐')}<b>${d.xp}/${goal}</b></div>
      </header>
      ${isIOS && !standalone ? `<div class="banner">📲 Tik <b>Deel ⬆️</b> en dan <b>Voeg by tuisskerm ➕</b>. Dan werk die app sonder internet en jou vordering bly veilig.</div>` : ''}
      ${backupNag ? `<div class="banner" data-go="settings">💾 Maak ’n rugsteun van jou vordering. Tik hier.</div>` : ''}
      ${nxt ? `<section class="hero">
        <div class="hero-unit">${esc(unit.i)} ${esc(unit.t)}</div>
        <div class="hero-lesson"><span class="pic">${esc(nxt.icon)}</span> ${esc(nxt.label)}</div>
        ${tooMany ? `<p class="soft">🧠 Genoeg nuwe woorde vir vandag. Hersien eerder – jou brein onthou beter so.</p>` : ''}
        <button class="btn primary big" data-start="${nxt.key}">▶ ${S().done[PATH[0].key] ? 'Gaan voort' : 'Begin'}</button>
      </section>` : `<section class="hero"><div class="pic huge">👑</div><p>Jy het die hele kursus klaar! Hersien elke dag en lees in die Bronne.</p></section>`}
      ${!dayStartDone() && (dsN = dayStartItems().length) ? `<button class="btn daystart" data-daystart>☀️ Dagbegin <span class="pill sun">${dsN}</span></button>` : ''}
      <button class="btn review ${due ? '' : 'calm'}" data-review>🔁 Hersien ${due ? `<span class="pill">${due}</span>` : '✓'}</button>
      <h3 class="sec">🗺️ Jou pad</h3>
      <div class="units">${ALL_UNITS.map((u, i) => {
        const ls = unitLessons(u.id), dn = ls.filter(l => S().done[l.key]).length, cur = nxt?.unit === u.id;
        return `<div class="unit ${cur ? 'cur' : ''} ${dn === ls.length ? 'full' : ''}">
          <button class="unit-head" data-unit="${u.id}"><span class="uicon">${esc(u.i)}</span><span class="uname">${i ? i + '. ' : ''}${esc(u.t)}</span>
          <span class="ubar"><i style="width:${(dn / ls.length) * 100}%"></i></span><span class="ucount">${dn}/${ls.length}</span></button>
          ${openUnit === u.id ? `<div class="lessons">${ls.map(l => `<button class="lesson ${S().done[l.key] ? 'did' : ''}" data-start="${l.key}"><span>${esc(l.icon)}</span> ${esc(l.label)} ${S().done[l.key] ? '✅' : ''}</button>`).join('')}</div>` : ''}
        </div>`;
      }).join('')}</div>
      <p class="tip">${esc(rnd(TIPS))}</p>`;
  },
  words() {
    const q = norm(wordFilter);
    const list = WORDS.filter(w => !q || norm(w.af).includes(q) || (set().english && w.en.toLowerCase().includes(q)));
    return `<h2 class="title">📖 Woordeboek</h2>
      <input class="search" type="search" placeholder="🔎 Soek ’n woord…" value="${esc(wordFilter)}" lang="af">
      <p class="soft">${learnedWords().length} / ${WORDS.length} geleer · tik vir meer</p>
      <div class="wlist">${list.map(w => {
        const c = S().cards[w.id], r = c ? retrievability(c) : 0;
        return `<button class="witem" data-word="${esc(w.id)}"><span class="pic">${esc(w.pic)}</span><span class="waf">${esc(w.af)}${set().english ? `<small> · ${esc(w.en)}</small>` : ''}</span>
          <span class="str ${c ? (c.s >= 21 ? 's3' : c.s >= 7 ? 's2' : 's1') : 's0'}" title="Sterkte"><i style="width:${Math.round(r * 100)}%"></i></span></button>`;
      }).join('') || '<p class="soft">Niks gevind nie.</p>'}</div>`;
  },
  progress() {
    const st = S().stats, cards = Object.values(S().cards);
    const days = [...Array(84)].map((_, i) => St.dayKey(now() - (83 - i) * 864e5));
    const maxXp = Math.max(30, ...days.map(k => S().days[k]?.xp || 0));
    const fc = [...Array(7)].map((_, i) => cards.filter(c => { const d = Math.floor((c.due - now()) / 864e5); return i === 0 ? d <= 0 : d === i; }).length);
    const fmax = Math.max(1, ...fc);
    const totalXp = Object.values(S().days).reduce((a, d) => a + d.xp, 0);
    return `<h2 class="title">📊 Vordering</h2>
      <div class="cards4">
        <div><b>${learnedWords().length}</b><span>📚 woorde geleer</span></div>
        <div><b>${strongWords().length}</b><span>💎 woorde vas</span></div>
        <div><b>${St.streakNow()}</b><span>🔥 reeks (beste ${S().streak.best})</span></div>
        <div><b>${totalXp}</b><span>⭐ XP</span></div>
      </div>
      <h3 class="sec">Vaardighede</h3>
      <div class="skills">${[['👂', 'Luister', st.listen], ['👀', 'Lees', st.read], ['✍️', 'Skryf', st.write], ['🗣️', 'Praat', st.speak]].map(([i, t, n]) => `<div><span class="pic">${i}</span><b>${n}</b><small>${t}</small></div>`).join('')}</div>
      <p class="soft">🎯 ${st.total ? Math.round((st.correct / st.total) * 100) : 0}% reg · ${st.total} oefeninge · 📖 ${st.stories} stories</p>
      <h3 class="sec">Hersienings: volgende 7 dae</h3>
      <div class="forecast">${fc.map((n, i) => `<div><i style="height:${(n / fmax) * 100}%"></i><b>${n}</b><small>${i ? '+' + i : 'nou'}</small></div>`).join('')}</div>
      <h3 class="sec">12 weke</h3>
      <div class="heat">${days.map(k => { const x = S().days[k]?.xp || 0; return `<i title="${k}: ${x} XP" style="opacity:${x ? 0.25 + 0.75 * x / maxXp : 1}" class="${x ? 'on' : ''}"></i>`; }).join('')}</div>
      <h3 class="sec">🏅 Prestasies</h3>
      <div class="badges">${BADGES.map(b => `<div class="${S().badges[b.id] ? 'got' : ''}"><span>${b.i}</span><small>${esc(b.t)}</small></div>`).join('')}</div>`;
  },
  school() {
    const tr = set().track || 'HT';
    const mods = MODULES.filter(m => tr === 'HT' || m.lv === 'EAT');
    const done = mods.filter(m => S().done['m.' + m.id]).length;
    return `<h2 class="title">🎓 Kurrikulum</h2>
      <p class="soft">Alles uit die skoolkurrikulum (KABV/CAPS): taalstrukture, skryf, letterkunde, luister en praat.</p>
      <div class="chips"><button class="chip ${tr === 'EAT' ? 'on' : ''}" data-track="EAT">EAT · tweede taal</button><button class="chip ${tr === 'HT' ? 'on' : ''}" data-track="HT">HT · huistaal (alles)</button></div>
      <p class="soft">${done} / ${mods.length} modules klaar · <button class="linkbtn" data-journal>📓 My skryfboek (${(S().journal || []).length})</button></p>
      ${GROUPS.map(g => {
        const ms = mods.filter(m => m.g === g.id);
        return ms.length ? `<h3 class="sec">${g.i} ${esc(g.t)}</h3><div class="lessons">${ms.map(m => {
          const learned = m.items.filter(d => S().cards[d.id]).length;
          return `<button class="lesson ${S().done['m.' + m.id] ? 'did' : ''}" data-mod="${m.id}"><span>${esc(m.i)}</span> ${esc(m.t)} <span class="lv">${LV[m.lv]}</span>${m.items.length ? ` <small>${learned}/${m.items.length}</small>` : ''} ${S().done['m.' + m.id] ? '✅' : ''}</button>`;
        }).join('')}</div>` : '';
      }).join('')}`;
  },
  sources() {
    return `<h2 class="title">🌍 Bronne</h2>
      <p class="soft">Betroubare plekke om meer Afrikaans te lees, te hoor en te praat. 🌐 = internet nodig.</p>
      <h3 class="sec">📖 Al die stories (sonder internet)</h3>
      <div class="lessons">${PATH.filter(l => l.type === 'story').map(l => `<button class="lesson ${S().done[l.key] ? 'did' : ''}" data-start="${l.key}">📖 ${esc(l.label)}</button>`).join('')}</div>
      ${RESOURCES.map(g => `<h3 class="sec">${esc(g.g)}</h3><div class="res">${g.items.map(r => `<a href="${r.u}" target="_blank" rel="noopener"><b>🌐 ${esc(r.n)}</b><span>${esc(r.d)}</span>${en(r.en)}</a>`).join('')}</div>`).join('')}
      <h3 class="sec">💡 Wenke</h3><ul class="tips">${TIPS.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
  },
  settings() {
    const s = set();
    const sel = (k, opts) => `<select data-set="${k}">${opts.map(([v, t]) => `<option value="${v}" ${String(s[k]) === String(v) ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
    const tog = (k, t) => `<label class="tog"><span>${t}</span><input type="checkbox" data-set="${k}" ${s[k] ? 'checked' : ''}></label>`;
    return `<h2 class="title">⚙️ Instellings</h2>
      <div class="set">
        <label><span>⭐ Doel per dag</span>${sel('goal', [[15, '☕ 15 XP · ±3 min'], [30, '🚶 30 XP · ±6 min'], [60, '🏃 60 XP · ±12 min'], [100, '🚀 100 XP · ±20 min']])}</label>
        <label><span>🆕 Nuwe woorde per dag</span>${sel('newPerDay', [[6, '6'], [12, '12'], [20, '20'], [30, '30']])}</label>
        <label><span>🧠 Onthou-teiken</span>${sel('retention', [[0.85, '85% · minder hersien'], [0.9, '90% · aanbeveel'], [0.95, '95% · meer hersien']])}</label>
        ${tog('autoplay', '🔊 Speel klank outomaties')}
        ${tog('slow', '🐢 Stadige klank')}
        ${tog('listen', '👂 Luister-oefeninge')}
        ${tog('speak', '🗣️ Praat-oefeninge')}
        ${tog('sfx', '🎵 Klankeffekte')}
        ${tog('english', '🇬🇧 Engelse hulp (nie aanbeveel nie)')}
      </div>
      <h3 class="sec">💾 Rugsteun</h3>
      <p class="soft">Jou vordering is net op hierdie toestel. Stoor ’n lêer en laai dit op ’n ander toestel.</p>
      <div class="row"><button class="btn" data-export>⬇️ Stoor rugsteun</button><label class="btn">⬆️ Laai rugsteun<input type="file" accept="application/json,.json" data-import hidden></label><button class="btn ghost" data-paste>📋 Plak rugsteun</button></div>
      <h3 class="sec">ℹ️ Oor</h3>
      <p class="soft">Hierdie app leer Afrikaans deur prentjies, klank en stories – sonder vertaling. Hersiening werk met FSRS (gespasieerde herhaling). Stemme: Adri en Willem (neurale stemme).</p>
      <p class="soft">This app teaches Afrikaans through pictures, sound and stories, without translation. Trust the pictures; guessing from context is part of how the brain learns.</p>
      <div class="row"><button class="btn ghost" data-intro>👋 Wys inleiding</button><button class="btn danger" data-reset>🗑️ Begin van voor af</button></div>
      <p class="soft ver">Weergawe v${window.APP_BUILD || '?'} (${window.APP_VERSION || ''})</p>`;
  },
};

const BIND = {
  school(v) {
    $$('[data-track]', v).forEach(b => b.addEventListener('click', () => { set().track = b.dataset.track; St.save(); render(); }));
    $$('[data-mod]', v).forEach(b => b.addEventListener('click', () => { const m = MOD[b.dataset.mod]; startLesson({ key: 'm.' + m.id, type: 'module', mod: m }); }));
    $('[data-journal]', v).addEventListener('click', () => modal(`<h3>📓 My skryfboek</h3>${(S().journal || []).map(j => `<div class="model"><b>${esc(MOD[j.mod]?.t || '')}</b> · <small>${St.dayKey(j.t)}</small><p>${esc(j.text).replace(/\n/g, '<br>')}</p></div>`).join('') || '<p class="soft">Nog niks nie. Skryf in ’n Skryf-module.</p>'}`));
  },
  home(v) {
    $$('[data-unit]', v).forEach(b => b.addEventListener('click', () => { openUnit = openUnit === b.dataset.unit ? null : b.dataset.unit; render(); }));
    $('[data-go]', v)?.addEventListener('click', () => { tab = 'settings'; render(); });
  },
  words(v) {
    const inp = $('.search', v);
    inp.addEventListener('input', () => { wordFilter = inp.value; const p = inp.selectionStart; render(); const n = $('.search'); n.focus(); n.setSelectionRange(p, p); });
    $$('[data-word]', v).forEach(b => b.addEventListener('click', () => wordSheet(BY_ID[b.dataset.word])));
  },
  settings(v) {
    $$('[data-set]', v).forEach(el => el.addEventListener('change', () => {
      const k = el.dataset.set;
      set()[k] = el.type === 'checkbox' ? el.checked : Number(el.value);
      St.save(); applySettings();
    }));
    $('[data-export]', v).addEventListener('click', exportBackup);
    $('[data-paste]', v).addEventListener('click', pasteBackup);
    $('[data-import]', v).addEventListener('change', async e => {
      try { await St.importBackup(e.target.files[0]); applySettings(); toast('✅ Vordering gelaai!'); render(); }
      catch { toast('❌ Die lêer werk nie.'); }
    });
    $('[data-intro]', v).addEventListener('click', onboarding);
    $('[data-reset]', v).addEventListener('click', () => {
      if (confirm('Alles uitvee en van voor af begin? Dit kan nie ongedaan gemaak word nie.')) { St.reset(); applySettings(); render(); }
    });
  },
};

// Shared recording panel (lessons and woordeboek): status line, live level meter, auto-stop.
// Returns { url, heard, note } – note explains a silent recording or a mic error.
async function recordInto(out) {
  out.innerHTML = '<div class="tag">🎧 Mikrofoon word gereed gemaak…</div><div class="meter"><i></i></div>';
  const bar = $('.meter i', out);
  try {
    const r = await A.recordUtterance({
      onReady: () => { out.firstElementChild.textContent = '🔴 Praat nou! (tik 🎙️ as jy klaar is)'; },
      onLevel: l => { bar.style.width = `${Math.round(l * 100)}%`; },
    });
    return { ...r, note: r.heard ? '' : '🙉 Ek het niks gehoor nie. Is jou mikrofoon of AirPods gekoppel? Probeer weer met 🎙️.' };
  } catch (e) {
    return { url: null, heard: false, note: e?.name === 'NotAllowedError' ? '🎙️ Die app mag nie die mikrofoon gebruik nie. Gee toestemming in jou instellings.' : '🎙️ Mikrofoon nie beskikbaar nie.' };
  }
}

function wordSheet(w) {
  const c = S().cards[w.id];
  const days = c ? Math.max(0, Math.round((c.due - now()) / 864e5)) : null;
  const m = modal(`<div class="pic huge">${esc(w.pic)}</div><div class="word big">${esc(w.af)}</div>
    <div class="row center"><button class="aud big" data-play="${esc(w.af)}" data-v="f">🔊 👩</button><button class="aud big" data-play="${esc(w.af)}" data-v="m">🔊 👨</button><button class="aud" data-play="${esc(w.af)}" data-slow>🐢</button></div>
    ${en(w.en)}
    <div class="ex"><button class="aud sm" data-play="${esc(w.ex)}">🔊</button> ${hiWord(w.ex, w.af)}</div>
    <p class="soft">${c ? `🧠 Sterkte ${Math.round(retrievability(c) * 100)}% · volgende hersiening ${days ? `oor ${days} ${days === 1 ? 'dag' : 'dae'}` : 'nou'}` : '🆕 Nog nie geleer nie'}</p>
    ${A.canRecord() ? `<div class="tag">🗣️ Sê dit hardop en vergelyk</div><div class="row center"><button class="mic" data-rec aria-label="Neem op">🎙️</button></div><div class="speak-out"></div>` : ''}`);
  wireAudio(m);
  let on = false;
  $('[data-rec]', m)?.addEventListener('click', async e => {
    if (on) return A.stopUtterance();
    on = true; e.target.classList.add('on');
    const out = $('.speak-out', m);
    try {
      const r = await recordInto(out);
      out.innerHTML = `${r.note ? `<p class="soft">${r.note}</p>` : ''}${r.url ? `<div class="row center"><button class="btn ghost sm" data-mine>▶️ Jy</button><button class="btn ghost sm" data-model>🔊 Model</button></div>` : ''}`;
      $('[data-mine]', out)?.addEventListener('click', () => A.playRecording(r));
      $('[data-model]', out)?.addEventListener('click', () => A.play(w.af));
      if (r.url) A.playRecording(r).then(ok => ok && m.isConnected && A.play(w.af));
    } finally { on = false; e.target.classList.remove('on'); }
  });
  A.play(w.af);
}

// Backup: share sheet where available (iOS), else a file download, else copy-able text.
async function exportBackup() {
  const json = St.backupJson(), name = `afrikaans-rugsteun-${St.dayKey()}.json`;
  const file = new File([json], name, { type: 'application/json' });
  try {
    if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: name }); return toast('💾 Gestoor!'); }
  } catch (e) { if (e.name === 'AbortError') return; }
  if (!window.Capacitor) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file); a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return toast('💾 Gestoor!');
  }
  const m = modal(`<h3>💾 Rugsteun</h3><p class="soft">Kopieer hierdie teks en stoor dit in jou notas.</p><textarea class="type" readonly rows="6">${esc(json)}</textarea><button class="btn primary" data-copy>📋 Kopieer</button>`);
  $('[data-copy]', m).addEventListener('click', () => navigator.clipboard?.writeText(json).then(() => toast('📋 Gekopieer!'), () => { $('textarea', m).select(); }));
}
function pasteBackup() {
  const m = modal(`<h3>📋 Plak rugsteun</h3><textarea class="type" rows="6" placeholder="{...}"></textarea><button class="btn primary" data-load>⬆️ Laai</button>`);
  $('[data-load]', m).addEventListener('click', async () => {
    try { await St.importBackup(new Blob([$('textarea', m).value])); m.parentElement.remove(); applySettings(); render(); toast('✅ Vordering gelaai!'); }
    catch { toast('❌ Die teks werk nie.'); }
  });
}

function modal(html) {
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal" role="dialog"><button class="x" aria-label="Maak toe">✕</button>${html}</div>`;
  document.body.append(bg);
  const close = () => { A.stop(); bg.remove(); };
  bg.addEventListener('click', e => { if (e.target === bg) close(); });
  $('.x', bg).addEventListener('click', close);
  return $('.modal', bg);
}

function onboarding() {
  const m = modal(`<div class="pic huge">👋</div><h2>Welkom!</h2>
    <div class="flow"><span>👂<small>Luister</small></span>➜<span>👀<small>Kyk</small></span>➜<span>🗣️<small>Praat</small></span>➜<span>✍️<small>Skryf</small></span></div>
    <p class="soft">Afrikaans in Afrikaans. Prentjies en klank wys die betekenis – nie Engels nie.</p>
    <p class="soft small">You will learn Afrikaans directly through pictures, sound and stories, without translating. That builds a direct link from word to meaning, which is faster to use when speaking. Guess from the pictures; mistakes are part of learning.</p>
    <h3>⭐ Hoeveel tyd per dag?</h3>
    <div class="goals">${[[15, '☕', '3 min'], [30, '🚶', '6 min'], [60, '🏃', '12 min'], [100, '🚀', '20 min']].map(([g, i, t]) => `<button class="goalbtn ${set().goal === g ? 'on' : ''}" data-goal="${g}"><span>${i}</span>${t}</button>`).join('')}</div>
    <button class="btn primary big" data-go>Kom ons begin! ▶</button>`);
  $$('[data-goal]', m).forEach(b => b.addEventListener('click', () => { set().goal = +b.dataset.goal; $$('[data-goal]', m).forEach(x => x.classList.toggle('on', x === b)); }));
  $('[data-go]', m).addEventListener('click', () => {
    S().onboarded = true; St.save();
    m.parentElement.remove();
    A.play('Welkom! Kom ons begin.', 'f');
    render();
  });
}

function applySettings() {
  A.setRate(set().slow ? 0.75 : 1);
  A.setSfx(set().sfx);
}

// ---------------- global wiring ----------------
document.addEventListener('click', e => {
  const s = e.target.closest('[data-start]');
  if (s) { const spec = PATH.find(l => l.key === s.dataset.start); if (spec) startLesson(spec); }
  if (e.target.closest('[data-daystart]')) { const ids = dayStartItems(); if (ids.length) startLesson({ type: 'daystart', ids: shuffle(ids) }); }
  const r = e.target.closest('[data-review]');
  if (r) {
    let ids = dueCards().slice(0, 20);
    if (!ids.length) {
      const learned = Object.keys(S().cards).filter(id => BY_ID[id]);
      if (!learned.length) return toast('Leer eers ’n paar woorde. ▶');
      ids = learned.sort((a, b) => retrievability(S().cards[a]) - retrievability(S().cards[b])).slice(0, 12);
      toast('✓ Niks is nou nodig nie – ekstra oefening met jou swakste woorde.');
    }
    startLesson({ type: 'review', ids: shuffle(ids) });
  }
});
$$('#nav button').forEach(b => b.addEventListener('click', () => { tab = b.dataset.tab; A.stop(); render(); }));
$('#lesson .lclose').addEventListener('click', () => {
  if (!L || L.i === 0 || L.i >= L.steps.length || confirm('Wil jy ophou? Wat jy klaar gedoen het, word gestoor.')) closeLesson(true);
});

// Keyboard: 1-4 pick, Enter = check / continue, Esc = close.
document.addEventListener('keydown', e => {
  if (!L || lessonEl().hidden) return;
  const typing = /INPUT|TEXTAREA|SELECT/.test(e.target?.tagName);
  if (!typing && /^[1-4]$/.test(e.key)) $$('.lbody .choice')[+e.key - 1]?.click();
  if (e.key === 'Enter' && !typing) { const b = $('.lfoot [data-next], .lfoot [data-check]:not(:disabled)'); if (b) { e.preventDefault(); b.click(); } }
  if (e.key === 'Escape') $('#lesson .lclose').click();
});

// Offline: service worker (web only; the iOS app ships every file inside the app).
if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !window.Capacitor) {
  // Self-updating: check whenever the app is opened or comes back to the front (home-screen apps
  // on iPhone usually resume instead of reloading) and every 30 min. When the new version has
  // finished downloading it takes over and the page reloads itself, after any open lesson.
  const hadController = !!navigator.serviceWorker.controller;
  // Android/Chrome say whether we are on Wi-Fi; iPhone does not, so there we always allow it
  // (updates are small: audio is reused from the previous version).
  const okToUpdate = () => { const c = navigator.connection; return navigator.onLine && !c?.saveData && (!c?.type || ['wifi', 'ethernet'].includes(c.type)); };
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(reg => {
    const check = () => okToUpdate() && reg.update().catch(() => {});
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    addEventListener('online', check);
    setInterval(check, 30 * 60e3);
  }).catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || updatePending) return; // first install: nothing to refresh
    updatePending = true;
    if (!L) reloadForUpdate();
  });
  navigator.serviceWorker.addEventListener('message', e => { if (e.data?.type === 'cached' && !hadController) toast(`✅ Gereed vir gebruik sonder internet (${e.data.n} lêers)`); });
}
function reloadForUpdate() {
  toast('✨ Nuwe weergawe – word opgedateer…');
  setTimeout(() => location.reload(), 900);
}
navigator.storage?.persist?.().catch(() => {});

document.body.insertAdjacentHTML('beforeend', `<div id="ver" aria-hidden="true">v${window.APP_BUILD || '?'}</div>`);
applySettings();
render();
if (!S().onboarded) onboarding();
else maybeDayStart();
// Apps left open overnight: re-check the day when the app comes back to the front.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible' || L) return;
  render();
  maybeDayStart();
});
if ('speechSynthesis' in window) speechSynthesis.getVoices();
