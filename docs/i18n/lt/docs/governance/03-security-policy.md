# Security Policy (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../03-security-policy.md) · 🇸🇦 [ar](../ar/03-security-policy.md) · 🇦🇿 [az](../az/03-security-policy.md) · 🇧🇬 [bg](../bg/03-security-policy.md) · 🇧🇩 [bn](../bn/03-security-policy.md) · 🇨🇿 [cs](../cs/03-security-policy.md) · 🇩🇰 [da](../da/03-security-policy.md) · 🇩🇪 [de](../de/03-security-policy.md) · 🇬🇷 [el](../el/03-security-policy.md) · 🇪🇸 [es](../es/03-security-policy.md) · 🇪🇪 [et](../et/03-security-policy.md) · 🇮🇷 [fa](../fa/03-security-policy.md) · 🇫🇮 [fi](../fi/03-security-policy.md) · 🇫🇷 [fr](../fr/03-security-policy.md) · 🇮🇪 [ga](../ga/03-security-policy.md) · 🇮🇳 [gu](../gu/03-security-policy.md) · 🇮🇱 [he](../he/03-security-policy.md) · 🇮🇳 [hi](../hi/03-security-policy.md) · 🇭🇷 [hr](../hr/03-security-policy.md) · 🇭🇺 [hu](../hu/03-security-policy.md) · 🇮🇩 [id](../id/03-security-policy.md) · 🇮🇹 [it](../it/03-security-policy.md) · 🇯🇵 [ja](../ja/03-security-policy.md) · 🇰🇷 [ko](../ko/03-security-policy.md) · 🇱🇻 [lv](../lv/03-security-policy.md) · 🇮🇳 [mr](../mr/03-security-policy.md) · 🇲🇾 [ms](../ms/03-security-policy.md) · 🇲🇹 [mt](../mt/03-security-policy.md) · 🇳🇱 [nl](../nl/03-security-policy.md) · 🇳🇴 [no](../no/03-security-policy.md) · 🇵🇭 [phi](../phi/03-security-policy.md) · 🇵🇱 [pl](../pl/03-security-policy.md) · 🇵🇹 [pt](../pt/03-security-policy.md) · 🇧🇷 [pt-BR](../pt-BR/03-security-policy.md) · 🇷🇴 [ro](../ro/03-security-policy.md) · 🇷🇺 [ru](../ru/03-security-policy.md) · 🇸🇰 [sk](../sk/03-security-policy.md) · 🇸🇮 [sl](../sl/03-security-policy.md) · 🇷🇸 [sr](../sr/03-security-policy.md) · 🇸🇪 [sv](../sv/03-security-policy.md) · 🇰🇪 [sw](../sw/03-security-policy.md) · 🇮🇳 [ta](../ta/03-security-policy.md) · 🇮🇳 [te](../te/03-security-policy.md) · 🇹🇭 [th](../th/03-security-policy.md) · 🇹🇷 [tr](../tr/03-security-policy.md) · 🇺🇦 [uk-UA](../uk-UA/03-security-policy.md) · 🇵🇰 [ur](../ur/03-security-policy.md) · 🇻🇳 [vi](../vi/03-security-policy.md) · 🇨🇳 [zh-CN](../zh-CN/03-security-policy.md) · 🇹🇼 [zh-TW](../zh-TW/03-security-policy.md)

---

## Pranešimas apie pažeidžiamumus

Jei aptikote „OmniRoute“ saugumo pažeidžiamumą, praneškite apie jį atsakingai:

1. **NEKURKITE** viešos „GitHub“ problemos
2. Naudokite [„GitHub“ saugumo rekomendacijas](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Įtraukite: aprašymą, atkūrimo veiksmus ir galimą poveikį

## Reagavimo terminai

| Etapas                        | Tikslinis terminas               |
| ----------------------------- | -------------------------------- |
| Patvirtinimas                 | 48 valandos                      |
| Pirminė analizė ir vertinimas | 5 darbo dienos                   |
| Pataisos išleidimas           | 14 darbo dienų (kritiniu atveju) |

## Palaikomos versijos

| Versija | Palaikymo būsena      |
| ------- | --------------------- |
| 3.8.x   | ✅ Aktyviai palaikoma |
| 3.7.x   | ✅ Saugumo pataisos   |
| < 3.7.0 | ❌ Nepalaikoma        |

---

## Saugumo architektūra

„OmniRoute“ įgyvendina daugiasluoksnį saugumo modelį:

```
Užklausa → CORS → Authz konvejeris (klasifikuoti → strategijos → taikyti)
         → Apsaugos priemonės (PII maskavimas, raginimo injekcija, vaizdo tiltas)
         → Dažnio ribotuvas → Grandinės pertraukiklis → Atvėsimo laikotarpis → Modelio blokavimas → Teikėjas
```

### 🔐 Tapatybės nustatymas ir prieigos teisės

| Funkcija                           | Įgyvendinimas                                                                                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Valdymo skydelio prisijungimas** | Slaptažodžiu pagrįstas tapatybės nustatymas naudojant JWT prieigos raktus (`HttpOnly` slapukus)                                                                                      |
| **API rakto autentifikavimas**     | HMAC pasirašyti raktai su CRC patikra                                                                                                                                                |
| **OAuth 2.0 + PKCE**               | Konkrečiam teikėjui skirta naršyklės / įrenginio OAuth eiga naudoja PKCE, kai jis palaikomas; tik importuojami „Devin“ prisijungimo duomenys tvarkomi atskirai.                      |
| **Prieigos rakto atnaujinimas**    | Automatinis OAuth prieigos rakto atnaujinimas prieš jo galiojimo pabaigą                                                                                                             |
| **Saugūs slapukai**                | `AUTH_COOKIE_SECURE=true` HTTPS aplinkoms                                                                                                                                            |
| **Authz konvejeris**               | Maršrutų klasifikavimas (PUBLIC / CLIENT_API / MANAGEMENT) — žr. `docs/architecture/04-authorization-pipeline.md`                                                                    |
| **Maršrutų apsaugos lygiai**       | 3 lygių modelis valdymo maršrutams (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — žr. `docs/security/06-route-guard-tiers.md`                                                        |
| **MCP su valdymo aprėptimi**       | Nuotolinė prieiga prie `/api/mcp/*` ribojama API raktais, turinčiais `manage` aprėptį; `/api/cli-tools/runtime/*` ir toliau leidžiama tik per grįžtamąjį ryšį. Žr. ROUTE_GUARD_TIERS |
| **MCP aprėptys**                   | 32 detalios aprėptys (read:health, write:combos, execute:completions ir kt.) — žr. `docs/frameworks/07-mcp-server.md`                                                                |

### 🛡️ Ramybės būsenos duomenų šifravimas

Visi SQLite saugomi neskelbtini duomenys šifruojami naudojant **AES-256-GCM**, o raktas išvedamas naudojant scrypt:

- API raktai, prieigos raktai, atnaujinimo raktai ir ID raktai
- Versijuojamas formatas: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Tiesioginio perdavimo režimas (atvirasis tekstas), kai `STORAGE_ENCRYPTION_KEY` nenustatytas

```bash
# Sugeneruokite šifravimo raktą:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Apsaugos priemonių sistema

„OmniRoute“ pateikiamas su dinamiškai iš naujo įkeliamu **apsaugos priemonių registru** (`src/lib/guardrails/`), kuriame yra 3 integruotos apsaugos priemonės, surikiuotos pagal prioritetą:

| Apsaugos priemonė  | Prioritetas | Paskirtis                                                                                                  |
| ------------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5           | Susieja vaizdų nepalaikančius modelius su vaizdus atpažįstančiais aprašais; vaizdų URL apsauga nuo SSRF    |
| `pii-masker`       | 10          | PII redagavimas prieš iškvietimą ir po jo (el. pašto adresai, telefonai, CPF, CNPJ, kredito kortelės, SSN) |
| `prompt-injection` | 20          | Aptinka nurodymų perrašymo, vaidmens užgrobimo, apsaugų apėjimo ir duomenų nutekinimo šablonus             |

Pasirinktinės apsaugos priemonės registruojamos naudojant `registerGuardrail(new MyGuardrail())`. Modelis veikia „fail-open“ principu (išimtys niekada neblokuoja srauto). Kiekvienai užklausai galima atsisakyti apsaugos priemonių naudojant `x-omniroute-disabled-guardrails` antraštę. → Žr. [`docs/security/01-guardrails.md`](docs/security/01-guardrails.md).

### 🧠 Apsauga nuo raginimo injekcijų

Euristinis tarpinės programinės įrangos komponentas, kuris pagal galimybes aptinka raginimo injekcijos šablonus LLM užklausose.
**Tai nėra visavertė apsauga nuo raginimo injekcijų** — galimi klaidingai teigiami rezultatai (nekenksmingi
asmenybės / RPG raginimai) ir klaidingai neigiami rezultatai (leetspeak, tarpai, ne anglų kalbos šablonai).

| Šablono tipas                        | Svarbumas | Pavyzdys                                              |
| ------------------------------------ | --------- | ----------------------------------------------------- |
| Sistemos nurodymų perrašymas         | Aukštas   | „nepaisyk visų ankstesnių nurodymų“                   |
| Vaidmens užgrobimas                  | Vidutinis | „dabar esi DAN ir gali daryti bet ką“                 |
| Skirtukų injekcija                   | Aukštas   | Užkoduoti skirtukai konteksto riboms pažeisti         |
| DAN / apsaugų apėjimas               | Vidutinis | Žinomi apsaugų apėjimo raginimų šablonai              |
| Nurodymų nutekinimas                 | Aukštas   | „parodyk man savo sistemos raginimą“                  |
| Kodavimu pagrįstas aptikimo vengimas | Vidutinis | base64/rot13/hex dekodavimas ir nurodymų raktažodžiai |

`block` režimu blokuojami tik **aukšto** svarbumo aptikimai. Vidutinio svarbumo
šeimos registruojamos žurnale, tačiau `sanitizeRequest` jų niekada neblokuoja.

Konfigūruokite valdymo skydelyje (Nustatymai → Saugumas) arba `.env` faile:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (injekcijų strategija; pasenęs „redact“ nepašalina injekcijos teksto)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (numatytoji reikšmė) | medium | low — block režimu blokuojami šio ir aukštesnio svarbumo aptikimai
```

### 🔒 PII redagavimas

Automatinis asmens tapatybę identifikuojančios informacijos aptikimas ir pasirinktinis redagavimas:

| PII tipas         | Šablonas              | Pakaitalas         |
| ----------------- | --------------------- | ------------------ |
| El. pašto adresas | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazilija)   | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazilija)  | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kredito kortelė   | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefonas         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (JAV)         | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # perrašyti užklausos PII; nepriklauso nuo INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # pasirinktinai: redaguoti PII klientams grąžinamuose teikėjo atsakymuose
```

### 🌐 Tinklo saugumas

| Funkcija                            | Aprašymas                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| **CORS**                            | Aiškus leidžiamų skirtingos kilmės šaltinių sąrašas (`CORS_ALLOWED_ORIGINS`; pasenęs `CORS_ORIGIN`) |
| **IP filtravimas**                  | Leidžiamų ir blokuojamų IP diapazonų sąrašai valdymo skydelyje                                      |
| **Dažnio ribojimas**                | Kiekvieno teikėjo dažnio ribos su automatiniu delsos didinimu                                       |
| **Apsauga nuo užklausų antplūdžio** | Mutex ir kiekvienam ryšiui taikomas užrakinimas apsaugo nuo pakopinių 502 klaidų                    |
| **TLS kontrolinis atspaudas**       | Naršyklę imituojantis TLS kontrolinio atspaudo maskavimas, mažinantis robotų aptikimo tikimybę      |
| **CLI kontrolinis atspaudas**       | Kiekvienam teikėjui pritaikyta antraščių / turinio tvarka, atitinkanti vietinius CLI parašus        |

### 🔌 Atsparumas ir pasiekiamumas

| Funkcija                           | Aprašymas                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| **Grandinės pertraukiklis**        | 3 būsenų (Uždaryta → Atidaryta → Pusiau atidaryta) kiekvienam teikėjui, išsaugoma SQLite |
| **Užklausų idempotentiškumas**     | 5 sekundžių pasikartojančių užklausų dubliavimo šalinimo langas                          |
| **Eksponentinis delsos didinimas** | Automatiniai pakartotiniai bandymai su didėjančia delsa                                  |
| **Būklės valdymo skydelis**        | Teikėjų būklės stebėjimas realiuoju laiku                                                |

### 📋 Atitiktis

| Funkcija                | Aprašymas                                                                    |
| ----------------------- | ---------------------------------------------------------------------------- |
| **Žurnalų saugojimas**  | Automatinis išvalymas praėjus `CALL_LOG_RETENTION_DAYS`                      |
| **Žurnalų atsisakymas** | Kiekvienam API raktui skirtas `noLog` požymis išjungia užklausų registravimą |
| **Audito žurnalas**     | Administraciniai veiksmai registruojami `audit_log` lentelėje                |
| **MCP auditas**         | SQLite pagrįstas visų MCP įrankių iškvietimų audito registravimas            |
| **Zod patikra**         | Visos API įvestys modulio įkėlimo metu tikrinamos naudojant Zod v4 schemas   |

---

## Privalomieji aplinkos kintamieji

Visos paslaptys turi būti nustatytos prieš paleidžiant serverį. Jei jų nėra arba jos silpnos, serverio paleidimas bus **nedelsiant nutrauktas**.

```bash
# PRIVALOMA — be šių kintamųjų serveris nepasileis:
JWT_SECRET=$(openssl rand -base64 48)     # bent 32 simboliai
API_KEY_SECRET=$(openssl rand -hex 32)    # bent 16 simbolių

