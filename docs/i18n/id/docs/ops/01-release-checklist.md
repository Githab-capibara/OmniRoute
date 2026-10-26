# Daftar Periksa Rilis (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/01-release-checklist.md) · 🇸🇦 [ar](../../../ar/docs/ops/01-release-checklist.md) · 🇦🇿 [az](../../../az/docs/ops/01-release-checklist.md) · 🇧🇬 [bg](../../../bg/docs/ops/01-release-checklist.md) · 🇧🇩 [bn](../../../bn/docs/ops/01-release-checklist.md) · 🇨🇿 [cs](../../../cs/docs/ops/01-release-checklist.md) · 🇩🇰 [da](../../../da/docs/ops/01-release-checklist.md) · 🇩🇪 [de](../../../de/docs/ops/01-release-checklist.md) · 🇬🇷 [el](../../../el/docs/ops/01-release-checklist.md) · 🇪🇸 [es](../../../es/docs/ops/01-release-checklist.md) · 🇪🇪 [et](../../../et/docs/ops/01-release-checklist.md) · 🇮🇷 [fa](../../../fa/docs/ops/01-release-checklist.md) · 🇫🇮 [fi](../../../fi/docs/ops/01-release-checklist.md) · 🇫🇷 [fr](../../../fr/docs/ops/01-release-checklist.md) · 🇮🇪 [ga](../../../ga/docs/ops/01-release-checklist.md) · 🇮🇳 [gu](../../../gu/docs/ops/01-release-checklist.md) · 🇮🇱 [he](../../../he/docs/ops/01-release-checklist.md) · 🇮🇳 [hi](../../../hi/docs/ops/01-release-checklist.md) · 🇭🇷 [hr](../../../hr/docs/ops/01-release-checklist.md) · 🇭🇺 [hu](../../../hu/docs/ops/01-release-checklist.md) · 🇮🇹 [it](../../../it/docs/ops/01-release-checklist.md) · 🇯🇵 [ja](../../../ja/docs/ops/01-release-checklist.md) · 🇰🇷 [ko](../../../ko/docs/ops/01-release-checklist.md) · 🇱🇹 [lt](../../../lt/docs/ops/01-release-checklist.md) · 🇱🇻 [lv](../../../lv/docs/ops/01-release-checklist.md) · 🇮🇳 [mr](../../../mr/docs/ops/01-release-checklist.md) · 🇲🇾 [ms](../../../ms/docs/ops/01-release-checklist.md) · 🇲🇹 [mt](../../../mt/docs/ops/01-release-checklist.md) · 🇳🇱 [nl](../../../nl/docs/ops/01-release-checklist.md) · 🇳🇴 [no](../../../no/docs/ops/01-release-checklist.md) · 🇵🇭 [phi](../../../phi/docs/ops/01-release-checklist.md) · 🇵🇱 [pl](../../../pl/docs/ops/01-release-checklist.md) · 🇵🇹 [pt](../../../pt/docs/ops/01-release-checklist.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/01-release-checklist.md) · 🇷🇴 [ro](../../../ro/docs/ops/01-release-checklist.md) · 🇷🇺 [ru](../../../ru/docs/ops/01-release-checklist.md) · 🇸🇰 [sk](../../../sk/docs/ops/01-release-checklist.md) · 🇸🇮 [sl](../../../sl/docs/ops/01-release-checklist.md) · 🇷🇸 [sr](../../../sr/docs/ops/01-release-checklist.md) · 🇸🇪 [sv](../../../sv/docs/ops/01-release-checklist.md) · 🇰🇪 [sw](../../../sw/docs/ops/01-release-checklist.md) · 🇮🇳 [ta](../../../ta/docs/ops/01-release-checklist.md) · 🇮🇳 [te](../../../te/docs/ops/01-release-checklist.md) · 🇹🇭 [th](../../../th/docs/ops/01-release-checklist.md) · 🇹🇷 [tr](../../../tr/docs/ops/01-release-checklist.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/01-release-checklist.md) · 🇵🇰 [ur](../../../ur/docs/ops/01-release-checklist.md) · 🇻🇳 [vi](../../../vi/docs/ops/01-release-checklist.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/01-release-checklist.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/01-release-checklist.md)

---

Gunakan daftar periksa ini sebelum memberi tag atau menerbitkan rilis OmniRoute baru.

## Versi dan Changelog

1. Naikkan versi `package.json` (`x.y.z`) di cabang rilis.
2. Pindahkan catatan rilis dari `## [Unreleased]` di `CHANGELOG.md` ke bagian bertanggal:
   - `## [x.y.z] — YYYY-MM-DD`
3. Pertahankan `## [Unreleased]` sebagai bagian changelog pertama untuk pekerjaan mendatang.
4. Pastikan bagian semver terbaru di `CHANGELOG.md` sama dengan versi `package.json`.

## Dokumentasi API

1. Perbarui `docs/reference/openapi.yaml`:
   - `info.version` harus sama dengan versi `package.json`.
2. Validasi contoh endpoint jika kontrak API berubah.

## Dokumentasi Runtime

1. Tinjau `docs/architecture/01-system-overview.md` untuk penyimpangan storage/runtime.
2. Tinjau `docs/guides/23-troubleshooting.md` untuk penyimpangan variabel env dan operasional.
3. Verifikasi bahwa versi Node.js rilis/runtime masih memenuhi batas aman yang didukung:
   - `>=20.20.2 <21` atau `>=22.22.2 <23`
   - `npm run check:node-runtime`
4. Validasi artefak penerbitan npm setelah membangun paket standalone:
   - `npm run build:cli`
   - `npm run check:pack-artifact`
   - konfirmasi tidak ada `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, atau residu lokal lainnya
5. Perbarui dokumentasi terlokalisasi jika dokumentasi sumber berubah secara signifikan.

## Pemeriksaan Otomatis

Jalankan penjaga sinkronisasi secara lokal sebelum membuka PR:

```bash
npm run check:docs-sync
```

CI juga menjalankan pemeriksaan ini di `.github/workflows/ci.yml` (pekerjaan lint).
