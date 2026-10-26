# Contributing to OmniRoute (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../01-contributing-guide.md) · 🇸🇦 [ar](../ar/01-contributing-guide.md) · 🇦🇿 [az](../az/01-contributing-guide.md) · 🇧🇬 [bg](../bg/01-contributing-guide.md) · 🇧🇩 [bn](../bn/01-contributing-guide.md) · 🇨🇿 [cs](../cs/01-contributing-guide.md) · 🇩🇰 [da](../da/01-contributing-guide.md) · 🇩🇪 [de](../de/01-contributing-guide.md) · 🇬🇷 [el](../el/01-contributing-guide.md) · 🇪🇸 [es](../es/01-contributing-guide.md) · 🇪🇪 [et](../et/01-contributing-guide.md) · 🇮🇷 [fa](../fa/01-contributing-guide.md) · 🇫🇮 [fi](../fi/01-contributing-guide.md) · 🇫🇷 [fr](../fr/01-contributing-guide.md) · 🇮🇳 [gu](../gu/01-contributing-guide.md) · 🇮🇱 [he](../he/01-contributing-guide.md) · 🇮🇳 [hi](../hi/01-contributing-guide.md) · 🇭🇷 [hr](../hr/01-contributing-guide.md) · 🇭🇺 [hu](../hu/01-contributing-guide.md) · 🇮🇩 [id](../id/01-contributing-guide.md) · 🇮🇹 [it](../it/01-contributing-guide.md) · 🇯🇵 [ja](../ja/01-contributing-guide.md) · 🇰🇷 [ko](../ko/01-contributing-guide.md) · 🇱🇹 [lt](../lt/01-contributing-guide.md) · 🇱🇻 [lv](../lv/01-contributing-guide.md) · 🇮🇳 [mr](../mr/01-contributing-guide.md) · 🇲🇾 [ms](../ms/01-contributing-guide.md) · 🇲🇹 [mt](../mt/01-contributing-guide.md) · 🇳🇱 [nl](../nl/01-contributing-guide.md) · 🇳🇴 [no](../no/01-contributing-guide.md) · 🇵🇭 [phi](../phi/01-contributing-guide.md) · 🇵🇱 [pl](../pl/01-contributing-guide.md) · 🇵🇹 [pt](../pt/01-contributing-guide.md) · 🇧🇷 [pt-BR](../pt-BR/01-contributing-guide.md) · 🇷🇴 [ro](../ro/01-contributing-guide.md) · 🇷🇺 [ru](../ru/01-contributing-guide.md) · 🇸🇰 [sk](../sk/01-contributing-guide.md) · 🇸🇮 [sl](../sl/01-contributing-guide.md) · 🇷🇸 [sr](../sr/01-contributing-guide.md) · 🇸🇪 [sv](../sv/01-contributing-guide.md) · 🇰🇪 [sw](../sw/01-contributing-guide.md) · 🇮🇳 [ta](../ta/01-contributing-guide.md) · 🇮🇳 [te](../te/01-contributing-guide.md) · 🇹🇭 [th](../th/01-contributing-guide.md) · 🇹🇷 [tr](../tr/01-contributing-guide.md) · 🇺🇦 [uk-UA](../uk-UA/01-contributing-guide.md) · 🇵🇰 [ur](../ur/01-contributing-guide.md) · 🇻🇳 [vi](../vi/01-contributing-guide.md) · 🇨🇳 [zh-CN](../zh-CN/01-contributing-guide.md) · 🇹🇼 [zh-TW](../zh-TW/01-contributing-guide.md)

---

Go raibh maith agat as do spéis i gcur leis! Láraíonn an treoir seo gach ní a theastaíonn uait chun tosú.

Chun an sreabhadh oibre oifigiúil in aghaidh an athróra, tosaigh leis an
[Conair Órga don Chur Isteach](docs/ops/06-contribution-golden-path.md). Léiríonn sé conarthaí, tástáil fhiúntach, clúdach CI, agus céimeanna athmhonaraíochta do athruithe ar sholáthraithe, ródáil, UI/UX, i18n, CLI, bunachar sonraí, agus tógáil/sábháil.

