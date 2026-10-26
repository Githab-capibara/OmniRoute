---
title: "API Referansı"
version: 3.8.50
lastUpdated: 2026-08-23
---

# API Referansı (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/01-api-reference.md) · 🇸🇦 [ar](../../../ar/docs/reference/01-api-reference.md) · 🇦🇿 [az](../../../az/docs/reference/01-api-reference.md) · 🇧🇬 [bg](../../../bg/docs/reference/01-api-reference.md) · 🇧🇩 [bn](../../../bn/docs/reference/01-api-reference.md) · 🇨🇿 [cs](../../../cs/docs/reference/01-api-reference.md) · 🇩🇰 [da](../../../da/docs/reference/01-api-reference.md) · 🇩🇪 [de](../../../de/docs/reference/01-api-reference.md) · 🇬🇷 [el](../../../el/docs/reference/01-api-reference.md) · 🇪🇸 [es](../../../es/docs/reference/01-api-reference.md) · 🇪🇪 [et](../../../et/docs/reference/01-api-reference.md) · 🇮🇷 [fa](../../../fa/docs/reference/01-api-reference.md) · 🇫🇮 [fi](../../../fi/docs/reference/01-api-reference.md) · 🇫🇷 [fr](../../../fr/docs/reference/01-api-reference.md) · 🇮🇪 [ga](../../../ga/docs/reference/01-api-reference.md) · 🇮🇳 [gu](../../../gu/docs/reference/01-api-reference.md) · 🇮🇱 [he](../../../he/docs/reference/01-api-reference.md) · 🇮🇳 [hi](../../../hi/docs/reference/01-api-reference.md) · 🇭🇷 [hr](../../../hr/docs/reference/01-api-reference.md) · 🇭🇺 [hu](../../../hu/docs/reference/01-api-reference.md) · 🇮🇩 [id](../../../id/docs/reference/01-api-reference.md) · 🇮🇹 [it](../../../it/docs/reference/01-api-reference.md) · 🇯🇵 [ja](../../../ja/docs/reference/01-api-reference.md) · 🇰🇷 [ko](../../../ko/docs/reference/01-api-reference.md) · 🇱🇹 [lt](../../../lt/docs/reference/01-api-reference.md) · 🇱🇻 [lv](../../../lv/docs/reference/01-api-reference.md) · 🇮🇳 [mr](../../../mr/docs/reference/01-api-reference.md) · 🇲🇾 [ms](../../../ms/docs/reference/01-api-reference.md) · 🇲🇹 [mt](../../../mt/docs/reference/01-api-reference.md) · 🇳🇱 [nl](../../../nl/docs/reference/01-api-reference.md) · 🇳🇴 [no](../../../no/docs/reference/01-api-reference.md) · 🇵🇭 [phi](../../../phi/docs/reference/01-api-reference.md) · 🇵🇱 [pl](../../../pl/docs/reference/01-api-reference.md) · 🇵🇹 [pt](../../../pt/docs/reference/01-api-reference.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/01-api-reference.md) · 🇷🇴 [ro](../../../ro/docs/reference/01-api-reference.md) · 🇷🇺 [ru](../../../ru/docs/reference/01-api-reference.md) · 🇸🇰 [sk](../../../sk/docs/reference/01-api-reference.md) · 🇸🇮 [sl](../../../sl/docs/reference/01-api-reference.md) · 🇷🇸 [sr](../../../sr/docs/reference/01-api-reference.md) · 🇸🇪 [sv](../../../sv/docs/reference/01-api-reference.md) · 🇰🇪 [sw](../../../sw/docs/reference/01-api-reference.md) · 🇮🇳 [ta](../../../ta/docs/reference/01-api-reference.md) · 🇮🇳 [te](../../../te/docs/reference/01-api-reference.md) · 🇹🇭 [th](../../../th/docs/reference/01-api-reference.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/01-api-reference.md) · 🇵🇰 [ur](../../../ur/docs/reference/01-api-reference.md) · 🇻🇳 [vi](../../../vi/docs/reference/01-api-reference.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/01-api-reference.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/01-api-reference.md)

