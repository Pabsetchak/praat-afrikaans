// Build step: checks the course, lists every text that needs a recording (tools/texts.json),
// and writes the offline file list (www/assets.json) and version (www/version.js).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { UNITS, SOUNDS, WORDS, SENTENCES, strip } from '../www/js/course.js';
import { MODULES } from '../www/js/curriculum.js';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const www = join(root, 'www');

// Same FNV-1a as www/js/audio.js
const fnv = s => { let h = 0x811c9dc5; for (const b of Buffer.from(s, 'utf8')) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const key = (t, v) => fnv(v + '|' + strip(t).trim());

// ---- course checks ----
const problems = [];
const ids = new Map();
for (const w of [...WORDS, ...SENTENCES]) {
  if (ids.has(w.id)) problems.push(`duplicate id ${w.id} (${ids.get(w.id)} and ${w.unit})`);
  ids.set(w.id, w.unit);
  if (!w.pic) problems.push(`no picture for ${w.id}`);
  if (w.kind === 'w' && (!w.ex || !w.en)) problems.push(`missing example/english for ${w.id}`);
}
for (const u of UNITS) for (const [q, opts, a] of u.story.q) if (!opts[a]) problems.push(`bad answer index in ${u.id}: ${q}`);
if (problems.length) { console.error('Course problems:\n  ' + problems.join('\n  ')); process.exit(1); }

// ---- texts to record ----
const texts = new Map();
const add = (t, voices = ['f', 'm']) => { for (const v of voices) texts.set(key(t, v), { voice: v, text: strip(t).trim() }); };
for (const w of WORDS) { add(w.af); add(w.ex); }
for (const s of SENTENCES) add(s.af);
for (const u of UNITS) for (const l of u.story.lines) add(l.text, [l.v]);
for (const s of SOUNDS) for (const w of s.w) add(w);
add('Welkom! Kom ons begin.', ['f']);
for (const m of MODULES) {
  for (const x of m.ex || []) add(x, ['f']);
  if (m.g === 'lit' && m.text) for (const l of m.text.split('\n')) if (l.trim()) add(l, ['f']);
  for (const [i, line] of (m.d || []).entries()) if (!/^[?=]/.test(line) || line.slice(1).split('|').length < 2) problems.push(`bad drill ${m.id}:${i}`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
writeFileSync(join(root, 'tools', 'texts.json'), JSON.stringify([...texts].map(([k, v]) => ({ key: k, ...v })), null, 1));
const missing = [...texts.keys()].filter(k => !existsSync(join(www, 'audio', k + '.mp3')));

// ---- offline file list + version ----
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const skip = new Set(['assets.json', 'version.js']);
const files = walk(www).map(p => relative(www, p).split('\\').join('/'))
  .filter(f => !skip.has(f) && !f.startsWith('.'))
  .filter(f => !f.startsWith('audio/') || texts.has(f.slice(6, -4))) // drop stale recordings
  .sort();
const h = createHash('sha1');
for (const f of files) h.update(f).update(readFileSync(join(www, f)));
const version = h.digest('hex').slice(0, 10);
writeFileSync(join(www, 'assets.json'), JSON.stringify(['./', 'version.js', ...files]));
writeFileSync(join(www, 'version.js'), `self.APP_VERSION = '${version}';\n`);

console.log(`units ${UNITS.length} · words ${WORDS.length} · pattern sentences ${SENTENCES.length} · sounds ${SOUNDS.length}`);
console.log(`recordings ${texts.size} (${missing.length} missing) · offline files ${files.length} · version ${version}`);
