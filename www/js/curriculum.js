// Afrikaans school curriculum track, mapped to CAPS (KABV):
//   HT  = Afrikaans Huistaal (first language)          – Addendum 1: Taalstrukture en -konvensies, Gr 10–12
//   EAT = Afrikaans Eerste Addisionele Taal (second language) – everything marked EAT is also in HT
// Module fields: id, g (group), t (title), i (icon), lv ('EAT' | 'HT'), r (rule, Afrikaans), en (English help),
//   ex (examples, *highlight*), d (drills), plus optional text (model text / poem / story) and check (checklist).
// Drill lines:  ?question|right answer|wrong|wrong      (multiple choice, options shuffled)
//               =instruction: sentence|answer|other accepted answer   (type the answer)

export const GROUPS = [
  { id: 'woord', t: 'Woordsoorte', i: '🧱' },
  { id: 'sin', t: 'Sinsbou', i: '🧩' },
  { id: 'bet', t: 'Woordeskat en betekenis', i: '💡' },
  { id: 'spel', t: 'Klank, spelling en leestekens', i: '✏️' },
  { id: 'styl', t: 'Beeldspraak en stylfigure', i: '🎭' },
  { id: 'krit', t: 'Kritiese taalbewustheid', i: '🔍' },
  { id: 'skryf', t: 'Skryf en aanbied', i: '📝' },
  { id: 'lit', t: 'Letterkunde', i: '📚' },
  { id: 'praat', t: 'Luister en praat', i: '🎤' },
];

