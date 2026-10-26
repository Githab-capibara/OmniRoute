---
title: "Kullanıcı Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Kullanıcı Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/01-user-guide.md) · 🇸🇦 [ar](../../../ar/docs/guides/01-user-guide.md) · 🇦🇿 [az](../../../az/docs/guides/01-user-guide.md) · 🇧🇬 [bg](../../../bg/docs/guides/01-user-guide.md) · 🇧🇩 [bn](../../../bn/docs/guides/01-user-guide.md) · 🇨🇿 [cs](../../../cs/docs/guides/01-user-guide.md) · 🇩🇰 [da](../../../da/docs/guides/01-user-guide.md) · 🇩🇪 [de](../../../de/docs/guides/01-user-guide.md) · 🇬🇷 [el](../../../el/docs/guides/01-user-guide.md) · 🇪🇸 [es](../../../es/docs/guides/01-user-guide.md) · 🇪🇪 [et](../../../et/docs/guides/01-user-guide.md) · 🇮🇷 [fa](../../../fa/docs/guides/01-user-guide.md) · 🇫🇮 [fi](../../../fi/docs/guides/01-user-guide.md) · 🇫🇷 [fr](../../../fr/docs/guides/01-user-guide.md) · 🇮🇪 [ga](../../../ga/docs/guides/01-user-guide.md) · 🇮🇳 [gu](../../../gu/docs/guides/01-user-guide.md) · 🇮🇱 [he](../../../he/docs/guides/01-user-guide.md) · 🇮🇳 [hi](../../../hi/docs/guides/01-user-guide.md) · 🇭🇷 [hr](../../../hr/docs/guides/01-user-guide.md) · 🇭🇺 [hu](../../../hu/docs/guides/01-user-guide.md) · 🇮🇩 [id](../../../id/docs/guides/01-user-guide.md) · 🇮🇹 [it](../../../it/docs/guides/01-user-guide.md) · 🇯🇵 [ja](../../../ja/docs/guides/01-user-guide.md) · 🇰🇷 [ko](../../../ko/docs/guides/01-user-guide.md) · 🇱🇹 [lt](../../../lt/docs/guides/01-user-guide.md) · 🇱🇻 [lv](../../../lv/docs/guides/01-user-guide.md) · 🇮🇳 [mr](../../../mr/docs/guides/01-user-guide.md) · 🇲🇾 [ms](../../../ms/docs/guides/01-user-guide.md) · 🇲🇹 [mt](../../../mt/docs/guides/01-user-guide.md) · 🇳🇱 [nl](../../../nl/docs/guides/01-user-guide.md) · 🇳🇴 [no](../../../no/docs/guides/01-user-guide.md) · 🇵🇭 [phi](../../../phi/docs/guides/01-user-guide.md) · 🇵🇱 [pl](../../../pl/docs/guides/01-user-guide.md) · 🇵🇹 [pt](../../../pt/docs/guides/01-user-guide.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/01-user-guide.md) · 🇷🇴 [ro](../../../ro/docs/guides/01-user-guide.md) · 🇷🇺 [ru](../../../ru/docs/guides/01-user-guide.md) · 🇸🇰 [sk](../../../sk/docs/guides/01-user-guide.md) · 🇸🇮 [sl](../../../sl/docs/guides/01-user-guide.md) · 🇷🇸 [sr](../../../sr/docs/guides/01-user-guide.md) · 🇸🇪 [sv](../../../sv/docs/guides/01-user-guide.md) · 🇰🇪 [sw](../../../sw/docs/guides/01-user-guide.md) · 🇮🇳 [ta](../../../ta/docs/guides/01-user-guide.md) · 🇮🇳 [te](../../../te/docs/guides/01-user-guide.md) · 🇹🇭 [th](../../../th/docs/guides/01-user-guide.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/01-user-guide.md) · 🇵🇰 [ur](../../../ur/docs/guides/01-user-guide.md) · 🇻🇳 [vi](../../../vi/docs/guides/01-user-guide.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/01-user-guide.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/01-user-guide.md)

---

Sağlayıcıları yapılandırma, kombolar oluşturma, CLI araçlarını entegre etme ve OmniRoute'u dağıtma konusunda eksiksiz kılavuz.

---

## İçindekiler

