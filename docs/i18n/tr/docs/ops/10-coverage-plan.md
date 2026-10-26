---
title: "Test Kapsam Planı"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Test Kapsam Planı (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/10-coverage-plan.md) · 🇸🇦 [ar](../../../ar/docs/ops/10-coverage-plan.md) · 🇦🇿 [az](../../../az/docs/ops/10-coverage-plan.md) · 🇧🇬 [bg](../../../bg/docs/ops/10-coverage-plan.md) · 🇧🇩 [bn](../../../bn/docs/ops/10-coverage-plan.md) · 🇨🇿 [cs](../../../cs/docs/ops/10-coverage-plan.md) · 🇩🇰 [da](../../../da/docs/ops/10-coverage-plan.md) · 🇩🇪 [de](../../../de/docs/ops/10-coverage-plan.md) · 🇬🇷 [el](../../../el/docs/ops/10-coverage-plan.md) · 🇪🇸 [es](../../../es/docs/ops/10-coverage-plan.md) · 🇪🇪 [et](../../../et/docs/ops/10-coverage-plan.md) · 🇮🇷 [fa](../../../fa/docs/ops/10-coverage-plan.md) · 🇫🇮 [fi](../../../fi/docs/ops/10-coverage-plan.md) · 🇫🇷 [fr](../../../fr/docs/ops/10-coverage-plan.md) · 🇮🇪 [ga](../../../ga/docs/ops/10-coverage-plan.md) · 🇮🇳 [gu](../../../gu/docs/ops/10-coverage-plan.md) · 🇮🇱 [he](../../../he/docs/ops/10-coverage-plan.md) · 🇮🇳 [hi](../../../hi/docs/ops/10-coverage-plan.md) · 🇭🇷 [hr](../../../hr/docs/ops/10-coverage-plan.md) · 🇭🇺 [hu](../../../hu/docs/ops/10-coverage-plan.md) · 🇮🇩 [id](../../../id/docs/ops/10-coverage-plan.md) · 🇮🇹 [it](../../../it/docs/ops/10-coverage-plan.md) · 🇯🇵 [ja](../../../ja/docs/ops/10-coverage-plan.md) · 🇰🇷 [ko](../../../ko/docs/ops/10-coverage-plan.md) · 🇱🇹 [lt](../../../lt/docs/ops/10-coverage-plan.md) · 🇱🇻 [lv](../../../lv/docs/ops/10-coverage-plan.md) · 🇮🇳 [mr](../../../mr/docs/ops/10-coverage-plan.md) · 🇲🇾 [ms](../../../ms/docs/ops/10-coverage-plan.md) · 🇲🇹 [mt](../../../mt/docs/ops/10-coverage-plan.md) · 🇳🇱 [nl](../../../nl/docs/ops/10-coverage-plan.md) · 🇳🇴 [no](../../../no/docs/ops/10-coverage-plan.md) · 🇵🇭 [phi](../../../phi/docs/ops/10-coverage-plan.md) · 🇵🇱 [pl](../../../pl/docs/ops/10-coverage-plan.md) · 🇵🇹 [pt](../../../pt/docs/ops/10-coverage-plan.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/10-coverage-plan.md) · 🇷🇴 [ro](../../../ro/docs/ops/10-coverage-plan.md) · 🇷🇺 [ru](../../../ru/docs/ops/10-coverage-plan.md) · 🇸🇰 [sk](../../../sk/docs/ops/10-coverage-plan.md) · 🇸🇮 [sl](../../../sl/docs/ops/10-coverage-plan.md) · 🇷🇸 [sr](../../../sr/docs/ops/10-coverage-plan.md) · 🇸🇪 [sv](../../../sv/docs/ops/10-coverage-plan.md) · 🇰🇪 [sw](../../../sw/docs/ops/10-coverage-plan.md) · 🇮🇳 [ta](../../../ta/docs/ops/10-coverage-plan.md) · 🇮🇳 [te](../../../te/docs/ops/10-coverage-plan.md) · 🇹🇭 [th](../../../th/docs/ops/10-coverage-plan.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/10-coverage-plan.md) · 🇵🇰 [ur](../../../ur/docs/ops/10-coverage-plan.md) · 🇻🇳 [vi](../../../vi/docs/ops/10-coverage-plan.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/10-coverage-plan.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/10-coverage-plan.md)

---

## Taban Çizgisi

| Metrik               | Kapsam                                               | İfadeler / Satırlar | Dallar | Fonksiyonlar | Notlar                                             |
| -------------------- | ---------------------------------------------------- | ------------------: | -----: | -----------: | -------------------------------------------------- |
| Önerilen taban çizgi | Yalnızca kaynak kod, testler hariç, `open-sse` dahil |              82.58% | 75.22% |       84.23% | İyileştirilecek proje genelindeki taban çizgisidir |

## Kurallar

- Kapsam hedefleri `tests/**` için değil, kaynak dosyalar için geçerlidir.
- `open-sse/**` ürünün bir parçasıdır ve kapsamda kalmalıdır.
- Yeni kod, dokunulan alanlardaki kapsamı düşürmemelidir.
- Uygulama ayrıntıları yerine davranış ve dal sonuçlarını test etmeyi tercih edin.
- `src/lib/db/**` için geniş mock'lar yerine geçici SQLite veritabanlarını ve küçük fikstürleri tercih edin.

## Aşamalar

| Aşama   |                Hedef | Odak Alanı                                     | Durum         |
| ------- | -------------------: | ---------------------------------------------- | ------------- |
| Aşama 1 | %60 ifadeler / satır | Hızlı kazanımlar ve düşük riskli yardımcılar   | ✅ Tamamlandı |
| Aşama 2 | %65 ifadeler / satır | Veritabanı ve rota temelleri                   | ✅ Tamamlandı |
| Aşama 3 | %70 ifadeler / satır | Sağlayıcı doğrulaması ve kullanım analitiği    | ✅ Tamamlandı |
| Aşama 4 | %75 ifadeler / satır | `open-sse` çevirmenleri ve yardımcıları        | ✅ Tamamlandı |
| Aşama 5 | %80 ifadeler / satır | `open-sse` işleyicileri ve yürütücü dalları    | ✅ Tamamlandı |
| Aşama 6 | %85 ifadeler / satır | Uç durumlar, dal borcu, regresyon paketleri    | Devam ediyor  |
| Aşama 7 | %90 ifadeler / satır | Son tarama, boşluk kapatma, sıkı kalite kapısı | Bekliyor      |
