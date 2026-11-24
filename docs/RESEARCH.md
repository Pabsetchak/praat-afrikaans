# Praat Afrikaans: research basis and design decisions

This document explains why the app works the way it does. Every major feature is tied to a research finding or a real-world constraint.

## 1. Goal

An English first-language speaker should end up able to **understand, speak, read and write Afrikaans** with as little reliance on English as possible, in the shortest realistic time. The app should also cover everything in the South African school curricula for Afrikaans as a **first language** (Huistaal, HT) and as a **second language** (Eerste Addisionele Taal, EAT).

## 2. How the brain learns vocabulary: findings and how the app uses them

| Finding | Evidence | What the app does |
|---|---|---|
| **Retrieval practice beats re-reading.** Testing yourself strengthens memory far more than studying again. | Rowland (2014), meta-analysis in *Psychological Bulletin* 140(6), testing effect g ≈ 0.50 to 0.63. The effect is larger when initial retrieval succeeds (below about 50% initial success the benefit disappears). | Nearly every screen asks you to *produce or recognise* something. New words are introduced, then immediately retrieved with an easy recognition task first (high success), then harder recall later. |
| **Spaced repetition.** Reviews spread out over growing intervals beat massed practice. FSRS predicts forgetting better than the older SM-2 (Anki's classic algorithm). | Open-spaced-repetition benchmark (about 10k Anki collections): FSRS is more accurate than SM-2 for about 99.5% of users. Anki's docs report fewer reviews for the same retention. | Every word, grammar sentence and curriculum drill is scheduled with **FSRS-4.5** at a target retention of 90% (adjustable to 85% or 95%). |
| **Pictures build a direct word-to-meaning link; translation builds a word-to-word link.** | Lotto & de Groot (1998) and later ERP studies (e.g. *Bilingualism: Language and Cognition*, doi 10.1017/S1366728921000456): picture-based learning connects L2 words to the semantic system directly, while translation learning routes through L1. | Meaning is shown with **pictures (emoji), sound and context sentences, never English translations.** English glosses exist only behind an optional "English help" switch, off by default. |
| **Desirable difficulty.** Exercises should get harder as memory strengthens. | Bjork's desirable-difficulties framework; retrieval-practice moderators (above). | Exercise type depends on FSRS stability: recognition (listen or read, pick the picture), then choosing the word and cloze, then typing from a picture, dictation and speaking. |
| **High-variability phonetic training.** Hearing several voices helps learners generalise sounds. | Logan, Lively & Pisoni (1991) and follow-ups on HVPT. | Every word and sentence is recorded in **two neural voices** (female Adri and male Willem) and the app alternates between them. |
| **Comprehensible input.** Reading and listening to text that is *almost* fully understood drives acquisition. Reading comprehension needs about 95% (minimum) to 98% (comfortable) of words known. | Krashen's input hypothesis; Nation (2006), Hu & Nation (2000); Schmitt et al. (2011). | Every unit ends with a short **story or dialogue** built from that unit's words, with tap-any-word picture glosses. The resources page points to graded readers (African Storybook, Book Dash). |
| **Frequency first.** A few thousand word families cover most everyday language. | Nation (2006). | Units start with the highest-frequency vocabulary and function words: greetings, pronouns, numbers, food, verbs, question words, time. |
| **Grammar through patterns, not lectures.** | Implicit and explicit learning research; usage-based approaches. | Each unit has a **pattern card** (e.g. *nie … nie*, verb-second, *het ge-*) with colour-highlighted examples and audio, followed by sentence-building practice that makes you produce the pattern. |
| **Production practice: speaking and writing.** | Output hypothesis (Swain); generation effect. | Sentence building, dictation, typing with an accent bar (ê ë ô ï 'n), recording yourself and comparing with the model voice, and free writing tasks in the curriculum. |
| **Habits form through small daily repetition; streaks raise retention, but broken streaks cause drop-off.** | Lally et al. (2010) on habit formation; Duolingo A/B tests (streaks raised Day-7 retention); *Journal of Consumer Research* work showing broken streaks lead to quitting. | Small daily goal (3 to 20 minutes), streak counter, and **earned streak freezes** (1 per 7-day streak, max 2) so one missed day does not destroy weeks of progress. No purchasable repairs. |
| **Cognitive load.** Too many new items at once hurts retention. | Sweller's cognitive load theory. | Lessons introduce 5 new words. There is a daily new-word cap (default 12) and a nudge to review instead when you reach it. |

## 3. Teaching without English

* **Concrete words:** emoji pictures plus two-voice audio plus an example sentence.
* **Abstract and function words** (*want, omdat, maar, nog*): concept symbols, example sentences, and the patterns they appear in.
* **Grammar explanations:** written in short, simple Afrikaans using words already taught, with arrows, colour highlighting and symbols (🚫 for negation, ⏪ for past).
* **Survival phrases** (unit 23) teach learners to stay in Afrikaans in real conversations: *Wat beteken dit? Praat stadiger, asseblief. Hoe sê 'n mens dit in Afrikaans?*
* **Escape hatch:** an optional English-help toggle, off by default, for learners who get stuck. Research supports occasional L1 support for abstract items, but the default path is Afrikaans-only.

## 4. Content sources and accuracy

* **Spelling** follows the *Afrikaanse Woordelys en Spelreëls* (AWS, Taalkommissie of the SA Akademie vir Wetenskap en Kuns), for example *goeiemôre* as one word, days and months in lower case, and *'n* followed by a capital at the start of a sentence.
* **Grammar** follows the standard descriptions in Taalportaal (taalportaal.org) and the CAPS reference table.
* **Curriculum coverage** maps to the official **CAPS / KABV Afrikaans Huistaal Gr 10–12, Addendum 1: Taalstrukture en -konvensies** (Department of Basic Education, 2011) and the EAT documents for Gr 4–12. The *Skool* tab covers:
  * **Woordsoorte:** lidwoorde; selfstandige naamwoorde (soort-, eie-, abstrakte, versamel-, massa- en maatname; meervoude; verkleining; geslag); telwoorde; voornaamwoorde (all 8 kinds incl. betreklik, wederkerend, wederkerig); werkwoorde (tye, historiese teenwoordige tyd, hulp- en koppelwerkwoorde, oorganklik/onoorganklik, skeibaar, infinitief); deelwoorde (teenwoordig, swak/sterk verlede); byvoeglike naamwoorde (attributief/predikatief, verbuiging, trappe, intensiewe vorme); bywoorde; voorsetsels (vaste verbindings); voegwoorde; tussenwerpsels.
  * **Sinsbou:** STOMPI and tyd-wyse-plek; sinsdele; sinsoorte and sinswyse; saamgestelde and veelvoudige sinne; ontkenning; direkte en indirekte rede; lydende en bedrywende vorm; verbindingswoorde.
  * **Woordeskat en betekenis:** sinonieme, antonieme, homonieme, homofone, paronieme, polisemie, een woord vir 'n omskrywing, idiome, spreekwoorde, woordvorming (simpleks/kompleks, samestelling, afleiding, samestellende afleiding, kern en bepaler, klinkerwisseling), herkoms (erfgoed, leengoed, neologismes, volksetimologie, anglisismes), pleonasme, toutologie, kontaminasie.
  * **Klank en spelling:** vokale, konsonante, diftonge, lettergrepe, spelreëls, skryftekens (kappie, deelteken, afkappingsteken, koppelteken, akuut), hoofletters, afkortings, akronieme, leestekens.
  * **Beeldspraak en stylfigure:** vergelyking, metafoor, personifikasie, hiperbool, klanknabootsing, alliterasie, assonansie, retoriese vraag, kontras, ironie, sarkasme, eufemisme, litotes, oksimoron, paradoks, antitese, simboliek, klimaks/antiklimaks, sinekdogee, metonimia, sinestesie, woordspeling, satire, antonomasia, elisie.
  * **Kritiese taalbewustheid:** feit en mening, denotasie en konnotasie, register, sleng, standaardtaal, taalvariëteite, manipulerende taal, stereotipering, partydigheid.
  * **Skryf en aanbied:** model texts plus checklists plus a free-writing task (saved to *My skryfboek*) for: vriendskaplike brief, formele brief, e-pos, dagboekinskrywing, uitnodiging, dialoog, toespraak, koerantberig en verslag, resensie, advertensie, instruksies en resep, CV, agenda en notule, the five opstel types, and opsomming.
  * **Letterkunde:** poësie (rym, ritme, strofe, enjambement, stemming, toon, tema), kortverhaal en roman (intrige-struktuur, konflik, verteller, ironiese wending), drama (toneelaanwysings, alleenspraak, dramatiese ironie), volksverhale, fabels, mites, and visuele geletterdheid (strokiesprente, advertensies, filmtegnieke).
  * **Luister en praat:** telefoon- en formele gesprekke, onderhoude, debat en groepsbespreking, voorbereide en onvoorbereide toesprake, voorstel en bedank van 'n spreker.
  * Each topic is tagged **EAT + HT** (needed for both) or **HT** (Home Language only). The *EAT* filter shows the second-language subset.
  * Prescribed set works (specific novels, dramas and poems) change by year and province. The app teaches the literary skills and terms with original texts. Learners should read the prescribed works themselves.
* **Audio:** Microsoft Azure neural voices *af-ZA-AdriNeural* and *af-ZA-WillemNeural*, generated once and shipped as files. Native-speaker recordings would be better still; Forvo is linked for that.

## 5. Restrictions found, and how each is handled

| Restriction | Impact | Fix in this app |
|---|---|---|
| **Building an iOS app (.ipa) needs macOS and Xcode.** | Cannot compile on Windows. | The web app is wrapped with **Capacitor 7**, and a **GitHub Actions workflow** (`.github/workflows/ios.yml`) builds an unsigned `.ipa` on a GitHub-hosted Mac. |
| **Installing an .ipa needs signing.** Apple only allows signed apps. | An unsigned .ipa will not install by itself. | Install with **Sideloadly** or **AltStore** (Windows or Mac), which sign it with your own Apple ID. Free Apple IDs must re-sign every 7 days; a paid Apple Developer account ($99/yr) gives 1-year signing and TestFlight. |
| **iOS Safari deletes website data after 7 days without a visit.** | Progress could vanish for browser-only users. | The app prompts iPhone users to **Add to Home Screen** (home-screen apps are exempt), requests persistent storage, and offers **backup export/import** (share sheet, file, or copy/paste) with a reminder every 14 days. The native iOS app does not have this limit. |
| **Many phones have no Afrikaans text-to-speech voice.** | Audio would be silent offline. | All **1,949 clips are pre-recorded** and cached offline. Device TTS is only a last-resort fallback. |
| **The iPhone silent switch mutes web audio in apps.** | Lessons would be silent. | The CI build sets the iOS audio session to *playback*, so lesson audio plays with the switch on. |
| **iOS only allows audio after a tap.** | Auto-play could fail. | One shared audio element is unlocked on the first tap and reused. |
| **Speech recognition for Afrikaans is rare and usually online-only.** | Automatic pronunciation scoring is not available everywhere. | Where the browser offers Afrikaans recognition online, it is used. Everywhere else: **record yourself, hear yourself, then hear the model**, and self-rate. This is the shadowing method and works fully offline. A "Nie nou nie" button snoozes speaking for 15 minutes (e.g. on a bus). |
| **Offline use.** | Needs every file locally. | A service worker precaches the whole app (about 1,970 files, about 30 MB) on first visit; versioned caches update automatically. The iOS app ships all files inside the bundle. |
| **No push reminders on iOS web without extra setup.** | Fewer nudges. | Streaks, daily goal ring, freezes, badges and a visible "Hersien (n)" count. Push notifications were left out to keep the app fully offline and account-free. |
| **Emoji look slightly different per device; flags do not show on Windows.** | Minor visual differences. | Emoji were chosen from widely supported sets. Distractor options never share an emoji with the right answer. |

## 6. Engagement design, kept honest

* Daily XP goal with a progress ring, streaks with *earned* freezes, 19 badges, confetti on perfect lessons, a 12-week activity heatmap, a 7-day review forecast, and skill counters for listening, reading, writing and speaking.
* Short sessions (3 to 20 minutes), one big "Gaan voort" button, and no locked content: any unit or module can be opened.
* No ads, no accounts, no data leaves the device.

## Sources

* Rowland, C. A. (2014). The effect of testing versus restudy on retention: a meta-analytic review of the testing effect. *Psychological Bulletin*, 140(6), 1432–1463. https://pubmed.ncbi.nlm.nih.gov/25150680/
* Karpicke (2025), retrieval-based learning review. https://learninglab.psych.purdue.edu/downloads/2025/2025_Karpicke_Retrieval_Based_Learning_Review.pdf
* FSRS and the open-spaced-repetition benchmark; Anki manual on FSRS. https://docs.ankiweb.net/faqs/what-spaced-repetition-algorithm
* Picture vs. translation learning (ERP study). https://doi.org/10.1017/s1366728921000456
* Nation, I. S. P. (2006). How large a vocabulary is needed for reading and listening? https://www.wgtn.ac.nz/__data/assets/pdf_file/0018/1626120/2006-How-large-a-vocab.pdf
* Schmitt, Jiang & Grabe (2011), lexical coverage and comprehension. https://www.lextutor.ca/cover/papers/schmitt_etal_2011.pdf
* Duolingo on streaks. https://blog.duolingo.com/improving-the-streak · The Decision Lab, "Streak creep". https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification
* Afrikaans grammar: Taalportaal https://www.taalportaal.org · Afrikaans grammar overview https://en.wikipedia.org/wiki/Afrikaans_grammar · Negation in Afrikaans (Lancaster) https://eprints.lancs.ac.uk/id/eprint/228919/1/Negation_in_Afrikaans.pdf
* AWS / Taalkommissie. https://en.wikipedia.org/wiki/Afrikaanse_Woordelys_en_Spelre%C3%ABls
* CAPS Afrikaans Huistaal Gr 10–12. https://www.education.gov.za/Portals/0/CD/National%20Curriculum%20Statements%20and%20Vocational/CAPS%20FET%20_%20HOME%20_%20AFRIKAANS%20GR%2010-12%20_%20WEB_0544.PDF
* CAPS Afrikaans EAT Gr 7–9. https://www.education.gov.za/Portals/0/CD/National%20Curriculum%20Statements%20and%20Vocational/CAPS%20SP%20%20FAL%20%20AFRIKAANS%20GR%207-9%20%20WEB.pdf · Gr 10–12 https://www.education.gov.za/Portals/0/CD/National%20Curriculum%20Statements%20and%20Vocational/CAPS%20FET%20_%20FAL%20_%20AFRIKAANS%20GR%2010-12%20_%20WEB_9455.pdf
* iOS PWA storage and limits. https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide
* Azure Afrikaans neural voices. https://learn.microsoft.com/en-my/AZURE/ai-services/speech-service/language-support
* Unsigned IPA via GitHub Actions and sideloading. https://dev.to/oivoodoo/build-unsigned-ios-ipa-to-install-via-sideloadly-236f
