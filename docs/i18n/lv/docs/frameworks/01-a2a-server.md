# A2A-SERVER (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/01-a2a-server.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/01-a2a-server.md) · 🇦🇿 [az](../../../az/docs/frameworks/01-a2a-server.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/01-a2a-server.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/01-a2a-server.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/01-a2a-server.md) · 🇩🇰 [da](../../../da/docs/frameworks/01-a2a-server.md) · 🇩🇪 [de](../../../de/docs/frameworks/01-a2a-server.md) · 🇬🇷 [el](../../../el/docs/frameworks/01-a2a-server.md) · 🇪🇸 [es](../../../es/docs/frameworks/01-a2a-server.md) · 🇪🇪 [et](../../../et/docs/frameworks/01-a2a-server.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/01-a2a-server.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/01-a2a-server.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/01-a2a-server.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/01-a2a-server.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/01-a2a-server.md) · 🇮🇱 [he](../../../he/docs/frameworks/01-a2a-server.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/01-a2a-server.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/01-a2a-server.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/01-a2a-server.md) · 🇮🇩 [id](../../../id/docs/frameworks/01-a2a-server.md) · 🇮🇹 [it](../../../it/docs/frameworks/01-a2a-server.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/01-a2a-server.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/01-a2a-server.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/01-a2a-server.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/01-a2a-server.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/01-a2a-server.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/01-a2a-server.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/01-a2a-server.md) · 🇳🇴 [no](../../../no/docs/frameworks/01-a2a-server.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/01-a2a-server.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/01-a2a-server.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/01-a2a-server.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/01-a2a-server.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/01-a2a-server.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/01-a2a-server.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/01-a2a-server.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/01-a2a-server.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/01-a2a-server.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/01-a2a-server.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/01-a2a-server.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/01-a2a-server.md) · 🇮🇳 [te](../../../te/docs/frameworks/01-a2a-server.md) · 🇹🇭 [th](../../../th/docs/frameworks/01-a2a-server.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/01-a2a-server.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/01-a2a-server.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/01-a2a-server.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/01-a2a-server.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/01-a2a-server.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/01-a2a-server.md)

---

---

title: "OmniRoute A2A servera dokumentācija"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute A2A servera dokumentācija

> Aģenta-aģenta protokols v0.3 — „OmniRoute” kā intelektuālais maršrutēšanas aģents

A2A saskarnei ir divas virsmas:

- **JSON-RPC 2.0** pie `POST /a2a` (kanoniskais ieejas punkts, definēts `src/app/a2a/route.ts`).
- **REST** apakšceļā `/api/a2a/*` vadības panelim un pārvaldības rīkiem (stāvoklis, uzdevumu saraksts, atcelšana).

Uzdevumus pārrauga `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, noklusējuma derīguma termiņš ir 5 minūtes). Prasmju izpildi veic, izmantojot `A2A_SKILL_HANDLERS`, kas atrodas `src/lib/a2a/taskExecution.ts`.

## Aģenta atklāšana

```bash
curl http://localhost:20128/.well-known/agent.json
```

Atgriež aģenta karti, kurā aprakstīti „OmniRoute” tehniskās iespējas, prasmju kopums un autentifikācijas prasības.

Aģenta kartes lauks `version` tiek nolasīts no `process.env.npm_package_version` (skatiet `src/app/.well-known/agent.json/route.ts:13`), tādējādi tas automātiski sinhronizējas ar `package.json` katras izlaišanas brīdī.

---

## Autentifikācija

Visām `/a2a` vaicājumam nepieciešama API atslēga, ko norāda `Authorization` galvnē:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ja serverī nav konfigurēta API atslēga, autentifikācija netiek piemērota.

## Iespējošana

A2A funkciju kontrolē iestatījuma **Endpoints → A2A** slēdzis; pēc noklusējuma tā ir atspējota. Kad funkcija ir atspējota,
`GET /api/a2a/status` ziņo par `status: "disabled"` un `online: false`; JSON-RPC izsaukumiem uz
`POST /a2a` tiek atgriezta kļūda HTTP 503 kopā ar JSON-RPC kļūdas kodu `-32000`.

---

## JSON-RPC 2.0 metodes

### `message/send` — Sinhrona izpilde

Nosūta ziņojumu konkrētai prasmei un gaida pilnu atbildi.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Atbilde:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE straumēšana

Darbojas tāpat kā `message/send`, bet atgriež Server-Sent Events reālā laika straumēšanai.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE notikumi:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Uzdevuma stāvokļa vaicājums

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Uzdevuma atcelšana

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Pieejamās prasmes

OmniRoute piedāvā 6 A2A prasmes, kas savienotas ar `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Katrs prasmju modulis atrodas mapē `src/lib/a2a/skills/`.

