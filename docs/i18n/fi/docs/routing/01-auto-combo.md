# OmniRoute Auto-Combo Engine (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/01-auto-combo.md) · 🇸🇦 [ar](../../../ar/docs/routing/01-auto-combo.md) · 🇦🇿 [az](../../../az/docs/routing/01-auto-combo.md) · 🇧🇬 [bg](../../../bg/docs/routing/01-auto-combo.md) · 🇧🇩 [bn](../../../bn/docs/routing/01-auto-combo.md) · 🇨🇿 [cs](../../../cs/docs/routing/01-auto-combo.md) · 🇩🇰 [da](../../../da/docs/routing/01-auto-combo.md) · 🇩🇪 [de](../../../de/docs/routing/01-auto-combo.md) · 🇬🇷 [el](../../../el/docs/routing/01-auto-combo.md) · 🇪🇸 [es](../../../es/docs/routing/01-auto-combo.md) · 🇪🇪 [et](../../../et/docs/routing/01-auto-combo.md) · 🇮🇷 [fa](../../../fa/docs/routing/01-auto-combo.md) · 🇫🇷 [fr](../../../fr/docs/routing/01-auto-combo.md) · 🇮🇪 [ga](../../../ga/docs/routing/01-auto-combo.md) · 🇮🇳 [gu](../../../gu/docs/routing/01-auto-combo.md) · 🇮🇱 [he](../../../he/docs/routing/01-auto-combo.md) · 🇮🇳 [hi](../../../hi/docs/routing/01-auto-combo.md) · 🇭🇷 [hr](../../../hr/docs/routing/01-auto-combo.md) · 🇭🇺 [hu](../../../hu/docs/routing/01-auto-combo.md) · 🇮🇩 [id](../../../id/docs/routing/01-auto-combo.md) · 🇮🇹 [it](../../../it/docs/routing/01-auto-combo.md) · 🇯🇵 [ja](../../../ja/docs/routing/01-auto-combo.md) · 🇰🇷 [ko](../../../ko/docs/routing/01-auto-combo.md) · 🇱🇹 [lt](../../../lt/docs/routing/01-auto-combo.md) · 🇱🇻 [lv](../../../lv/docs/routing/01-auto-combo.md) · 🇮🇳 [mr](../../../mr/docs/routing/01-auto-combo.md) · 🇲🇾 [ms](../../../ms/docs/routing/01-auto-combo.md) · 🇲🇹 [mt](../../../mt/docs/routing/01-auto-combo.md) · 🇳🇱 [nl](../../../nl/docs/routing/01-auto-combo.md) · 🇳🇴 [no](../../../no/docs/routing/01-auto-combo.md) · 🇵🇭 [phi](../../../phi/docs/routing/01-auto-combo.md) · 🇵🇱 [pl](../../../pl/docs/routing/01-auto-combo.md) · 🇵🇹 [pt](../../../pt/docs/routing/01-auto-combo.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/01-auto-combo.md) · 🇷🇴 [ro](../../../ro/docs/routing/01-auto-combo.md) · 🇷🇺 [ru](../../../ru/docs/routing/01-auto-combo.md) · 🇸🇰 [sk](../../../sk/docs/routing/01-auto-combo.md) · 🇸🇮 [sl](../../../sl/docs/routing/01-auto-combo.md) · 🇷🇸 [sr](../../../sr/docs/routing/01-auto-combo.md) · 🇸🇪 [sv](../../../sv/docs/routing/01-auto-combo.md) · 🇰🇪 [sw](../../../sw/docs/routing/01-auto-combo.md) · 🇮🇳 [ta](../../../ta/docs/routing/01-auto-combo.md) · 🇮🇳 [te](../../../te/docs/routing/01-auto-combo.md) · 🇹🇭 [th](../../../th/docs/routing/01-auto-combo.md) · 🇹🇷 [tr](../../../tr/docs/routing/01-auto-combo.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/01-auto-combo.md) · 🇵🇰 [ur](../../../ur/docs/routing/01-auto-combo.md) · 🇻🇳 [vi](../../../vi/docs/routing/01-auto-combo.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/01-auto-combo.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/01-auto-combo.md)

---

> Self-managing model chains with adaptive scoring

## How It Works

The Auto-Combo Engine dynamically selects the best provider/model for each request using a **6-factor scoring function**:

| Factor     | Weight | Description                                     |
| :--------- | :----- | :---------------------------------------------- |
| Quota      | 0.20   | Remaining capacity [0..1]                       |
| Health     | 0.25   | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0.20   | Inverse cost (cheaper = higher score)           |
| LatencyInv | 0.15   | Inverse p95 latency (faster = higher)           |
| TaskFit    | 0.10   | Model × task type fitness score                 |
| Stability  | 0.10   | Low variance in latency/errors                  |

## Mode Packs

| Pack                    | Focus        | Key Weight       |
| :---------------------- | :----------- | :--------------- |
| 🚀 **Ship Fast**        | Speed        | latencyInv: 0.35 |
| 💰 **Cost Saver**       | Economy      | costInv: 0.40    |
| 🎯 **Quality First**    | Best model   | taskFit: 0.40    |
| 📡 **Offline Friendly** | Availability | quota: 0.40      |

## Self-Healing

- **Temporary exclusion**: Score < 0.2 → excluded for 5 min (progressive backoff, max 30 min)
- **Circuit breaker awareness**: OPEN → auto-excluded; HALF_OPEN → probe requests
- **Incident mode**: >50% OPEN → disable exploration, maximize stability
- **Cooldown recovery**: After exclusion, first request is a "probe" with reduced timeout

## Bandit Exploration

5% of requests (configurable) are routed to random providers for exploration. Disabled in incident mode.

## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ models scored across 6 task types (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Supports wildcard patterns (e.g., `*-coder` → high coding score).

## Files

| File                                         | Purpose                               |
| :------------------------------------------- | :------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | Scoring function & pool normalization |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × task fitness lookup           |
| `open-sse/services/autoCombo/engine.ts`      | Selection logic, bandit, budget cap   |
| `open-sse/services/autoCombo/selfHealing.ts` | Exclusion, probes, incident mode      |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 weight profiles                     |
| `src/app/api/combos/auto/route.ts`           | REST API                              |