---

## Cumraíocht Forbartha

### Réamhriachtanais

- **Node.js** `>=22.22.3 <23`, nó `>=24.0.0 <27` (molta: 24 LTS)
- **npm** 10+

> **Úsáideoirí npm v11+ (Node 24+):** Tar éis `npm install`, seiceáil an suiteáladh modúlí dúchasigh:
> `node -e "require('better-sqlite3')"`. Má theipeann air le `MODULE_NOT_FOUND`,
> rith `npm approve-scripts better-sqlite3 && npm install`. Féach
> [Ceasanna](docs/guides/23-troubleshooting.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clónáil agus Suiteáil

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Athróganna Timpeallachta

```bash
# Cruthaigh do .env ón teimpléad
cp .env.example .env

# Gineadh na rúin is gá
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Athróganna tábhachtacha don fhorbhairt:

| Athróg                 | Réamhshocrú Forbartha    | Cur Síos                          |
| ---------------------- | ------------------------ | --------------------------------- |
| `PORT`                 | `20128`                  | Port an fhearainn                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Bonn-URL don chomhéadan           |
| `JWT_SECRET`           | (gin thuas)              | Rún síniú JWT                     |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Pasfhocal an chéad logála isteach |
| `APP_LOG_LEVEL`        | `info`                   | Leibhéal mionsonraí logála        |

### Socruithe an Deais

Soláthraíonn an deais roghanna comhéadan do ghnéithe is féidir a chumrú freisin trí athróganna timpeallachta:

| Suíomh Socraithe        | Roghnaigh                    | Cur Síos                                      |
| ----------------------- | ---------------------------- | --------------------------------------------- |
| Socrúcháin → Casta      | Mód Dífhabhtaithe            | Cumasaigh logáil iarratais dífhabhtaithe (UI) |
| Socrúcháin → Ginearálta | Infheictheacht Barra Tosaigh | Taispeáin/folaigh ranna an bharra tosaigh     |

Stóráiltear na socruithe seo sa bhunachar sonraí agus mairann siad trasna atosaí, ag sárú na réamhshocrúchán athróg timpeallachta nuair a shocraítear iad.

### Ag Rith go hÁitiúil

```bash
# Mód forbartha (athlódáil teolaí)
npm run dev

# Tógáil táirgíochta
npm run build    # next build → .build/next/ ansin assembleStandalone → dist/
npm run start

# Tógáil tapa cúltaca / API amháin le haghaidh athruithe rannpháirtithe
npm run build:contributor

# Tógáil scaoilte (athghlanadh + seanchomhartha HEAD — riachtanach don sábháil)
npm run build:release   # rm -rf .build dist + build + scríobhann dist/BUILD_SHA

# Cumraíocht phoirt choitianta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Déanann an tógáil rannpháirtithe bailíochtú comhshó amháin: ní dhéanann sé an dáileog seasta a shochrú ná sócmhainní pacáistíochta dúchasigh roghnach a thógáil. Úsáid an tógáil táirgíochta rialta nuair is mian leat bailíochtú a dhéanamh ar an ngreamán seolta.

### Leagan Amach Aschur na Tógála

| Comhadlann | Ábhar                                                                | Seiceáilte |
| ---------- | -------------------------------------------------------------------- | ---------- |
| `src/`     | Foinse an fheidhmchláir (TypeScript / TSX)                           | Tá         |
| `.build/`  | Idirlín — aschur `next build` (gitignored, `distDir = .build/next`)  | Níl        |
| `dist/`    | Greamán seolta — comhdhubháilte ag `assembleStandalone` (gitignored) | Níl        |

Téann an sreabhadh tógála in aon phas:

```
npm run build
  └─ next build → .build/next/standalone  (aschur Next.js)
  └─ assembleStandalone()                 (cóipeáil seasta + statach + poiblí + sócmhainní dúchasigh)
       └─ aschur: dist/                   (server.js, .next/static/, public/, node_modules/)
```

Ní mhaolann `npm run build:release` an dá chomhadlann ar dtús agus scríobhann sé
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) mar sheanchomhartha iontaofachta sábhála.

