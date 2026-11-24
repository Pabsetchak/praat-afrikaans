// Afrikaans course content.
// Word line:     afrikaans | picture (emoji) | example sentence | english (only shown when "English help" is on)
// Pattern line:  sentence (with *highlight*) | picture
// Story line:    Speaker: text   (cast gives the voice: f = female, m = male)
// Question:      [question, [options], index of right option]
// Spelling follows the Afrikaanse Woordelys en Spelreëls (AWS, Taalkommissie).

export const SOUNDS = [
  { g: 'a', ipa: '[a]', w: ['kat', 'man', 'hand'], tip: 'Kort en oop.', en: 'short, like "u" in "cut"' },
  { g: 'aa', ipa: '[ɑː]', w: ['kaas', 'maan', 'water'], tip: 'Lank en oop.', en: 'long, like "a" in "father"' },
  { g: 'e', ipa: '[ɛ]', w: ['bed', 'pen', 'ses'], tip: 'Kort.', en: 'like "e" in "bed"' },
  { g: 'ee', ipa: '[iə]', w: ['twee', 'been', 'see'], tip: 'Twee klanke: i + ə.', en: 'glides: "ee-uh"' },
  { g: 'ê', ipa: '[ɛː]', w: ['sê', 'lê', 'wêreld'], tip: 'Lank en oop.', en: 'long open "e", like "air" without r' },
  { g: 'i', ipa: '[ə]', w: ['kind', 'vis', 'sit'], tip: 'Kort en neutraal.', en: 'like "a" in "about"' },
  { g: 'ie', ipa: '[i]', w: ['vier', 'sien', 'drie'], tip: 'Lank en hoog.', en: 'like "ee" in "see"' },
  { g: 'o', ipa: '[ɔ]', w: ['son', 'hond', 'pot'], tip: 'Kort en rond.', en: 'like "o" in "pot" (British)' },
  { g: 'oo', ipa: '[uə]', w: ['oog', 'boom', 'brood'], tip: 'Twee klanke: u + ə.', en: 'glides: "oo-uh"' },
  { g: 'oe', ipa: '[u]', w: ['boek', 'voet', 'koei'], tip: 'Soos die wind: oe!', en: 'like "oo" in "food"' },
  { g: 'u', ipa: '[œ]', w: ['bus', 'dun', 'kus'], tip: 'Lippe rond, kort.', en: 'like "u" in "fur", short, lips rounded' },
  { g: 'uu', ipa: '[y]', w: ['uur', 'muur', 'suur'], tip: 'Sê ie, maak die lippe rond.', en: 'say "ee" with rounded lips (French "u")' },
  { g: 'ui', ipa: '[œy]', w: ['huis', 'uit', 'ruik'], tip: 'Begin rond, eindig met i.', en: 'no English sound: "ay" with rounded lips' },
  { g: 'eu', ipa: '[iø]', w: ['neus', 'deur', 'reus'], tip: 'Lippe rond.', en: 'like "ee" gliding into rounded "uh"' },
  { g: 'y / ei', ipa: '[əi]', w: ['ys', 'klein', 'eier'], tip: 'y en ei klink dieselfde.', en: 'both like "ay" in "say"' },
  { g: 'ou', ipa: '[əu]', w: ['koud', 'oupa', 'hout'], tip: 'Mond gaan rond.', en: 'like "oh" in "show"' },
  { g: 'g', ipa: '[χ]', w: ['goed', 'groen', 'geel'], tip: 'Agter in die keel: ggg!', en: 'throat sound, like Scottish "loch"' },
  { g: 'r', ipa: '[r]', w: ['rooi', 'brood', 'reën'], tip: 'Die tong rol.', en: 'rolled or tapped r' },
  { g: 'w', ipa: '[v]', w: ['water', 'wit', 'wind'], tip: 'Klink soos v.', en: 'like English "v"' },
  { g: 'v', ipa: '[f]', w: ['vis', 'vier', 'voet'], tip: 'Klink soos f.', en: 'like English "f"' },
  { g: 'j', ipa: '[j]', w: ['ja', 'jy', 'jaar'], tip: 'Klink soos die begin van ja.', en: 'like English "y" in "yes"' },
  { g: "'n", ipa: '[ə]', w: ["'n kat", "'n hond", "'n boek"], tip: 'Net ə. Kort!', en: 'just "uh" (the article "a")' },
  { g: '-tjie', ipa: '[ki]', w: ['katjie', 'hondjie', 'mandjie'], tip: 'Klink amper soos kie.', en: 'sounds like "kee"' },
  { g: 'ë', ipa: 'nuwe greep', w: ['reën', 'geëet', 'knieë'], tip: 'Twee punte: begin \'n nuwe klank.', en: 'the dots start a new syllable' },
];

