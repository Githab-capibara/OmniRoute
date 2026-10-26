# OmniRoute Auto-Combo Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/01-auto-combo.md) · 🇸🇦 [ar](../../../ar/docs/routing/01-auto-combo.md) · 🇦🇿 [az](../../../az/docs/routing/01-auto-combo.md) · 🇧🇬 [bg](../../../bg/docs/routing/01-auto-combo.md) · 🇧🇩 [bn](../../../bn/docs/routing/01-auto-combo.md) · 🇨🇿 [cs](../../../cs/docs/routing/01-auto-combo.md) · 🇩🇰 [da](../../../da/docs/routing/01-auto-combo.md) · 🇩🇪 [de](../../../de/docs/routing/01-auto-combo.md) · 🇬🇷 [el](../../../el/docs/routing/01-auto-combo.md) · 🇪🇸 [es](../../../es/docs/routing/01-auto-combo.md) · 🇪🇪 [et](../../../et/docs/routing/01-auto-combo.md) · 🇮🇷 [fa](../../../fa/docs/routing/01-auto-combo.md) · 🇫🇮 [fi](../../../fi/docs/routing/01-auto-combo.md) · 🇫🇷 [fr](../../../fr/docs/routing/01-auto-combo.md) · 🇮🇪 [ga](../../../ga/docs/routing/01-auto-combo.md) · 🇮🇳 [gu](../../../gu/docs/routing/01-auto-combo.md) · 🇮🇱 [he](../../../he/docs/routing/01-auto-combo.md) · 🇮🇳 [hi](../../../hi/docs/routing/01-auto-combo.md) · 🇭🇷 [hr](../../../hr/docs/routing/01-auto-combo.md) · 🇭🇺 [hu](../../../hu/docs/routing/01-auto-combo.md) · 🇮🇹 [it](../../../it/docs/routing/01-auto-combo.md) · 🇯🇵 [ja](../../../ja/docs/routing/01-auto-combo.md) · 🇰🇷 [ko](../../../ko/docs/routing/01-auto-combo.md) · 🇱🇹 [lt](../../../lt/docs/routing/01-auto-combo.md) · 🇱🇻 [lv](../../../lv/docs/routing/01-auto-combo.md) · 🇮🇳 [mr](../../../mr/docs/routing/01-auto-combo.md) · 🇲🇾 [ms](../../../ms/docs/routing/01-auto-combo.md) · 🇲🇹 [mt](../../../mt/docs/routing/01-auto-combo.md) · 🇳🇱 [nl](../../../nl/docs/routing/01-auto-combo.md) · 🇳🇴 [no](../../../no/docs/routing/01-auto-combo.md) · 🇵🇭 [phi](../../../phi/docs/routing/01-auto-combo.md) · 🇵🇱 [pl](../../../pl/docs/routing/01-auto-combo.md) · 🇵🇹 [pt](../../../pt/docs/routing/01-auto-combo.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/01-auto-combo.md) · 🇷🇴 [ro](../../../ro/docs/routing/01-auto-combo.md) · 🇷🇺 [ru](../../../ru/docs/routing/01-auto-combo.md) · 🇸🇰 [sk](../../../sk/docs/routing/01-auto-combo.md) · 🇸🇮 [sl](../../../sl/docs/routing/01-auto-combo.md) · 🇷🇸 [sr](../../../sr/docs/routing/01-auto-combo.md) · 🇸🇪 [sv](../../../sv/docs/routing/01-auto-combo.md) · 🇰🇪 [sw](../../../sw/docs/routing/01-auto-combo.md) · 🇮🇳 [ta](../../../ta/docs/routing/01-auto-combo.md) · 🇮🇳 [te](../../../te/docs/routing/01-auto-combo.md) · 🇹🇭 [th](../../../th/docs/routing/01-auto-combo.md) · 🇹🇷 [tr](../../../tr/docs/routing/01-auto-combo.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/01-auto-combo.md) · 🇵🇰 [ur](../../../ur/docs/routing/01-auto-combo.md) · 🇻🇳 [vi](../../../vi/docs/routing/01-auto-combo.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/01-auto-combo.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/01-auto-combo.md)

---

> Rantai model yang mengelola diri sendiri dengan penilaian adaptif

## Cara Kerjanya

Auto-Combo Engine secara dinamis memilih penyedia/model terbaik untuk setiap permintaan menggunakan **fungsi penilaian 6 faktor**:

| Faktor     | Bobot | Deskripsi                                       |
| :--------- | :---- | :---------------------------------------------- |
| Quota      | 0.20  | Kapasitas tersisa [0..1]                        |
| Health     | 0.25  | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0.20  | Biaya invers (lebih murah = skor lebih tinggi)  |
| LatencyInv | 0.15  | Latensi p95 invers (lebih cepat = lebih tinggi) |
| TaskFit    | 0.10  | Skor kesesuaian model × tipe tugas              |
| Stability  | 0.10  | Variansi rendah dalam latensi/kesalahan         |

## Paket Mode

| Paket                   | Fokus         | Bobot Utama      |
| :---------------------- | :------------ | :--------------- |
| 🚀 **Ship Fast**        | Kecepatan     | latencyInv: 0.35 |
| 💰 **Cost Saver**       | Ekonomi       | costInv: 0.40    |
| 🎯 **Quality First**    | Model terbaik | taskFit: 0.40    |
| 📡 **Offline Friendly** | Ketersediaan  | quota: 0.40      |

## Pemulihan Mandiri

- **Pengecualian sementara**: Skor < 0.2 → dikecualikan selama 5 menit (backoff progresif, maks 30 menit)
- **Kesadaran circuit breaker**: OPEN → dikecualikan otomatis; HALF_OPEN → permintaan probe
- **Mode insiden**: >50% OPEN → nonaktifkan eksplorasi, maksimalkan stabilitas
- **Pemulihan cooldown**: Setelah pengecualian, permintaan pertama adalah "probe" dengan timeout yang dikurangi

## Eksplorasi Bandit

5% permintaan (dapat dikonfigurasi) diarahkan ke penyedia acak untuk eksplorasi. Dinonaktifkan dalam mode insiden.

## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Kesesuaian Tugas

30+ model dinilai di 6 tipe tugas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Mendukung pola wildcard (mis., `*-coder` → skor coding tinggi).

## Berkas

| Berkas                                       | Tujuan                                   |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Fungsi penilaian & normalisasi pool      |
| `open-sse/services/autoCombo/taskFitness.ts` | Pencarian kesesuaian model × tugas       |
| `open-sse/services/autoCombo/engine.ts`      | Logika pemilihan, bandit, batas anggaran |
| `open-sse/services/autoCombo/selfHealing.ts` | Pengecualian, probe, mode insiden        |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profil bobot                           |
| `src/app/api/combos/auto/route.ts`           | REST API                                 |