Úsáideann `npm run build:comhoibriúcháin` prófíl tógála cúltaca-amháin. Stubsann sé comhaid chomhéadan deais go sealadach agus é ag tógáil, coinníonn sé lámh-chóireálaithe ruteála API, agus athshuiteálann sé na bunaidh comhaid tar éis na tógála. Úsáid `npm run build` le haghaidh athruithe a théann i bhfeidhm ar chomhéadan an deais nó le haghaidh bailíochtú scaoilte iomlán; ní ionadaíonn próifíl an rannpháirtithe don tógáil scaoilte.

> **Nóta sábhála VPS:** ní athraítear an chomhadlann íomhá iargháltach `/usr/lib/node_modules/omniroute/app/`.
> Seolann na scileanna sábhála ábhar `dist/` isteach ann le rsync.
> D'aistrigh cosán aschur na tógála sa stór amháin (`app/` → `dist/`).

URLanna réamhshocraithe:

- **Deais**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Sreabh Oibre Git

> ⚠️ **NÁ CHOMH Dhéan DÍREACH go dtí an bhranch `main`.** Bain úsáid i gcónaí as bhrancheanna gnéithe.
>
> **Bunús PR:** sainmhínigh an bhranch gníomhach `release/vX.Y.Z` (nach `main`). Féach
> [`docs/ops/03-branching-model.md`](docs/ops/03-branching-model.md) le haghaidh an
> tsamhail bhainnseachta in aghaidh na brainse + taegeáil ag seoladh.

```bash
# Branche ó bharr an fhóta seolta gníomhaigh (sampla: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... déan athruithe ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Oscail Pull Request le bunús = release/v3.8.49
```

### Ainmneach Brainse

| Réimír      | Cuspóir                        |
| ----------- | ------------------------------ |
| `feat/`     | Gnéithe nua                    |
| `fix/`      | Ceartuithe fabhsa              |
| `refactor/` | Athchóiriú cóid                |
| `docs/`     | Athruithe doiciméadúcháin      |
| `test/`     | Tuirlingtí/deisiúcháin tástála |
| `chore/`    | Uirlisí, CI, spleáchais        |

### Teachtaireachtí Coimmitáide