export const UNITS = [
{ id: 'hallo', t: 'Hallo!', i: '👋', w: `
hallo|👋|Hallo, ek is Anna.|hello
totsiens|👋🚪|Totsiens, tot môre!|goodbye
goeiemôre|🌅|Goeiemôre, Pa!|good morning
goeiemiddag|☀️🕑|Goeiemiddag, hoe gaan dit?|good afternoon
goeienaand|🌆|Goeienaand, Ouma.|good evening
ja|👍|Ja, dit is goed.|yes
nee|👎|Nee, dankie.|no
dankie|😊🎁|Baie dankie!|thank you
asseblief|🙏|Water, asseblief.|please
jammer|😔|Ek is jammer.|sorry
goed|👌|Dit gaan goed.|good / well
baie|➕➕|Dit is baie goed!|very / a lot
lekker|😋|Dit is lekker!|nice / tasty
welkom|🤗|Welkom, kom in!|welcome`,
  p: [{ t: 'Hoe gaan dit?', i: '💬', r: 'Vra: Hoe gaan dit? Antwoord: Dit gaan goed, dankie.', en: 'How are you? – I am well, thanks.', s: `
*Hoe gaan dit?*|❓🙂
Dit gaan *goed*, dankie.|👌🙂
Dit gaan *baie* goed!|👌👌
En *met jou*?|➡️🫵` }],
  st: { t: 'By die deur', cast: { Anna: 'f', Ben: 'm' }, l: `
Anna: Hallo! Goeiemôre!
Ben: Goeiemôre, Anna! Hoe gaan dit?
Anna: Dit gaan goed, dankie. En met jou?
Ben: Baie goed, dankie!
Anna: Lekker! Totsiens, Ben.
Ben: Totsiens!`, q: [
    ['Hoe gaan dit met Ben?', ['👌', '😔', '🤒'], 0],
    ['Is dit môre of aand?', ['🌅 môre', '🌆 aand'], 0],
  ] } },

{ id: 'ekjy', t: 'Ek en jy', i: '🙋', w: `
ek|🙋|Ek is Ben.|I
jy|🫵|Jy is my vriend.|you
hy|👨|Hy is 'n man.|he
sy|👩|Sy is 'n vrou.|she
ons|🙋👥|Ons is vriende.|we
julle|🫵👥|Julle is welkom.|you (plural)
hulle|👉👥|Hulle is kinders.|they
man|🧔|Die man sê hallo.|man
vrou|👱‍♀️|Die vrou sê goeiemôre.|woman
kind|🧒|Die kind sê dankie.|child
seun|👦|Die seun is Ben.|boy
meisie|👧|Die meisie is Anna.|girl
vriend|🤝|Ben is my vriend.|friend
naam|📛|My naam is Anna.|name
is|🟰|Sy is 'n meisie.|is / am / are`,
  p: [{ t: 'Een vorm vir almal', i: '🟰', r: 'Ek is, jy is, hy is, ons is, hulle is. Die werkwoord bly dieselfde!', en: 'Verbs never change for the person: ek is, jy is, hulle is.', s: `
Ek *is* 'n seun.|🙋👦
Jy *is* 'n meisie.|🫵👧
Ons *is* vriende.|🙋👥🤝
Hulle *is* kinders.|👉👥🧒` }],
  st: { t: 'Wie is jy?', cast: { Anna: 'f', Sam: 'm' }, l: `
Anna: Hallo! My naam is Anna.
Sam: Hallo, Anna! Ek is Sam.
Anna: Is Ben jou vriend?
Sam: Ja, Ben is my vriend.
Anna: En die meisie?
Sam: Sy is Lisa. Ons is vriende.`, q: [
    ['Is Ben Sam se vriend?', ['Ja 👍', 'Nee 👎'], 0],
    ['Die meisie is…', ['Lisa', 'Anna', 'Ben'], 0],
  ] } },

{ id: 'familie', t: 'Familie', i: '👨‍👩‍👧', w: `
ma|👩‍👧|Dit is my ma.|mother
pa|👨‍👦|My pa is groot.|father
broer|👦👦|Ek het een broer.|brother
suster|👧👧|My suster is Lisa.|sister
ouma|👵|Ouma sê: Hallo, my kind!|grandmother
oupa|👴|Oupa is oud.|grandfather
baba|👶|Die baba slaap.|baby
familie|👨‍👩‍👧‍👦|Ons is 'n groot familie.|family
huis|🏠|Ons huis is groot.|house
hond|🐕|Die hond is my vriend.|dog
kat|🐈|Die kat slaap.|cat
my|🙋➡️|Dit is my kat.|my
jou|🫵➡️|Is dit jou hond?|your
het|🤲|Ek het 'n broer.|have / has
groot|🐳|Die huis is groot.|big
klein|🐜|Die baba is klein.|small
en|➕|Ma en Pa.|and`,
  p: [{ t: 'Pa se hond', i: '🔗', r: 'Wie s’n? Sê: naam + se + ding.', en: '"se" shows possession: Pa se hond = Dad\'s dog.', s: `
Dit is Pa *se* hond.|👨‍👦➡️🐕
Ma *se* kat is klein.|👩‍👧➡️🐈
Anna *se* broer is Ben.|👧➡️👦
Ouma *se* huis is groot.|👵➡️🏠` }],
  st: { t: 'My familie', cast: { Anna: 'f' }, l: `
Anna: Hallo! Ek is Anna.
Anna: Ek het 'n groot familie.
Anna: My ma is Elsa en my pa is Johan.
Anna: Ek het een broer. Sy naam is Ben.
Anna: Ons het 'n hond en 'n kat.
Anna: Die hond is groot, en die kat is klein.`, q: [
    ['Anna het…', ['een broer 👦', 'een suster 👧'], 0],
    ['Die kat is…', ['klein 🐜', 'groot 🐳'], 0],
    ['Pa se naam is…', ['Johan', 'Ben', 'Elsa'], 0],
  ] } },

{ id: 'getalle', t: 'Getalle', i: '🔢', w: `
nul|0️⃣|Nul is niks.|zero
een|1️⃣|Ek het een kat.|one
twee|2️⃣|Ek het twee honde.|two
drie|3️⃣|Drie kinders speel.|three
vier|4️⃣|Ons is vier.|four
vyf|5️⃣|Ek is vyf jaar oud.|five
ses|6️⃣|Ses eiers, asseblief.|six
sewe|7️⃣|'n Week het sewe dae.|seven
agt|8️⃣|Die seun is agt jaar oud.|eight
nege|9️⃣|Nege katte!|nine
tien|🔟|Ek het tien vingers.|ten
twintig|2️⃣0️⃣|Twintig rand, asseblief.|twenty
honderd|💯|Honderd persent!|hundred
hoeveel|🔢❓|Hoeveel kinders het jy?|how many`,
  p: [{ t: 'Een… twee… baie!', i: '➕', r: 'Meer as een: sê -e of -s. Soms: -ers.', en: 'Plurals: add -e or -s (sometimes -ers): hond → honde, appel → appels, kind → kinders.', s: `
Een hond, twee *honde*.|🐕 2️⃣🐕🐕
Een kat, drie *katte*.|🐈 3️⃣🐈🐈🐈
Een appel, vier *appels*.|🍎 4️⃣🍎🍎
Een kind, vyf *kinders*.|🧒 5️⃣🧒🧒` }],
  st: { t: 'Hoeveel?', cast: { Ben: 'm', Ma: 'f' }, l: `
Ben: Ma, hoeveel eiers het ons?
Ma: Ons het ses eiers.
Ben: En hoeveel appels?
Ma: Drie appels.
Ben: Dit is nie baie nie!
Ma: Ja. Ons koop tien appels.`, q: [
    ['Hoeveel eiers het hulle?', ['6️⃣', '3️⃣', '🔟'], 0],
    ['Hoeveel appels het hulle nou?', ['3️⃣', '🔟', '6️⃣'], 0],
  ] } },

{ id: 'kos', t: 'Kos', i: '🍽️', w: `
kos|🍲|Die kos is lekker.|food
water|💧|Water, asseblief.|water
melk|🥛|Die kat drink melk.|milk
koffie|☕|Pa drink koffie.|coffee
tee|🍵|Ouma drink tee.|tea
brood|🍞|Ek eet brood.|bread
kaas|🧀|Brood met kaas, asseblief.|cheese
appel|🍎|Die appel is lekker.|apple
piesang|🍌|Die piesang is geel.|banana
eier|🥚|Ek eet 'n eier.|egg
vleis|🥩|Hy eet nie vleis nie.|meat
vis|🐟|Die kat eet vis.|fish
eet|🍴|Ons eet saam.|eat
drink|🥤|Ek drink water.|drink
honger|🤤|Ek is honger.|hungry
dors|🥵💧|Ek is dors.|thirsty`,
  p: [{ t: 'Nie … nie', i: '🚫', r: 'Nee? Sê nie twee keer: Ek eet nie vleis nie. Is die sin klaar ná die werkwoord? Een nie: Ek eet nie.', en: 'Negation uses two "nie": one after the verb and one at the end of the clause. If nothing follows the verb, one "nie" is enough.', s: `
Ek eet *nie* vleis *nie*.|🙋🚫🥩
Sy drink *nie* koffie *nie*.|👩🚫☕
Ons is *nie* honger *nie*.|🙋👥🚫🤤
Dit is *nie* my kat *nie*.|🚫🐈
Hy eet *nie*.|👨🚫🍴` }],
  st: { t: 'In die kombuis', cast: { Ben: 'm', Ma: 'f' }, l: `
Ben: Ma, ek is honger!
Ma: Wil jy brood met kaas hê?
Ben: Nee dankie, ek eet nie kaas nie.
Ma: 'n Eier?
Ben: Ja, asseblief! En melk.
Ma: Hier is jou eier en jou melk.
Ben: Baie dankie, Ma!`, q: [
    ['Eet Ben kaas?', ['Nee 👎', 'Ja 👍'], 0],
    ['Wat drink Ben?', ['🥛', '☕', '🍵'], 0],
  ] } },

{ id: 'kleure', t: 'Kleure', i: '🎨', w: `
rooi|🔴|Die appel is rooi.|red
blou|🔵|Die lug is blou.|blue
geel|🟡|Die piesang is geel.|yellow
groen|🟢|Die gras is groen.|green
swart|⚫|Die kat is swart.|black
wit|⚪|Die melk is wit.|white
bruin|🟤|Die hond is bruin.|brown
pienk|🎀|Die rok is pienk.|pink
oranje|🟠|Die lemoen is oranje.|orange
pers|🟣|Die druiwe is pers.|purple
grys|🌫️|Die wolk is grys.|grey
kleur|🎨|Watter kleur is dit?|colour
mooi|✨|Die blom is mooi.|beautiful
blom|🌷|Ek het 'n blom vir jou.|flower`,
  p: [{ t: 'Die rooi appel', i: '🍎', r: 'Die appel is rooi = die rooi appel.', en: 'Adjectives go before the noun, or after "is".', s: `
Die appel *is rooi*.|🍎🔴
Ek eet die *rooi appel*.|🙋🍴🔴🍎
Die hond *is bruin*.|🐕🟤
Die *bruin hond* drink water.|🟤🐕💧` }],
  st: { t: 'Die mooi blom', cast: { Lisa: 'f', Ouma: 'f' }, l: `
Lisa: Kyk, Ouma! 'n Blom!
Ouma: O, dit is mooi! Watter kleur is dit?
Lisa: Dit is pienk en wit.
Ouma: En die blare is groen.
Lisa: Ek gee dit vir jou, Ouma.
Ouma: Dankie, my kind!`, q: [
    ['Watter kleur is die blom?', ['🎀⚪', '🔵', '⚫'], 0],
    ['Die blare is…', ['🟢', '🔴', '🟡'], 0],
  ] } },

{ id: 'doen', t: 'Doen', i: '🏃', w: `
loop|🚶|Ek loop huis toe.|walk
hardloop|🏃|Die hond hardloop vinnig.|run
swem|🏊|Ons swem in die see.|swim
lees|📖|Sy lees 'n boek.|read
skryf|✍️|Ek skryf my naam.|write
praat|🗣️|Ons praat Afrikaans.|speak / talk
luister|🎧|Luister na die musiek.|listen
speel|🤸|Die kinders speel buite.|play
werk|💼|Pa werk in die stad.|work
kook|🧑‍🍳|Ma kook kos.|cook
sing|🎤|Ouma sing mooi.|sing
dans|💃|Hulle dans saam.|dance
sien|👀|Ek sien die son.|see
hoor|🔊|Ek hoor 'n hond.|hear
slaap|😴|Die baba slaap.|sleep`,
  p: [{ t: 'Vra met die werkwoord', i: '❓', r: 'Draai om: Jy swem. → Swem jy?', en: 'Yes/no questions: put the verb first. Jy swem → Swem jy?', s: `
Jy swem.|🫵🏊
*Swem jy*?|🏊🫵❓
Hy lees 'n boek.|👨📖
*Lees hy* 'n boek?|📖👨❓` }],
  st: { t: 'Wat doen jy?', cast: { Sam: 'm', Lisa: 'f' }, l: `
Sam: Hallo Lisa! Wat doen jy?
Lisa: Ek lees 'n boek. En jy?
Sam: Ek speel sokker met Ben.
Lisa: Lekker! Hardloop Ben vinnig?
Sam: Ja, baie vinnig!
Lisa: Ek wil ook speel!`, q: [
    ['Wat doen Lisa?', ['📖', '⚽', '🏊'], 0],
    ['Sam speel met…', ['Ben', 'Anna', 'Ouma'], 0],
  ] } },

{ id: 'vrae', t: 'Vrae', i: '❓', w: `
wie|🧍❓|Wie is jy?|who
wat|📦❓|Wat is dit?|what
waar|📍❓|Waar is die kat?|where
wanneer|⏰❓|Wanneer eet ons?|when
hoekom|🤔|Hoekom huil die baba?|why
hoe|🧭❓|Hoe gaan dit?|how
watter|👆❓|Watter kleur is dit?|which
hier|📍⬇️|Ek is hier!|here
daar|👉📍|Die kat is daar.|there
ook|➕✔️|Ek is ook honger.|also / too
maar|↔️|Ek is moeg, maar bly.|but
of|🔀|Tee of koffie?|or`,
  p: [{ t: 'Vraagwoord + werkwoord', i: '❓', r: 'Vraagwoord eerste, dan die werkwoord, dan wie.', en: 'Question word first, then the verb, then the subject.', s: `
*Waar is* die kat?|📍❓🐈
*Wat eet* jy?|📦❓🍴🫵
*Wie is* hy?|🧍❓👨
*Hoekom huil* die baba?|🤔😭👶
*Wanneer eet* ons?|⏰❓🍴🙋👥` }],
  st: { t: 'Baie vrae', cast: { Ben: 'm', Pa: 'm' }, l: `
Ben: Pa, waar is Ma?
Pa: Sy is by die winkel.
Ben: Wanneer kom sy huis toe?
Pa: Later. Hoekom vra jy?
Ben: Want ek is honger! Wat eet ons vanaand?
Pa: Vis en brood.
Ben: Ag nee, nie weer vis nie!`, q: [
    ['Waar is Ma?', ['🏪', '🏠', '🏫'], 0],
    ['Wat eet hulle vanaand?', ['🐟🍞', '🥩', '🧀'], 0],
  ] } },

{ id: 'tyd', t: 'Tyd', i: '⏰', w: `
vandag|📅|Vandag speel ons.|today
môre|📅➡️|Môre swem ek.|tomorrow / morning
gister|📅⬅️|Gister was ek siek.|yesterday
nou|⏱️|Ek eet nou.|now
later|🕒➡️|Ons praat later.|later
dag|🌞|Dit is 'n mooi dag.|day
nag|🌃|Die nag is donker.|night
oggend|🌄|In die oggend drink ek koffie.|morning
aand|🌇|In die aand lees ek.|evening
uur|🕐|Ek werk agt uur.|hour
minuut|⏲️|Wag een minuut, asseblief.|minute
week|🗓️|'n Week het sewe dae.|week
maand|📆|Die maand is amper klaar.|month
jaar|🎆|Ek is twintig jaar oud.|year
sal|🔜|Ek sal môre bel.|will (future)`,
  p: [{ t: 'Die werkwoord is nommer 2', i: '2️⃣', r: 'Die werkwoord staan altyd op plek 2. Begin jy met tyd? Dan kom ek/jy ná die werkwoord.', en: 'Verb-second: the verb is always the 2nd element. Start with a time word and the subject moves after the verb.', s: `
Ek *swem* vandag.|🙋🏊📅
Vandag *swem* ek.|📅🏊🙋
Ons *eet* nou.|🙋👥🍴⏱️
Nou *eet* ons.|⏱️🍴🙋👥
Môre *werk* Pa.|📅➡️💼👨` },
  { t: 'Sal', i: '🔜', r: 'Later? Sê sal + werkwoord aan die einde.', en: 'Future: sal + verb at the end of the clause.', s: `
Ek *sal* môre *swem*.|🙋🔜🏊
Sy *sal* later *bel*.|👩🔜📞
Ons *sal* vis *eet*.|🙋👥🔜🐟` }],
  st: { t: 'Môre', cast: { Anna: 'f', Ben: 'm' }, l: `
Anna: Ben, wat doen jy môre?
Ben: Môre werk ek. En in die aand speel ek sokker.
Anna: En vandag?
Ben: Vandag doen ek niks! Ek slaap.
Anna: Haha! Dit is nou al tien uur!
Ben: Ag, later, Anna. Later!`, q: [
    ['Wat doen Ben môre?', ['💼', '🏊', '📖'], 0],
    ['Wat doen Ben vandag?', ['😴', '💼', '⚽'], 0],
  ] } },

{ id: 'huis', t: 'In die huis', i: '🏠', w: `
kamer|🛏️🖼️|My kamer is klein.|room
bed|🛏️|Die kat slaap op die bed.|bed
deur|🚪|Maak die deur toe.|door
venster|🪟|Kyk by die venster.|window
tafel|🍽️🟫|Die kos is op die tafel.|table
stoel|🪑|Sit op die stoel.|chair
kombuis|🍳|Ma is in die kombuis.|kitchen
badkamer|🛁|Die badkamer is skoon.|bathroom
sleutel|🔑|Waar is my sleutel?|key
lig|💡|Sit die lig aan.|light
sit|🧘|Ek sit op die stoel.|sit
staan|🧍|Hy staan by die deur.|stand
op|⬆️|Die kat is op die tafel.|on
in|📥|Die melk is in die kombuis.|in
onder|⬇️|Die hond is onder die tafel.|under
langs|↔️|Die stoel is langs die bed.|next to`,
  p: [{ t: 'Waar is dit?', i: '📍', r: 'op ⬆️, onder ⬇️, in 📥, langs ↔️', en: 'Prepositions of place: op (on), onder (under), in (in), langs (next to).', s: `
Die kat is *op* die tafel.|🐈⬆️🍽️
Die hond is *onder* die tafel.|🐕⬇️🍽️
Die eier is *in* die kombuis.|🥚📥🍳
Die stoel is *langs* die bed.|🪑↔️🛏️` }],
  st: { t: 'Waar is die sleutel?', cast: { Pa: 'm', Anna: 'f' }, l: `
Pa: Anna, waar is my sleutel?
Anna: Is dit op die tafel?
Pa: Nee, dit is nie op die tafel nie.
Anna: Onder die bed?
Pa: Nee!
Anna: Kyk, Pa! Die kat sit op die sleutel!
Pa: Ag nee, kat! Dankie, Anna.`, q: [
    ['Waar is die sleutel?', ['onder die kat 🐈', 'op die tafel', 'onder die bed'], 0],
  ] } },

{ id: 'liggaam', t: 'My liggaam', i: '🧍', w: `
kop|🙆|My kop is seer.|head
oog|👁️|Sy het blou oë.|eye
oor|👂|Ek hoor met my ore.|ear
neus|👃|Die hond het 'n swart neus.|nose
mond|👄|Ek eet met my mond.|mouth
tand|🦷|Die baba het een tand.|tooth
hare|💇|Sy het lang hare.|hair
hand|✋|Was jou hande.|hand
voet|🦶|My voet is seer.|foot
been|🦵|Die hond het vier bene.|leg
arm|💪|Hy het sterk arms.|arm
seer|🤕|My kop is seer.|sore / hurt
dokter|🧑‍⚕️|Ek gaan dokter toe.|doctor
siek|🤒|Die kind is siek.|sick
moeg|🥱|Ek is baie moeg.|tired`,
  p: [{ t: 'Oë, ore, bene', i: '👀', r: 'Party woorde verander: oog → oë, oor → ore, been → bene.', en: 'Some plurals change: oog → oë, oor → ore, been → bene.', s: `
Ek het twee *oë*.|2️⃣👁️👁️
Ek het twee *ore*.|2️⃣👂👂
Ek het twee *hande*.|2️⃣✋✋
Die hond het vier *bene*.|🐕4️⃣🦵` }],
  st: { t: 'By die dokter', cast: { Dokter: 'f', Ben: 'm' }, l: `
Dokter: Goeiemiddag, Ben. Wat is fout?
Ben: My kop is seer, dokter.
Dokter: Is jou keel ook seer?
Ben: Nee, net my kop. En ek is baie moeg.
Dokter: Jy is siek. Drink baie water en slaap!
Ben: Dankie, dokter.`, q: [
    ['Wat is seer?', ['🙆 kop', '🦶 voet', '✋ hand'], 0],
    ['Wat moet Ben drink?', ['💧', '☕', '🥛'], 0],
  ] } },

{ id: 'weer', t: 'Die weer', i: '🌦️', w: `
weer|🌦️|Hoe is die weer vandag?|weather
son|☀️|Die son skyn.|sun
reën|🌧️|Dit reën vandag.|rain
wind|🌬️|Die wind waai.|wind
wolk|☁️|Daar is 'n wolk.|cloud
koud|🥶|Dit is koud in die winter.|cold
warm|🌡️🔥|Dit is warm vandag.|warm / hot
sneeu|❄️|Daar is sneeu op die berg.|snow
somer|😎|In die somer swem ons.|summer
winter|⛄|Die winter is koud.|winter
lente|🌱|In die lente is daar blomme.|spring
herfs|🍂|In die herfs val die blare.|autumn
storm|⛈️|Die storm is groot.|storm
sambreel|☂️|Vat jou sambreel!|umbrella`,
  p: [{ t: 'Dit reën', i: '🌧️', r: 'Weer? Begin met dit. Iets is daar? Sê daar is.', en: '"Dit" for weather (dit reën = it rains); "daar is" = there is.', s: `
*Dit* reën.|🌧️
*Dit* is koud.|🥶
*Daar is* 'n wolk.|☁️
*Dit* is warm in die somer.|🌡️🔥😎` }],
  st: { t: 'Hoe is die weer?', cast: { Ma: 'f', Ben: 'm' }, l: `
Ma: Ben, kyk by die venster. Hoe is die weer?
Ben: Dit reën, Ma. En die wind waai.
Ma: Is dit koud?
Ben: Ja, baie koud!
Ma: Vat jou sambreel en jou baadjie.
Ben: Ag nee! Ek wil swem!
Ma: Nie vandag nie, my kind. In die somer.`, q: [
    ['Hoe is die weer?', ['🌧️', '☀️', '❄️'], 0],
    ['Wat vat Ben?', ['☂️', '🏊', '📖'], 0],
  ] } },

{ id: 'klere', t: 'Klere', i: '👕', w: `
hemp|👕|Die hemp is blou.|shirt
broek|👖|My broek is swart.|trousers
rok|👗|Sy dra 'n rooi rok.|dress
skoen|👟|Waar is my skoene?|shoe
hoed|👒|Oupa dra 'n hoed.|hat
baadjie|🧥|Dra jou baadjie, dit is koud.|jacket
sokkie|🧦|My sokkies is wit.|sock
trui|🧶|Die trui is warm.|jersey / sweater
bril|👓|Oupa dra 'n bril.|glasses
dra|🧍👕|Sy dra 'n hoed.|wear
nuut|🆕|My skoene is nuut.|new
oud|🏚️|Oupa se hoed is oud.|old
lank|📏⬆️|Sy het lang hare.|long / tall
kort|📏⬇️|Die broek is kort.|short`,
  p: [{ t: "'n Nuwe hoed", i: '🆕', r: 'Voor die ding verander party woorde: nuut → nuwe, oud → ou, lank → lang, goed → goeie.', en: 'Some adjectives change before a noun: nuut → nuwe, oud → ou, lank → lang, goed → goeie.', s: `
My skoene is *nuut*.|👟🆕
Ek het *nuwe* skoene.|🙋🆕👟
Die hoed is *oud*.|👒🏚️
Oupa het 'n *ou* hoed.|👴🏚️👒
Dit is 'n *goeie* trui.|👌🧶` }],
  st: { t: 'Wat dra ek?', cast: { Lisa: 'f', Ma: 'f' }, l: `
Lisa: Ma, wat dra ek vandag?
Ma: Dit is koud. Dra jou warm trui.
Lisa: Die blou trui of die rooi trui?
Ma: Die rooi trui. En jou nuwe skoene.
Lisa: En 'n hoed?
Ma: Nee, nie 'n hoed nie. Dit reën!`, q: [
    ['Watter trui dra Lisa?', ['🔴', '🔵', '🟢'], 0],
    ['Is dit warm?', ['Nee 👎', 'Ja 👍'], 0],
  ] } },

{ id: 'stad', t: 'In die stad', i: '🏙️', w: `
stad|🏙️|Die stad is groot.|city
winkel|🏪|Die winkel is oop.|shop
skool|🏫|Die kinders is by die skool.|school
hospitaal|🏥|Die dokter werk in die hospitaal.|hospital
kerk|⛪|Die kerk is oud.|church
straat|🛣️|Die straat is lank.|street
motor|🚗|Pa se motor is rooi.|car
bus|🚌|Ons ry met die bus.|bus
trein|🚆|Die trein is vinnig.|train
fiets|🚲|Ek ry fiets.|bicycle
ry|🚗💨|Ons ry stad toe.|drive / ride
gaan|🚶➡️|Ek gaan huis toe.|go
links|⬅️|Draai links.|left
regs|➡️|Draai regs by die kerk.|right
draai|🔄|Draai hier links.|turn`,
  p: [{ t: 'Skool toe', i: '➡️', r: 'Waarheen? Sê die plek + toe.', en: 'Direction: place + "toe": Ek gaan skool toe = I go to school.', s: `
Ek gaan *skool toe*.|🙋➡️🏫
Ons ry *stad toe*.|🙋👥🚗➡️🏙️
Sy gaan *winkel toe*.|👩➡️🏪
Gaan jy *huis toe*?|🫵➡️🏠❓` }],
  st: { t: 'Waar is die winkel?', cast: { Sam: 'm', Vrou: 'f' }, l: `
Sam: Verskoon my, waar is die winkel?
Vrou: Die winkel? Gaan reguit, en draai links by die kerk.
Sam: Links by die kerk?
Vrou: Ja. Die winkel is langs die skool.
Sam: Is dit ver?
Vrou: Nee, net vyf minute.
Sam: Baie dankie!`, q: [
    ['Waar draai Sam links?', ['⛪', '🏫', '🏥'], 0],
    ['Die winkel is langs die…', ['🏫 skool', '🏥 hospitaal', '⛪ kerk'], 0],
  ] } },

{ id: 'diere', t: 'Diere', i: '🦁', w: `
leeu|🦁|Die leeu slaap in die son.|lion
olifant|🐘|Die olifant is baie groot.|elephant
kameelperd|🦒|Die kameelperd is lank.|giraffe
seekoei|🦛|Die seekoei swem in die rivier.|hippo
renoster|🦏|Die renoster is sterk.|rhino
aap|🐒|Die aap eet 'n piesang.|monkey
voël|🐦|Die voël sing.|bird
perd|🐎|Die perd hardloop vinnig.|horse
koei|🐄|Die koei gee melk.|cow
skaap|🐑|Die skaap is wit.|sheep
vark|🐖|Die vark is pienk.|pig
hoender|🐔|Die hoender lê 'n eier.|chicken
slang|🐍|Die slang is lank.|snake
muis|🐭|Die kat sien 'n muis.|mouse`,
  p: [{ t: 'Klein, kleiner: -tjie', i: '🤏', r: 'Iets klein of oulik? Sê -tjie, -ie of -pie aan die einde.', en: 'Diminutive: add -tjie, -ie or -pie for small or cute things: kat → katjie, boom → boompie.', s: `
Die *katjie* is klein.|🐈🤏
Die *hondjie* speel.|🐕🤏🤸
Daar is 'n *voëltjie* in die *boompie*.|🐦🤏🌳
Die *perdjie* is bruin.|🐎🤏🟤` }],
  st: { t: 'In die wildtuin', cast: { Oupa: 'm', Lisa: 'f' }, l: `
Oupa: Kyk, Lisa! Daar is 'n olifant!
Lisa: Hy is so groot! En kyk, 'n kameelperd!
Oupa: Die kameelperd eet blare in die boom.
Lisa: Oupa, is daar leeus?
Oupa: Ja, maar hulle slaap in die dag.
Lisa: Ek is bly. Ek is bang vir leeus!`, q: [
    ['Wat eet die kameelperd?', ['🍃', '🥩', '🐟'], 0],
    ['Wat doen die leeus in die dag?', ['😴', '🏃', '🍴'], 0],
  ] } },

{ id: 'gevoel', t: 'Gevoelens', i: '😊', w: `
bly|😊|Ek is bly om jou te sien.|happy / glad
hartseer|😢|Sy is hartseer.|sad
kwaad|😠|Pa is kwaad.|angry
bang|😨|Ek is bang vir slange.|afraid
verveeld|😑|Die kinders is verveeld.|bored
opgewonde|🤩|Ons is opgewonde!|excited
rustig|😌|Die see is rustig.|calm
lag|😂|Hulle lag baie.|laugh
huil|😭|Die baba huil.|cry
skrik|😱|Ek skrik vir die slang!|get a fright
lief|❤️|Ek is lief vir jou.|love / dear
voel|🫶|Hoe voel jy vandag?|feel
omdat|🔗|Ek is bly omdat dit warm is.|because
want|🔗➡️|Ek eet, want ek is honger.|because (for)`,
  p: [{ t: 'Omdat … aan die einde', i: '🔚', r: 'Ná omdat gaan die werkwoord na die einde. Ná want bly alles gewoon.', en: 'After "omdat" the verb goes to the end. After "want" normal order stays.', s: `
Ek is bly omdat dit warm *is*.|😊🌡️🔥
Sy huil omdat sy hartseer *is*.|😭😢
Hy lag omdat die hond *dans*.|😂🐕💃
Ek is moeg, want ek *werk* baie.|🥱💼` }],
  st: { t: 'Hoekom huil jy?', cast: { Ma: 'f', Lisa: 'f' }, l: `
Ma: Lisa, hoekom huil jy?
Lisa: Ek is hartseer, Ma. My katjie is weg.
Ma: Ag nee! Waar het jy gekyk?
Lisa: In die huis en in die tuin.
Ma: Kyk! Hy slaap onder jou bed!
Lisa: Ek is so bly! Ek lag en ek huil!`, q: [
    ['Hoekom huil Lisa?', ['Die katjie is weg 🐈', 'Haar kop is seer 🤕', 'Dit is koud 🥶'], 0],
    ['Waar is die katjie?', ['onder die bed 🛏️', 'in die tuin', 'op die tafel'], 0],
  ] } },

{ id: 'skool', t: 'Skool en werk', i: '📚', w: `
onderwyser|🧑‍🏫|Die onderwyser is vriendelik.|teacher
leerder|🧑‍🎓|Die leerder skryf.|learner / pupil
klas|🪑🪑🪑|Die klas is stil.|class
boek|📕|Ek lees 'n boek.|book
pen|🖊️|Gee my 'n pen, asseblief.|pen
rekenaar|💻|Ek werk op die rekenaar.|computer
foon|📱|Waar is my foon?|phone
kantoor|🏢|Pa werk in 'n kantoor.|office
toets|📝|Ons skryf môre 'n toets.|test
leer|🧠|Ek leer Afrikaans.|learn
verstaan|💡|Ek verstaan!|understand
vergeet|🤷|Ek vergeet sy naam.|forget
onthou|🧠✅|Onthou jou boek!|remember
geld|💵|Ek het geld.|money`,
  p: [{ t: 'Gister: het ge-', i: '⏪', r: 'Gister? Sê het, en ge- + werkwoord aan die einde. Begin die werkwoord met be-, ver-, her- of ont-? Dan geen ge-.', en: 'Past tense: het + ge-verb at the end. Verbs starting with be-, ver-, her-, ont- take no ge-.', s: `
Ek werk.|🙋💼
Ek *het* gister *gewerk*.|🙋💼⏪
Sy *het* Afrikaans *geleer*.|👩🧠⏪
Ons *het* 'n toets *geskryf*.|🙋👥📝⏪
Ek *het* dit *vergeet*.|🙋🤷⏪` }],
  st: { t: 'Die toets', cast: { Ben: 'm', Sam: 'm', Onderwyser: 'f' }, l: `
Ben: Sam, het jy vir die toets geleer?
Sam: Ja, ek het gister baie geleer.
Ben: Ek het vergeet! Ek het sokker gespeel.
Sam: Ag nee, Ben!
Onderwyser: Goeiemôre, klas. Sit asseblief. Hier is die toets.
Ben: Ek verstaan nie die eerste vraag nie…`, q: [
    ['Wat het Ben gister gedoen?', ['⚽', '📚', '😴'], 0],
    ['Het Sam geleer?', ['Ja 👍', 'Nee 👎'], 0],
  ] } },

{ id: 'natuur', t: 'Die natuur', i: '🌳', w: `
boom|🌳|Die voël sit in die boom.|tree
berg|🏔️|Die berg is hoog.|mountain
see|🌊|Ons swem in die see.|sea
rivier|🏞️|Die rivier is lank.|river
strand|🏖️|Die kinders speel op die strand.|beach
gras|🌿|Die gras is groen.|grass
maan|🌙|Die maan is vol.|moon
ster|⭐|Ek sien 'n ster.|star
bos|🌲🌲|Die bos is donker.|forest
klip|🪨|Die klip is swaar.|stone
vuur|🔥|Die vuur is warm.|fire
kan|✅|Ek kan swem.|can
wil|🤲|Ek wil die see sien.|want
moet|❗|Jy moet water drink.|must`,
  p: [{ t: 'Kan, wil, moet', i: '✅', r: 'kan / wil / moet op plek 2. Die ander werkwoord gaan na die einde.', en: 'Modal verbs (kan, wil, moet) take position 2; the main verb goes to the end.', s: `
Ek *kan* *swem*.|🙋✅🏊
Ek *wil* die see *sien*.|🙋🤲👀🌊
Jy *moet* water *drink*.|🫵❗💧
Ons *kan* die berg *klim*.|🙋👥✅🏔️` }],
  st: { t: 'Op die berg', cast: { Pa: 'm', Ben: 'm', Anna: 'f' }, l: `
Pa: Kom, kinders! Ons klim die berg.
Ben: Pa, ek is moeg. Ek kan nie meer loop nie.
Pa: Net nog 'n bietjie. Jy moet sien wat bo is!
Anna: Kyk! Ek kan die see sien!
Ben: Wow! En die rivier en die bos!
Pa: Sien jy? Dit is mooi hier bo.`, q: [
    ['Wat kan Anna sien?', ['🌊', '🦁', '🏙️'], 0],
    ['Hoe voel Ben?', ['🥱', '😠', '😨'], 0],
  ] } },

{ id: 'koop', t: 'Inkopies', i: '🛒', w: `
koop|🛒|Ek koop brood.|buy
betaal|💳|Ek betaal met my kaart.|pay
prys|🏷️|Wat is die prys?|price
duur|💎|Die skoene is duur.|expensive
goedkoop|🪙|Die appels is goedkoop.|cheap
sak|🛍️|Het jy 'n sak?|bag
mark|🧺|Ons koop groente by die mark.|market
oop|🔓|Die winkel is oop.|open
gesluit|🔒|Die winkel is gesluit.|closed
rand|R|Dit kos tien rand.|rand (money)
dertig|3️⃣0️⃣|Dit kos dertig rand.|thirty
vyftig|5️⃣0️⃣|Hier is vyftig rand.|fifty
twaalf|1️⃣2️⃣|Twaalf eiers, asseblief.|twelve`,
  p: [{ t: 'Hoeveel kos dit?', i: '🏷️', r: 'Kos = eet, maar ook: die prys. Ek wil … hê: hê aan die einde.', en: '"kos" also means "to cost". "Ek wil … hê" = I want … (hê goes last).', s: `
*Hoeveel kos* dit?|🏷️❓
Dit *kos* twintig rand.|🏷️2️⃣0️⃣R
Ek *wil* 'n appel *hê*.|🙋🤲🍎
Ons *wil* drie brode *hê*.|🙋👥🤲3️⃣🍞` }],
  st: { t: 'By die mark', cast: { Verkoper: 'm', Anna: 'f' }, l: `
Verkoper: Goeiemôre! Wat wil jy hê?
Anna: Goeiemôre. Hoeveel kos die appels?
Verkoper: Tien rand vir ses appels.
Anna: Dit is goedkoop! Ek wil twaalf appels hê, asseblief.
Verkoper: Dit is twintig rand.
Anna: Hier is vyftig rand.
Verkoper: Dankie. Hier is dertig rand terug.`, q: [
    ['Hoeveel appels koop Anna?', ['1️⃣2️⃣', '6️⃣', '🔟'], 0],
    ['Hoeveel betaal Anna vir die appels?', ['20 rand', '50 rand', '30 rand'], 0],
  ] } },

{ id: 'sport', t: 'Sport', i: '⚽', w: `
sokker|⚽|Ons speel sokker.|soccer
rugby|🏉|Suid-Afrika speel rugby.|rugby
krieket|🏏|Pa kyk krieket.|cricket
tennis|🎾|Sy speel tennis.|tennis
bal|🏀|Gooi die bal!|ball
span|👥🏆|Ons span is goed.|team
wen|🏆|Ons gaan wen!|win
verloor|😞|Hulle het verloor.|lose
vinnig|⚡|Die trein is vinnig.|fast
stadig|🐢|Die skilpad is stadig.|slow
sterk|🏋️|Die renoster is sterk.|strong
spring|🦘|Die kinders spring.|jump
gooi|🤾|Gooi die bal na my.|throw
beter|📈|Ek speel beter as jy!|better`,
  p: [{ t: 'Vinnig, vinniger, vinnigste', i: '📈', r: 'Meer? -er. Die meeste? -ste. Goed → beter → beste.', en: 'Comparatives: -er, superlatives: -ste. goed → beter → beste.', s: `
Ben is *vinnig*.|👦⚡
Sam is *vinniger*.|👦⚡⚡
Lisa is die *vinnigste*!|👧⚡⚡⚡🏆
Ons span is *beter*.|🙋👥📈
Ouma kook die *beste* kos.|👵🧑‍🍳🏆` }],
  st: { t: 'Die wedstryd', cast: { Sam: 'm', Ben: 'm' }, l: `
Sam: Ben! Kom kyk rugby! Suid-Afrika speel vandag.
Ben: Teen wie?
Sam: Teen Nieu-Seeland. Dit is 'n groot wedstryd.
Ben: Ons span is sterk. Ons gaan wen!
Sam: Kyk! Hy hardloop so vinnig… Drie!
Ben: Ja! Ons het gewen!`, q: [
    ['Watter sport kyk hulle?', ['🏉', '⚽', '🏏'], 0],
    ['Wie wen?', ['Suid-Afrika', 'Nieu-Seeland'], 0],
  ] } },

{ id: 'braai', t: 'Braai en kuier', i: '🔥', w: `
braai|🍖🔥|Ons braai vanaand.|barbecue
boerewors|🌭|Die boerewors is lekker.|farmer's sausage
biltong|🥓|Oupa eet biltong.|dried meat
beskuit|🍪|Beskuit en koffie, asseblief.|rusk
melktert|🥧|Ouma bak melktert.|milk tart
koeksister|🍩|Die koeksisters is soet.|koeksister (syrup doughnut)
kuier|🏡👥|Kom kuier by ons!|visit / socialise
fees|🎉|Dit is 'n groot fees.|festival / party
verjaarsdag|🎂|Vandag is my verjaarsdag!|birthday
geskenk|🎁|Hier is 'n geskenk vir jou.|gift
musiek|🎵|Die musiek is lekker.|music
kom|👋⬅️|Kom hier, asseblief.|come
saam|🤝|Ons eet saam.|together
almal|👥👥|Almal is hier!|everyone`,
  p: [{ t: 'Kom ons braai!', i: '🙌', r: 'Saam iets doen? Kom ons + werkwoord. ’n Bevel? Begin met die werkwoord.', en: '"Kom ons …" = let\'s … . Commands start with the verb.', s: `
*Kom ons* braai!|🙌🍖🔥
*Kom ons* dans!|🙌💃
*Sit*, asseblief.|🧘🙏
*Kom* hier!|👋⬅️📍` }],
  st: { t: 'Die braai', cast: { Johan: 'm', Thabo: 'm', Elsa: 'f' }, l: `
Johan: Welkom, almal! Kom in, kom in!
Thabo: Dankie, Johan. Ek het boerewors gebring.
Johan: Lekker! Die vuur is reg. Kom ons braai!
Elsa: En ek het melktert en koeksisters gemaak.
Thabo: Mmm! Dit ruik so lekker.
Johan: Sit, almal. Ons gaan lekker kuier vanaand!`, q: [
    ['Wat het Thabo gebring?', ['🌭', '🥧', '🍩'], 0],
    ['Wat het Elsa gemaak?', ['melktert en koeksisters', 'boerewors', 'biltong'], 0],
  ] } },

{ id: 'reis', t: 'Reis', i: '✈️', w: `
reis|🌍➡️|Ek wil die wêreld reis.|travel
vakansie|🌴|Ons is met vakansie.|holiday
vliegtuig|✈️|Die vliegtuig is groot.|aeroplane
lughawe|🛫|Ons ry lughawe toe.|airport
hotel|🏨|Die hotel is naby die see.|hotel
tas|🧳|My tas is swaar.|suitcase
kaartjie|🎫|Waar is jou kaartjie?|ticket
paspoort|🛂|Vat jou paspoort!|passport
foto|📸|Neem 'n foto!|photo
kaart|🗺️|Kyk op die kaart.|map
ver|🛣️📏|Kaapstad is ver.|far
naby|📍👣|Die winkel is naby.|near
wag|⏳|Wag vir my!|wait
aankom|🛬|Ons kom om agt uur aan.|arrive
vertrek|🚀|Die trein vertrek nou.|depart`,
  p: [{ t: 'Aan … kom', i: '✂️', r: 'Party werkwoorde breek: aankom → Ek kom aan. Gister: Ek het aangekom.', en: 'Separable verbs split: aankom → Ek kom … aan; past: aangekom.', s: `
Die vliegtuig *kom* om agt uur *aan*.|✈️🛬🕗
Ons *het* in Kaapstad *aangekom*.|🙋👥🛬⏪
Ek *bel* jou môre *op*.|🙋📞🫵
Ek *het* jou gister *opgebel*.|🙋📞🫵⏪` }],
  st: { t: 'Na Kaapstad', cast: { Anna: 'f', Ma: 'f' }, l: `
Anna: Ma, wanneer vertrek ons?
Ma: Die vliegtuig vertrek om nege uur. Waar is jou kaartjie?
Anna: Hier in my tas. Hoe ver is Kaapstad?
Ma: Twee uur met die vliegtuig.
Anna: Ek wil Tafelberg sien en foto's neem!
Ma: Ons kom om elf uur aan. Dan gaan ons hotel toe.`, q: [
    ['Wanneer vertrek die vliegtuig?', ['🕘 nege uur', '🕚 elf uur', '🕗 agt uur'], 0],
    ['Wat wil Anna sien?', ['Tafelberg 🏔️', 'die olifant 🐘', 'die skool 🏫'], 0],
  ] } },

{ id: 'praat', t: 'Kom ons praat', i: '💬', w: `
sê|💬|Wat sê jy?|say
vra|🙋❓|Mag ek iets vra?|ask
vraag|❓|Ek het 'n vraag.|question
antwoord|💬✅|Wat is die antwoord?|answer
woord|🔤|Ek ken die woord!|word
taal|🗣️🌍|Afrikaans is 'n mooi taal.|language
Afrikaans|🇿🇦|Ek leer Afrikaans.|Afrikaans
herhaal|🔁|Herhaal dit, asseblief.|repeat
beteken|❓💡|Wat beteken dit?|mean
bel|📞|Ek bel jou later.|call (phone)
boodskap|✉️|Stuur vir my 'n boodskap.|message
bietjie|🤏|Ek praat 'n bietjie Afrikaans.|a little
ken|🧠👤|Ek ken hom.|know (someone)
weet|💭✅|Ek weet nie.|know (a fact)`,
  p: [{ t: 'Help my!', i: '🛟', r: 'Hierdie sinne help jou om in Afrikaans te bly.', en: 'Survival phrases that keep a real conversation in Afrikaans.', s: `
Wat *beteken* dit?|❓💡
Kan jy dit *herhaal*, asseblief?|🔁🙏
Praat *stadiger*, asseblief.|🗣️🐢🙏
Hoe sê 'n mens dit in Afrikaans?|💬❓🇿🇦
Ek *verstaan nie*.|🙋🚫💡` }],
  st: { t: 'Ek leer Afrikaans', cast: { Thabo: 'm', Sam: 'm' }, l: `
Thabo: Hallo! Jy praat Afrikaans!
Sam: Net 'n bietjie. Ek leer nog.
Thabo: Jy praat baie goed!
Sam: Dankie! Maar praat stadiger, asseblief.
Thabo: Natuurlik. Hoe lank leer jy al?
Sam: Drie maande. Ek leer elke dag.
Thabo: Mooi so! Hou aan!`, q: [
    ['Hoe lank leer Sam al?', ['3 maande', '3 jaar', '3 dae'], 0],
    ['Hoe gereeld leer Sam?', ['elke dag 📅', 'nooit 🚫'], 0],
  ] } },

{ id: 'toekoms', t: 'Die toekoms', i: '🔮', w: `
altyd|♾️|Ek drink altyd koffie.|always
nooit|🚫⏰|Hy is nooit laat nie.|never
soms|🎲|Soms reën dit.|sometimes
dikwels|🔁🔁|Ons kuier dikwels.|often
elke|📅📅|Ek leer elke dag.|every
gelukkig|🍀|Ek is gelukkig.|happy / lucky
droom|💭|Ek het 'n droom.|dream
hoop|🤞|Ek hoop dit reën.|hope
toekoms|🔮|Die toekoms is mooi.|future
eendag|🌈|Eendag sal ek Parys sien.|one day
niks|🫙|Ek het niks.|nothing
niemand|🚫🧍|Niemand is hier nie.|nobody
iemand|🧍|Iemand is by die deur.|somebody
geen|🚫|Ek het geen geld nie.|no / none`,
  p: [{ t: 'Nooit, niks, geen … nie', i: '🚫', r: 'Ook met nooit, niks, niemand en geen: sê nie aan die einde.', en: 'Negative words (nooit, niks, niemand, geen) also take a final "nie".', s: `
Ek drink *nooit* koffie *nie*.|🙋🚫⏰☕
Ek het *geen* geld *nie*.|🙋🚫💵
*Niemand* is by die huis *nie*.|🚫🧍🏠
Daar is *niks* in die sak *nie*.|🫙🛍️` }],
  st: { t: 'My droom', cast: { Lisa: 'f', Ouma: 'f' }, l: `
Lisa: Ouma, wat is jou droom?
Ouma: My droom? Ek wil eendag Parys sien.
Lisa: Ek ook! Maar ek het geen geld nie.
Ouma: Jy is nog jonk. Werk hard, en spaar elke maand.
Lisa: Ek hoop ek kan eendag saam met jou reis.
Ouma: Ons sal sien, my kind. Alles is moontlik!`, q: [
    ['Waar wil Ouma eendag heen gaan?', ['Parys 🗼', 'Kaapstad 🏔️', 'die see 🌊'], 0],
    ['Het Lisa baie geld?', ['Nee 👎', 'Ja 👍'], 0],
  ] } },
];

