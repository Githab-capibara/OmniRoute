---
title: "Sürüm Kontrol Listesi (Release Checklist)"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Sürüm Kontrol Listesi (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/01-release-checklist.md) · 🇸🇦 [ar](../../../ar/docs/ops/01-release-checklist.md) · 🇦🇿 [az](../../../az/docs/ops/01-release-checklist.md) · 🇧🇬 [bg](../../../bg/docs/ops/01-release-checklist.md) · 🇧🇩 [bn](../../../bn/docs/ops/01-release-checklist.md) · 🇨🇿 [cs](../../../cs/docs/ops/01-release-checklist.md) · 🇩🇰 [da](../../../da/docs/ops/01-release-checklist.md) · 🇩🇪 [de](../../../de/docs/ops/01-release-checklist.md) · 🇬🇷 [el](../../../el/docs/ops/01-release-checklist.md) · 🇪🇸 [es](../../../es/docs/ops/01-release-checklist.md) · 🇪🇪 [et](../../../et/docs/ops/01-release-checklist.md) · 🇮🇷 [fa](../../../fa/docs/ops/01-release-checklist.md) · 🇫🇮 [fi](../../../fi/docs/ops/01-release-checklist.md) · 🇫🇷 [fr](../../../fr/docs/ops/01-release-checklist.md) · 🇮🇪 [ga](../../../ga/docs/ops/01-release-checklist.md) · 🇮🇳 [gu](../../../gu/docs/ops/01-release-checklist.md) · 🇮🇱 [he](../../../he/docs/ops/01-release-checklist.md) · 🇮🇳 [hi](../../../hi/docs/ops/01-release-checklist.md) · 🇭🇷 [hr](../../../hr/docs/ops/01-release-checklist.md) · 🇭🇺 [hu](../../../hu/docs/ops/01-release-checklist.md) · 🇮🇩 [id](../../../id/docs/ops/01-release-checklist.md) · 🇮🇹 [it](../../../it/docs/ops/01-release-checklist.md) · 🇯🇵 [ja](../../../ja/docs/ops/01-release-checklist.md) · 🇰🇷 [ko](../../../ko/docs/ops/01-release-checklist.md) · 🇱🇹 [lt](../../../lt/docs/ops/01-release-checklist.md) · 🇱🇻 [lv](../../../lv/docs/ops/01-release-checklist.md) · 🇮🇳 [mr](../../../mr/docs/ops/01-release-checklist.md) · 🇲🇾 [ms](../../../ms/docs/ops/01-release-checklist.md) · 🇲🇹 [mt](../../../mt/docs/ops/01-release-checklist.md) · 🇳🇱 [nl](../../../nl/docs/ops/01-release-checklist.md) · 🇳🇴 [no](../../../no/docs/ops/01-release-checklist.md) · 🇵🇭 [phi](../../../phi/docs/ops/01-release-checklist.md) · 🇵🇱 [pl](../../../pl/docs/ops/01-release-checklist.md) · 🇵🇹 [pt](../../../pt/docs/ops/01-release-checklist.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/01-release-checklist.md) · 🇷🇴 [ro](../../../ro/docs/ops/01-release-checklist.md) · 🇷🇺 [ru](../../../ru/docs/ops/01-release-checklist.md) · 🇸🇰 [sk](../../../sk/docs/ops/01-release-checklist.md) · 🇸🇮 [sl](../../../sl/docs/ops/01-release-checklist.md) · 🇷🇸 [sr](../../../sr/docs/ops/01-release-checklist.md) · 🇸🇪 [sv](../../../sv/docs/ops/01-release-checklist.md) · 🇰🇪 [sw](../../../sw/docs/ops/01-release-checklist.md) · 🇮🇳 [ta](../../../ta/docs/ops/01-release-checklist.md) · 🇮🇳 [te](../../../te/docs/ops/01-release-checklist.md) · 🇹🇭 [th](../../../th/docs/ops/01-release-checklist.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/01-release-checklist.md) · 🇵🇰 [ur](../../../ur/docs/ops/01-release-checklist.md) · 🇻🇳 [vi](../../../vi/docs/ops/01-release-checklist.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/01-release-checklist.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/01-release-checklist.md)

---

## Özet Akış

```bash
# 1. Sürümü artırın + CHANGELOG oluşturun
/version-bump-cc patch    # veya minor/major

# 2. Kalite kapısını yerel olarak çalıştırın
npm run check              # lint + testler
npm run test:coverage      # tam kapsam kapısı (60/60/60/60)

# 3. Derleme & Başlatma Testi
npm run build
npm run test:e2e           # isteğe bağlı ancak önerilir

# 4. Sürüm oluşturma
/generate-release-cc

# 5. Dağıtım
/deploy-vps-both-cc        # veya akamai-cc / local-cc

# 6. Sürüm kanıtlarını yakalama
/capture-release-evidences-cc
```

---

## Aşamalı Yayınlama (npm Staged Publishing)

npm-publish iş akışı doğrudan yayınlama yapmaz: paketlenmiş tarball'ı (`check:pack-boot`) başlatır ve ardından `npm stage publish` çalıştırır — tam baytlar kayıt defterine park edilir, **sahibi onaylayana kadar kurulamaz**. İnsan 2FA kapısı kanıttan SONRA gelir.

### Onay Akışı

1. `npm stage list omniroute` — aşama kimliğini (stage id) bulun.
2. Paketlenmiş baytları doğrulayın: `npm stage download <id>`, ardından geçici bir dizine kurun ve başlatın (`npm run check:pack-boot`).
3. `npm stage approve <id>` — 2FA istemi yayını tamamlar. `npm stage reject <id>` iptal eder.

---

## Acil Düzeltme Hızlı Şeridi (`hotfix` Etiketi)

`hotfix` etiketli bir PR, ağır CI matrisini (9 parçalı E2E, kapsam kontrolü) atlar ve hızlı, yüksek sinyalli kapıları korur: build, unit, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact` ve tarball boot-smoke (`check:pack-boot`). Hedef: ~33 dakika yerine ≤15 dakikada yeşil.
