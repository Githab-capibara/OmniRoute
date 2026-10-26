---
title: "CLI Araçları — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# CLI Araçları — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/02-cli-tools.md) · 🇸🇦 [ar](../../../ar/docs/reference/02-cli-tools.md) · 🇦🇿 [az](../../../az/docs/reference/02-cli-tools.md) · 🇧🇬 [bg](../../../bg/docs/reference/02-cli-tools.md) · 🇧🇩 [bn](../../../bn/docs/reference/02-cli-tools.md) · 🇨🇿 [cs](../../../cs/docs/reference/02-cli-tools.md) · 🇩🇰 [da](../../../da/docs/reference/02-cli-tools.md) · 🇩🇪 [de](../../../de/docs/reference/02-cli-tools.md) · 🇬🇷 [el](../../../el/docs/reference/02-cli-tools.md) · 🇪🇸 [es](../../../es/docs/reference/02-cli-tools.md) · 🇪🇪 [et](../../../et/docs/reference/02-cli-tools.md) · 🇮🇷 [fa](../../../fa/docs/reference/02-cli-tools.md) · 🇫🇮 [fi](../../../fi/docs/reference/02-cli-tools.md) · 🇫🇷 [fr](../../../fr/docs/reference/02-cli-tools.md) · 🇮🇪 [ga](../../../ga/docs/reference/02-cli-tools.md) · 🇮🇳 [gu](../../../gu/docs/reference/02-cli-tools.md) · 🇮🇱 [he](../../../he/docs/reference/02-cli-tools.md) · 🇮🇳 [hi](../../../hi/docs/reference/02-cli-tools.md) · 🇭🇷 [hr](../../../hr/docs/reference/02-cli-tools.md) · 🇭🇺 [hu](../../../hu/docs/reference/02-cli-tools.md) · 🇮🇩 [id](../../../id/docs/reference/02-cli-tools.md) · 🇮🇹 [it](../../../it/docs/reference/02-cli-tools.md) · 🇯🇵 [ja](../../../ja/docs/reference/02-cli-tools.md) · 🇰🇷 [ko](../../../ko/docs/reference/02-cli-tools.md) · 🇱🇹 [lt](../../../lt/docs/reference/02-cli-tools.md) · 🇱🇻 [lv](../../../lv/docs/reference/02-cli-tools.md) · 🇮🇳 [mr](../../../mr/docs/reference/02-cli-tools.md) · 🇲🇾 [ms](../../../ms/docs/reference/02-cli-tools.md) · 🇲🇹 [mt](../../../mt/docs/reference/02-cli-tools.md) · 🇳🇱 [nl](../../../nl/docs/reference/02-cli-tools.md) · 🇳🇴 [no](../../../no/docs/reference/02-cli-tools.md) · 🇵🇭 [phi](../../../phi/docs/reference/02-cli-tools.md) · 🇵🇱 [pl](../../../pl/docs/reference/02-cli-tools.md) · 🇵🇹 [pt](../../../pt/docs/reference/02-cli-tools.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/02-cli-tools.md) · 🇷🇴 [ro](../../../ro/docs/reference/02-cli-tools.md) · 🇷🇺 [ru](../../../ru/docs/reference/02-cli-tools.md) · 🇸🇰 [sk](../../../sk/docs/reference/02-cli-tools.md) · 🇸🇮 [sl](../../../sl/docs/reference/02-cli-tools.md) · 🇷🇸 [sr](../../../sr/docs/reference/02-cli-tools.md) · 🇸🇪 [sv](../../../sv/docs/reference/02-cli-tools.md) · 🇰🇪 [sw](../../../sw/docs/reference/02-cli-tools.md) · 🇮🇳 [ta](../../../ta/docs/reference/02-cli-tools.md) · 🇮🇳 [te](../../../te/docs/reference/02-cli-tools.md) · 🇹🇭 [th](../../../th/docs/reference/02-cli-tools.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/02-cli-tools.md) · 🇵🇰 [ur](../../../ur/docs/reference/02-cli-tools.md) · 🇻🇳 [vi](../../../vi/docs/reference/02-cli-tools.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/02-cli-tools.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/02-cli-tools.md)

---

OmniRoute, üç özel pano sayfasına yayılmış üç CLI araçları kategorisiyle entegre olur:

| Sayfa            | Rota                    | Konsept                                                                               | Sayı       |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **CLI Code's**   | `/dashboard/cli-code`   | OmniRoute'a yönlendirdiğiniz kodlama araçları (İstemci → CLI → OmniRoute → Sağlayıcı) | 26         |
| **CLI Ajanları** | `/dashboard/cli-agents` | OmniRoute'a yönlendirdiğiniz özerk ajanlar (aynı akış, daha geniş kapsam)             | 8          |
| **ACP Ajanları** | `/dashboard/acp-agents` | OmniRoute'un stdio/ACP ile başlattığı CLI'lar (ters başlatma akışı)                   | bkz. kayıt |

---

## Nasıl Çalışır?

```
CLI Araçları (Tüketim Akışı):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes / Goose / ...
           │
           ▼  (hepsi OmniRoute'a yönlendirilir)
    http://SUNUCUNUZ:20128/v1
           │
           ▼  (OmniRoute doğru sağlayıcıya yönlendirir)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Avantajlar:**

- Tüm araçları yönetmek için tek bir API anahtarı
- Panoda tüm CLI'lar genelinde maliyet takibi
- Her aracı yeniden yapılandırmadan anında model değiştirme
- Yerel ortamda ve uzak sunucularda (VPS, Docker, Cloudflare Tunnel) sorunsuz çalışma

---

## `setup-*` ile Otomatik Yapılandırma

Her aracın yapılandırmasını elle yazmanıza gerek yoktur:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```