| Prasme                          | ID                   | Apraksts                                                                                                                                              | Birkas                              | Piemēri                                                |
| :------------------------------ | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :----------------------------------------------------- |
| Viedā maršrutēšana              | `smart-routing`      | Maršrutē uzvedni caur optimālo pakalpojumu sniedzēju/kombināciju, izmantojot OmniRoute kombināciju programmu un vērtēšanu                             | maršrutēšana, pakalpojumu sniedzēji | "Maršrutēt šo uzvedni, izmantojot labāko modeli"       |
| Kvotu pārvaldība                | `quota-management`   | Sniedz informāciju par katra pakalpojumu sniedzēja kvotas stāvokli un palīdz izsaucējiem izlemt, kad ierobežot ātrumu vai pārslēgties                 | kvota, pakalpojumu sniedzēji        | "Pārbaudīt anthropic kvotu"                            |
| Pakalpojumu sniedzēju atklāšana | `provider-discovery` | Uzskaita instalētos pakalpojumu sniedzējus ar iespējām, bezmaksas līmeņa indikatoriem un OAuth statusu                                                | pakalpojumu sniedzēji, atklāšana    | "Kādi pakalpojumu sniedzēji ir pieejami?"              |
| Izmaksu analīze                 | `cost-analysis`      | Aprēķina pieprasījuma/konversācijas izmaksas, ņemot vērā katalogu un neseno lietojumu                                                                 | izmaksas, lietojums                 | "Aprēķināt šīs konversācijas izmaksas"                 |
| Veselības pārskats              | `health-report`      | Apkopo katra pakalpojumu sniedzēja ķēdes pārtraucēja, gaidīšanas perioda un bloķēšanas stāvokli                                                       | veselība, noturība                  | "Parādīt visu pakalpojumu sniedzēju veselības statusu" |
| Iespēju uzskaitījums            | `list-capabilities`  | Atgriež pilnu 45 ierakstu Agent Skills katalogu (23 API + 21 CLI + 1 config) kā Markdown tabulu ar neapstrādātiem SKILL.md URL konteksta ievietošanai | katalogs, atklāšana, prasmes        | "Uzskaitīt visas OmniRoute iespējas"                   |

> Agent Card ir jāuztur saskaņota ar aktuālo 352 pakalpojumu sniedzēju katalogu; pakalpojumu sniedzēju skaits un bezmaksas/bez autentifikācijas metadati tiek iegūti no izpildlaika reģistra.

### `list-capabilities` prasmes detalizēts apraksts

Prasme `list-capabilities` ir īpaši noderīga ārējiem aģentiem, kuriem pirms API izsaukumu nosūtīšanas jānoskaidro, ko OmniRoute nodrošina. Tā atgriež strukturētu Markdown tabulas artefaktu:

```
| ID | Nosaukums | Kategorija | Joma | Galapunkti/komandas | Neapstrādāts URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autentifikācija un sesijas | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Katrā rindā ir kolonna `rawUrl`, lai aģenti varētu nekavējoties izgūt pilnu SKILL.md. Lauks `metadata.totalSkills` atspoguļo kataloga lielumu (šobrīd 45). Implementācija: `src/lib/a2a/skills/listCapabilities.ts`. Skatiet arī [05-agent-skills-catalog.md](./05-agent-skills-catalog.md).

---

## REST API (papildu)

JSON-RPC galapunkts `/a2a` ir oficiālais A2A ieejas punkts. Tālāk minētie REST galapunkti nodrošina papildu piekļuvi informācijas paneļiem un ārējiem rīkiem:

| Endpoint                     | Method | Description                                                       | Auth                                           |
| :--------------------------- | :----- | :---------------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET    | Servera stāvoklis, reģistrētās prasmes                            | (publiski)                                     |
| `/api/a2a/tasks`             | GET    | Uzdevumu saraksts ar filtriem                                     | administrācijas                                |
| `/api/a2a/tasks/[id]`        | GET    | Uzdevuma iegūšana pēc ID                                          | administrācijas                                |
| `/api/a2a/tasks/[id]/cancel` | POST   | Pašreizējā uzdevuma atcelšana                                     | administrācijas                                |
| `/.well-known/agent.json`    | GET    | Aģenta karte (A2A atklāšana)                                      | (publiski, kešots 3600s)                       |
| `/api/a2a/tasks`             | POST   | Ienākošā deleģēšana uz OmniConductor klasteri (Conductor PRD RF5) | Bearer pret `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Ienākošā Conductor deleģēšana (`POST /api/a2a/tasks`):** ārējie A2A aģenti deleģē kodēšanas darbus OmniConductor klasterim, izmantojot OmniRoute. Pieprasījuma ķermenis: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — deleģējamas ir tikai Conductor klastera prasmes (tās, kas norādītas Aģenta kartē); lauka `metadata.conductor.repo.url` vērtība ir obligāta (klasteris strādā ar Git repozitorijiem). Maršruts tiek pārveidots uz centra `POST /v1/tasks`, izmantojot servera puses `CONDUCTOR_ORCHESTRATOR_TOKEN` (rezerves variantā `CONDUCTOR_HUB_TOKEN`), un atgriež `201 { conductor_task_id, state: "submitted" }`; uzdevumu stāvokļi tiek nodoti atpakaļ caur SSE→A2A spoguļojumu (RF1) un ir pieejami, izmantojot `GET /api/a2a/tasks?skill=conductor`.

---

## Jauna prasmes pievienošana

1. **Izveidojiet prasmēs failu:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksportējiet asinhronu funkciju `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Ievērojiet esošo prasmēs struktūru, piemēram, `smartRouting.ts`.

2. **Reģistrējiet izpildītāju:** failā `src/lib/a2a/taskExecution.ts` pievienojiet ierakstu objektā `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...esošās prasmēs
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Izpaužiet Aģenta kartē:** failā `src/app/.well-known/agent.json/route.ts` pievienojiet masīva `skills` beigās jaunu elementu:

   ```json
   {
     "id": "your-skill",
     "name": "Jūsu prasme",
     "description": "Īss, uz nodomu vērsts apraksts",
     "tags": ["routing", "quota"],
     "examples": ["Parauga dabiskvalodas izsaukums"]
   }
   ```

4. **Rakstiet testus:** `tests/unit/a2a-<your-skill>.test.ts`. Aptveriet gan veiksmīgo, gan kļūdoscenāriju.

5. **Nodokumentējiet** jauno prasmi šī dokumenta tabulā `Pieejamās prasmēs`.

---

## Uzdevumu TTL

Uzdevumi tiek izbeigti pēc `ttlMinutes` (noklusējums — 5 min) — tas tiek konfigurēts `A2ATaskManager` konstruktorā failā `src/lib/a2a/taskManager.ts:82`. Lai pielāgotu šo vērtību, izveidojiet `A2ATaskManager` instanci no atdalīta atzara un norādiet citu vērtību (piem., `new A2ATaskManager(15)` 15 minūšu TTL). Fona intervāls ik pēc 60 sekundēm pārbauda izbeigušos uzdevumus.

---

## Uzdevuma dzīves cikls

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Pēc noklusējuma uzdevumi tiek izbeigti pēc 5 minūtēm (skatiet [Uzdevumu TTL](#task-ttl))
- Terminālie stāvokļi: `completed`, `failed`, `cancelled`
- Notikumu žurnālā tiek reģistrēta katra stāvokļa pāreja

---

## Kļūdu kodi

| Kods   | Nozīme                                |
| :----- | :------------------------------------ |
| -32700 | Parsēšanas kļūda (nederīgs JSON)      |
| -32600 | Nederīgs pieprasījums / nesankcionēts |
| -32601 | Metode vai prasme nav atrasta         |
| -32602 | Nederīgi parametri                    |
| -32603 | Iekšēja kļūda                         |
| -32000 | A2A galapunkts ir atspējots           |

---

## Integrācijas piemēri

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