- [Bir Bakışta Fiyatlandırma](#-bir-bakışta-fiyatlandırma)
- [Kullanım Senaryoları](#-kullanım-senaryoları)
- [Sağlayıcı Kurulumu](#-sağlayıcı-kurulumu)
- [CLI Entegrasyonu](#-cli-entegrasyonu)
- [Dağıtım](#-dağıtım)
- [Kullanılabilir Modeller](#-kullanılabilir-modeller)
- [Gelişmiş Özellikler](#-gelişmiş-özellikler)
- [Otomatik Yönlendirme (Sıfır Yapılandırma)](#-otomatik-yönlendirme-sıfır-yapılandırma)
- [MCP ve A2A Entegrasyonu](#-mcp-ve-a2a-entegrasyonu)
- [Yetenekler Sistemi](#-yetenekler-sistemi)
- [Bellek Sistemi](#-bellek-sistemi)
- [Webhook'lar](#-webhooklar)
- [Bulut Ajanları](#-bulut-ajanları)
- [Programatik Yönetim](#-programatik-yönetim)
- [Dahili CLI](#-dahili-cli)
- [Masaüstü Uygulaması (Electron)](#-masaüstü-uygulaması-electron)

---

## 💰 Bir Bakışta Fiyatlandırma

| Katman              | Sağlayıcı         | Maliyet     | Kota Sıfırlanma  | En Uygun Kullanım     |
| ------------------- | ----------------- | ----------- | ---------------- | --------------------- |
| **💳 ABONELİK**     | Claude Code (Pro) | $20/ay      | 5s + haftalık    | Mevcut aboneler       |
|                     | Codex (Plus/Pro)  | $20-200/ay  | 5s + haftalık    | OpenAI kullanıcıları  |
|                     | GitHub Copilot    | $10-19/ay   | Aylık            | GitHub kullanıcıları  |
| **🔑 API ANAHTARI** | DeepSeek          | Kullandıkça | Yok              | Ucuz akıl yürütme     |
|                     | Groq              | Kullandıkça | Yok              | Ultra hızlı çıkarım   |
|                     | xAI (Grok)        | Kullandıkça | Yok              | Grok 4 akıl yürütme   |
|                     | Mistral           | Kullandıkça | Yok              | AB barındırmalı       |
|                     | Perplexity        | Kullandıkça | Yok              | Arama destekli        |
|                     | Together AI       | Kullandıkça | Yok              | Açık kaynak modeller  |
|                     | Fireworks AI      | Kullandıkça | Yok              | Hızlı FLUX görseller  |
|                     | Cerebras          | Kullandıkça | Yok              | Donanım hızlandırma   |
|                     | Cohere            | Kullandıkça | Yok              | Command R+ RAG        |
|                     | NVIDIA NIM        | Kullandıkça | Yok              | Kurumsal modeller     |
| **💰 UCUZ**         | GLM-4.7           | $0.6/1M     | Günlük 10:00     | Bütçe dostu yedek     |
|                     | MiniMax M2.1      | $0.2/1M     | 5 saatlik döngü  | En ucuz seçenek       |
|                     | Kimi K2           | $9/ay sabit | 10M token/ay     | Öngörülebilir maliyet |
| **🆓 ÜCRETSİZ**     | Qoder             | $0          | Sağlayıcı limiti | Katalogdan kontrol    |
|                     | Kiro              | $0          | ~50 kredi/ay     | Claude ücretsiz       |

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: "Claude Pro aboneliğim var"

**Sorun:** Kota kullanılmadan kalıyor veya yoğun kodlamada hız sınırına takılıyor.

```
Kombo: "maximize-claude"
  1. cc/claude-opus-4-7        (önce aboneliği sonuna kadar kullan)
  2. glm/glm-4.7               (kota bitince ucuz yedek)
  3. if/qwen3.8-max-preview    (ücretsiz acil durum geri dönüşü)

Aylık maliyet: $20 (abonelik) + ~$5 (yedek) = $25 toplam
```

### Senaryo 2: "Sıfır maliyet istiyorum"

**Sorun:** Abonelik bütçesi yok, güvenilir AI kodlama gerekiyor.

```
Kombo: "zero-cost"
  1. if/kimi-k2.7-code          (ücretsiz erişim; hız sınırları geçerli olabilir)
  2. kr/qwen3-coder-next        (Kiro ücretsiz geri dönüş)

Aylık maliyet: $0
```

### Senaryo 3: "7/24 kesintisiz kodlamaya ihtiyacım var"

**Sorun:** Teslim tarihleri yakın, kesinti kabul edilemez.

```
Kombo: "always-on"
  1. cc/claude-opus-4-7        (en yüksek kalite)
  2. cx/gpt-5.5                (ikinci abonelik)
  3. glm/glm-4.7               (ucuz, günlük sıfırlanan)
  4. if/deepseek-v3.2          (ücretsiz son çare)
```

---

## 🚀 Sağlayıcı Kurulumu

1. **OAuth Sağlayıcıları:** Panoda **Providers > Connect** seçeneğine tıklayın. Tarayıcıda oturum açın, yetki verin. Belirteçler yerel olarak şifrelenir ve arka planda otomatik yenilenir.
2. **API Anahtarı Sağlayıcıları:** API anahtarınızı girin ve kaydedin.
3. **Ücretsiz Sağlayıcılar:** Tek tıkla etkinleştirin.

---

## 💻 CLI Entegrasyonu

OmniRoute, standart OpenAI uyumlu uç nokta sunduğundan tüm geliştirici araçlarıyla uyumludur:

- **Claude Code:** `CLAUDE_BASE_URL="http://localhost:20128/v1"`
- **OpenAI Codex:** `OPENAI_BASE_URL="http://localhost:20128/v1"`
- **Cursor IDE:** `Override OpenAI Base URL: http://localhost:20128/v1`
- **Cline / Roo Code / Continue:** OpenAI uyumlu sağlayıcı olarak `http://localhost:20128/v1` tanımlayın.
