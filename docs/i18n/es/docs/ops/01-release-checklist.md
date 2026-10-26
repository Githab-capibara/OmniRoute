# Release Checklist (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/01-release-checklist.md) · 🇸🇦 [ar](../../../ar/docs/ops/01-release-checklist.md) · 🇦🇿 [az](../../../az/docs/ops/01-release-checklist.md) · 🇧🇬 [bg](../../../bg/docs/ops/01-release-checklist.md) · 🇧🇩 [bn](../../../bn/docs/ops/01-release-checklist.md) · 🇨🇿 [cs](../../../cs/docs/ops/01-release-checklist.md) · 🇩🇰 [da](../../../da/docs/ops/01-release-checklist.md) · 🇩🇪 [de](../../../de/docs/ops/01-release-checklist.md) · 🇬🇷 [el](../../../el/docs/ops/01-release-checklist.md) · 🇪🇪 [et](../../../et/docs/ops/01-release-checklist.md) · 🇮🇷 [fa](../../../fa/docs/ops/01-release-checklist.md) · 🇫🇮 [fi](../../../fi/docs/ops/01-release-checklist.md) · 🇫🇷 [fr](../../../fr/docs/ops/01-release-checklist.md) · 🇮🇪 [ga](../../../ga/docs/ops/01-release-checklist.md) · 🇮🇳 [gu](../../../gu/docs/ops/01-release-checklist.md) · 🇮🇱 [he](../../../he/docs/ops/01-release-checklist.md) · 🇮🇳 [hi](../../../hi/docs/ops/01-release-checklist.md) · 🇭🇷 [hr](../../../hr/docs/ops/01-release-checklist.md) · 🇭🇺 [hu](../../../hu/docs/ops/01-release-checklist.md) · 🇮🇩 [id](../../../id/docs/ops/01-release-checklist.md) · 🇮🇹 [it](../../../it/docs/ops/01-release-checklist.md) · 🇯🇵 [ja](../../../ja/docs/ops/01-release-checklist.md) · 🇰🇷 [ko](../../../ko/docs/ops/01-release-checklist.md) · 🇱🇹 [lt](../../../lt/docs/ops/01-release-checklist.md) · 🇱🇻 [lv](../../../lv/docs/ops/01-release-checklist.md) · 🇮🇳 [mr](../../../mr/docs/ops/01-release-checklist.md) · 🇲🇾 [ms](../../../ms/docs/ops/01-release-checklist.md) · 🇲🇹 [mt](../../../mt/docs/ops/01-release-checklist.md) · 🇳🇱 [nl](../../../nl/docs/ops/01-release-checklist.md) · 🇳🇴 [no](../../../no/docs/ops/01-release-checklist.md) · 🇵🇭 [phi](../../../phi/docs/ops/01-release-checklist.md) · 🇵🇱 [pl](../../../pl/docs/ops/01-release-checklist.md) · 🇵🇹 [pt](../../../pt/docs/ops/01-release-checklist.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/01-release-checklist.md) · 🇷🇴 [ro](../../../ro/docs/ops/01-release-checklist.md) · 🇷🇺 [ru](../../../ru/docs/ops/01-release-checklist.md) · 🇸🇰 [sk](../../../sk/docs/ops/01-release-checklist.md) · 🇸🇮 [sl](../../../sl/docs/ops/01-release-checklist.md) · 🇷🇸 [sr](../../../sr/docs/ops/01-release-checklist.md) · 🇸🇪 [sv](../../../sv/docs/ops/01-release-checklist.md) · 🇰🇪 [sw](../../../sw/docs/ops/01-release-checklist.md) · 🇮🇳 [ta](../../../ta/docs/ops/01-release-checklist.md) · 🇮🇳 [te](../../../te/docs/ops/01-release-checklist.md) · 🇹🇭 [th](../../../th/docs/ops/01-release-checklist.md) · 🇹🇷 [tr](../../../tr/docs/ops/01-release-checklist.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/01-release-checklist.md) · 🇵🇰 [ur](../../../ur/docs/ops/01-release-checklist.md) · 🇻🇳 [vi](../../../vi/docs/ops/01-release-checklist.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/01-release-checklist.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/01-release-checklist.md)

---

Use this checklist before tagging or publishing a new OmniRoute release.

## Version and Changelog

1. Bump `package.json` version (`x.y.z`) in the release branch.
2. Move release notes from `## [Unreleased]` in `CHANGELOG.md` to a dated section:
   - `## [x.y.z] — YYYY-MM-DD`
3. Keep `## [Unreleased]` as the first changelog section for upcoming work.
4. Ensure the latest semver section in `CHANGELOG.md` equals `package.json` version.

## API Docs

1. Update `docs/reference/openapi.yaml`:
   - `info.version` must equal `package.json` version.
2. Validate endpoint examples if API contracts changed.

## Runtime Docs

1. Review `docs/architecture/01-system-overview.md` for storage/runtime drift.
2. Review `docs/guides/23-troubleshooting.md` for env var and operational drift.
3. Verify the release/runtime Node.js version still satisfies the supported secure floor:
   - `>=20.20.2 <21` or `>=22.22.2 <23`
   - `npm run check:node-runtime`
4. Validate the npm publish artifact after building the standalone package:
   - `npm run build:cli`
   - `npm run check:pack-artifact`
   - confirm no `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, or other local residue
5. Update localized docs if source docs changed significantly.

## Automated Check

Run the sync guard locally before opening PR:

```bash
npm run check:docs-sync
```

CI also runs this check in `.github/workflows/ci.yml` (lint job).