Lean [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update 03-security-policy.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scóipeanna (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Rith Tástálacha

```bash
# Gach tástáil (aonad + vitest + córas + e2e)
npm run test:all

# Comhad tástála amháin (runner tástála dúchasach Node.js — úsáideann an chuid is mó de seo)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tástálacha aonad amháin a bhfuil tionchar ag do athrú orthu (an roghnóir TIA céanna le geata CI, #8084)
npm run test:scoped            # athruithe sa choimmitáid deireanach (nó sa chrann oibre)
npm run test:scoped:staged     # athruithe stáisiúnaithe amháin — oibríonn go maith le rith réamh-chomhshocraithe
npm run test:scoped:full       # atógáil an léarscáil graf tionscail ar dtús (tar éis comhadanna a chur leis/a bhogadh)
# Téann Amach 1 + "rith an t-iomlán suite" le comhad hub (tsconfig, package.json, …) nó
# athrú neamh-mhapáilte — theipeann an roghnóir ar shábháilte, ní dhéanann sé dearmad i rith.

# Vitest (freastalaí MCP, autoCombo, taisce)
npm run test:vitest

# Tástálacha E2E (teastaíonn Playwright)
npm run test:e2e

# Tástálacha cliant prótacail E2E (aistrithe MCP, A2A)
npm run test:protocols:e2e

# Tástálacha comhoiriúnachta córais
npm run test:ecosystem

# Geata clúdach: 0.6 radhairc/lineanna/fuincsiúin/brainsí
npm run test:coverage
npm run coverage:report

# Seiceáil lint + formáid
npm run lint
npm run check

# Meascán fíor-upstream ina bhfuil geata (teastaíonn rochtain VPS + creidmheachtaí soláthraí fíor)
# Buaileann soláthraithe FÍOR — costais beagán. NÁ RITH i gCI. Oibríonn gan ghlan gan an geata.
# Teastaíonn: ssh root@192.168.0.15 rochtain (faigheann an léarscáil DB read-only ón VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Meascán beo Céim-3 VPS — scripteanna Node ESM simplí, buail an freastalaí beo .15 go díreach.
# Teastaíonn: ssh root@192.168.0.15 rochtain (cruthaítear/nichtear combos tríd an SSH sqlite).
# Buileann soláthraithe FÍOR (costas beag). NÍ cruthaigh/nichtear ach combos __live_test__*. NÁ RITH i gCI.
# Tá REQUIRE_API_KEY=false ar .15 mar sin ní theastaíonn eochair API, ach ómníonn sé COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY más ann dóibh.
npm run test:combo:live:vps              # 7 cásanna HTTP (tosaíocht/ciorcal-chothrom/meáchain_costais/leáilis/auto + sláinte)
npm run test:combo:live:vps:failover     # cuireann cás fíor iomrallaithe tras-sholáthraí leis (8 iomlán)
```

Nótaí clúdach:

- Léiríonn `npm run test:coverage` clúdach foinse don seisiún tástála aonad príomhúil, fágann sé `tests/**` amach, agus cuireann sé `open-sse/**` isteach
- Ní mór do Phull Request cloí le geata clúdach ag **60%+** radhairc/lineanna/fuincsiúin/brainsí
- Má théann PR i bhfeidhm ar chód táirgíochta i `src/`, `open-sse/`, `electron/`, nó `bin/`, ní mór dó tástálacha uathoibrithe a chur leis nó a nuashonrú sa PR céanna
- Cuir comhaid tástála athraithe nó curtha leis i bhfíor an PR nuair a théann i bhfeidhm ar chód táirgíochta
- Seiceáil toradh SonarQube ar an PR nuair atá rúin tionscadail cumraithe i gCI

Stádas tástála reatha: **122 comhad tástála aonad** ag clúdach:

- Aistritheoirí soláthraí agus comhshó formáid
- Teorainn ráta, sos circuits, agus neartmhaireacht
- Taisce shéimeantach, idempotentacht, rathú dul chun cinn
- Oibríochtaí bunachair sonraí agus scéime (21 modúl DB)
- Sreabhadh OAuth agus fíordheimhniú
- Bailíochtú pointí deiridh API (Zod v4)
- Uirlisí freastalaí MCP agus cur i bhfeidhm scóip
- Córais Cuimhne agus Scileanna

---

## Stíl Chóid

- **ESLint** — Rith `npm run lint` roimh chomhdú
- **Prettier** — Formáidithe go huathoibríoch trí `lint-staged` ar chomhdú (2 spás, leathstadanna, comharthaí athfhriotail dúbailte, leithead 100 carachtar, camóga eireaball es5)
- **TypeScript** — Úsáideann gach cód `src/` `.ts`/`.tsx`; úsáideann `open-sse/` `.ts`/`.js`; doiciméadaigh le TSDoc (`@param`, `@returns`, `@throws`)
- **Gan `eval()`** — Cuireann ESLint `no-eval`, `no-implied-eval`, `no-new-func` i bhfeidhm
- **Bailíochtú Zod** — Úsáid scéimeanna Zod v4 le haghaidh gach bailíochtú ionchuir API
- **Ainmniú**: Comhaid = camelCase/kebab-case, comhpháirteanna = PascalCase, tairisigh = UPPER_SNAKE

### Láimhseáil earráidí / blocanna catch folmha

Ná fág `catch` gan mhíniú riamh. Aicmigh é i gceann amháin de dhá chatagóir (cuireann sé seo
an riail chrua "ná slog earráidí go ciúin riamh i sruthanna SSE" i bhfeidhm go hoibríochtúil):

- **D'aon ghnó (ár nglanadh/teileiméadracht dhícheallach féin)** — tá teip anseo ag súil leis agus
  neamhdhíobhálach; cuir trácht réasúnaíochta aonlíne leis, gan logáil (is é logáil ar gach iarratas
  an torann a sheachnaíonn an coinbhinsiún seo).

  ```ts
  } catch {} // tá sé ag súil leis an rialtóir a dhúnadh tar éis dícheangal cliaint
  ```

- **Ba chóir logáil (cód seachtrach/arna sholáthar ag an nglaoiteoir, nó athraíonn an slog sreabhadh rialaithe)** —
  coinnigh an catch (ná lig dó an sruth a bhriseadh riamh) ach astaigh `console.debug`/`warn` comhthéacsúil
  ionas go mbeidh an teip inbhraite.

  ```ts
  } catch (e) {
    console.debug("[STREAM] earráid callback onFailure:", e);
  }
  ```

Féach `open-sse/utils/stream.ts` agus `open-sse/utils/streamHandler.ts` le haghaidh samplaí feidhmithe.

---

## Struchtúr an Tionscadail

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Leathanaigh deais (23 rannóg)
│   ├── api/                # Bealaí API (51 eolaire)
│   └── login/              # Leathanaigh fíordheimhnithe (.tsx)
├── domain/                 # Inneall beartais (policyEngine, comboResolver, costRules, srl.)
├── lib/                    # Croí-loighic ghnó (.ts)
│   ├── a2a/                # Freastalaí prótacail Gníomhaire-go-Gníomhaire v0.3
│   ├── acp/                # Clár prótacal cumarsáide gníomhairí
│   ├── compliance/         # Inneall beartas comhlíonta
│   ├── db/                 # Modúil fearainn SQLite + 130 imirce
│   ├── memory/             # Cuimhne chomhráiteach bhuan
│   ├── oauth/              # Soláthraithe, seirbhísí, agus fóntais OAuth
│   ├── skills/             # Creat scileanna insínte
│   ├── usage/              # Rianú úsáide agus ríomh costais
│   └── localDb.ts          # Ciseal ath-onnmhairithe amháin — ná cuir loighic anseo riamh
├── middleware/              # Meán-earraí iarratais (promptInjectionGuard)
├── mitm/                   # Seachfhreastalaí MITM (deimhniú, DNS, ródú sprice)
├── shared/
│   ├── components/         # Comhpháirteanna React (.tsx)
│   ├── constants/          # Sainmhínithe soláthraithe (329), scóip MCP, 19 straitéis ródaithe
│   ├── utils/              # Briscoir ciorcaid, sláintitheoir, cúntóirí fíordheimhnithe
│   └── validation/         # Scéimeanna Zod v4
└── sse/                    # Píblíne seachfhreastalaí SSE

open-sse/                   # @omniroute/open-sse spás oibre
├── executors/              # 89 modúl feidhmitheora
├── handlers/               # 11 láimhseálaí iarratais (comhrá, freagraí, leabú, íomhánna, srl.)
├── mcp-server/             # Freastalaí MCP (110 uirlis uathúla, 3 iompar, 33 scóip)
├── services/               # 178 seirbhís ardleibhéil (combo, autoCombo, rateLimitManager, srl.)
├── translator/             # Aistritheoirí formáide (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Claochladán API Freagraí
└── utils/                  # 22 modúl fóntais (sruth, TLS, seachfhreastalaí, logáil)

electron/                   # Aip deisce Electron (tras-ardán)

tests/
├── unit/                   # Rith tástála Node.js (1,574 comhad tástála)
├── integration/            # Tástálacha comhtháthaithe
├── e2e/                    # Tástálacha Playwright
├── security/               # Tástálacha slándála
├── translator/             # Tástálacha aistritheora ar leith
└── load/                   # Tástálacha ualaigh

docs/
├── adr/                     # Taifid Chinntí Ailtireachta
├── architecture/            # Ailtireacht chórais & athléimneacht
├── comparison/              # OmniRoute vs roghanna eile
├── compression/             # Treoracha & rialacha comhbhrú
├── dev/                     # Treoracha forbartha
├── diagrams/                # Léaráidí ailtireachta
├── frameworks/              # MCP, A2A, OpenCode, Cuimhne, Scileanna
├── guides/                  # Treoir úsáideora, Docker, socrú, fabhtcheartú
├── i18n/                    # Aistriúcháin README idirnáisiúnaithe
├── marketing/               # Ábhair mhargaíochta
├── ops/                     # Imscaradh, seachfhreastalaí, clúdach, scaoileadh
├── providers/               # Doiciméid shonracha soláthraithe
├── reference/               # Tagairt API, athróga timpeallachta, uirlisí CLI, sraitheanna saor in aisce
├── releases/                # Nótaí scaoilte
├── routing/                 # Inneall uath-chomhcheangail, athsheinm réasúnaíochta
├── screenshots/             # Scáileánghabhálacha deais
├── security/                # Ráillí cosanta, comhlíonadh, stealth, comharthaí
└── specs/                   # Sonraíochtaí dearaidh
```

---

## Soláthróir Nua á Chur Leis

### Céim 1: Cláraigh Tairisigh an tSoláthróra

Cuir le `src/shared/constants/providers.ts` — bailíochtaithe ag Zod ag am lódála an mhodúil.

### Céim 2: Cuir Feidhmitheoir Leis (más gá loighic shaincheaptha)

Cruthaigh feidhmitheoir in `open-sse/executors/your-provider.ts` ag síneadh an fheidhmitheora bhunúsaigh.

### Céim 3: Cuir Aistritheoir Leis (mura bhformáid OpenAI é)

Cruthaigh aistritheoirí iarratais/freagra in `open-sse/translator/`.

### Céim 4: Cuir Cumraíocht OAuth Leis (más OAuth-bhunaithe é)

Cuir dintiúir OAuth in `src/lib/oauth/constants/oauth.ts` agus seirbhís in `src/lib/oauth/services/`.

Má dháileann an soláthróir uaschúrsa client_id/secret OAuth poiblí nó eochair Firebase Web API laistigh dá CLI / brabhsálaí poiblí, **ná** leabaigh é mar litriúil teaghrán. Úsáid `resolvePublicCred()` ó `open-sse/utils/publicCreds.ts` agus cuir iontráil beart mascáilte le `EMBEDDED_DEFAULTS`. Tá an sreabhadh oibre iomlán éigeantach doiciméadaithe in [`docs/security/04-public-creds-pattern.md`](./docs/security/04-public-creds-pattern.md).

Laistigh de láimhseálaithe/feidhmitheoirí, ní mór teachtaireachtaí earráide a shroicheann an cliant dul trí `buildErrorBody()` / `sanitizeErrorMessage()` ó `open-sse/utils/error.ts` — ná cuir `err.stack` nó `err.message` amh i gcomhlacht Freagra riamh. Féach [`docs/security/05-error-sanitization.md`](./docs/security/05-error-sanitization.md).

### Céim 5: Cláraigh Samhlacha

Cuir sainmhínithe samhlacha in `open-sse/config/providerRegistry.ts`.

### Céim 6: Cuir Tástálacha Leis

Scríobh tástálacha aonad in `tests/unit/` a chlúdaíonn ar a laghad:

- Clárú an tsoláthróra
- Aistriúchán iarratais/freagra
- Láimhseáil earráidí

---

## Seicliosta um Iarratas Tarraingthe

- [ ] Ritheann tástálacha (`npm test`)
- [ ] Ritheann lintáil (`npm run lint`)
- [ ] Éiríonn le tógáil (`npm run build`)
- [ ] Cineálacha TypeScript curtha le haghaidh feidhmeanna agus comhéadain phoiblí nua
- [ ] Gan aon rúin chrua-chódaithe ná luachanna cúltaca
- [ ] Dintiúir phoiblí uaschúrsa leabaithe trí `resolvePublicCred()` (féach [`docs/security/04-public-creds-pattern.md`](./docs/security/04-public-creds-pattern.md)), riamh mar litriúil
- [ ] Freagraí earráide ar aghaidh trí `buildErrorBody()` / `sanitizeErrorMessage()` — gan aon rianta cruachta amha i gcomhlachtaí freagra (féach [`docs/security/05-error-sanitization.md`](./docs/security/05-error-sanitization.md))
- [ ] Orduithe blaosc (`exec` / `spawn`) ag rith luachanna runtime trí `env`, ní trí idirshuíomh teaghrán
- [ ] Gach ionchur bailíochtaithe le scéimeanna Zod
- [ ] **Blúire** loga athraithe curtha faoi `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` le haghaidh athruithe atá infheicthe d'úsáideoirí (féach [`changelog.d/README.md`](./changelog.d/README.md)) — ná cuir in eagar `CHANGELOG.md` go díreach; déantar blúirí a chomhiomlánú ag am scaoilte agus ní bhíonn coinbhleacht eatarthu riamh idir PRanna
- [ ] Doiciméadúchán nuashonraithe (más infheidhme)
- [ ] Gan aon foláirimh CodeQL / Secret-Scanning nua oscailte, nó gach ceann díobh dícháilithe le réasúnú teicniúil ag tagairt don doiciméad ábhartha `docs/security/`
- [ ] Bealaí a ghineann próisis fho-áite (`/api/mcp/`, `/api/cli-tools/runtime/`) aicmithe mar `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — féach [Riail Chrua #15](docs/security/06-route-guard-tiers.md)
- [ ] Gan aon bhanda `Co-Authored-By` i dteachtaireachtaí coimit — ní mór go mbeadh coimítí le feiceáil go heisiach faoi chéannacht Git úinéir an stór (Riail Chrua #16)

## Eisiúint

Bainistítear eisiúintí tríd an sreabhadh oibre `/generate-release`. Nuair a chruthaítear Eisiúint GitHub nua, foilsítear an pacáiste **go huathoibríoch ar npm** trí GitHub Actions.

Le haghaidh imscaradh VPS, bain úsáid as `npm run build:release` (ní `npm run build`) — déanann sé atógáil ghlan, tionóileann sé an bheart isteach i `dist/`, agus scríobhann sé an comhartha `dist/BUILD_SHA`. Ansin bain úsáid as na scileanna `/deploy-vps-*-cc` a dhéanann rsync ar `dist/` go dtí an chomhadlann `app/` iargúlta.

---

## Cabhair a Fháil

- **Ailtireacht**: Féach [`docs/architecture/01-system-overview.md`](docs/architecture/01-system-overview.md)
- **Tagairt API**: Féach [`docs/reference/01-api-reference.md`](docs/reference/01-api-reference.md)
- **Doiciméid slándála**: [`docs/security/07-cli-token-auth.md`](docs/security/07-cli-token-auth.md), [`docs/security/06-route-guard-tiers.md`](docs/security/06-route-guard-tiers.md), [`docs/security/05-error-sanitization.md`](docs/security/05-error-sanitization.md), [`docs/security/04-public-creds-pattern.md`](docs/security/04-public-creds-pattern.md)
- **Doiciméid oibriúcháin**: [`docs/ops/12-sqlite-runtime.md`](docs/ops/12-sqlite-runtime.md)
- **Saincheisteanna**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: Féach `docs/adr/` le haghaidh taifid chinntí ailtireachta