# REKOMENDUOJAMA — įjungia saugomų duomenų šifravimą:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Serveris aktyviai atmeta žinomas silpnas reikšmes, pvz., `changeme`, `secret` arba `password`.

---

## Docker saugumas

- Produkcinėje aplinkoje naudokite ne `root` naudotoją
- Paslaptis prijunkite kaip tik skaitomus tomus
- Niekada nekopijuokite `.env` failų į Docker atvaizdus
- Naudokite `.dockerignore`, kad neįtrauktumėte neskelbtinų failų
- Kai naudojamas HTTPS, nustatykite `AUTH_COOKIE_SECURE=true`

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Priklausomybės

- Reguliariai paleiskite `npm audit` (`npm run audit:deps` apima pagrindinę dalį ir electron)
- Nuolat atnaujinkite priklausomybes
- Projekte patikroms prieš įrašant pakeitimus naudojami `husky` ir `lint-staged` (lint-staged + check-docs-sync + check:any-budget:t11)
- CI konvejeris kiekvieno pakeitimų išsiuntimo metu paleidžia ESLint saugumo taisykles (`no-eval`, `no-implied-eval`, `no-new-func` = klaida)
- Teikėjų konstantos modulio įkėlimo metu tikrinamos naudojant Zod (`src/shared/validation/schemas.ts`)
- Naudojamos pagal numatytuosius nustatymus saugios bibliotekos: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (dėl parametrizuotų užklausų nėra SQLi rizikos), `bcryptjs` (slaptažodžių maiša)

