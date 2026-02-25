# HabitFlow - Izvještaj
<br>

[https://habitflow-go.vercel.app](https://habitflow-go.vercel.app/)
<br>

HabitFlow je web aplikacija namijenjena za planiranje dnevnih aktivnosti (Habits, Scheduler), praćenja raspoloženja (MoodTrackr) te analizu tih podataka (Analytics.) 
Prvotna je ideja bila napraviti aplikaciju koja će pratiti navike i raspoloženja, s raznim mogućnostima za njihovu analizu (više vrsta grafova za predodžbu korelacija, detaljnije praćenje raspoloženja), no provevši card sorting metode s generiranim personama ([Assignment2](../Assignment2)) naglasak je prebačen s proučavanja na planiranje.
Nakon utvrđivanja značajki koje aplikacija podržava, koristeći Figmu, istraženo je više [dizajna](./), kako bi se sa sigurnošću moglo krenuti u izradu cjelovite aplikacije.

Aplikacija je spojena sa supabaseom.
Podržano je logiranje. 
Contentful se koristi za uređivanje emojija i imena osjećaja u MoodTrackeru.

Pri izradi projekta, na umu su bili principi dizajna obrađivani na predavanjim. Evo kako su implementirani:
<br>
<br>
<br>


### Basic design principles:
---

#### Visibility:
Nakon prijave, korisnik je odveden na Home page s rasporedom na kojem poiše njegovo ime. Pri odabiru tipa aktivnosti, prilikom klika na jedan gumb (Checkbox/Amount), on poplavi, a drugi izblijedi pa korisnik zna u kojem je stanju taj dio sustava. Ako u rasporedu nem aaktivnosti, piše da ih nema, kako korisnik ne bi pomislio da se aktivnosti nisu učitale ili nešto slično.

#### Feedback:
Pri dodavanju aktivnosti u raspored, novih navika ili crtanja grafova, nakon pritiska gumba, novi se objekt pojavi, a da korisnik ne mora ručno osvježiti stranicu. Također, svaki gumb malo potamni na :hover.

#### Constraints:
Na Home, u MoodTrackeru, gumb Save Entry je onemogućen dok neko raspoloženje nije odabrano.

#### Mapping:
U Scheduleru su prikazana dva rasporeda - današnji i sutrašnji, tim redosljedom jer  (u našoj kulturi) ima smisla. Iako ne neposredno ispod, gumbi za dodavanje aktivnosti u određeni raspored, točno su ispod njega, a za rješavanje i posljednjeg trunka zbunjenosti, pri hoveru nad nekom od tih gumbi, pripadajući raspored poplavi.

#### Consistency:
Internal: sve su stranice sličnog dizajna - dominira bijela, mogućnosti pružene korisniku su uredno smještene u kartice, kao i svi ostali objekti, a akcije su plavi gumbi.
External: jedine opcije obojane crveno su one za brisanje objekata, što se podudara s očekivanjem prosječnog korisnika.

#### Affordance:
Sve su kartice naslovljene, baš kao i sva polja za odabire, tako da i ako korsnik nema puno prijašnjeg znanja, može pročitati što je što i čemu služi.

#### Mental models:
Nadovezujući se na prijašnju točku, polja za odabir, gumbi, navbar izgladaju kao i u većini drugih aplikacija. U svakom polju za odabir, prije unosa ičega, sivim je slovima upisan primjer ili uputa za podatak koji tu dolazi, tako da korisnik zna da to nije pravi podatak.
Pretpostavka je da će korisnik razviti interni mentalni model: ako ga dočeka Landing page, znat će da nije prijavljen, a ako ga dočeka Home page, znat će da je. 
Ta značajka ima još jednu prednost - Landing page je koristan samo potencijalnim korisnicima, a postojećim bi samo smetalo kad bi svaki put kad bi htjeli nešto zabilježiti imali dodatnu nepotrebnu akciju koji moraju obaviti.

<br>
### Fitts' law:
---
Ispoštovan jasnim označivanjem granica gumbova, aktivnosti i raspoloženja, njihovim rastezanjem i više od samih natpisa u njima, te zatamljenjem pri hoveru (važno u navbaru). Također, kartice su poslagane jedna do druge po sredini stranice, tako da nema prevelikog puta između opcija.

### Hick's law i osvrt na korisničku populaciju:
---
Promatrajući prijašnje dizajne stranica, da se zaključiti da su neke značajke izbačene. Osim ograničenosti resursa (poglavito vremena), glavni razlog tome je korisnici kojima je aplikacija namjenjena. Njen izvorni dizajn i funkcionalnost odražava njenog tvorca, to jest pretpostavlja upoznatost s i entuzijazam za sustavno bilježenje i uređivanje, prikaz i proučavanje statističkih podataka, a od 2 od 3 gnerirane persone (ni prosječnog čovjeka) to se ne može očekivati.

<br>
### Usability heuristics:
---

#### Match between system and the real world:
Raspoloženje se bilježi kao dva broja (energija i ugoda). MoodTracker komponenta dizajnirana je tako da korisnik ne mora prevoditi ono što osjeća u ta dva broja, nego može samo odabrati osjećaj (koji je k tome prikazan emojijem.) Time se gubi fleksibilnost, ali dobija jednostvanost

#### Consistency and standards:
Opcije su u svim komponentama iste i dobro poznate: Add, Update, Delete, Cancel, Save.

#### Visibility of system status:
Nakon spremanja napretka ili raspoloženja na Home, Save gumb izblijedi na tri sekunde, natpis mu se promjeni u "Saved" i pojavi se kvačica. Također, korisnik uvijek zna na kojoj je stranici jer je njeno ime uokvireno u navbaru. Ako dohvat podataka iz CMS-a traje preduga, implementiran je Suspense.

#### User control and freedom:
Sve kartice za unos imaju gumb Cancel. Prije brisanja grafa, pojavi se Alert koji objašnjava što slijedi i traži potvrdu. To je bilo nužno implementirati jer je gumb za brisanje na svakom grafu i može ga se slučajno pritisnuti. Sve što se doda, može se i obrisati (što će korisnik shvatiti pri prvom uređivanju neke aktivnosti/navike.)

#### Error prevention:
Ako je za tip navike izabran Checkbox, Goal i Unit polja su onemogućena. Ako ze za aktivnost izabere navika, polje za ime je onemogućeno. Ako nije izabran barem jedan parametar, gumb za crtanje grafa je onemogućen.

#### Help users recognize, diagnose, and recover from errors:
Ako nije uneseno ime aktivnosti, niti odabrana navika, aplikacija, u prigodnoj crvenoj, obavijesti korisnika da su to nužna polja.
Dizajnirana je posebna 404 stranica koja, iako nije ni smiješna ni pametna, ipak neće dati korisniku osjećaj da se izgubio u nekom primitivnom, ogoljenom zakutku interneta, nego da je još "negdje blizu."

#### Recognition rather than recall:
Ako je tip aktivnosti Checkbox, Goal i Unit polja su onemogućena, ali svejedno prikazana pa korisnik zna da ima tu mogućnost ako odabere Amount. Također, prilikom uređivanja navike, svi su podatci upisani u pripadajućim poljima i korisnik na jedom mjestu može i saznati i promijeniti informaciju.

#### Flexibility and efficiency of use:
Iako nije izvorno tome bila namjenjana, značajka navika pokazala se kao dobar prečac - ako korisnik često planira istu aktivnost, umjesto da svaki put upisuje njeno ime, tip i dodatne parametre ako su potrebni, može samo stvoriti naviku i odabrati je.

#### Aesthetic and minimalist design:
Stranica je dizajnirana primarno s ovim principom na umu. Ljudi se teško drže odluka i teško stvaraju navike, a ova aplikacija živi od stalnih korisnika. Kads bi se, uz dovoljan napor planiranja i praćenja svojih aktivnosti, korisnici morali i fokusirati da na stranici pronađu neku opciju, ili tumačiti što koji gumb znači, ili samo naprezati oči da bi uopće odvojili ono funkcionalno na stranici od onog isključivo estetskog, aplikacija ne bi zaživila.

#### Help and documentation:
Kako je već spomenuto, svako je polje naslovljeno i u njemu upisan primjer ili uputa.

<br>
### CRAP
---

#### Contrast:
Gumbi koji okidaju kontakt s bazom podataka (korisnikovim jezikom: gumbi koji dodaju/uređuju/brišu nešto) jedini su objekti obojani solid bojom. Njihova je važnost vizualno istaknuta. Također, sve su kartice uokvirene tankom sivom crtom, što korisniku govori što čemu pripada bez da privlači neportebnu pozornost na tu podjelu.

#### Repetition:
Svi su gumbi istog oblika, boje i ponašanja: Add/Update/Edit - plava, Delete - crvena, Cancel - bijela (prozirna). Sve su stranice sličnog dizajna - podatci koje čitamo prvi su - na vrhu ili prvi lijevo, a kartice u koje nešto unosimo nalaze se ispod ili desno od njih.

#### Alignment:
Koristi se pravilna raspodjela na polovice ili trećine ekrana po dužini (ne rečunajući margine.)

#### Proximity:
Za svrstavanje stvari primarno služe granice, a načelo bliskosti primjenjeno je na unutarkartičnoj razini: U Add New Activity jasna je vizualna hijerarhija: prvo odabiremo ime i vrijeme, pogledom prelazimo u novi red da odaberemo tip pa opet u novi red da unesemo dodatne parametre. Nakon toga: u novom su redu gumbi za dodavanje.





#### PageSpeed Insights:

https://pagespeed.web.dev/analysis/https-habitflow-go-vercel-app/u2nxbw5ar0?form_factor=mobile
Performance: 98
Accessibility: 90
Best Practices: 100
SEO: 82