---

Tüm OmniRoute API uç noktaları için eksiksiz referans dokümantasyonu.

---

## İçindekiler

- [Sohbet Tamamlama (Chat Completions)](#sohbet-tamamlama-chat-completions)
- [Özel Başlıklar (Custom Headers)](#özel-başlıklar)
- [Gömme (Embeddings)](#gömme-embeddings)
- [Görsel Üretimi (Image Generation)](#görsel-üretimi)
- [Ses ve Medya API'leri](#ses-ve-medya-apileri)
- [Modelleri Listeleme (List Models)](#modelleri-listeleme)
- [Uyumluluk Uç Noktaları](#uyumluluk-uç-noktaları)
- [Arama API'si (Search API)](#arama-apisi)
- [WebSocket Akışı](#websocket-akışı)
- [Anlamsal Önbellek (Semantic Cache)](#anlamsal-önbellek)
- [Pano ve Yönetim API'leri](#pano-ve-yönetim-apileri)
- [Kombo Yönetimi](#kombo-yönetimi)
- [Webhook'lar](#webhooklar)
- [Kayıtlı Anahtarlar (Otomatik Yönetim)](#kayıtlı-anahtarlar)
- [Ajanlar Protokolü (ACP)](#ajanlar-protokolü)
- [Yetenekler ve Bellek API'leri](#yetenekler-ve-bellek-apileri)
- [Kimlik Doğrulama](#kimlik-doğrulama)

---

## Sohbet Tamamlama (Chat Completions)

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Python'da bir fonksiyon yaz..."}
  ],
  "stream": true
}
```

### Özel Başlıklar

| Başlık                   | Yön   | Açıklama                                                                    |
| ------------------------ | ----- | --------------------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | İstek | Önbelleği atlamak için `true` ayarlayın                                     |
| `x-omniroute-no-memory`  | İstek | Bu istek için bellek ve yetenek enjeksiyonunu atlamak için `true` ayarlayın |
| `X-OmniRoute-Progress`   | İstek | İlerleme olayları için `true` ayarlayın                                     |
| `X-Session-Id`           | İstek | Harici oturum yakınlığı için yapışkan oturum anahtarı                       |
| `Idempotency-Key`        | İstek | Tekilleştirme anahtarı (5 saniyelik pencere)                                |
| `X-OmniRoute-Cache`      | Yanıt | `HIT` veya `MISS` (akışsız modda)                                           |
| `X-OmniRoute-Idempotent` | Yanıt | İstek tekilleştirilmişse `true`                                             |
| `X-OmniRoute-Version`    | Yanıt | OmniRoute derleme sürümü (her zaman bulunur)                                |
| `X-OmniRoute-Decision`   | Yanıt | Yönlendirme izi: `strategy=<ad>; provider=<alias>; latency_ms=<n>`          |

---

## Gömme (Embeddings)

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "text-embedding-3-small",
  "input": "Vektör haline getirilecek metin"
}
```

---

## Görsel Üretimi (Image Generation)

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "prompt": "Güneş batarken fütüristik bir şehir",
  "n": 1,
  "size": "1024x1024"
}
```

---

## Arama API'si (Search API)

```bash
POST /v1/search
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "query": "OmniRoute AI gateway nedir?",
  "provider": "perplexity"
}
```

---

## Uyumluluk Uç Noktaları

- **OpenAI Responses:** `POST /v1/responses`
- **Anthropic Messages:** `POST /v1/messages`
- **Gemini Native:** `POST /v1beta/models/{model}:generateContent`
- **Ollama Chat:** `POST /v1/api/chat`
- **Token Sayımı:** `POST /v1/messages/count_tokens`
