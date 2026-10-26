---
title: "OmniRoute A2A Sunucu Dokümantasyonu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute A2A Sunucu Dokümantasyonu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/01-a2a-server.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/01-a2a-server.md) · 🇦🇿 [az](../../../az/docs/frameworks/01-a2a-server.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/01-a2a-server.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/01-a2a-server.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/01-a2a-server.md) · 🇩🇰 [da](../../../da/docs/frameworks/01-a2a-server.md) · 🇩🇪 [de](../../../de/docs/frameworks/01-a2a-server.md) · 🇬🇷 [el](../../../el/docs/frameworks/01-a2a-server.md) · 🇪🇸 [es](../../../es/docs/frameworks/01-a2a-server.md) · 🇪🇪 [et](../../../et/docs/frameworks/01-a2a-server.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/01-a2a-server.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/01-a2a-server.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/01-a2a-server.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/01-a2a-server.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/01-a2a-server.md) · 🇮🇱 [he](../../../he/docs/frameworks/01-a2a-server.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/01-a2a-server.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/01-a2a-server.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/01-a2a-server.md) · 🇮🇩 [id](../../../id/docs/frameworks/01-a2a-server.md) · 🇮🇹 [it](../../../it/docs/frameworks/01-a2a-server.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/01-a2a-server.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/01-a2a-server.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/01-a2a-server.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/01-a2a-server.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/01-a2a-server.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/01-a2a-server.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/01-a2a-server.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/01-a2a-server.md) · 🇳🇴 [no](../../../no/docs/frameworks/01-a2a-server.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/01-a2a-server.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/01-a2a-server.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/01-a2a-server.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/01-a2a-server.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/01-a2a-server.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/01-a2a-server.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/01-a2a-server.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/01-a2a-server.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/01-a2a-server.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/01-a2a-server.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/01-a2a-server.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/01-a2a-server.md) · 🇮🇳 [te](../../../te/docs/frameworks/01-a2a-server.md) · 🇹🇭 [th](../../../th/docs/frameworks/01-a2a-server.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/01-a2a-server.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/01-a2a-server.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/01-a2a-server.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/01-a2a-server.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/01-a2a-server.md)

---

> Agent-to-Agent Protokolü v0.3 — Akıllı bir yönlendirme ajanı olarak OmniRoute

A2A yüzeyinin iki arayüzü vardır:

- `POST /a2a` adresinde **JSON-RPC 2.0** (kurallı giriş noktası, `src/app/a2a/route.ts` içinde tanımlı).
- Panolar ve araçlar için `/api/a2a/*` altında **REST** (durum, görev listesi, iptal).

Görevler `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, varsayılan 5 dakikalık TTL) tarafından izlenir. Yetenekler `src/lib/a2a/taskExecution.ts` içindeki `A2A_SKILL_HANDLERS` aracılığıyla dağıtılır.

## Ajan Keşfi (Agent Discovery)

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute'un yeteneklerini, becerilerini ve kimlik doğrulama gereksinimlerini açıklayan Ajan Kartını (Agent Card) döndürür.

---

## Kimlik Doğrulama

Tüm `/a2a` istekleri `Authorization` başlığı aracılığıyla bir API anahtarı gerektirir:

```
Authorization: Bearer SIZIN_OMNIROUTE_API_ANAHTARINIZ
```

Sunucuda hiçbir API anahtarı yapılandırılmamışsa, kimlik doğrulama atlanır.

## Etkinleştirme

A2A, **Uç Noktalar → A2A** anahtarıyla kontrol edilir ve varsayılan olarak devre dışıdır. Devre dışıyken, `GET /api/a2a/status` `status: "disabled"` ve `online: false` bildirir; `POST /a2a` çağrıları `-32000` JSON-RPC hata koduyla HTTP 503 döndürür.

---

## JSON-RPC 2.0 Metotları

### `message/send` — Eşzamanlı Yürütme

Bir yeteneğe mesaj gönderir ve tam yanıtı bekler.

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

### `message/stream` — SSE Akışı

`message/send` ile aynıdır ancak gerçek zamanlı akış için Server-Sent Events döndürür.

### `tasks/get` — Görev Durumu Alma

`params.id` ile bir görevin durumunu, yapıtlarını ve yürütme meta verilerini sorgular.

### `tasks/cancel` — Görevi İptal Etme

Çalışan bir görevi iptal eder.

---

## Desteklenen A2A Yetenekleri (Skills)

1. **`smart-routing`** — Akıllı yönlendirme ve çok sağlayıcılı geri dönüş ile mesaj gönderme.
2. **`quota-management`** — Tüm bağlı sağlayıcılardaki kota durumunu ve sıfırlanma sürelerini kontrol etme.
3. **`provider-discovery`** — Uygun sağlayıcıları ve modelleri yeteneklere göre listeleme.
4. **`cost-analysis`** — Oturum veya zaman dilimi bazında maliyet analiz raporu alma.
5. **`health-report`** — Sistem çalışma süresi, devre kesiciler ve sağlayıcı sağlık durumu.
6. **`list-capabilities`** — Desteklenen tüm modelleri, komboları ve stratejileri listeleme.
