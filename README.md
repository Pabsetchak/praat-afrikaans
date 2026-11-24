# Praat Afrikaans

An offline Afrikaans learning app for English speakers. It teaches **in Afrikaans** through pictures, two-voice audio, stories and spaced repetition (FSRS), and covers the full South African school curriculum for Afrikaans Home Language (HT) and First Additional Language (EAT).

* **24 themed units:** 346 words, 106 grammar-pattern sentences and 24 stories, plus a 24-sound pronunciation course.
* **70 curriculum modules** (CAPS/KABV): grammar, writing formats with model texts, literature, critical language awareness, listening and speaking. 251 drills.
* **1,949 audio clips** (neural voices Adri and Willem), all offline.
* Listening, reading, writing (accent bar, dictation, sentence building, free writing) and speaking (record and compare, plus speech recognition where available).
* Streaks with earned freezes, daily goal, badges, progress stats and backup/restore. No account, no ads, no tracking.

Why it is built this way: see [docs/RESEARCH.md](docs/RESEARCH.md).

## Run it on this PC

```powershell
python -m http.server 8090 --directory www
```

Open http://localhost:8090. After the first load it works with no internet.

## Put it online (web app for any phone)

1. Create a GitHub repository and push this folder.
2. In the repository go to **Settings → Pages → Source: GitHub Actions**.
3. The workflow `.github/workflows/pages.yml` publishes `www/`.
4. On iPhone, open the link in Safari, tap **Share → Add to Home Screen**. On Android, Chrome offers **Install app**.

## Get the iOS app (.ipa)

Building iOS apps needs a Mac, so a GitHub-hosted Mac does it for you:

1. Push this folder to GitHub (step 1 above).
2. Go to **Actions → Build iOS IPA → Run workflow**. It takes about 10 minutes.
3. Download the **PraatAfrikaans-ipa** artifact and unzip it to get `PraatAfrikaans.ipa`.
4. Install it on your iPhone:
   * **Sideloadly** (Windows/Mac): plug in the iPhone, drag the .ipa in, sign in with your Apple ID.
   * or **AltStore**.
   * On the iPhone: **Settings → General → VPN & Device Management**, trust your Apple ID. On iOS 16+ also turn on **Settings → Privacy & Security → Developer Mode**.
   * Free Apple ID: re-sign every 7 days (Sideloadly or AltStore can refresh it). A paid Apple Developer account gives 1-year installs and TestFlight distribution.

The bundle ID is set in `capacitor.config.json` (`app.praatafrikaans.leer`). Change it if you publish under your own developer account.

## Change or add content

* Words, patterns and stories: `www/js/course.js` (one line per word: `afrikaans|emoji|example sentence|english`).
* Curriculum modules: `www/js/curriculum.js` (drills: `?question|right|wrong|wrong` or `=instruction|answer|alternative`).
* Sounds: the `SOUNDS` list in `course.js`.
* After editing, record the new audio and refresh the offline file list:

```powershell
python -m pip install edge-tts truststore
```

```powershell
npm run audio
```

`npm run audio` checks the course for mistakes (duplicate words, bad drill lines), records only missing clips, and bumps the app version so installed copies update.

## Project layout

```
www/                 the app (this is what gets published and packaged)
  index.html, css/, js/app.js (UI and lesson engine), js/fsrs.js (scheduler),
  js/course.js, js/curriculum.js, js/resources.js, js/audio.js, js/store.js
  sw.js              offline service worker
  audio/             generated voice clips
tools/build.mjs      course checks, audio list, offline manifest, version
tools/gen_audio.py   records audio with Azure neural Afrikaans voices
tools/make_icons.py  draws the app icons
.github/workflows/   ios.yml (unsigned .ipa), pages.yml (web hosting)
docs/RESEARCH.md     learning-science basis, curriculum map, restrictions and fixes
```
