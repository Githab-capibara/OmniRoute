# Dokumentasi Server A2A OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/01-a2a-server.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/01-a2a-server.md) · 🇦🇿 [az](../../../az/docs/frameworks/01-a2a-server.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/01-a2a-server.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/01-a2a-server.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/01-a2a-server.md) · 🇩🇰 [da](../../../da/docs/frameworks/01-a2a-server.md) · 🇩🇪 [de](../../../de/docs/frameworks/01-a2a-server.md) · 🇬🇷 [el](../../../el/docs/frameworks/01-a2a-server.md) · 🇪🇸 [es](../../../es/docs/frameworks/01-a2a-server.md) · 🇪🇪 [et](../../../et/docs/frameworks/01-a2a-server.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/01-a2a-server.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/01-a2a-server.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/01-a2a-server.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/01-a2a-server.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/01-a2a-server.md) · 🇮🇱 [he](../../../he/docs/frameworks/01-a2a-server.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/01-a2a-server.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/01-a2a-server.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/01-a2a-server.md) · 🇮🇹 [it](../../../it/docs/frameworks/01-a2a-server.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/01-a2a-server.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/01-a2a-server.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/01-a2a-server.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/01-a2a-server.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/01-a2a-server.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/01-a2a-server.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/01-a2a-server.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/01-a2a-server.md) · 🇳🇴 [no](../../../no/docs/frameworks/01-a2a-server.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/01-a2a-server.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/01-a2a-server.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/01-a2a-server.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/01-a2a-server.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/01-a2a-server.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/01-a2a-server.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/01-a2a-server.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/01-a2a-server.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/01-a2a-server.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/01-a2a-server.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/01-a2a-server.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/01-a2a-server.md) · 🇮🇳 [te](../../../te/docs/frameworks/01-a2a-server.md) · 🇹🇭 [th](../../../th/docs/frameworks/01-a2a-server.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/01-a2a-server.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/01-a2a-server.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/01-a2a-server.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/01-a2a-server.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/01-a2a-server.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/01-a2a-server.md)

---

> Protokol Agent-to-Agent v0.3 — OmniRoute sebagai agen routing cerdas

## Penemuan Agen

```bash
curl http://localhost:20128/.well-known/agent.json
```

Mengembalikan Kartu Agen yang mendeskripsikan kemampuan, keterampilan, dan persyaratan autentikasi OmniRoute.

---

## Autentikasi

Semua permintaan `/a2a` memerlukan kunci API melalui header `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jika tidak ada kunci API yang dikonfigurasi di server, autentikasi akan dilewati.

---

## Metode JSON-RPC 2.0

### `message/send` — Eksekusi Sinkron

Mengirim pesan ke sebuah keterampilan dan menunggu respons lengkap.

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

**Respons:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — Streaming SSE

Sama seperti `message/send` tetapi mengembalikan Server-Sent Events untuk streaming secara real-time.

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

**Event SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Kueri Status Tugas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Batalkan Sebuah Tugas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Keterampilan yang Tersedia

| Keterampilan       | Deskripsi                                                                                                                         |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `smart-routing`    | Merutekan prompt melalui pipeline cerdas OmniRoute. Mengembalikan respons beserta penjelasan routing, biaya, dan jejak ketahanan. |
| `quota-management` | Menjawab kueri bahasa alami tentang kuota penyedia, menyarankan combo gratis, dan memberikan peringkat kuota.                     |

---

## Siklus Hidup Tugas

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Tugas kedaluwarsa setelah 5 menit (dapat dikonfigurasi)
- Status terminal: `completed`, `failed`, `cancelled`
- Log event melacak setiap transisi status

---

## Kode Kesalahan

| Kode   | Arti                                       |
| :----- | :----------------------------------------- |
| -32700 | Kesalahan parse (JSON tidak valid)         |
| -32600 | Permintaan tidak valid / Tidak diotorisasi |
| -32601 | Metode atau keterampilan tidak ditemukan   |
| -32602 | Parameter tidak valid                      |
| -32603 | Kesalahan internal                         |

---

## Contoh Integrasi

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
