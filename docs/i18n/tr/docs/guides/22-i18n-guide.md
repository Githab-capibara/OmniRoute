---
title: "i18n — Uluslararasılaşma Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# i18n — Uluslararasılaşma Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/22-i18n-guide.md) · 🇸🇦 [ar](../../../ar/docs/guides/22-i18n-guide.md) · 🇦🇿 [az](../../../az/docs/guides/22-i18n-guide.md) · 🇧🇬 [bg](../../../bg/docs/guides/22-i18n-guide.md) · 🇧🇩 [bn](../../../bn/docs/guides/22-i18n-guide.md) · 🇨🇿 [cs](../../../cs/docs/guides/22-i18n-guide.md) · 🇩🇰 [da](../../../da/docs/guides/22-i18n-guide.md) · 🇩🇪 [de](../../../de/docs/guides/22-i18n-guide.md) · 🇪🇸 [es](../../../es/docs/guides/22-i18n-guide.md) · 🇮🇷 [fa](../../../fa/docs/guides/22-i18n-guide.md) · 🇫🇮 [fi](../../../fi/docs/guides/22-i18n-guide.md) · 🇫🇷 [fr](../../../fr/docs/guides/22-i18n-guide.md) · 🇮🇳 [gu](../../../gu/docs/guides/22-i18n-guide.md) · 🇮🇱 [he](../../../he/docs/guides/22-i18n-guide.md) · 🇮🇳 [hi](../../../hi/docs/guides/22-i18n-guide.md) · 🇭🇺 [hu](../../../hu/docs/guides/22-i18n-guide.md) · 🇮🇩 [id](../../../id/docs/guides/22-i18n-guide.md) · 🇮🇹 [it](../../../it/docs/guides/22-i18n-guide.md) · 🇯🇵 [ja](../../../ja/docs/guides/22-i18n-guide.md) · 🇰🇷 [ko](../../../ko/docs/guides/22-i18n-guide.md) · 🇮🇳 [mr](../../../mr/docs/guides/22-i18n-guide.md) · 🇲🇾 [ms](../../../ms/docs/guides/22-i18n-guide.md) · 🇳🇱 [nl](../../../nl/docs/guides/22-i18n-guide.md) · 🇳🇴 [no](../../../no/docs/guides/22-i18n-guide.md) · 🇵🇭 [phi](../../../phi/docs/guides/22-i18n-guide.md) · 🇵🇱 [pl](../../../pl/docs/guides/22-i18n-guide.md) · 🇵🇹 [pt](../../../pt/docs/guides/22-i18n-guide.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/22-i18n-guide.md) · 🇷🇴 [ro](../../../ro/docs/guides/22-i18n-guide.md) · 🇷🇺 [ru](../../../ru/docs/guides/22-i18n-guide.md) · 🇸🇰 [sk](../../../sk/docs/guides/22-i18n-guide.md) · 🇸🇪 [sv](../../../sv/docs/guides/22-i18n-guide.md) · 🇰🇪 [sw](../../../sw/docs/guides/22-i18n-guide.md) · 🇮🇳 [ta](../../../ta/docs/guides/22-i18n-guide.md) · 🇮🇳 [te](../../../te/docs/guides/22-i18n-guide.md) · 🇹🇭 [th](../../../th/docs/guides/22-i18n-guide.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/22-i18n-guide.md) · 🇵🇰 [ur](../../../ur/docs/guides/22-i18n-guide.md) · 🇻🇳 [vi](../../../vi/docs/guides/22-i18n-guide.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/22-i18n-guide.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/22-i18n-guide.md)

---

OmniRoute, eksiksiz pano kullanıcı arayüzü çevirisi, çevrilmiş dokümantasyon ve Arapça/İbranice için RTL desteği ile **43 dili** destekler.

## Çeviri İşlem Hattı (v3.8.0 Önerilen)

OmniRoute, belgeler için OpenAI uyumlu bir LLM uç noktası tarafından desteklenen karma (hash) tabanlı artımlı bir çevirmen kullanır:

```bash
# Çevirileri çalıştır (artımlı — yalnızca değişen kaynaklara dokunur)
npm run i18n:run

# Tek bir yerel ayarla sınırla
npm run i18n:run -- --locale=tr

# Belirli dosyaları çevir (virgülle ayrılmış, depoya göreli yollar)
npm run i18n:run -- --files=CLAUDE.md,docs/architecture/01-system-overview.md

# Önizleme (API çağrısı veya yazma yapmaz)
npm run i18n:run:dry

# CI kalite kapısı — çeviri sapması varsa sıfır olmayan kodla çıkar
npm run i18n:check
```

**Doğruluk Kaynağı:** `config/i18n.json` tüm yerel ayarları (UI + belgeler), RTL kümesini ve `docsExcluded` kodlarını listeler. `src/i18n/config.ts` içindeki çalışma zamanı yapılandırması bu JSON üzerinde ince bir bağdaştırıcıdır.

---

## Hızlı Başvuru

| Görev                       | Komut                                                      |
| --------------------------- | ---------------------------------------------------------- |
| Belgeleri Çevirme (LLM)     | `npm run i18n:run` (tercih edilen — artımlı, hash tabanlı) |
| UI Dizelerini Çevirme       | `node scripts/i18n/generate-multilang.mjs messages`        |
| Çeviri Sapmasını Kontrol Et | `npm run i18n:check`                                       |
| Bir Dili Doğrulama          | `python3 scripts/i18n/validate_translation.py quick -l tr` |
| Kod Anahtarlarını Kontrol   | `python3 scripts/i18n/check_translations.py`               |
| Kalite Raporu Üretme        | `node scripts/i18n/generate-qa-checklist.mjs`              |
| Görsel Kalite (Playwright)  | `node scripts/i18n/run-visual-qa.mjs`                      |

---

## Mimari

- **UI Dizeleri**: `src/i18n/messages/en.json` (İngilizce kaynak, ~2800 anahtar)
- **Yerel Ayar Dosyaları**: `src/i18n/messages/{locale}.json` (42 çeviri)
- **Framework**: Çerez tabanlı yerel ayar çözümlemesi ile `next-intl`
- **Yapılandırma**: `src/i18n/config.ts` — tüm 42 yerel ayarı, dil adlarını ve bayrakları tanımlar

### Çalışma Zamanı Akışı

1. Kullanıcı dili seçer → `NEXT_LOCALE` çerezi ayarlanır
2. `src/i18n/request.ts` yerel ayarı çözer: çerez → `Accept-Language` başlığı → geri dönüş `en`
3. Dinamik içe aktarma `messages/{locale}.json` dosyasını yükler
4. Bileşenler `useTranslations("namespace")` ve `t("key")` kullanır
