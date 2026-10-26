---
title: "OmniRoute Kod Tabanı Dokümantasyonu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute Kod Tabanı Dokümantasyonu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/10-codebase-documentation.md) · 🇸🇦 [ar](../../../ar/docs/architecture/10-codebase-documentation.md) · 🇦🇿 [az](../../../az/docs/architecture/10-codebase-documentation.md) · 🇧🇬 [bg](../../../bg/docs/architecture/10-codebase-documentation.md) · 🇧🇩 [bn](../../../bn/docs/architecture/10-codebase-documentation.md) · 🇨🇿 [cs](../../../cs/docs/architecture/10-codebase-documentation.md) · 🇩🇰 [da](../../../da/docs/architecture/10-codebase-documentation.md) · 🇩🇪 [de](../../../de/docs/architecture/10-codebase-documentation.md) · 🇬🇷 [el](../../../el/docs/architecture/10-codebase-documentation.md) · 🇪🇸 [es](../../../es/docs/architecture/10-codebase-documentation.md) · 🇪🇪 [et](../../../et/docs/architecture/10-codebase-documentation.md) · 🇮🇷 [fa](../../../fa/docs/architecture/10-codebase-documentation.md) · 🇫🇮 [fi](../../../fi/docs/architecture/10-codebase-documentation.md) · 🇫🇷 [fr](../../../fr/docs/architecture/10-codebase-documentation.md) · 🇮🇪 [ga](../../../ga/docs/architecture/10-codebase-documentation.md) · 🇮🇳 [gu](../../../gu/docs/architecture/10-codebase-documentation.md) · 🇮🇱 [he](../../../he/docs/architecture/10-codebase-documentation.md) · 🇮🇳 [hi](../../../hi/docs/architecture/10-codebase-documentation.md) · 🇭🇷 [hr](../../../hr/docs/architecture/10-codebase-documentation.md) · 🇭🇺 [hu](../../../hu/docs/architecture/10-codebase-documentation.md) · 🇮🇩 [id](../../../id/docs/architecture/10-codebase-documentation.md) · 🇮🇹 [it](../../../it/docs/architecture/10-codebase-documentation.md) · 🇯🇵 [ja](../../../ja/docs/architecture/10-codebase-documentation.md) · 🇰🇷 [ko](../../../ko/docs/architecture/10-codebase-documentation.md) · 🇱🇹 [lt](../../../lt/docs/architecture/10-codebase-documentation.md) · 🇱🇻 [lv](../../../lv/docs/architecture/10-codebase-documentation.md) · 🇮🇳 [mr](../../../mr/docs/architecture/10-codebase-documentation.md) · 🇲🇾 [ms](../../../ms/docs/architecture/10-codebase-documentation.md) · 🇲🇹 [mt](../../../mt/docs/architecture/10-codebase-documentation.md) · 🇳🇱 [nl](../../../nl/docs/architecture/10-codebase-documentation.md) · 🇳🇴 [no](../../../no/docs/architecture/10-codebase-documentation.md) · 🇵🇭 [phi](../../../phi/docs/architecture/10-codebase-documentation.md) · 🇵🇱 [pl](../../../pl/docs/architecture/10-codebase-documentation.md) · 🇵🇹 [pt](../../../pt/docs/architecture/10-codebase-documentation.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/10-codebase-documentation.md) · 🇷🇴 [ro](../../../ro/docs/architecture/10-codebase-documentation.md) · 🇷🇺 [ru](../../../ru/docs/architecture/10-codebase-documentation.md) · 🇸🇰 [sk](../../../sk/docs/architecture/10-codebase-documentation.md) · 🇸🇮 [sl](../../../sl/docs/architecture/10-codebase-documentation.md) · 🇷🇸 [sr](../../../sr/docs/architecture/10-codebase-documentation.md) · 🇸🇪 [sv](../../../sv/docs/architecture/10-codebase-documentation.md) · 🇰🇪 [sw](../../../sw/docs/architecture/10-codebase-documentation.md) · 🇮🇳 [ta](../../../ta/docs/architecture/10-codebase-documentation.md) · 🇮🇳 [te](../../../te/docs/architecture/10-codebase-documentation.md) · 🇹🇭 [th](../../../th/docs/architecture/10-codebase-documentation.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/10-codebase-documentation.md) · 🇵🇰 [ur](../../../ur/docs/architecture/10-codebase-documentation.md) · 🇻🇳 [vi](../../../vi/docs/architecture/10-codebase-documentation.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/10-codebase-documentation.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/10-codebase-documentation.md)

---

> **Hedef Kitle:** OmniRoute'a katkıda bulunan veya üzerine entegrasyonlar oluşturan mühendisler.
>
> Yüksek düzey mimari diyagramları ve her alt sistemin gerekçeleri için [01-system-overview.md](docs/architecture/01-system-overview.md) dosyasını okuyun.