export const MODULES = [
// ───────────────────────── WOORDSOORTE ─────────────────────────
{ id: 'lidwoord', g: 'woord', t: 'Lidwoorde', i: '🔤', lv: 'EAT',
  r: "Bepaalde lidwoord: die (ons ken die ding). Onbepaalde lidwoord: ’n (enige een). Ná ’n aan die begin van ’n sin kry die volgende woord die hoofletter.",
  en: "Definite article 'die' (the), indefinite ''n' (a/an). At the start of a sentence the word after 'n is capitalised.",
  ex: ["*Die* hond blaf.", "Ek sien *’n* hond.", "*’n* Man staan by die deur."],
  d: ["?Watter lidwoord is onbepaald?|’n|die|dié", "?Kies reg: ___ son skyn vandag.|Die|’n|’N", "?Kies die regte hoofletter:|’n Kat slaap.|’N kat slaap.|’n kat slaap."] },

{ id: 'snw', g: 'woord', t: 'Selfstandige naamwoorde', i: '🏷️', lv: 'EAT',
  r: "’n Selfstandige naamwoord noem ’n ding. Soortnaam: hond, stad. Eienaam (hoofletter): Thabo, Kaapstad. Abstrak (kan nie aanraak nie): liefde, vrees. Versamelnaam: ’n trop, ’n swerm. Massanaam (kan nie tel nie): water, sand. Maatnaam: ’n liter, ’n kilogram.",
  en: "Nouns: common, proper (capital), abstract, collective, mass and measure nouns.",
  ex: ["*Thabo* woon in *Kaapstad*.", "Sy *liefde* vir musiek is groot.", "’n *Swerm* bye vlieg oor die tuin.", "Koop ’n *liter* melk."],
  d: ["?Watter woord is ’n abstrakte selfstandige naamwoord?|vreugde|tafel|Durban", "?Watter woord is ’n eienaam?|Pretoria|stad|rivier", "?Watter woord is ’n massanaam?|sand|klip|boek", "?Watter woord is ’n maatnaam?|kilogram|suiker|winkel"] },

{ id: 'meervoud', g: 'woord', t: 'Meervoude', i: '➕', lv: 'EAT',
  r: "Meeste woorde: + -e (hond → honde) of + -s (tafel → tafels). Kort klinker: verdubbel die medeklinker (kat → katte). Lang klinker word enkel (maan → mane). Party is onreëlmatig: skip → skepe, stad → stede, dag → dae, oog → oë, kind → kinders. Lang klinker aan die einde: foto → foto’s.",
  en: "Plurals: -e or -s; double the consonant after a short vowel; long vowels become single; irregulars; apostrophe-s after a final long vowel.",
  ex: ["een kat, twee *katte*", "een maan, twee *mane*", "een skip, twee *skepe*", "een foto, twee *foto’s*"],
  d: ["=Skryf die meervoud: boom|bome", "=Skryf die meervoud: pen|penne", "=Skryf die meervoud: stad|stede", "=Skryf die meervoud: kamera|kamera’s|kamera's", "=Skryf die meervoud: dag|dae", "=Skryf die meervoud: lid|lede", "?Meervoud van ‘been’ (liggaam):|bene|beene|beens"] },

{ id: 'verklein', g: 'woord', t: 'Verkleinwoorde', i: '🤏', lv: 'EAT',
  r: "Ná d en t: -jie (hond → hondjie, kat → katjie). Ná f, g, k, p, s: -ie (boek → boekie, kop → koppie). Ná m: -pie (boom → boompie). Kort klinker + l, n, r, ng: -etjie (man → mannetjie, ring → ringetjie). Ná ’n lang klinker, l, n, r: -tjie (stoel → stoeltjie). -ing → -inkie (koning → koninkie).",
  en: "Diminutives: -jie, -ie, -pie, -etjie, -tjie, -kie depending on the final sound.",
  ex: ["’n *hondjie*", "’n *boekie*", "’n *boompie*", "’n *mannetjie*", "’n *stoeltjie*"],
  d: ["=Verkleinwoord: voet|voetjie", "=Verkleinwoord: raam|raampie", "=Verkleinwoord: bal|balletjie", "=Verkleinwoord: kous|kousie", "=Verkleinwoord: ketting|kettinkie", "?Verkleinwoord van ‘skoen’:|skoentjie|skoenie|skoenpie"] },

{ id: 'geslag', g: 'woord', t: 'Geslag', i: '⚧', lv: 'EAT',
  r: "Party selfstandige naamwoorde het ’n manlike en ’n vroulike vorm: -in, -es, -e, of ’n ander woord.",
  en: "Masculine and feminine noun forms.",
  ex: ["leeu – *leeuin*", "onderwyser – *onderwyseres*", "koning – *koningin*", "hings – *merrie*", "haan – *hen*"],
  d: ["=Vroulike vorm: vriend|vriendin", "=Vroulike vorm: prins|prinses", "=Vroulike vorm: neef|niggie", "=Vroulike vorm: bul|koei", "=Vroulike vorm: oom|tante", "?Vroulike vorm van ‘ram’ (skaap):|ooi|rammin|koei"] },

{ id: 'versamel', g: 'woord', t: 'Versamelname', i: '🐝', lv: 'EAT',
  r: "’n Versamelnaam noem ’n groep van dieselfde soort.",
  en: "Collective nouns.",
  ex: ["’n *swerm* bye", "’n *trop* leeus", "’n *kudde* beeste", "’n *skool* visse", "’n *tros* druiwe", "’n *bos* blomme", "’n *vloot* skepe", "’n *skare* mense"],
  d: ["?’n ___ bye|swerm|trop|tros", "?’n ___ druiwe|tros|kudde|vloot", "?’n ___ skepe|vloot|swerm|bos", "?’n ___ mense by die konsert|skare|kudde|tros", "?’n ___ beeste|kudde|skool|vloot"] },

{ id: 'telwoord', g: 'woord', t: 'Telwoorde', i: '🔢', lv: 'EAT',
  r: "Hooftelwoorde tel: een, twee, drie, twintig, een-en-twintig. Rangtelwoorde wys die plek: eerste, tweede, derde, vierde, agtste, twintigste, honderdste.",
  en: "Cardinal and ordinal numbers.",
  ex: ["Ek het *drie* broers.", "Sy is die *derde* in die ry.", "Dit is my *een-en-twintigste* verjaarsdag."],
  d: ["=Rangtelwoord: een|eerste", "=Rangtelwoord: agt|agtste", "=Rangtelwoord: twintig|twintigste", "=Skryf in woorde: 21|een-en-twintig|een en twintig", "?Watter woord is ’n rangtelwoord?|sewende|sewe|sewentig"] },

{ id: 'vnw', g: 'woord', t: 'Voornaamwoorde', i: '👉', lv: 'EAT',
  r: "Persoonlik (onderwerp → voorwerp): ek → my, jy → jou, hy → hom, sy → haar, ons → ons, julle → julle, hulle → hulle, u → u. Besitlik: my, jou, sy, haar … (selfstandig: myne, joune, syne, hare, ons s’n). Aanwysend: hierdie, daardie, dié. Vraend: wie, wat, watter. Onbepaald: iemand, niemand, iets, niks, almal. Wederkerend: Hy was *hom*. Wederkerig: Hulle help *mekaar*.",
  en: "Pronouns: personal, possessive, demonstrative, interrogative, indefinite, reflexive, reciprocal.",
  ex: ["Ek sien *hom*.", "Die boek is *myne*.", "*Hierdie* huis is oud.", "Die kinders help *mekaar*.", "Sy skaam *haar*."],
  d: ["=Vervang die vetgedrukte woord: Ek sien Thabo.|Ek sien hom.", "=Vervang: Ek bel Anna.|Ek bel haar.", "?Die pen is nie joune nie, dit is ___.|myne|my|ek", "?Die twee vriende groet ___.|mekaar|hulle self|hom", "?Watter woord is ’n onbepaalde voornaamwoord?|iemand|hierdie|wie"] },

{ id: 'betreklik', g: 'woord', t: 'Betreklike voornaamwoorde', i: '🔗', lv: 'HT',
  r: "Verbind twee sinne. wat (mense en dinge), wie (ná ’n voorsetsel, vir mense: met wie), wie se (besit), waar + voorsetsel vir dinge (waarmee, waarvan, waaroor). Die werkwoord gaan na die einde.",
  en: "Relative pronouns: wat, wie (after preposition, people), wie se (whose), waar- + preposition (things). Verb goes last.",
  ex: ["Die man *wat* daar staan, is my oom.", "Die vrou *met wie* ek praat, is ’n dokter.", "Die seun *wie se* fiets gesteel is, huil.", "Die pen *waarmee* ek skryf, is nuut."],
  d: ["?Die mes ___ ek sny, is skerp.|waarmee|met wat|met wie", "?Die meisie ___ ek dans, is Lisa.|met wie|waarmee|wat met", "?Die kind ___ hond weggeloop het, soek oral.|wie se|wat se|waarvan", "=Verbind met ‘wat’: Ek het ’n boek. Die boek is lekker.|Ek het ’n boek wat lekker is.|Die boek wat ek het, is lekker."] },

{ id: 'ww_tye', g: 'woord', t: 'Werkwoorde: tye', i: '⏳', lv: 'EAT',
  r: "Teenwoordige tyd: Ek eet. Verlede tyd: Ek het geëet (het + ge-). Toekomende tyd: Ek sal eet / Ek gaan eet. Party werkwoorde het ’n eie verlede vorm: is → was, het → het gehad, kan → kon, moet → moes, wil → wou, sal → sou, mag → mog.",
  en: "Present, past (het ge-), future (sal / gaan). Irregular preterites: was, kon, moes, wou, sou, mog.",
  ex: ["Ek *lees* ’n boek.", "Ek *het* ’n boek *gelees*.", "Ek *sal* ’n boek *lees*.", "Ek *was* moeg.", "Hy *kon* nie kom nie."],
  d: ["=Verlede tyd: Ek speel sokker.|Ek het sokker gespeel.", "=Verlede tyd: Sy is siek.|Sy was siek.", "=Verlede tyd: Ons kan swem.|Ons kon swem.", "=Toekomende tyd met ‘sal’: Hy werk hard.|Hy sal hard werk.", "=Verlede tyd: Ek verstaan die les.|Ek het die les verstaan.", "?Verlede tyd van ‘Ek moet gaan’:|Ek moes gaan.|Ek het gemoet gaan.|Ek het moet gegaan."] },

{ id: 'ww_soorte', g: 'woord', t: 'Soorte werkwoorde', i: '⚙️', lv: 'HT',
  r: "Hoofwerkwoord: die handeling. Hulpwerkwoord van tyd (het, sal, gaan), van modaliteit (kan, moet, wil, mag) en van vorm (word, is – lydende vorm). Koppelwerkwoord koppel die onderwerp aan ’n beskrywing: is, word, bly, lyk, skyn, blyk. Oorganklik: het ’n voorwerp (Sy koop brood). Onoorganklik: geen voorwerp (Die baba slaap). Wederkerend: Ek skaam my. Onpersoonlik: Dit reën. Historiese teenwoordige tyd: ’n verlede gebeurtenis in die teenwoordige tyd vertel om dit lewendig te maak.",
  en: "Main, auxiliary (tense, modality, voice), linking, transitive, intransitive, reflexive and impersonal verbs; historic present.",
  ex: ["Sy *koop* brood. (oorganklik)", "Die baba *slaap*. (onoorganklik)", "Hy *lyk* moeg. (koppelwerkwoord)", "Ek *haas my*. (wederkerend)", "Gister loop ek in die straat af, en skielik *sien* ek ’n leeu! (historiese teenwoordige tyd)"],
  d: ["?In ‘Die water word koud’ is ‘word’ ’n …|koppelwerkwoord|hoofwerkwoord|onoorganklike werkwoord", "?Watter werkwoord is onoorganklik?|lag|koop|skop", "?‘kan’ in ‘Ek kan swem’ is ’n hulpwerkwoord van …|modaliteit|tyd|vorm", "?Watter sin het ’n onpersoonlike werkwoord?|Dit sneeu.|Hy sneeu.|Ek sneeu."] },

{ id: 'skeibaar', g: 'woord', t: 'Skeibare werkwoorde en die infinitief', i: '✂️', lv: 'EAT',
  r: "Skeibaar: opstaan → Ek staan vroeg op. → Ek het vroeg opgestaan. → Ek probeer om vroeg op te staan. Onskeibaar (be-, ver-, ont-, her-, oor- met klem op die werkwoord): Ek verstaan. → Ek het verstaan. Infinitief: om te + werkwoord aan die einde.",
  en: "Separable verbs split (staan … op, opgestaan, op te staan). Infinitive: om … te + verb.",
  ex: ["Ek *staan* om sesuur *op*.", "Ek het om sesuur *opgestaan*.", "Dit is moeilik *om* vroeg *op te staan*.", "Ek *bel* jou môre *op*."],
  d: ["=Teenwoordige tyd: aankom (Die trein …)|Die trein kom aan.", "=Verlede tyd: Ek skakel die lig af.|Ek het die lig afgeskakel.", "=Gebruik ‘om te’: Ek wil leer. (Ek probeer …)|Ek probeer om te leer.", "=Gebruik ‘om te’: opruim (Dit is tyd …)|Dit is tyd om op te ruim.", "?Verlede tyd van ‘Ek herhaal die sin’:|Ek het die sin herhaal.|Ek het die sin geherhaal.|Ek het die sin hergehaal."] },

{ id: 'deelwoord', g: 'woord', t: 'Deelwoorde', i: '🌀', lv: 'HT',
  r: "Teenwoordige deelwoord: werkwoord + -ende (lag → laggende kinders; loop → lopende water). Verlede deelwoord swak: ge- + werkwoord (’n gekookte eier). Sterk (ou vorme): gebroke, verlore, gesonke, gebore, geslepe.",
  en: "Present participle (-ende) and past participle, weak (ge-) and strong (gebroke, verlore).",
  ex: ["Die *laggende* kinders speel.", "*Lopende* water is skoon.", "Ek eet ’n *gekookte* eier.", "Hy het ’n *gebroke* hart.", "die *verlore* seun"],
  d: ["=Teenwoordige deelwoord: Die kinders sing. Die ___ kinders.|singende", "=Swak verlede deelwoord: Die vleis is gebraai. Die ___ vleis.|gebraaide", "?Watter een is ’n sterk verlede deelwoord?|gebroke|gebreekte|breekende", "?‘Die huilende baba’: ‘huilende’ is ’n …|teenwoordige deelwoord|verlede deelwoord|bywoord"] },

{ id: 'bnw', g: 'woord', t: 'Byvoeglike naamwoorde', i: '🎨', lv: 'EAT',
  r: "Predikatief (ná die werkwoord): Die huis is groot. Attributief (voor die naamwoord): die groot huis. Verbuiging: party kry -e voor die naamwoord: woorde op -ig, -lik, -s (vinnige, moeilike, Afrikaanse) en woorde wat verander (goed → goeie, nuut → nuwe, oud → ou, hoog → hoë, sag → sagte, laag → lae, dood → dooie). Baie ander bly dieselfde: groot, klein, mooi, rooi, wit.",
  en: "Predicative vs attributive adjectives and their inflection before nouns.",
  ex: ["Die motor is *vinnig*. → die *vinnige* motor", "Die berg is *hoog*. → die *hoë* berg", "Die dag is *goed*. → ’n *goeie* dag", "Die kat is *klein*. → die *klein* kat"],
  d: ["=Attributief: Die toets is moeilik. Die ___ toets.|moeilike", "=Attributief: Die bed is sag. Die ___ bed.|sagte", "=Attributief: Die skoene is nuut. Die ___ skoene.|nuwe", "=Attributief: Die man is oud. Die ___ man.|ou", "?Kies reg: ’n ___ boom|hoë|hoog|hooge"] },

{ id: 'trappe', g: 'woord', t: 'Trappe van vergelyking', i: '📈', lv: 'EAT',
  r: "Stellende trap: mooi. Vergrotende trap: + -er (mooier). Oortreffende trap: + -ste (mooiste). Ná r: -der (duur → duurder, ver → verder). Onreëlmatig: goed – beter – beste; baie – meer – meeste; min – minder – minste; graag – liewer – liefste. Lang woorde: meer / mees (die mees interessante).",
  en: "Degrees of comparison: -er, -ste, -der after r, irregular forms, meer/mees.",
  ex: ["Ben is *groot*, Sam is *groter*, Pa is die *grootste*.", "Hierdie boek is *duurder*.", "Sy sing die *beste*."],
  d: ["=Vergrotende trap: vinnig|vinniger", "=Oortreffende trap: sterk|sterkste", "=Vergrotende trap: swaar|swaarder", "=Vergrotende trap: goed|beter", "=Oortreffende trap: baie|meeste", "?Ek eet ___ vis as vleis. (graag)|liewer|graagter|meer graag"] },

{ id: 'intensief', g: 'woord', t: 'Intensiewe vorme', i: '💥', lv: 'HT',
  r: "’n Intensiewe vorm versterk die byvoeglike naamwoord: ’n woord word voor die byvoeglike naamwoord gesit en dit word een woord.",
  en: "Intensive forms: a prefix-word strengthens the adjective (spierwit = very white).",
  ex: ["*spierwit*", "*pikswart*", "*bloedrooi*", "*yskoud*", "*doodmoeg*", "*papnat*", "*kurkdroog*", "*stokoud*", "*smoorverlief*", "*vlymskerp*"],
  d: ["?___wit (baie wit)|spier|pik|bloed", "?___swart|pik|spier|sop", "?___koud|ys|kurk|vlym", "?___droog|kurk|pap|smoor", "?___verlief|smoor|stok|ys", "?___nat|pap|kurk|pik"] },

{ id: 'bywoord', g: 'woord', t: 'Bywoorde', i: '🧭', lv: 'EAT',
  r: "’n Bywoord sê meer oor die werkwoord. Tyd: gister, nou, altyd. Wyse: vinnig, stadig, hard. Plek: hier, daar, buite. Modaliteit (hoe seker): miskien, seker, beslis, waarskynlik. Volgorde in die sin: tyd – wyse – plek (TWP).",
  en: "Adverbs of time, manner, place and modality; order time–manner–place.",
  ex: ["Hy hardloop *vinnig*.", "Ons speel *buite*.", "*Miskien* kom sy môre.", "Ek ry *môre* *met die bus* *stad toe*."],
  d: ["?In ‘Sy praat sag’ is ‘sag’ ’n bywoord van …|wyse|tyd|plek", "?Watter een is ’n bywoord van modaliteit?|waarskynlik|gister|binne", "=Rangskik (TWP): Ek gaan (skool toe / môre / met die fiets).|Ek gaan môre met die fiets skool toe."] },

{ id: 'voorsetsel', g: 'woord', t: 'Voorsetsels en vaste verbindings', i: '📌', lv: 'EAT',
  r: "Voorsetsels wys plek, rigting of tyd: op, in, onder, langs, agter, voor, na, uit, deur, oor, om, teen, sedert. Baie woorde het ’n vaste voorsetsel: bang vir, lief vir, trots op, wag vir, dink aan, luister na, kyk na, glo in, hou van, verlief op, bestaan uit, sorg vir, droom van.",
  en: "Prepositions of place, direction and time; fixed combinations.",
  ex: ["Ek is bang *vir* slange.", "Sy is trots *op* haar seun.", "Ons wag *vir* die bus.", "Ek dink *aan* jou.", "Hy hou *van* sokker."],
  d: ["?Luister ___ die onderwyser.|na|vir|op", "?Ek glo ___ jou.|in|op|aan", "?Hy is verlief ___ Lisa.|op|met|vir", "?Water bestaan ___ waterstof en suurstof.|uit|van|in", "?Ons sorg ___ die hond.|vir|oor|na"] },

{ id: 'voegwoord', g: 'woord', t: 'Voegwoorde', i: '🪢', lv: 'EAT',
  r: "Neweskikkend (gewone woordorde): en, maar, of, want. ‘dus’ draai om: dus gaan ek. Onderskikkend (werkwoord na die einde): dat, omdat, as, wanneer, terwyl, hoewel, sodat, voordat, nadat, totdat, toe, of (= whether).",
  en: "Coordinating conjunctions keep word order; 'dus' inverts; subordinating conjunctions send the verb to the end.",
  ex: ["Ek is moeg, *maar* ek werk nog.", "Ek bly tuis, *want* dit reën.", "Ek bly tuis *omdat* dit *reën*.", "Ek weet nie *of* hy *kom* nie.", "Dit reën, *dus* bly ek tuis."],
  d: ["=Verbind met ‘omdat’: Ek eet. Ek is honger.|Ek eet omdat ek honger is.", "=Verbind met ‘want’: Ek eet. Ek is honger.|Ek eet, want ek is honger.|Ek eet want ek is honger.", "=Verbind met ‘terwyl’: Sy kook. Hy lees.|Sy kook terwyl hy lees.", "=Verbind met ‘dus’: Dit is laat. Ek gaan slaap.|Dit is laat, dus gaan ek slaap.|Dit is laat dus gaan ek slaap.", "?Watter voegwoord is neweskikkend?|maar|omdat|hoewel"] },

{ id: 'tussenwerp', g: 'woord', t: 'Tussenwerpsels', i: '😮', lv: 'EAT',
  r: "’n Tussenwerpsel is ’n uitroep wat ’n gevoel wys. Dikwels met ’n uitroepteken.",
  en: "Interjections.",
  ex: ["*Eina!* Dit is seer.", "*Sjoe*, dit is warm!", "*Siestog*, die arme hondjie.", "*Hoera!* Ons het gewen!", "*Ag nee!*", "*Foei tog!*"],
  d: ["?Jy stamp jou toon. Jy sê:|Eina!|Hoera!|Siestog!", "?Julle span wen. Jy sê:|Hoera!|Eina!|Foei!", "?’n Klein katjie is nat en koud. Jy sê:|Siestog!|Jippie!|Sjoe!"] },

// ───────────────────────── SINSBOU ─────────────────────────
{ id: 'stompi', g: 'sin', t: 'Woordorde: STOMPI', i: '🧱', lv: 'EAT',
  r: "S = onderwerp, (werkwoord 1 op plek 2), T = tyd, O = voorwerp, M = wyse (manier), P = plek, I = infinitief / werkwoord 2 aan die einde.",
  en: "Word order: Subject – verb1 – Time – Object – Manner – Place – verb2/Infinitive.",
  ex: ["*Ek* het *gister* *die boek* *vinnig* *by die skool* *gelees*.", "*Ons* gaan *môre* *met die trein* *Kaapstad toe* *ry*."],
  d: ["=Rangskik: (gisteraand / het / ek / ’n film / by die huis / gekyk)|Ek het gisteraand by die huis ’n film gekyk.|Ek het gisteraand ’n film by die huis gekyk.", "=Rangskik: (sal / sy / môre / stad toe / ry)|Sy sal môre stad toe ry.", "=Begin met ‘Gister’: Ek het gister gewerk.|Gister het ek gewerk."] },

{ id: 'sinsdele', g: 'sin', t: 'Sinsdele', i: '🧬', lv: 'HT',
  r: "Onderwerp: wie of wat doen dit. Gesegde: die werkwoord(e). Voorwerp: wie of wat die handeling ontvang (direk); aan of vir wie (indirek). Bepalings: byvoeglike bepaling sê meer oor ’n naamwoord; bywoordelike bepaling sê meer oor die werkwoord (tyd, wyse, plek).",
  en: "Sentence parts: subject, predicate, direct/indirect object, adjectival and adverbial qualifiers.",
  ex: ["*Die seun* (onderwerp) *gee* (gesegde) *sy ma* (indirekte voorwerp) *’n blom* (direkte voorwerp).", "Die kind *met die rooi hoed* (byvoeglike bepaling) speel *in die tuin* (bywoordelike bepaling)."],
  d: ["?Wat is die onderwerp: ‘Die hond byt die posman.’|Die hond|die posman|byt", "?Wat is die direkte voorwerp: ‘Ma koop vir my ’n fiets.’|’n fiets|my|Ma", "?‘in die oggend’ in ‘Ek draf in die oggend’ is ’n …|bywoordelike bepaling van tyd|byvoeglike bepaling|onderwerp"] },

{ id: 'sinsoorte', g: 'sin', t: 'Sinsoorte en sinswyse', i: '❗', lv: 'EAT',
  r: "Stelsin (.) gee inligting. Vraagsin (?) vra. Bevelsin (!) beveel – begin met die werkwoord. Uitroepsin (!) wys gevoel. Sinswyse (HT): aanwysend (feit), vraend, gebiedend (bevel), aanvoegend (wens of moontlikheid: ‘As ek ryk was, sou ek reis.’ ‘Mag jy gelukkig wees!’).",
  en: "Statement, question, command, exclamation; moods: indicative, interrogative, imperative, subjunctive.",
  ex: ["Dit reën. (stelsin)", "Reën dit? (vraagsin)", "Maak die deur toe! (bevelsin)", "Wat ’n pragtige dag! (uitroepsin)", "*As* ek ’n voël *was*, *sou* ek vlieg. (aanvoegend)"],
  d: ["?‘Bring vir my water.’ is ’n …|bevelsin|vraagsin|stelsin", "?‘Hoe mooi is die sonsondergang!’ is ’n …|uitroepsin|vraagsin|bevelsin", "=Maak ’n vraagsin: Jy hou van tee.|Hou jy van tee?", "=Maak ’n bevelsin: Jy moet stil wees.|Wees stil!|Wees stil."] },

{ id: 'saamgestel', g: 'sin', t: 'Saamgestelde en veelvoudige sinne', i: '🔗', lv: 'HT',
  r: "Veelvoudige sin: twee hoofsinne met ’n neweskikkende voegwoord (en, maar, of, want). Saamgestelde sin: hoofsin + bysin (bysin begin met ’n onderskikkende voegwoord of betreklike voornaamwoord; werkwoord aan die einde). Bysinne kan byvoeglik (wat …), bywoordelik (toe, omdat, as …) of ’n onderwerp- of voorwerpsin wees (Ek weet *dat jy kom*).",
  en: "Compound sentences (coordinated main clauses) vs complex sentences (main + subordinate clause).",
  ex: ["Ek bak koekies *en* sy maak tee. (veelvoudig)", "Ek bak koekies *omdat* dit haar verjaarsdag *is*. (saamgesteld)", "Die koekies *wat ek gebak het*, is op. (byvoeglike bysin)"],
  d: ["?‘Sy lag, maar hy huil.’ is ’n …|veelvoudige sin|saamgestelde sin|enkelvoudige sin", "?‘Ek weet dat jy slim is.’ ‘dat jy slim is’ is ’n …|voorwerpsin|onderwerp|byvoeglike bysin", "=Verbind met ‘toe’: Ek het geslaap. Die telefoon het gelui.|Ek het geslaap toe die telefoon gelui het."] },

{ id: 'ontkenning', g: 'sin', t: 'Ontkenning', i: '🚫', lv: 'EAT',
  r: "nie … nie. Positief → negatief: iemand → niemand, iets → niks, altyd → nooit, êrens → nêrens, ’n → geen, al → nog nie, ook → ook nie. Elke ontkenning kry die tweede nie aan die einde van die sin. Eindig die sin direk ná die eerste nie? Dan net een nie.",
  en: "Negation rules and positive → negative word pairs.",
  ex: ["Ek het *nie* geslaap *nie*.", "*Niemand* het gekom *nie*.", "Ek het *nog nie* geëet *nie*.", "Sy het *geen* geld *nie*.", "Ek weet *nie*."],
  d: ["=Ontken: Iemand klop aan die deur.|Niemand klop aan die deur nie.", "=Ontken: Ek het iets gekoop.|Ek het niks gekoop nie.", "=Ontken: Hy is altyd laat.|Hy is nooit laat nie.", "=Ontken: Ek het al geëet.|Ek het nog nie geëet nie.", "=Ontken: Sy het ’n fiets.|Sy het nie ’n fiets nie.|Sy het geen fiets nie.", "=Ontken: Ek hou ook van kaas.|Ek hou ook nie van kaas nie."] },

{ id: 'rede', g: 'sin', t: 'Direkte en indirekte rede', i: '💬', lv: 'EAT',
  r: "Direk: die presiese woorde in aanhalingstekens. Indirek: haal die aanhalingstekens weg, gebruik ‘dat’ (werkwoord na die einde), verander die voornaamwoorde (ek → hy / sy). Vrae: ‘of’ of die vraagwoord. Bevele: ‘moet’. Is die inleidende werkwoord in die verlede tyd, kom die sin in die verlede tyd. Tydwoorde verander: vandag → daardie dag, môre → die volgende dag, gister → die vorige dag, hier → daar, nou → toe, hierdie → daardie.",
  en: "Direct and indirect speech: dat + verb-final, pronoun shifts, of/question word for questions, moet for commands, tense and time-word shifts.",
  ex: ["Sy sê: “Ek is moeg.” → Sy sê *dat sy moeg is*.", "Hy vra: “Kom jy?” → Hy vra *of ek kom*.", "Ma sê: “Was jou hande!” → Ma sê *dat ek my hande moet was*.", "Hy het gesê: “Ek werk vandag.” → Hy het gesê *dat hy daardie dag gewerk het*."],
  d: ["=Indirek: Thabo sê: “Ek is honger.”|Thabo sê dat hy honger is.", "=Indirek: Lisa vra: “Waar is my sak?”|Lisa vra waar haar sak is.", "=Indirek: Sy vra: “Hou jy van tee?”|Sy vra of ek van tee hou.", "=Indirek: Pa sê: “Maak die deur toe!”|Pa sê dat ek die deur moet toemaak.", "=Indirek: Hy het gesê: “Ek speel môre.”|Hy het gesê dat hy die volgende dag sou speel.", "?Direkte rede van ‘Sy sê dat sy siek is.’|Sy sê: “Ek is siek.”|Sy sê: “Sy is siek.”|Sy sê: “Jy is siek.”"] },

{ id: 'lydend', g: 'sin', t: 'Lydende en bedrywende vorm', i: '🔄', lv: 'EAT',
  r: "Bedrywend: die onderwerp doen iets. Lydend: die voorwerp word die onderwerp; ‘deur’ + die doener. Teenwoordig: word + ge-. Verlede: is + ge-. Toekomend: sal … ge- … word. Met modaal: moet … ge- … word. Voornaamwoord ná deur: deur hom / haar / my / ons / hulle.",
  en: "Passive voice: word + ge- (present), is + ge- (past), sal … word (future), deur + agent in object form.",
  ex: ["Die hond *byt* die man. → Die man *word* deur die hond *gebyt*.", "Die hond *het* die man *gebyt*. → Die man *is* deur die hond *gebyt*.", "Die hond *sal* die man *byt*. → Die man *sal* deur die hond *gebyt word*.", "Hy moet die werk doen. → Die werk *moet* deur hom *gedoen word*."],
  d: ["=Lydende vorm: Ma kook die kos.|Die kos word deur Ma gekook.", "=Lydende vorm: Die kinders het die venster gebreek.|Die venster is deur die kinders gebreek.", "=Lydende vorm: Ek sal die brief skryf.|Die brief sal deur my geskryf word.", "=Lydende vorm: Hy verf die huis.|Die huis word deur hom geverf.", "=Bedrywende vorm: Die bal is deur Sipho geskop.|Sipho het die bal geskop.", "=Lydende vorm: Sy moet die boek lees.|Die boek moet deur haar gelees word."] },

{ id: 'verbind', g: 'sin', t: 'Verbindingswoorde in paragrawe', i: '🪜', lv: 'HT',
  r: "Verbindingswoorde maak ’n teks samehangend. Volgorde: eerstens, daarna, voordat, nadat, ten slotte. Oorsaak en gevolg: daarom, gevolglik, aangesien, as gevolg van, dus. Kontras: maar, tog, nogtans, aan die ander kant. Mening: volgens my, na my mening, ek glo dat. Samevatting: om saam te vat, kortliks, opsommenderwys.",
  en: "Linking words for sequence, cause/effect, contrast, opinion and summary.",
  ex: ["*Eerstens* was die water koud. *Daarna* het dit begin reën. *Gevolglik* het ons huis toe gegaan.", "*Na my mening* is sport belangrik. *Tog* moet ’n mens ook leer."],
  d: ["?Dit het hard gereën; ___ is die pad oorstroom.|gevolglik|nogtans|eerstens", "?Ek is moeg; ___ gaan ek nog oefen.|nogtans|daarom|eerstens", "?Watter woord begin ’n samevatting?|Kortliks|Daarna|Voordat"] },

// ───────────────────── WOORDESKAT EN BETEKENIS ─────────────────────
{ id: 'sinoniem', g: 'bet', t: 'Sinonieme en antonieme', i: '⚖️', lv: 'EAT',
  r: "Sinoniem: (amper) dieselfde betekenis. Antoniem: die teenoorgestelde betekenis. Antonieme word ook met on- gemaak: gelukkig → ongelukkig.",
  en: "Synonyms and antonyms.",
  ex: ["vinnig = *gou*", "huis = *woning*", "begin = *aanvang*", "warm ↔ *koud*", "lig ↔ *donker*", "gelukkig ↔ *ongelukkig*"],
  d: ["?Sinoniem van ‘bly’ (gelukkig):|vrolik|hartseer|kwaad", "?Antoniem van ‘ryk’:|arm|duur|vet", "?Antoniem van ‘begin’:|einde|aanvang|middel", "=Antoniem met on-: moontlik|onmoontlik", "?Sinoniem van ‘praat’:|gesels|swyg|luister"] },

{ id: 'homoniem', g: 'bet', t: 'Homonieme, homofone, paronieme, polisemie', i: '🔀', lv: 'HT',
  r: "Homonieme: selfde spelling en klank, ander betekenis (bank: sitplek / geldinstelling). Homofone: selfde klank, ander spelling (hart / hard; reis / rys; lei / ly). Paronieme: van dieselfde stam (drink, drank, dronk). Polisemie: een woord met verwante betekenisse (kop van ’n mens, kop van ’n spyker).",
  en: "Homonyms, homophones, paronyms, polysemy.",
  ex: ["Ek sit op die *bank*. / Ek werk by die *bank*.", "My *hart* klop *hard*.", "Ons eet *rys* op ons *reis*.", "*drink* – *drank* – *dronk*"],
  d: ["?‘hart’ en ‘hard’ is …|homofone|homonieme|antonieme", "?‘weer’ (reën) en ‘weer’ (nog ’n keer) is …|homonieme|homofone|paronieme", "?Kies die homofoon: Hy ___ (suffer) baie pyn.|ly|lei|lie", "?‘sing’, ‘sang’, ‘sanger’ is …|paronieme|homofone|sinonieme"] },

{ id: 'eenwoord', g: 'bet', t: 'Een woord vir ’n omskrywing', i: '🎯', lv: 'EAT',
  r: "Vervang ’n hele beskrywing met een woord.",
  en: "One word for a description.",
  ex: ["iemand wat boeke skryf = *skrywer*", "’n plek waar mens boeke leen = *biblioteek*", "iemand wat nie kan sien nie = *blind*", "’n dier wat net plante eet = *planteter*"],
  d: ["?iemand wat ’n vliegtuig vlieg|vlieënier|kaptein|matroos", "?’n plek waar diere vir mense te sien is|dieretuin|plaas|wildernis", "?iemand wat siek mense versorg|verpleegster|onderwyser|apteker", "?’n boek met die betekenisse van woorde|woordeboek|roman|dagboek", "?iemand wat nie kan hoor nie|doof|stom|blind"] },

{ id: 'idiome', g: 'bet', t: 'Idiome en uitdrukkings', i: '🗝️', lv: 'EAT',
  r: "’n Idioom beteken iets anders as die losse woorde. Leer dit as een geheel.",
  en: "Idioms: the meaning is not the sum of the words.",
  ex: ["*Die kat uit die boom kyk* = eers wag en sien wat gebeur.", "*Met die deur in die huis val* = iets dadelik en reguit sê.", "*Twee vlieë met een klap slaan* = twee dinge tegelyk regkry.", "*Die aap uit die mou* = die geheim kom uit.", "*Op hete daad betrap* = gevang terwyl jy iets doen."],
  d: ["?‘Die kat uit die boom kyk’ beteken …|eers wag en sien|’n kat red|bang wees vir katte", "?‘Twee vlieë met een klap slaan’ beteken …|twee dinge tegelyk regkry|vlieë doodmaak|baie kwaad wees", "?‘Met die deur in die huis val’ beteken …|iets dadelik reguit sê|deur die deur val|onbeskof wees teenoor gaste", "?‘Die aap kom uit die mou’ beteken …|die geheim kom uit|iemand is snaaks|’n aap ontsnap"] },

{ id: 'spreekwoord', g: 'bet', t: 'Spreekwoorde', i: '📜', lv: 'HT',
  r: "’n Spreekwoord is ’n vaste sin met ’n les of wysheid.",
  en: "Proverbs: fixed sentences with a lesson.",
  ex: ["*Al dra ’n aap ’n goue ring, hy is en bly ’n lelike ding.* = Mooi klere verander nie wie jy is nie.", "*Oefening baar kuns.* = Hoe meer jy oefen, hoe beter word jy.", "*Stille waters, diepe grond.* = Stil mense dink dikwels diep.", "*Wie laaste lag, lag die lekkerste.* = Wag tot die einde voordat jy jou oorwinning vier.", "*Die appel val nie ver van die boom nie.* = Kinders lyk na hul ouers."],
  d: ["?‘Oefening baar kuns’ beteken …|hoe meer jy oefen, hoe beter word jy|kuns is moeilik|oefen is vervelig", "?Thabo is net soos sy pa. Watter spreekwoord pas?|Die appel val nie ver van die boom nie.|Stille waters, diepe grond.|Oefening baar kuns.", "?‘Stille waters, diepe grond’ beteken …|stil mense dink dikwels diep|die see is diep|moenie swem nie"] },

{ id: 'woordvorm', g: 'bet', t: 'Woordvorming', i: '🏗️', lv: 'HT',
  r: "Simpleks: een deel (huis). Kompleks: meer dele. Samestelling: twee woorde saam (voet + bal = voetbal; kern = bal, bepaler = voet). Soms met ’n verbindingsklank: hondehok, seunskool. Afleiding: stam + voor- of agtervoegsel (on-, her-, ver-, be-, ont-, wan- / -heid, -ing, -lik, -loos, -baar, -skap, -er). Samestellende afleiding: samestelling en afleiding tegelyk (een + jaar + -ig = eenjarig). Klinkerwisseling: drink – drank, spring – sprong, sing – sang.",
  en: "Word formation: simplex/complex, compounds (head + modifier), derivation with affixes, synthetic compounds, vowel alternation.",
  ex: ["*voet*+*bal* = voetbal", "*on*+gelukkig = ongelukkig", "vriend+*skap* = vriendskap", "skoon+*heid* = skoonheid", "drie+hoek+*ig* = driehoekig", "spring → *sprong*"],
  d: ["?‘Vriendskap’ is ’n …|afleiding|samestelling|simpleks", "?‘Tandeborsel’ is ’n …|samestelling|afleiding|simpleks", "?Wat is die kern in ‘skoolbus’?|bus|skool|skoolbus", "=Maak ’n selfstandige naamwoord met -heid: mooi|mooiheid", "=Maak die teenoorgestelde met on-: eerlik|oneerlik", "?Watter woord het klinkerwisseling met ‘bind’?|band|bindend|gebind"] },

{ id: 'herkoms', g: 'bet', t: 'Herkoms van woorde en anglisismes', i: '🌍', lv: 'HT',
  r: "Erfgoed: woorde uit Nederlands. Leengoed: uit ander tale – Maleis (piesang, baie, baadjie, piering), Portugees (kraal, tronk), Khoi (dagga, kwagga, gogga, abba), Engels (rugby, tennis). Eiegoed / neologisme: nuwe Afrikaanse woorde (rekenaar, selfoon). Volksetimologie: ’n vreemde woord word omvorm sodat dit verstaan word (eau de cologne → oliekolonie). Anglisisme: Engelse uitdrukking letterlik vertaal – vermy dit in formele taal.",
  en: "Word origins: inherited, borrowed, newly coined, folk etymology; anglicisms to avoid.",
  ex: ["*neem plek* (anglisisme) → *vind plaas*", "*in plek van* → *in plaas van*", "Ek het ’n *goeie tyd gehad* → Ek het dit *baie geniet*", "*gogga* kom uit Khoi", "*piesang* kom uit Maleis"],
  d: ["=Verbeter die anglisisme: Die konsert neem plek in die saal.|Die konsert vind in die saal plaas.", "=Verbeter: Drink water in plek van koeldrank.|Drink water in plaas van koeldrank.", "?‘Gogga’ kom uit …|Khoi|Maleis|Engels", "?‘Rekenaar’ is ’n …|neologisme (eiegoed)|leenwoord uit Engels|anglisisme"] },

{ id: 'oortollig', g: 'bet', t: 'Pleonasme, toutologie, kontaminasie', i: '♻️', lv: 'HT',
  r: "Pleonasme: die tweede woord se betekenis sit reeds in die eerste (’n dooie lyk). Toutologie: twee woorde met dieselfde betekenis saam (tortelduif; reeds al). Kontaminasie: twee uitdrukkings word deurmekaar gemeng tot een foutiewe uitdrukking. Vermy dit in formele skryfwerk.",
  en: "Pleonasm, tautology and contamination: redundant or mixed expressions.",
  ex: ["’n *dooie lyk* → ’n lyk", "Hy het *reeds al* geëet. → Hy het reeds geëet.", "Ek *persoonlik self* glo … → Ek glo …"],
  d: ["?‘’n Ronde sirkel’ is ’n voorbeeld van …|pleonasme|metafoor|antoniem", "=Verbeter: Ons het reeds al die werk klaar.|Ons het reeds die werk klaar.|Ons het al die werk klaar."] },

// ───────────────── KLANK, SPELLING EN LEESTEKENS ─────────────────
{ id: 'klank', g: 'spel', t: 'Klanke en lettergrepe', i: '🔉', lv: 'EAT',
  r: "Vokale (klinkers): a, e, i, o, u, y. Konsonante (medeklinkers): die ander letters. Diftonge (tweeklanke): ei, ui, ou, oe-i (koei). Lettergreep: die dele van ’n woord wat jy kan klap: Af-ri-kaans. Oop lettergreep eindig op ’n klinker (ma-ne); geslote lettergreep eindig op ’n medeklinker (kat-te).",
  en: "Vowels, consonants, diphthongs, syllables; open vs closed syllables.",
  ex: ["*Af-ri-kaans*", "*ma-ne* (oop: een a)", "*kat-te* (geslote: tt)", "*huis* (diftong ui)"],
  d: ["?Hoeveel lettergrepe het ‘onderwyser’?|4|3|5", "?Watter een is ’n diftong?|ui|aa|oo", "?Kies reg gespel:|bome|boome|bomme", "?Kies reg gespel:|lekker|leker|lekkker"] },

{ id: 'skryftekens', g: 'spel', t: 'Skryftekens', i: '◌̂', lv: 'EAT',
  r: "Kappie (^): lang, oop klank – sê, môre, brûe, wîe. Deelteken (¨): begin ’n nuwe lettergreep – reën, geëet, knieë, beïnvloed. Afkappingsteken (’): ’n, foto’s, ma’s; ook as letters wegval (’t, dis). Koppelteken (-): tussen twee dieselfde klinkers by samestellings (see-eend), by name (Suid-Afrika), met syfers (20-jarige). Akuut (´): klem – dié, én … én, nóg … nóg.",
  en: "Circumflex, diaeresis, apostrophe, hyphen and acute accent.",
  ex: ["Sy *sê* dit is *môre* koud.", "Dit *reën*. Ons het *geëet*.", "*’n* Paar *foto’s*", "*Suid-Afrika*, *see-eend*", "*Dié* boek, nie daardie een nie."],
  d: ["?Kies reg:|geëet|geeet|geéet", "?Kies reg:|Hy sê nee.|Hy se nee.|Hy sé nee.", "?Kies reg:|twee radio’s|twee radios|twee radio-s", "?Kies reg:|see-eend|seeeend|seeëend", "?Kies reg:|knieë|kniee|knieë’s"] },

{ id: 'hoofletter', g: 'spel', t: 'Hoofletters, afkortings en akronieme', i: '🔠', lv: 'EAT',
  r: "Hoofletter: begin van ’n sin, name, plekke, tale (Afrikaans). Dae en maande kry GEEN hoofletter nie: maandag, januarie. Ná ’n aan die begin: ’n Man. Afkorting met punte: bv. (byvoorbeeld), ens. (ensovoorts), mnr. (meneer), mev. (mevrou), dr. (dokter), d.w.s. (dit wil sê), nr. (nommer). Akroniem: lees as een woord (Unisa, VIGS). Letterwoord: lees letter vir letter (SAUK, RSA). Verkorting: foto (fotografie), lab (laboratorium).",
  en: "Capitals (days and months lowercase!), abbreviations, acronyms, initialisms, clipped words.",
  ex: ["Ons sien jou op *vrydag* in *januarie*.", "*Mnr.* Botha woon in *Bloemfontein*.", "Bring vrugte, *bv.* appels, piesangs *ens.*"],
  d: ["?Kies reg:|Ek kom op maandag.|Ek kom op Maandag.|ek kom op maandag.", "?Kies reg:|Hy praat Afrikaans en Engels.|Hy praat afrikaans en engels.|Hy Praat Afrikaans en Engels.", "=Skryf die afkorting: byvoorbeeld|bv.", "=Skryf die afkorting: dit wil sê|d.w.s.", "?‘Unisa’ is ’n …|akroniem|letterwoord|verkorting"] },

{ id: 'leestekens', g: 'spel', t: 'Leestekens', i: '❓', lv: 'EAT',
  r: "Punt (.) einde van ’n stelsin. Vraagteken (?). Uitroepteken (!). Komma (,) skei lysies en sinsdele. Dubbelpunt (:) voor ’n lys of aanhaling. Kommapunt (;) tussen twee verwante hoofsinne. Aanhalingstekens (“ ”) om direkte rede. Aandagstreep (–) vir ’n pouse of byvoeging. Beletselteken (…) iets is weggelaat of die gedagte hang. Hakies ( ) vir ekstra inligting.",
  en: "Punctuation marks and their uses.",
  ex: ["Koop: brood, melk, eiers en kaas.", "Sy sê: “Kom gou!”", "Dit was laat; ons was moeg.", "Ek wou nog sê … maar toe is hy weg."],
  d: ["?Watter leesteken kom voor ’n lys?|dubbelpunt|kommapunt|vraagteken", "?Wat sit jy om direkte rede?|aanhalingstekens|hakies|aandagstrepe", "?‘Ek dink … nee, los dit.’ Die … is ’n …|beletselteken|dubbelpunt|aandagstreep", "=Voeg die leestekens in: hy vra waar is my boek|Hy vra: “Waar is my boek?”|Hy vra: \"Waar is my boek?\""] },

// ───────────────────── BEELDSPRAAK EN STYLFIGURE ─────────────────────
{ id: 'beeldspraak', g: 'styl', t: 'Beeldspraak', i: '🖼️', lv: 'EAT',
  r: "Vergelyking: met ‘soos’ of ‘net soos’ (Sy hardloop soos die wind). Metafoor: sê iets ís iets anders (Hy is ’n leeu op die veld). Personifikasie: ’n ding kry menslike eienskappe (Die wind fluit deur die bome).",
  en: "Simile, metaphor, personification.",
  ex: ["Haar oë blink *soos sterre*. (vergelyking)", "*Die lewe is ’n reis.* (metafoor)", "*Die son glimlag* oor die veld. (personifikasie)"],
  d: ["?‘Hy is so sterk soos ’n os.’|vergelyking|metafoor|personifikasie", "?‘Die maan loer agter die wolke uit.’|personifikasie|vergelyking|hiperbool", "?‘My hart is ’n klip.’|metafoor|vergelyking|personifikasie", "?‘Die stad slaap.’|personifikasie|metafoor|ironie"] },

{ id: 'stylfig1', g: 'styl', t: 'Stylfigure 1', i: '🎭', lv: 'EAT',
  r: "Hiperbool: oordrywing (Ek het dit al ’n miljoen keer gesê). Klanknabootsing: die woord klink soos die geluid (die bye zoem; boem!). Alliterasie: herhaalde beginklank (Pieter Piper pluk). Assonansie: herhaalde klinkerklank (die maan, die skaal, die kaal). Retoriese vraag: ’n vraag sonder antwoord, vir effek. Kontras: teenoorgestelde naas mekaar.",
  en: "Hyperbole, onomatopoeia, alliteration, assonance, rhetorical question, contrast.",
  ex: ["Ek is so honger, ek kan ’n *olifant eet*. (hiperbool)", "Die horlosie *tik-tak*. (klanknabootsing)", "*S*agte *s*ee, *s*ilwer *s*and. (alliterasie)", "*Wie gee om?* (retoriese vraag)"],
  d: ["?‘Die donderweer rommel.’ ‘rommel’ is …|klanknabootsing|hiperbool|metafoor", "?‘Ek het jou al duisend keer geroep!’|hiperbool|litotes|kontras", "?‘Blou berge, breë baai’|alliterasie|assonansie|ironie", "?‘Is dit nie wonderlik nie?’ (die spreker weet die antwoord)|retoriese vraag|uitroepsin|ironie"] },

{ id: 'stylfig2', g: 'styl', t: 'Stylfigure 2', i: '🃏', lv: 'HT',
  r: "Ironie: jy sê die teenoorgestelde van wat jy bedoel. Sarkasme: bytende, seermakende ironie. Eufemisme: iets onaangenaams sag sê (hy is heen = hy is dood). Litotes: iets bevestig deur die teendeel te ontken (dit gaan nie sleg nie = goed). Oksimoron: teenstrydige woorde saam (ou nuus, oorverdowende stilte). Paradoks: skynbare teenstrydigheid wat tog waar is. Antitese: teenoorgestelde idees in parallelle bou. Simboliek: iets staan vir ’n dieper idee (duif = vrede). Klimaks: stygende krag; antiklimaks: skielike daling. Sinekdogee: deel vir die geheel (al die hande help = mense). Metonimia: een ding vir ’n verwante ding (die hele stad het gekom). Sinestesie: sintuie gemeng (’n warm kleur, ’n skril geel). Woordspeling: speel met woorde se betekenis of klank. Satire: spot met die mens of samelewing om iets te verbeter. Antonomasia: ’n eienaam as soortnaam (’n ware Einstein). Elisie: ’n klank of letter val weg (dis, ’n).",
  en: "Irony, sarcasm, euphemism, litotes, oxymoron, paradox, antithesis, symbolism, climax/anticlimax, synecdoche, metonymy, synaesthesia, pun, satire, antonomasia, elision.",
  ex: ["“*Pragtige weer*,” sê hy in die stortreën. (ironie)", "Oupa het *ontslaap*. (eufemisme)", "’n *Oorverdowende stilte*. (oksimoron)", "Ek moet *wreed wees om goed te wees*. (paradoks)", "Hy is ’n *ware Einstein*. (antonomasia)"],
  d: ["?‘Dit is nie sleg nie’ (bedoel: baie goed)|litotes|eufemisme|hiperbool", "?‘bitter soet’|oksimoron|alliterasie|sinestesie", "?‘Sy het ons ontval.’ (sy is dood)|eufemisme|ironie|sarkasme", "?Die duif staan vir vrede.|simboliek|metonimia|antitese", "?‘’n Harde kleur’ meng gehoor en sig.|sinestesie|klimaks|elisie", "?‘Ons het nuwe hande op die plaas nodig.’ (werkers)|sinekdogee|paradoks|litotes"] },

// ───────────────────── KRITIESE TAALBEWUSTHEID ─────────────────────
{ id: 'feitmening', g: 'krit', t: 'Feit en mening', i: '⚖️', lv: 'EAT',
  r: "Feit: kan bewys word. Mening: iemand se opinie of gevoel. Woorde soos ‘ek dink’, ‘die beste’, ‘pragtig’ wys dikwels ’n mening.",
  en: "Fact vs opinion.",
  ex: ["Kaapstad lê aan die see. (*feit*)", "Kaapstad is die mooiste stad. (*mening*)"],
  d: ["?‘Water kook by 100 °C op seevlak.’|feit|mening", "?‘Rugby is die lekkerste sport.’|mening|feit", "?‘Suid-Afrika het twaalf amptelike tale.’|feit|mening"] },

{ id: 'konnotasie', g: 'krit', t: 'Denotasie, konnotasie en register', i: '🎚️', lv: 'HT',
  r: "Denotasie: die letterlike betekenis. Konnotasie: die gevoel of assosiasie (huis = gebou; tuiste = warm gevoel). Register: formeel (brief aan die skoolhoof), informeel (boodskap aan ’n vriend), sleng (jongmense: ‘kwaai’ = baie goed). Standaardtaal: die vorm in koerante en amptelike dokumente. Taalvariëteite: Afrikaans het baie variëteite, bv. Kaaps, Namakwalands en Oranjerivier-Afrikaans – almal is volwaardige Afrikaans.",
  en: "Denotation, connotation, register, slang, standard language and language varieties.",
  ex: ["*huis* (denotasie) – *tuiste* (konnotasie: warmte)", "Formeel: *Geagte mnr. Botha*", "Informeel: *Haai Sam!*", "Sleng: Daai partytjie was *kwaai*!"],
  d: ["?Watter een is formeel?|Ek wil graag aansoek doen om die pos.|Ek soek daai werk, ou.|Gee vir my die job.", "?‘Slim’ teenoor ‘skelm’: watter het ’n negatiewe konnotasie?|skelm|slim", "?Kaaps is …|’n variëteit van Afrikaans|’n ander taal|foutiewe Afrikaans"] },

{ id: 'manipuleer', g: 'krit', t: 'Manipulerende taal en vooroordeel', i: '📣', lv: 'HT',
  r: "Advertensies en toesprake gebruik gevoelstaal, oordrywing, uitnodigende vrae en ‘almal doen dit’ om jou te oorreed. Let op: wat word weggelaat? Wie trek voordeel? Stereotipe: ’n vaste, dikwels onregverdige beeld van ’n groep. Partydigheid: net een kant word gewys.",
  en: "Manipulative language, bias, stereotypes, omission.",
  ex: ["*Slegs vandag!* *Almal* koop dit! *Jy verdien die beste!*", "‘Alle tieners is lui.’ (*stereotipe*)"],
  d: ["?‘Moenie uitmis nie – slegs drie oor!’ Watter tegniek?|druk van tyd en skaarste|feite gee|humor", "?‘Meisies kan nie wiskunde doen nie.’|stereotipe|feit|metafoor", "?’n Berig wat net een kant van ’n twis wys, is …|partydig|objektief|satiries"] },

// ───────────────────────── SKRYF EN AANBIED ─────────────────────────
{ id: 'brief_v', g: 'skryf', t: 'Vriendskaplike brief', i: '💌', lv: 'EAT',
  r: "Jou adres en die datum regs bo. Aanhef: Liewe … , Inleiding, liggaam (paragrawe), slot. Groet: Baie liefde / Groete, jou vriendin … Informele, persoonlike taal.",
  en: "Informal letter format.",
  text: `Posbus 12
Stellenbosch
7600
3 Maart 2026

Liewe Ouma

Dankie vir die pragtige trui wat Ouma vir my gebrei het. Dit is warm en ek dra dit elke dag skool toe!

Hier gaan dit goed. Ek het verlede week in die skoolspan gespeel en ons het gewen. Volgende maand skryf ons eksamen, so ek leer hard.

Ek mis Ouma se melktert. Kan ek in die vakansie kom kuier?

Baie liefde
Jou kleinseun
Thabo`,
  check: ['Adres en datum regs bo', 'Aanhef: Liewe …', 'Paragrawe: inleiding, liggaam, slot', 'Groet en naam onder', 'Persoonlike, informele toon'],
  task: 'Skryf ’n brief aan ’n vriend(in) oor jou vakansie (120–150 woorde).',
  d: ["?Hoe begin ’n vriendskaplike brief?|Liewe Sam|Geagte Sam|Aan Sam", "?Waar staan jou adres?|regs bo|links onder|in die slot", "?Watter slot pas?|Baie liefde, Anna|Die uwe, A. Botha|Hoogagtend, Anna"] },

{ id: 'brief_f', g: 'skryf', t: 'Formele brief', i: '📨', lv: 'EAT',
  r: "Jou adres regs bo, datum daaronder. Die ontvanger se titel en adres links. Aanhef: Geagte Meneer / Mevrou … Onderwerpreël in vetdruk of hoofletters. Saaklik en beleefd, formele register (u). Slot: Die uwe, handtekening, voorletters en van.",
  en: "Formal letter format (application, complaint, request).",
  text: `Kerkstraat 45
Bloemfontein
9301
10 Mei 2026

Die Bestuurder
Boekwinkel Lekkerlees
Posbus 300
Bloemfontein
9300

Geagte Meneer / Mevrou

AANSOEK OM VAKANSIEWERK

Ek wil graag aansoek doen om die pos as winkelassistent wat in Die Volksblad van 5 Mei 2026 geadverteer is.

Ek is sewentien jaar oud en in graad 11 aan Hoërskool Sentraal. Ek is betroubaar, werk graag met mense en lees baie. Verlede somer het ek by ’n kafee gewerk.

Ek is beskikbaar van 1 tot 31 Julie. Ek sal dit waardeer as u my vir ’n onderhoud sou oorweeg.

Die uwe
(handtekening)
L. Mokoena`,
  check: ['Eie adres en datum regs bo', 'Ontvanger se titel en adres links', 'Geagte …', 'Onderwerpreël', 'Formele taal, u-vorm', 'Die uwe + handtekening + voorletters en van'],
  task: 'Skryf ’n formele brief aan die munisipaliteit oor slaggate in jou straat.',
  d: ["?Formele aanhef:|Geagte Mevrou Pillay|Liewe Mevrou Pillay|Haai Mevrou Pillay", "?Formele slot:|Die uwe|Baie liefde|Groetnis", "?Wat kom ná die aanhef?|die onderwerpreël|die datum|die handtekening", "?In ’n formele brief aan ’n bestuurder sê jy …|u|jy|jou"] },

{ id: 'epos', g: 'skryf', t: 'E-pos', i: '📧', lv: 'EAT',
  r: "Aan, Van, Datum, Onderwerp. Kort en duidelik. Aanhef en groet pas by die register.",
  en: "Email format.",
  text: `Aan: mnr.vanwyk@skool.co.za
Van: anna.botha@epos.co.za
Datum: 14 Junie 2026
Onderwerp: Afwesigheid op 16 Junie

Goeiemôre Mnr. Van Wyk

Ek sal Dinsdag 16 Junie afwesig wees, want ek het ’n afspraak by die tandarts. Ek sal die huiswerk by Lisa kry.

Dankie
Anna Botha (Gr. 9B)`,
  check: ['Aan / Van / Datum / Onderwerp', 'Duidelike onderwerp', 'Aanhef', 'Kort boodskap', 'Groet en naam'],
  task: 'Skryf ’n e-pos aan jou afrigter om te sê jy kan nie oefening toe kom nie.',
  d: ["?Wat moet ’n e-pos altyd hê?|’n onderwerp|’n adres regs bo|’n poskode"] },

{ id: 'dagboek', g: 'skryf', t: 'Dagboekinskrywing', i: '📔', lv: 'EAT',
  r: "Datum (en tyd). Eerste persoon (ek). Gevoelens en gedagtes, nie net gebeure nie. Informele taal. Meestal verlede tyd vir wat gebeur het.",
  en: "Diary entry.",
  text: `Vrydag 12 September 2026, 21:30

Liewe Dagboek

Vandag was die beste dag van die jaar! Ek het die toespraakkompetisie gewen. My hande het gebewe en my hart het hard geklop, maar toe ek begin praat, was ek rustig.

Ma het gehuil van trots. Ek kan nog nie glo nie!

Môre oefen ek vir die streekrondte.
Lekker slaap.
Sipho`,
  check: ['Datum en tyd', 'Ek-vorm', 'Gevoelens', 'Informeel'],
  task: 'Skryf ’n dagboekinskrywing oor ’n dag toe iets snaaks gebeur het.',
  d: ["?’n Dagboekinskrywing word geskryf in die …|eerste persoon|derde persoon|lydende vorm"] },

{ id: 'uitnodiging', g: 'skryf', t: 'Uitnodiging', i: '🎟️', lv: 'EAT',
  r: "Wie nooi, wat, wanneer, waar, kleredrag, en ‘Antwoord asseblief voor …’ (RSVP).",
  en: "Invitation.",
  text: `Jy word hartlik uitgenooi na
LISA SE 16DE VERJAARSDAG!

Wanneer: Saterdag 4 Oktober 2026, 14:00
Waar: Rosestraat 8, Paarl
Kleredrag: Gemaklik – bring ’n swembroek!

Antwoord asseblief voor 28 September: 082 555 0123`,
  check: ['Wie en wat', 'Datum en tyd', 'Plek', 'Kleredrag', 'Antwoord asseblief voor …'],
  task: 'Ontwerp ’n uitnodiging vir ’n klasbraai.',
  d: ["?Wat beteken ‘Antwoord asseblief voor 1 Mei’?|Laat weet voor 1 Mei of jy kom.|Die partytjie is op 1 Mei.|Bring ’n geskenk."] },

{ id: 'dialoog', g: 'skryf', t: 'Dialoog', i: '🗨️', lv: 'EAT',
  r: "Name links, dubbelpunt, dan die woorde. Geen aanhalingstekens nie. Toneelaanwysings in hakies en skuinsdruk. Elke spreker op ’n nuwe reël.",
  en: "Dialogue format.",
  text: `Ma: (kyk op haar horlosie) Ben, dit is al sewe-uur!
Ben: (gaap) Net nog vyf minute, Ma …
Ma: Die bus wag nie vir jou nie!
Ben: (spring op) Die bus! Ek het vergeet ons gaan vroeg!`,
  check: ['Naam + dubbelpunt', 'Nuwe reël vir elke spreker', 'Aanwysings in hakies', 'Geen aanhalingstekens'],
  task: 'Skryf ’n dialoog tussen twee vriende wat ’n naweek beplan (8–10 beurte).',
  d: ["?Waar skryf jy toneelaanwysings in ’n dialoog?|in hakies|in aanhalingstekens|onderaan"] },

{ id: 'toespraak', g: 'skryf', t: 'Toespraak', i: '🎙️', lv: 'EAT',
  r: "Aanspreekvorm (Meneer die voorsitter, dames en here). Pakkende inleiding. Liggaam met punte en voorbeelde. Retoriese vrae en herhaling. Slot wat bybly. Bedank die gehoor.",
  en: "Speech: address, hook, body, rhetorical devices, memorable close.",
  text: `Goeiemôre, meneer die skoolhoof, onderwysers en mede-leerders.

Wat sal jy doen as daar môre geen water uit die kraan kom nie?

Kaapstad het in 2018 amper droog geloop. Elke druppel tel. Draai die kraan toe terwyl jy tande borsel. Stort korter. Vang reënwater op.

Klein dade, groot verskil. Laat ons vandag begin.

Dankie.`,
  check: ['Aanspreekvorm', 'Pakkende begin', 'Duidelike punte', 'Retoriese middels', 'Sterk slot + dankie'],
  task: 'Skryf ’n toespraak van twee minute oor ’n saak wat vir jou belangrik is.',
  d: ["?’n Goeie toespraak begin met …|’n pakkende inleiding|die slot|’n lys bronne"] },

{ id: 'berig', g: 'skryf', t: 'Koerantberig en verslag', i: '📰', lv: 'EAT',
  r: "Opskrif (kort, pakkend, teenwoordige tyd). Wie, wat, waar, wanneer, hoekom, hoe in die eerste paragraaf. Derde persoon, verlede tyd, feite, aanhalings van getuies. Verslag: titel, inleiding, bevindinge, aanbevelings, naam en datum.",
  en: "Newspaper report and formal report.",
  text: `Hond red kind uit rivier

Mpho Dlamini

DURBAN – ’n Vyfjarige seun is gister deur sy hond uit die Umgenirivier gered.

Die seun het omstreeks 15:00 van die wal af gegly. Die hond, Rex, het dadelik ingespring en die kind aan sy hemp na die kant toe getrek.

“Ek kan nie glo hoe slim hy is nie,” het die seun se ma gesê.

Die kind is ongedeerd.`,
  check: ['Opskrif', 'Naam van verslaggewer', 'Plek in hoofletters', '5 W’s + H in die eerste paragraaf', 'Derde persoon, verlede tyd', 'Aanhaling'],
  task: 'Skryf ’n koerantberig oor ’n sportwedstryd by jou skool.',
  d: ["?Wat moet in die eerste paragraaf van ’n berig wees?|wie, wat, waar, wanneer, hoekom en hoe|die slot|jou eie mening"] },

{ id: 'resensie', g: 'skryf', t: 'Resensie', i: '⭐', lv: 'EAT',
  r: "Titel, skrywer / regisseur, genre. Kort opsomming – moenie die einde verklap nie. Evalueer: karakters, storie, taal, spel. Aanbeveling en ’n gradering (sterre).",
  en: "Review.",
  text: `Boek: Die Klip in die Grot (fiktiewe voorbeeld)
Genre: Avontuur

Drie vriende ontdek ’n vreemde klip in ’n grot in die Drakensberg. Elke nag verander die klip van kleur …

Die karakters is eg en snaaks, en die spanning hou tot die laaste bladsy. Die taal is eenvoudig, so dit is ideaal vir jong lesers.

Aanbeveling: lees dit! ★★★★☆`,
  check: ['Titel, skrywer, genre', 'Opsomming sonder die einde', 'Evaluering', 'Aanbeveling', 'Gradering'],
  task: 'Skryf ’n resensie oor ’n film of boek wat jy onlangs geniet het.',
  d: ["?’n Resensie moet NIE …|die einde verklap nie|’n gradering gee nie|die titel noem nie"] },

{ id: 'advertensie', g: 'skryf', t: 'Advertensie en plakkaat', i: '📢', lv: 'EAT',
  r: "Opvallende opskrif, slagspreuk, min woorde, beeld, prys, kontakbesonderhede. Oorredende taal: bevelsinne, vrae, superlatiewe.",
  en: "Advertisement / poster.",
  text: `TE KOOP!
Byna nuwe fiets – soos nuut, net R1 200!
21 ratte · blou · helm ingesluit
Moenie uitmis nie!
Skakel Pieter: 072 111 2233`,
  check: ['Opskrif', 'Slagspreuk', 'Prys', 'Kontakbesonderhede', 'Oorredende taal'],
  task: 'Ontwerp ’n advertensie vir ’n koekverkoping by jou skool.',
  d: ["?Watter een is ’n slagspreuk?|Proe die verskil!|Skakel 012 345 6789|R25 elk"] },

{ id: 'instruksies', g: 'skryf', t: 'Instruksies en resep', i: '🍳', lv: 'EAT',
  r: "Titel, bestanddele / benodigdhede, genommerde stappe. Begin elke stap met ’n werkwoord (bevelsin). Volgordewoorde.",
  en: "Instructions and recipes.",
  text: `Maklike pannekoek

Bestanddele:
1 koppie meel, 1 eier, 1 koppie melk, ’n knippie sout

Metode:
1. Meng die meel en sout in ’n bak.
2. Klits die eier en melk by.
3. Verhit ’n pan met ’n bietjie olie.
4. Gooi ’n klein bietjie beslag in die pan.
5. Draai die pannekoek om wanneer dit borrel.
6. Bedien met kaneelsuiker.`,
  check: ['Titel', 'Bestanddele', 'Genommerde stappe', 'Bevelsinne'],
  task: 'Skryf instruksies om ’n koppie tee te maak.',
  d: ["?Instruksies gebruik meestal …|bevelsinne|vraagsinne|uitroepsinne"] },

{ id: 'cv', g: 'skryf', t: 'CV (curriculum vitae)', i: '🗂️', lv: 'HT',
  r: "Persoonlike besonderhede, opleiding en kwalifikasies, werkservaring, vaardighede, belangstellings, verwysings. Kort punte, formeel, waar.",
  en: "Curriculum vitae.",
  text: `CURRICULUM VITAE

Naam: Lerato Mokoena
Geboortedatum: 2 April 2009
Kontak: 083 222 4455 · lerato@epos.co.za

Opleiding: Graad 11, Hoërskool Sentraal (2026)
Ervaring: Assistent, Kafee Koffiekoppie (Des 2025 – Jan 2026)
Vaardighede: Afrikaans, Engels en Sesotho; Excel; eerstehulp
Belangstellings: debat, netbal
Verwysings: Mev. A. Smit (onderwyser) 051 444 1111`,
  check: ['Persoonlike besonderhede', 'Opleiding', 'Ervaring', 'Vaardighede', 'Verwysings'],
  task: 'Skryf jou eie CV vir ’n vakansiewerk.',
  d: ["?Wie is ’n goeie verwysing?|’n onderwyser of vorige werkgewer|jou beste vriend|jou broer"] },

{ id: 'notule', g: 'skryf', t: 'Agenda en notule', i: '🗒️', lv: 'HT',
  r: "Agenda (vooraf): opening, verwelkoming, verskonings, notule van die vorige vergadering, sake voortspruitend, nuwe sake, algemeen, datum van volgende vergadering, sluiting. Notule (agterna): wie teenwoordig was, besluite in die verlede tyd en lydende vorm, wie wat moet doen, voorsitter en sekretaris teken.",
  en: "Agenda and minutes of a meeting.",
  text: `NOTULE VAN DIE LEERDERRAADVERGADERING
Datum: 3 Februarie 2026 · Plek: Saal · Tyd: 14:00

1. Opening: Die voorsitter het die vergadering geopen.
2. Teenwoordig: 12 lede. Verskonings: S. Naidoo.
3. Notule van die vorige vergadering is goedgekeur.
4. Nuwe sake: Daar is besluit om ’n koekverkoping op 20 Februarie te hou. Lisa sal plakkate maak.
5. Volgende vergadering: 17 Februarie 2026.
6. Sluiting: 14:45

Voorsitter: ________   Sekretaris: ________`,
  check: ['Datum, plek, tyd', 'Teenwoordig / verskonings', 'Besluite (lydende vorm)', 'Wie doen wat', 'Handtekeninge'],
  task: 'Skryf die agenda vir ’n klasvergadering oor die matriekafskeid.',
  d: ["?Notules word meestal geskryf in die …|verlede tyd en lydende vorm|toekomende tyd|ek-vorm", "?Wat kom eerste op ’n agenda?|opening en verwelkoming|algemeen|sluiting"] },

{ id: 'opstel', g: 'skryf', t: 'Opstelle', i: '🖋️', lv: 'EAT',
  r: "Verhalend: vertel ’n storie (begin, middel, klimaks, einde). Beskrywend: skilder ’n prentjie met die sintuie. Argumenterend: een standpunt met argumente. Beredeneerd: albei kante, dan jou standpunt in die slot. Bespiegelend: ’n idee ondersoek, sonder ’n vaste antwoord. Struktuur: titel, inleiding, paragrawe met ’n kernsin elk, slot. Gebruik verbindingswoorde.",
  en: "Essay types: narrative, descriptive, argumentative, discursive, reflective.",
  text: `Die oggend toe die see stil was (beskrywend – begin)

Die see lê soos ’n silwer spieël onder die bleek hemel. Nie een golf breek op die strand nie. ’n Seemeeu roep ver weg, en die reuk van sout en nat sand hang swaar in die koel lug …`,
  check: ['Titel', 'Inleiding wat aandag trek', 'Een idee per paragraaf', 'Verbindingswoorde', 'Sterk slot', 'Taal en spelling nagegaan'],
  task: 'Skryf ’n opstel van 250–300 woorde: “Die dag toe alles verkeerd geloop het”.',
  d: ["?’n Opstel wat albei kante gee en dan ’n standpunt inneem, is …|beredeneerd|verhalend|beskrywend", "?’n Opstel wat die sintuie gebruik om ’n plek te wys, is …|beskrywend|argumenterend|bespiegelend"] },

{ id: 'opsomming', g: 'skryf', t: 'Opsomming', i: '✂️', lv: 'EAT',
  r: "Lees die teks. Kies die hoofpunte. Skryf in jou eie woorde, in volsinne. Geen voorbeelde, herhaling of eie mening nie. Bly binne die woordtal en skryf die woordtal onderaan.",
  en: "Summary writing.",
  text: `Teks: Bye is belangrik vir die mens. Hulle bestuif plante, sodat vrugte en groente kan groei. Sonder bye sou baie kos verdwyn. Gifstowwe op plase maak baie bye dood. Ons kan help deur blomme te plant en minder gif te gebruik.

Opsomming (30 woorde): Bye bestuif plante sodat kos kan groei. Gif maak bye dood, wat ons voedsel bedreig. Mense kan bye beskerm deur blomme te plant en minder gif te gebruik. (30 woorde)`,
  check: ['Net hoofpunte', 'Eie woorde', 'Volsinne', 'Geen mening of voorbeelde', 'Woordtal'],
  task: 'Som ’n koerantberig in 60 woorde op.',
  d: ["?Wat hoort NIE in ’n opsomming nie?|jou eie mening|die hoofpunte|volsinne"] },

// ───────────────────────── LETTERKUNDE ─────────────────────────
{ id: 'poesie', g: 'lit', t: 'Poësie', i: '🌙', lv: 'EAT',
  r: "Versreël: een reël. Strofe: ’n groep reëls. Rym: eindklanke klink eenders (aabb, abab). Ritme: die beweging van beklemtoonde lettergrepe. Enjambement: die sin loop oor na die volgende reël. Refrein: herhaalde reël. Let op: stemming (gevoel in die gedig), toon (die spreker se houding), tema (die sentrale idee), beeldspraak en klankeffekte (alliterasie, assonansie). Vra altyd: Wat word gesê? Hoe weet ek dit?",
  en: "Poetry terms: line, stanza, rhyme scheme, rhythm, enjambment, refrain, mood, tone, theme.",
  text: `Die Karoo-nag

Die sterre sit soos spelde vas
in nag se swart fluweel;
die wind vee saggies oor die gras
en fluit ’n deuntjie wat hy speel.

Die koppies slaap, die skape lê,
die dam hou al die maan;
en ek wat niks meer het om te sê,
staan stil en kyk en staan.`,
  d: ["?Wat is die rymskema van strofe 1?|abab|aabb|abba", "?‘Die sterre sit soos spelde vas’ is ’n …|vergelyking|metafoor|personifikasie", "?‘Die wind … fluit ’n deuntjie’ is …|personifikasie|hiperbool|klanknabootsing", "?Watter stemming skep die gedig?|rustig en stil|kwaad en woes|bang en angstig", "?Hoeveel strofes het die gedig?|2|8|4"] },

{ id: 'kortverhaal', g: 'lit', t: 'Kortverhaal en roman', i: '📖', lv: 'EAT',
  r: "Karakters (hoof- en byfigure; rond of plat). Intrige: eksposisie, motoriese moment, verwikkeling, krisis, klimaks, ontknoping. Konflik: innerlik (met jouself) of uiterlik (met ander, die natuur). Verteller: eerstepersoon (ek) of derdepersoon (alwetend). Agtergrond / milieu: tyd en plek. Tema en boodskap. Ironiese wending: ’n onverwagte einde.",
  en: "Short story/novel: character, plot stages, conflict, narrator, setting, theme, twist.",
  text: `Die laaste bus

Nomsa het die hele dag vir die eksamen geleer. Toe sy opkyk, was dit tien oor tien – die laaste bus ry om halfelf.

Sy hardloop deur die donker strate. Haar asem brand. By die halte is daar niemand nie. Die bus is weg.

Sy gaan sit op die bankie en huil. Toe stop ’n ou bakkie langs haar. “Nomsa?” Dit is haar oupa. “Ek het geweet jy sal laat werk,” sê hy en glimlag.`,
  d: ["?Wie is die hoofkarakter?|Nomsa|Oupa|die busbestuurder", "?Wat is die konflik?|sy moet die laaste bus haal|sy baklei met haar oupa|sy het niks geleer nie", "?Watter soort verteller?|derdepersoon|eerstepersoon", "?Die klimaks is wanneer …|sy sien die bus is weg|sy leer vir die eksamen|sy glimlag", "?Die einde is ’n …|ironiese / verrassende wending|tragedie|hiperbool"] },

{ id: 'drama', g: 'lit', t: 'Drama', i: '🎬', lv: 'EAT',
  r: "Toneelaanwysings: inligting oor plek, tyd, beweging en emosie (in skuinsdruk of hakies). Dialoog: karakters praat met mekaar. Monoloog / alleenspraak: een karakter praat alleen en wys sy gedagtes. Dramatiese ironie: die gehoor weet iets wat ’n karakter nie weet nie. Struktuur soos ’n verhaal: eksposisie tot ontknoping. Spanning, humor, tragedie.",
  en: "Drama: stage directions, dialogue, monologue/soliloquy, dramatic irony, structure.",
  text: `(’n Kombuis. Aand. Pa sit by die tafel. Die gehoor sien die verjaarsdagkoek agter die deur.)

Pa: (moeg) Niemand het vandag aan my verjaarsdag gedink nie.
Lisa: (kom in, glimlag skelm) Pa, kan Pa gou die lig afsit?
Pa: Hoekom?
Lisa: Doen dit net, Pa!
(Die lig gaan af. Kerse flikker. Die gesin sing.)`,
  d: ["?Die gehoor weet van die koek, maar Pa nie. Dit is …|dramatiese ironie|’n monoloog|’n metafoor", "?Die woorde in hakies is …|toneelaanwysings|dialoog|’n refrein", "?’n Karakter wat alleen op die verhoog sy gedagtes hardop sê, lewer ’n …|alleenspraak|dialoog|resensie"] },

{ id: 'volksverhaal', g: 'lit', t: 'Volksverhale, fabels en mites', i: '🦊', lv: 'EAT',
  r: "Volksverhaal: mondeling oorgedra, dikwels met diere (Jakkals en Wolf). Fabel: kort, diere praat, eindig met ’n les (sedeles). Mite: verklaar die natuur of oorsprong van iets. Legende: ’n storie oor ’n held met ’n kern van waarheid.",
  en: "Folk tales, fables, myths and legends.",
  text: `Jakkals en die druiwe (’n fabel)

Jakkals sien ’n tros druiwe hoog teen die muur. Hy spring en spring, maar hy kan dit nie bereik nie.

Eindelik stap hy weg en sê: “Ag, hulle is in elk geval suur.”

Sedeles: Wat ons nie kan kry nie, sê ons is niks werd nie.`,
  d: ["?’n Kort verhaal waarin diere praat en wat met ’n les eindig, is ’n …|fabel|mite|legende", "?Wat is die sedeles van ‘Jakkals en die druiwe’?|Ons sê dikwels dat wat ons nie kan kry nie, sleg is.|Druiwe is suur.|Jakkals is slim."] },

{ id: 'visueel', g: 'lit', t: 'Visuele geletterdheid en media', i: '🎞️', lv: 'HT',
  r: "Strokiesprent: panele, spraakborrels (praat), dinkborrels (dink), klanknabootsing. Advertensie: beeld, kleur, lettergrootte, teikengroep. Film: kameraskote (naby, medium, ver), kamerahoek (hoog = karakter lyk klein / swak; laag = sterk), beligting, musiek, montage. Spotprent: satire met humor oor nuus.",
  en: "Visual literacy: comics, adverts, film techniques, cartoons.",
  d: ["?’n Kamera wat van onder op ’n karakter skiet, laat hom …|sterk en magtig lyk|klein en swak lyk|ver weg lyk", "?In ’n strokiesprent wys ’n borrel met klein sirkeltjies …|wat die karakter dink|wat hy hardop sê|’n klank", "?Vir wie is ’n advertensie bedoel?|die teikengroep|die regisseur|die verslaggewer"] },

// ───────────────────────── LUISTER EN PRAAT ─────────────────────────
{ id: 'gesprek', g: 'praat', t: 'Gesprekke en telefoon', i: '📞', lv: 'EAT',
  r: "Groet, stel jouself voor, vra en antwoord beleefd, sluit af. Telefoon: noem jou naam, sê waarom jy bel, herhaal belangrike inligting.",
  en: "Conversations and phone calls.",
  ex: ["*Goeiemiddag, dit is Thabo Nkosi wat praat.*", "*Kan ek asseblief met mev. Smit praat?*", "*Kan u dit asseblief herhaal?*", "*Ek sal later terugbel. Baie dankie.*", "*Mag ek ’n boodskap los?*"],
  d: ["?Hoe begin jy ’n formele telefoongesprek?|Goeiemiddag, dit is … wat praat.|Haai, wie’s dit?|Ja?", "?Jy het nie gehoor nie. Jy sê:|Kan u dit asseblief herhaal?|Wat?|Praat harder!"] },

{ id: 'onderhoud', g: 'praat', t: 'Onderhoud', i: '🤝', lv: 'EAT',
  r: "Voor: berei vrae voor (oop vrae: hoe, hoekom, vertel my …). Tydens: luister, vra opvolgvrae, maak notas. Na: bedank die persoon. As jy die een is wat ondervra word: kyk die persoon in die oë, antwoord volledig en eerlik.",
  en: "Interviews: open questions, follow-ups, thanking.",
  ex: ["*Vertel my meer oor …*", "*Hoekom het u besluit om …?*", "*Wat was die grootste uitdaging?*", "*Baie dankie vir u tyd.*"],
  d: ["?Watter een is ’n oop vraag?|Hoekom hou u van u werk?|Hou u van u werk?|Is u gelukkig?"] },

{ id: 'debat', g: 'praat', t: 'Debat en groepsbespreking', i: '🗣️', lv: 'HT',
  r: "Spreek die voorsitter aan. Stel jou standpunt, gee bewyse, weerlê die teenkant beleefd. Frases: Ek stem saam / nie saam nie, omdat … ; Aan die ander kant … ; Mag ek iets byvoeg? ; Ten slotte …",
  en: "Debate and group discussion phrases.",
  ex: ["*Meneer die voorsitter, ek stem nie saam nie, omdat …*", "*My teenstander beweer dat …, maar …*", "*Mag ek iets byvoeg?*", "*Ten slotte wil ek beklemtoon dat …*"],
  d: ["?Hoe spreek jy die voorsitter aan?|Meneer / Mevrou die voorsitter|Haai voorsitter|Liewe voorsitter", "?Beleefd ’n ander mening gee:|Ek verstaan jou punt, maar ek dink …|Jy is verkeerd.|Bly stil."] },

{ id: 'aanbied', g: 'praat', t: 'Toespraak lewer, voorstel en bedank', i: '🎤', lv: 'EAT',
  r: "Voorbereide toespraak: oefen, gebruik kaartjies, kyk na die gehoor, praat duidelik (stemprojeksie, tempo, pouses), gebaar natuurlik. Onvoorbereide toespraak: dink een minuut, kies twee of drie punte. ’n Spreker voorstel: naam, agtergrond, onderwerp. ’n Spreker bedank: verwys na ’n hoogtepunt uit die toespraak.",
  en: "Delivering speeches; introducing and thanking a speaker.",
  ex: ["*Dit is vir my ’n groot eer om dr. Botha aan u voor te stel.*", "*Dankie, dr. Botha, veral vir u wenke oor …*"],
  d: ["?Wat doen jy wanneer jy ’n spreker bedank?|verwys na ’n hoogtepunt in die toespraak|herhaal die hele toespraak|vertel van jouself"] },
];

// Flatten drills into reviewable items.
export const DRILLS = [];
for (const m of MODULES) {
  m.items = (m.d || []).map((line, i) => {
    const mc = line[0] === '?';
    const [q, ...rest] = line.slice(1).split('|');
    const it = { id: `g:${m.id}:${i}`, kind: 'g', mod: m.id, af: q, pic: m.i, mc, ans: rest };
    DRILLS.push(it);
    return it;
  });
}