// Parse the compact text blocks into objects once.
const lines = s => s.trim().split('\n').map(l => l.trim()).filter(Boolean);
export const strip = s => s.replace(/\*/g, '');

export const WORDS = [];
export const SENTENCES = [];
for (const [ui, u] of UNITS.entries()) {
  u.words = lines(u.w).map(l => {
    const [af, pic, ex, en] = l.split('|');
    const item = { id: 'w:' + af, kind: 'w', af, pic, ex, en, unit: u.id, ui };
    WORDS.push(item);
    return item;
  });
  u.pats = (u.p || []).map((p, pi) => ({
    ...p, unit: u.id,
    sents: lines(p.s).map(l => {
      const [mk, pic] = l.split('|');
      const item = { id: 's:' + strip(mk), kind: 's', af: strip(mk), mk, pic, unit: u.id, ui, pat: pi };
      SENTENCES.push(item);
      return item;
    }),
  }));
  u.story = {
    ...u.st, unit: u.id,
    lines: lines(u.st.l).map(l => {
      const m = l.match(/^([^:]+):\s*(.*)$/);
      return m ? { who: m[1], text: m[2], v: u.st.cast?.[m[1]] || 'f' } : { who: '', text: l, v: 'f' };
    }),
  };
}
export const BY_ID = Object.fromEntries([...WORDS, ...SENTENCES].map(x => [x.id, x]));
