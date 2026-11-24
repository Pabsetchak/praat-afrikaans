"""Record every Afrikaans text in tools/texts.json with Microsoft's neural Afrikaans voices
(af-ZA-AdriNeural, female; af-ZA-WillemNeural, male) into www/audio/<key>.mp3.

Needs internet once; the app then plays the files offline.
    python -m pip install edge-tts truststore
    python tools/gen_audio.py
"""
import asyncio, json, pathlib, sys

try:  # use the Windows/macOS certificate store (fixes SSL errors behind antivirus or proxies)
    import truststore; truststore.inject_into_ssl()
except ImportError:
    pass
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'www' / 'audio'
VOICES = {'f': 'af-ZA-AdriNeural', 'm': 'af-ZA-WillemNeural'}
RATE = '-8%'  # a touch slower than natural speech: clearer for learners


async def one(item, sem, stats):
    path = OUT / f"{item['key']}.mp3"
    if path.exists() and path.stat().st_size > 0:
        return
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(item['text'], VOICES[item['voice']], rate=RATE).save(str(path))
                if path.stat().st_size > 0:
                    stats['ok'] += 1
                    return
            except Exception as e:  # network hiccup: back off and retry
                err = e
                await asyncio.sleep(1.5 * (attempt + 1))
        stats['fail'].append((item['text'], str(err)))
        path.unlink(missing_ok=True)


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    items = json.loads((ROOT / 'tools' / 'texts.json').read_text(encoding='utf-8'))
    stats = {'ok': 0, 'fail': []}
    sem = asyncio.Semaphore(6)
    await asyncio.gather(*(one(i, sem, stats) for i in items))
    print(f"recorded {stats['ok']} new files; {len(stats['fail'])} failed")
    for t, e in stats['fail'][:10]:
        print('  FAIL', t, '->', e)
    return 1 if stats['fail'] else 0

if __name__ == '__main__':
    sys.exit(asyncio.run(main()))
