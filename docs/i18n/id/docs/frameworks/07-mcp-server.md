# Dokumentasi Server MCP OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/07-mcp-server.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/07-mcp-server.md) · 🇦🇿 [az](../../../az/docs/frameworks/07-mcp-server.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/07-mcp-server.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/07-mcp-server.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/07-mcp-server.md) · 🇩🇰 [da](../../../da/docs/frameworks/07-mcp-server.md) · 🇩🇪 [de](../../../de/docs/frameworks/07-mcp-server.md) · 🇬🇷 [el](../../../el/docs/frameworks/07-mcp-server.md) · 🇪🇸 [es](../../../es/docs/frameworks/07-mcp-server.md) · 🇪🇪 [et](../../../et/docs/frameworks/07-mcp-server.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/07-mcp-server.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/07-mcp-server.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/07-mcp-server.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/07-mcp-server.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/07-mcp-server.md) · 🇮🇱 [he](../../../he/docs/frameworks/07-mcp-server.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/07-mcp-server.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/07-mcp-server.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/07-mcp-server.md) · 🇮🇹 [it](../../../it/docs/frameworks/07-mcp-server.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/07-mcp-server.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/07-mcp-server.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/07-mcp-server.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/07-mcp-server.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/07-mcp-server.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/07-mcp-server.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/07-mcp-server.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/07-mcp-server.md) · 🇳🇴 [no](../../../no/docs/frameworks/07-mcp-server.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/07-mcp-server.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/07-mcp-server.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/07-mcp-server.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/07-mcp-server.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/07-mcp-server.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/07-mcp-server.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/07-mcp-server.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/07-mcp-server.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/07-mcp-server.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/07-mcp-server.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/07-mcp-server.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/07-mcp-server.md) · 🇮🇳 [te](../../../te/docs/frameworks/07-mcp-server.md) · 🇹🇭 [th](../../../th/docs/frameworks/07-mcp-server.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/07-mcp-server.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/07-mcp-server.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/07-mcp-server.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/07-mcp-server.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/07-mcp-server.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/07-mcp-server.md)

---

> Server Model Context Protocol dengan 16 alat cerdas

## Instalasi

OmniRoute MCP sudah tersedia secara bawaan. Jalankan dengan:

```bash
omniroute --mcp
```

Atau melalui transport open-sse:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

## Konfigurasi IDE

Lihat [Konfigurasi IDE](integrations/ide-configs.md) untuk pengaturan Antigravity, Cursor, Copilot, dan Claude Desktop.

---

## Alat Esensial (8)

| Alat                            | Deskripsi                                       |
| :------------------------------ | :---------------------------------------------- |
| `omniroute_get_health`          | Kesehatan gateway, pemutus sirkuit, uptime      |
| `omniroute_list_combos`         | Semua combo yang dikonfigurasi beserta modelnya |
| `omniroute_get_combo_metrics`   | Metrik performa untuk combo tertentu            |
| `omniroute_switch_combo`        | Ganti combo aktif berdasarkan ID/nama           |
| `omniroute_check_quota`         | Status kuota per penyedia atau semua penyedia   |
| `omniroute_route_request`       | Kirim penyelesaian chat melalui OmniRoute       |
| `omniroute_cost_report`         | Analitik biaya untuk periode waktu tertentu     |
| `omniroute_list_models_catalog` | Katalog model lengkap beserta kemampuannya      |

## Alat Lanjutan (8)

| Alat                               | Deskripsi                                                              |
| :--------------------------------- | :--------------------------------------------------------------------- |
| `omniroute_simulate_route`         | Simulasi routing percobaan dengan pohon fallback                       |
| `omniroute_set_budget_guard`       | Anggaran sesi dengan tindakan degrade/block/alert                      |
| `omniroute_set_resilience_profile` | Terapkan preset conservative/balanced/aggressive                       |
| `omniroute_test_combo`             | Uji langsung semua model dalam combo melalui permintaan upstream nyata |
| `omniroute_get_provider_metrics`   | Metrik terperinci untuk satu penyedia                                  |
| `omniroute_best_combo_for_task`    | Rekomendasi kesesuaian tugas beserta alternatifnya                     |
| `omniroute_explain_route`          | Jelaskan keputusan routing yang lalu                                   |
| `omniroute_get_session_snapshot`   | Status sesi lengkap: biaya, token, kesalahan                           |

## Autentikasi

Alat MCP diautentikasi melalui lingkup kunci API. Setiap alat memerlukan lingkup tertentu:

| Lingkup        | Alat                                             |
| :------------- | :----------------------------------------------- |
| `read:health`  | get_health, get_provider_metrics                 |
| `read:combos`  | list_combos, get_combo_metrics                   |
| `write:combos` | switch_combo                                     |
| `read:quota`   | check_quota                                      |
| `write:route`  | route_request, simulate_route, test_combo        |
| `read:usage`   | cost_report, get_session_snapshot, explain_route |
| `write:config` | set_budget_guard, set_resilience_profile         |
| `read:models`  | list_models_catalog, best_combo_for_task         |

## Pencatatan Audit

Setiap pemanggilan alat dicatat ke `mcp_tool_audit` dengan:

- Nama alat, argumen, hasil
- Durasi (ms), berhasil/gagal
- Hash kunci API, cap waktu

## Berkas

| Berkas                                       | Tujuan                                     |
| :------------------------------------------- | :----------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Pembuatan server MCP + pendaftaran 16 alat |
| `open-sse/mcp-server/transport.ts`           | Transportasi Stdio + HTTP                  |
| `open-sse/mcp-server/auth.ts`                | Validasi kunci API + lingkup               |
| `open-sse/mcp-server/audit.ts`               | Pencatatan audit pemanggilan alat          |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 pengendali alat lanjutan                 |