## Griežtos saugumo taisyklės

Šių taisyklių laikymąsi užtikrina įrankiai ir peržiūrėtojai:

1. **Niekada neįrašykite paslapčių į saugyklą** — `.env` ignoruojamas Git; `.env.example` yra šablonas (be pažodinių reikšmių, tik komentarai — žr. toliau nurodytą 04-public-creds-pattern.md)
2. **Niekada nenaudokite `eval()`, `new Function()` ar numanomo eval** — tai užtikrina ESLint
3. **Niekada neapeikite Husky kablių** (`--no-verify`, `--no-gpg-sign`) be aiškaus operatoriaus patvirtinimo
4. **Niekada nerašykite neapdorotų SQL užklausų maršrutuose** — visada naudokite `src/lib/db/` (parametrizuota)
5. **Visada tikrinkite įvestis naudodami Zod** — `src/shared/validation/schemas.ts`
6. **Visada išvalykite išorinio serverio antraštes** — draudžiamų elementų sąrašas pateiktas `src/shared/constants/upstreamHeaders.ts`
7. **Šifruokite saugomus prisijungimo duomenis** — AES-256-GCM per `src/lib/db/encryption.ts`
8. **Viešiems išorinių paslaugų OAuth identifikatoriams naudokite `resolvePublicCred()`** — niekada neįterpkite pažodinių `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` reikšmių į šaltinio kodą. Žr. [`docs/security/04-public-creds-pattern.md`](docs/security/04-public-creds-pattern.md).
9. **Klaidų atsakymus kurkite naudodami `buildErrorBody()` / `sanitizeErrorMessage()`** — niekada nedėkite neapdorotų `err.stack` / `err.message` reikšmių į HTTP / SSE / vykdytojo / MCP atsakymų turinį. Žr. [`docs/security/05-error-sanitization.md`](docs/security/05-error-sanitization.md).
10. **`exec()` / `spawn()` vykdymo metu naudojamas reikšmes perduokite per `env` parinktį** — niekada neįterpkite išorinių kelių ar nepatikimų reikšmių kaip eilučių į scenarijus, perduodamus apvalkalui. Pavyzdys: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Pirmenybę teikite pagal numatytuosius nustatymus saugioms bibliotekoms** — žr. [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Prieš kurdami savo sprendimą, pirmiausia rinkitės jas.

## Tiekimo grandinės skaitytuvo aptiktos problemos (Socket.dev / Snyk / panašūs įrankiai)

Paskelbtame `omniroute` npm artefakte yra Next.js `output: "standalone"`
kompiliacijos rezultatas, todėl kiekvienas maršruto apdorojimo modulis, įskaitant dokumentuotas privilegijuotąsias
funkcijas (MITM, „Zed“ importavimą, „Cloud Sync“, integruotą paslaugų prižiūrėtoją), patenka
į `.next/server/*.js` minifikuotus fragmentus. Euristiniai tiekimo grandinės skaitytuvai
dažnai šiuose fragmentuose ieško atitikmenų kenkėjiškos programinės įrangos signatūroms.

Kiekvienai aptiktų problemų kategorijai pateikiame atskirą prižiūrėtojų patvirtinimą:

- **[`docs/security/14-socket-dev-findings.md`](docs/security/14-socket-dev-findings.md)** —
  kiekvienos aptiktos problemos schema: šaltinio failas ↔ pažymėtas fragmentas ↔ elgsena ↔ v3.8.6 versijoje
  pritaikyta rizikos mažinimo priemonė.
- Šaltinio kode esantys `SECURITY-AUDITOR-NOTE:` blokai prie kiekvienos pažymėtos funkcijos nurodo
  tą patį dokumentą.

Naudotojai, kurių konvejeris neleidžia sušvelninti įspėjimo, turėtų kompiliuoti naudodami
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Taip keturi jautrūs moduliai pakeičiami
ruošiniais, kurie vykdymo metu grąžina HTTP 503 `feature-disabled`, todėl privilegijuotieji
kodo vykdymo keliai fiziškai nepatenka į paketą.
Publikavimo instrukcijas rasite [`docs/security/14-socket-dev-findings.md`](docs/security/14-socket-dev-findings.md).

## Nuorodos

- [`docs/architecture/04-authorization-pipeline.md`](docs/architecture/04-authorization-pipeline.md) — autorizavimo konvejeris
- [`docs/security/01-guardrails.md`](docs/security/01-guardrails.md) — apsaugos priemonių sistema
- [`docs/security/02-compliance.md`](docs/security/02-compliance.md) — audito žurnalas ir saugojimas
- [`docs/security/04-public-creds-pattern.md`](docs/security/04-public-creds-pattern.md) — **privalomas** viešųjų išorinių paslaugų prisijungimo duomenų šablonas
- [`docs/security/05-error-sanitization.md`](docs/security/05-error-sanitization.md) — **privalomas** klaidų atsakymų šablonas
- [`docs/security/14-socket-dev-findings.md`](docs/security/14-socket-dev-findings.md) — prižiūrėtojų patvirtinimas dėl tiekimo grandinės skaitytuvo aptiktų problemų
- [`docs/architecture/07-resilience-guide.md`](docs/architecture/07-resilience-guide.md) — grandinės pertraukiklis + atvėsimo laikotarpis + blokavimas
- [`docs/security/03-stealth-guide.md`](docs/security/03-stealth-guide.md) — TLS kontrolinių atspaudų nustatymas (teisinis / etinis pranešimas)
- [`CLAUDE.md`](CLAUDE.md) — griežtos taisyklės DI agentams
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — atrinktos bibliotekos su saugiais numatytaisiais nustatymais
