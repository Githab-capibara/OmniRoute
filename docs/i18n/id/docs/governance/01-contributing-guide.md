# Berkontribusi ke OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../01-contributing-guide.md) · 🇸🇦 [ar](../ar/01-contributing-guide.md) · 🇦🇿 [az](../az/01-contributing-guide.md) · 🇧🇬 [bg](../bg/01-contributing-guide.md) · 🇧🇩 [bn](../bn/01-contributing-guide.md) · 🇨🇿 [cs](../cs/01-contributing-guide.md) · 🇩🇰 [da](../da/01-contributing-guide.md) · 🇩🇪 [de](../de/01-contributing-guide.md) · 🇬🇷 [el](../el/01-contributing-guide.md) · 🇪🇸 [es](../es/01-contributing-guide.md) · 🇪🇪 [et](../et/01-contributing-guide.md) · 🇮🇷 [fa](../fa/01-contributing-guide.md) · 🇫🇮 [fi](../fi/01-contributing-guide.md) · 🇫🇷 [fr](../fr/01-contributing-guide.md) · 🇮🇪 [ga](../ga/01-contributing-guide.md) · 🇮🇳 [gu](../gu/01-contributing-guide.md) · 🇮🇱 [he](../he/01-contributing-guide.md) · 🇮🇳 [hi](../hi/01-contributing-guide.md) · 🇭🇷 [hr](../hr/01-contributing-guide.md) · 🇭🇺 [hu](../hu/01-contributing-guide.md) · 🇮🇹 [it](../it/01-contributing-guide.md) · 🇯🇵 [ja](../ja/01-contributing-guide.md) · 🇰🇷 [ko](../ko/01-contributing-guide.md) · 🇱🇹 [lt](../lt/01-contributing-guide.md) · 🇱🇻 [lv](../lv/01-contributing-guide.md) · 🇮🇳 [mr](../mr/01-contributing-guide.md) · 🇲🇾 [ms](../ms/01-contributing-guide.md) · 🇲🇹 [mt](../mt/01-contributing-guide.md) · 🇳🇱 [nl](../nl/01-contributing-guide.md) · 🇳🇴 [no](../no/01-contributing-guide.md) · 🇵🇭 [phi](../phi/01-contributing-guide.md) · 🇵🇱 [pl](../pl/01-contributing-guide.md) · 🇵🇹 [pt](../pt/01-contributing-guide.md) · 🇧🇷 [pt-BR](../pt-BR/01-contributing-guide.md) · 🇷🇴 [ro](../ro/01-contributing-guide.md) · 🇷🇺 [ru](../ru/01-contributing-guide.md) · 🇸🇰 [sk](../sk/01-contributing-guide.md) · 🇸🇮 [sl](../sl/01-contributing-guide.md) · 🇷🇸 [sr](../sr/01-contributing-guide.md) · 🇸🇪 [sv](../sv/01-contributing-guide.md) · 🇰🇪 [sw](../sw/01-contributing-guide.md) · 🇮🇳 [ta](../ta/01-contributing-guide.md) · 🇮🇳 [te](../te/01-contributing-guide.md) · 🇹🇭 [th](../th/01-contributing-guide.md) · 🇹🇷 [tr](../tr/01-contributing-guide.md) · 🇺🇦 [uk-UA](../uk-UA/01-contributing-guide.md) · 🇵🇰 [ur](../ur/01-contributing-guide.md) · 🇻🇳 [vi](../vi/01-contributing-guide.md) · 🇨🇳 [zh-CN](../zh-CN/01-contributing-guide.md) · 🇹🇼 [zh-TW](../zh-TW/01-contributing-guide.md)

---

Terima kasih atas minat Anda untuk berkontribusi! Panduan ini mencakup semua yang perlu Anda ketahui untuk memulai.

---

## Pengaturan Pengembangan

### Persyaratan

- **Node.js** >= 18 < 24 (recommended: 22 LTS)
- **npm** 10+
- **Git**

### Kloning & Instalasi

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variabel Lingkungan

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabel-variabel utama untuk pengembangan:

| Variable               | Development Default      | Deskripsi                 |
| ---------------------- | ------------------------ | ------------------------- |
| `PORT`                 | `20128`                  | Port server               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL dasar untuk frontend  |
| `JWT_SECRET`           | (generate above)         | Kunci penandatanganan JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Kata sandi login pertama  |
| `APP_LOG_LEVEL`        | `info`                   | Tingkat verbositas log    |

### Pengaturan Dashboard

Dashboard menyediakan tombol UI untuk fitur-fitur yang juga dapat dikonfigurasi melalui variabel lingkungan:

| Lokasi Pengaturan   | Tombol             | Deskripsi                            |
| ------------------- | ------------------ | ------------------------------------ |
| Settings → Advanced | Debug Mode         | Aktifkan log permintaan debug (UI)   |
| Settings → General  | Sidebar Visibility | Tampilkan/sembunyikan bagian sidebar |

Pengaturan ini disimpan di database dan tetap ada setelah restart, menggantikan nilai default variabel lingkungan jika sudah diatur.

### Menjalankan Secara Lokal

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL default:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Alur Kerja Git

> ⚠️ **JANGAN PERNAH melakukan commit langsung ke `main`.** Selalu gunakan cabang fitur.

```bash
git checkout -b feat/your-feature-name
# ... make changes ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open a Pull Request on GitHub
```

### Penamaan Cabang

| Awalan      | Tujuan                   |
| ----------- | ------------------------ |
| `feat/`     | Fitur baru               |
| `fix/`      | Perbaikan bug            |
| `refactor/` | Restrukturisasi kode     |
| `docs/`     | Perubahan dokumentasi    |
| `test/`     | Penambahan/perbaikan tes |
| `chore/`    | Perkakas, CI, dependensi |

### Pesan Commit

Ikuti [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update 03-security-policy.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Cakupan: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.

---

## Menjalankan Tes

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

Catatan cakupan:

- `npm run test:coverage` mengukur cakupan kode sumber untuk rangkaian tes unit utama, mengecualikan `tests/**`, dan menyertakan `open-sse/**`
- Pull request harus menjaga batas cakupan keseluruhan di **60% atau lebih tinggi** untuk pernyataan, baris, fungsi, dan cabang
- Jika sebuah PR mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/`, PR tersebut harus menambahkan atau memperbarui tes otomatis dalam PR yang sama
- `npm run coverage:report` mencetak laporan terperinci per file dari hasil cakupan terbaru
- `npm run test:coverage:legacy` mempertahankan metrik lama untuk perbandingan historis
- Lihat `docs/ops/10-coverage-plan.md` untuk peta jalan peningkatan cakupan bertahap

### Persyaratan Pull Request

Sebelum membuka atau menggabungkan sebuah PR:

- Jalankan `npm run test:unit`
- Jalankan `npm run test:coverage`
- Pastikan batas cakupan tetap di **60%+** untuk semua metrik
- Sertakan file tes yang diubah atau ditambahkan dalam deskripsi PR ketika kode produksi berubah
- Periksa hasil SonarQube pada PR ketika rahasia proyek dikonfigurasi di CI

Status tes saat ini: **122 file tes unit** yang mencakup:

- Penerjemah penyedia dan konversi format
- Pembatasan laju, pemutus sirkuit, dan ketahanan
- Cache semantik, idempoten, pelacakan progres
- Operasi database dan skema (110 modul tingkat atas, 130 migrasi)
- Alur OAuth dan autentikasi
- Validasi endpoint API (Zod v4)
- Alat server MCP dan penegakan cakupan
- Sistem Memory dan Skills

---

## Gaya Kode

- **ESLint** — Jalankan `npm run lint` sebelum melakukan commit
- **Prettier** — Diformat otomatis melalui `lint-staged` saat commit (2 spasi, titik koma, tanda kutip ganda, lebar 100 karakter, koma trailing es5)
- **TypeScript** — Semua kode `src/` menggunakan `.ts`/`.tsx`; `open-sse/` menggunakan `.ts`/`.js`; dokumentasi dengan TSDoc (`@param`, `@returns`, `@throws`)
- **Tanpa `eval()`** — ESLint menerapkan `no-eval`, `no-implied-eval`, `no-new-func`
- **Validasi Zod** — Gunakan skema Zod v4 untuk semua validasi input API
- **Penamaan**: File = camelCase/kebab-case, komponen = PascalCase, konstanta = UPPER_SNAKE

---

## Struktur Proyek

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Halaman dashboard (23 bagian)
│   ├── api/                # Rute API (51 direktori)
│   └── login/              # Halaman autentikasi (.tsx)
├── domain/                 # Mesin kebijakan (policyEngine, comboResolver, costRules, dll.)
├── lib/                    # Logika bisnis inti (.ts)
│   ├── a2a/                # Server protokol Agent-to-Agent v0.3
│   ├── acp/                # Registri Agent Communication Protocol
│   ├── compliance/         # Mesin kebijakan kepatuhan
│   ├── db/                 # Lapisan database SQLite (110 modul tingkat atas + 130 migrasi)
│   ├── memory/             # Memori percakapan persisten
│   ├── oauth/              # Penyedia, layanan, dan utilitas OAuth
│   ├── skills/             # Kerangka skill yang dapat diperluas
│   ├── usage/              # Pelacakan penggunaan dan kalkulasi biaya
│   └── localDb.ts          # Lapisan re-ekspor saja — jangan pernah tambahkan logika di sini
├── middleware/              # Middleware permintaan (promptInjectionGuard)
├── mitm/                   # Proxy MITM (sertifikat, DNS, perutean target)
├── shared/
│   ├── components/         # Komponen React (.tsx)
│   ├── constants/          # Definisi penyedia (329), cakupan MCP, 19 strategi perutean
│   ├── utils/              # Pemutus sirkuit, sanitizer, pembantu autentikasi
│   └── validation/         # Skema Zod v4
└── sse/                    # Pipeline proxy SSE

open-sse/                   # Workspace @omniroute/open-sse
├── executors/              # 89 modul implementasi executor
├── handlers/               # 11 penangan permintaan (chat, responses, embeddings, images, dll.)
├── mcp-server/             # Server MCP (107 alat, 3 transport, 32 cakupan)
├── services/               # 178 layanan tingkat atas (combo, autoCombo, rateLimitManager, dll.)
├── translator/             # Penerjemah format (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformer Responses API
└── utils/                  # 22 modul utilitas (stream, TLS, proxy, logging)

electron/                   # Aplikasi desktop Electron (lintas platform)

tests/
├── unit/                   # Runner tes Node.js (122 file tes)
├── integration/            # Tes integrasi
├── e2e/                    # Tes Playwright
├── security/               # Tes keamanan
├── translator/             # Tes khusus penerjemah
└── load/                   # Tes beban

docs/                       # Dokumentasi
├── 01-system-overview.md         # Arsitektur sistem
├── 01-api-reference.md        # Semua endpoint
├── 01-user-guide.md           # Pengaturan penyedia, integrasi CLI
├── 23-troubleshooting.md      # Masalah umum
├── 07-mcp-server.md           # Server MCP (107 alat)
├── 01-a2a-server.md           # Protokol agen A2A
├── 01-auto-combo.md           # Mesin auto-combo
├── 02-cli-tools.md            # Integrasi alat CLI
├── 10-coverage-plan.md        # Rencana peningkatan cakupan tes
├── openapi.yaml            # Spesifikasi OpenAPI
└── adr/                    # Catatan Keputusan Arsitektur
```

---

## Menambahkan Penyedia Baru

### Langkah 1: Daftarkan Konstanta Penyedia

Tambahkan ke `src/shared/constants/providers.ts` — divalidasi dengan Zod saat modul dimuat.

### Langkah 2: Tambahkan Eksekutor (jika diperlukan logika kustom)

Buat eksekutor di `open-sse/executors/your-provider.ts` dengan memperluas eksekutor dasar.

### Langkah 3: Tambahkan Penerjemah (jika format bukan OpenAI)

Buat penerjemah permintaan/respons di `open-sse/translator/`.

### Langkah 4: Tambahkan Konfigurasi OAuth (jika berbasis OAuth)

Tambahkan kredensial OAuth di `src/lib/oauth/constants/oauth.ts` dan layanan di `src/lib/oauth/services/`.

### Langkah 5: Daftarkan Model

Tambahkan definisi model di `open-sse/config/providerRegistry.ts`.

### Langkah 6: Tambahkan Tes

Tulis tes unit di `tests/unit/` yang mencakup minimal:

- Pendaftaran penyedia
- Terjemahan permintaan/respons
- Penanganan kesalahan

---

## Daftar Periksa Pull Request

- [ ] Tes lulus (`npm test`)
- [ ] Linting lulus (`npm run lint`)
- [ ] Build berhasil (`npm run build`)
- [ ] Tipe TypeScript ditambahkan untuk fungsi dan antarmuka publik baru
- [ ] Tidak ada rahasia atau nilai fallback yang dikodekan secara keras
- [ ] Semua input divalidasi dengan skema Zod
- [ ] CHANGELOG diperbarui (jika ada perubahan yang terlihat pengguna)
- [ ] Dokumentasi diperbarui (jika berlaku)

---

## Rilis

Rilis dikelola melalui alur kerja `/generate-release`. Ketika GitHub Release baru dibuat, paket secara **otomatis diterbitkan ke npm** melalui GitHub Actions.

---

## Mendapatkan Bantuan

- **Arsitektur**: Lihat [`docs/architecture/01-system-overview.md`](docs/architecture/01-system-overview.md)
- **Referensi API**: Lihat [`docs/reference/01-api-reference.md`](docs/reference/01-api-reference.md)
- **Masalah**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Lihat `docs/adr/` untuk catatan keputusan arsitektur