Bu belge, yeni bir mühendisin proje ağacında gezinebilmesi, çalışma zamanı katmanlarını anlaması ve yeni modüller icat etmeden nereye kod ekleyeceğini bilmesi için **bugün depoda neyin var olduğunu** açıklar.

---

## 1. Teknoloji Yığını

| Alan           | Tercih                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| Web framework  | **Next.js 16** (App Router, standalone çıktı, global middleware yok)                                              |
| Dil            | **TypeScript 6.0+** — hedef `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`              |
| Çalışma Zamanı | **Node.js** `>=22.22.2 <23` veya `>=24.0.0 <27`                                                                   |
| Veritabanı     | `better-sqlite3` ile **SQLite** (singleton, WAL günlük kaydı)                                                     |
| Masaüstü       | **Electron 41** + `electron-builder` (`electron/` altında ayrı çalışma alanı)                                     |
| Testler        | **Node yerel test çalıştırıcısı** (unit/integration), **Vitest** (MCP, autoCombo, önbellek), **Playwright** (E2E) |
| Derleme        | `scripts/build/build-next-isolated.mjs` üzerinden Next.js standalone                                              |
| Lint/Format    | ESLint flat config + Prettier (`lint-staged` ile Husky pre-commit)                                                |
| Modül Sistemi  | Her yerde ESM (`"type": "module"`)                                                                                |
| Çalışma Alanı  | npm workspace — `open-sse` alt çalışma alanıdır                                                                   |

Yol Takma Adları (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Varsayılan HTTP portu: **`20128`** (API ve pano aynı süreci paylaşır). Veri dizini `DATA_DIR` ortam değişkenidir (varsayılan: `~/.omniroute/`).

---

## 2. Depo Düzeni

```
OmniRoute/
├── src/                  Next.js uygulaması (App Router, kütüphaneler, alan katmanı, sunucu, paylaşılanlar)
├── open-sse/             Akış motoru çalışma alanı (@omniroute/open-sse)
├── electron/             Masaüstü uygulaması (Electron 41 main + preload)
├── bin/                  CLI giriş noktaları (omniroute, reset-password)
├── tests/                Birim, entegrasyon, e2e, protokol, çevirmen, güvenlik testleri
├── scripts/              Derleme, senkronizasyon, kontrol, migrasyon ve çalışma zamanı yardımcı betikleri
├── docs/                 Genel dokümantasyon
├── public/               Statik varlıklar, PWA manifesti, servis çalışanı
├── config/               Çalışma zamanı yapılandırma örnekleri
├── CLAUDE.md             Claude Code için kurallar
├── AGENTS.md             Yapay zeka ajanları için derin mimari referansı
├── package.json          Çalışma alanı kökü
└── tsconfig.json         Yol takma adları ve derleyici seçenekleri
```

---

## 3. `src/` — Next.js Uygulaması

```
src/
├── app/                  App Router sayfaları + API rotaları
├── lib/                  Çekirdek kütüphaneler (DB, kimlik doğrulama, OAuth, yetenekler, bellek vb.)
├── domain/               Saf alan katmanı (politika, geri dönüş, maliyet, kilitleme vb.)
├── server/               Yalnızca sunucu tarafı modüller (authz, cors, auth)
├── shared/               Tipler, sabitler, doğrulama, sözleşmeler, yardımcılar
├── mitm/                 CLI entegrasyonu için Man-in-the-middle proxy yardımcıları
├── models/               Yerel model meta verileri / takma adlar
├── sse/                  src/ altında yaşayan SSE işleyicileri
├── store/                İstemci tarafı Zustand durum depoları
├── middleware/           Rota düzeyinde ara yazılım yardımcıları (Next.js global middleware DEĞİL)
└── types/                TypeScript tip tanımları
```

---

## 4. `open-sse/` — Akış ve Yürütücü Motoru

```
open-sse/
├── executors/            Sağlayıcıya özel istek yürütücüleri (101 modül)
├── handlers/             API türü başına istek işleyicileri (chat, responses, embeddings, images vb.)
├── mcp-server/           110 araç ve 33 kapsam içeren yerleşik MCP sunucusu
├── services/             Yönlendirme, hız sınırlamaları, auto-combo, oturum yönetimi vb.
├── translator/           OpenAI ↔ Claude ↔ Gemini ↔ Ollama ↔ DeepSeek format çevirmenleri
├── transformer/          OpenAI Responses API dönüştürücüsü
└── utils/                Akış, TLS, proxy, günlük kaydı yardımcıları
```

---

## 5. `tests/` — Test Paketleri

- `tests/unit/`: Node.js yerleşik test çalıştırıcısı ile 2.700'den fazla test dosyası
- `tests/integration/`: Modüller arası entegrasyon testleri
- `tests/e2e/`: Playwright uçtan uca tarayıcı testleri
- `tests/security/`: İstem enjeksiyonu, PII, yetkilendirme güvenlik testleri
- `tests/translator/`: Format çevirmen doğruluk testleri
