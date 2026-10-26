# Kebijakan Keamanan (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../03-security-policy.md) · 🇸🇦 [ar](../ar/03-security-policy.md) · 🇦🇿 [az](../az/03-security-policy.md) · 🇧🇬 [bg](../bg/03-security-policy.md) · 🇧🇩 [bn](../bn/03-security-policy.md) · 🇨🇿 [cs](../cs/03-security-policy.md) · 🇩🇰 [da](../da/03-security-policy.md) · 🇩🇪 [de](../de/03-security-policy.md) · 🇬🇷 [el](../el/03-security-policy.md) · 🇪🇸 [es](../es/03-security-policy.md) · 🇪🇪 [et](../et/03-security-policy.md) · 🇮🇷 [fa](../fa/03-security-policy.md) · 🇫🇮 [fi](../fi/03-security-policy.md) · 🇫🇷 [fr](../fr/03-security-policy.md) · 🇮🇪 [ga](../ga/03-security-policy.md) · 🇮🇳 [gu](../gu/03-security-policy.md) · 🇮🇱 [he](../he/03-security-policy.md) · 🇮🇳 [hi](../hi/03-security-policy.md) · 🇭🇷 [hr](../hr/03-security-policy.md) · 🇭🇺 [hu](../hu/03-security-policy.md) · 🇮🇹 [it](../it/03-security-policy.md) · 🇯🇵 [ja](../ja/03-security-policy.md) · 🇰🇷 [ko](../ko/03-security-policy.md) · 🇱🇹 [lt](../lt/03-security-policy.md) · 🇱🇻 [lv](../lv/03-security-policy.md) · 🇮🇳 [mr](../mr/03-security-policy.md) · 🇲🇾 [ms](../ms/03-security-policy.md) · 🇲🇹 [mt](../mt/03-security-policy.md) · 🇳🇱 [nl](../nl/03-security-policy.md) · 🇳🇴 [no](../no/03-security-policy.md) · 🇵🇭 [phi](../phi/03-security-policy.md) · 🇵🇱 [pl](../pl/03-security-policy.md) · 🇵🇹 [pt](../pt/03-security-policy.md) · 🇧🇷 [pt-BR](../pt-BR/03-security-policy.md) · 🇷🇴 [ro](../ro/03-security-policy.md) · 🇷🇺 [ru](../ru/03-security-policy.md) · 🇸🇰 [sk](../sk/03-security-policy.md) · 🇸🇮 [sl](../sl/03-security-policy.md) · 🇷🇸 [sr](../sr/03-security-policy.md) · 🇸🇪 [sv](../sv/03-security-policy.md) · 🇰🇪 [sw](../sw/03-security-policy.md) · 🇮🇳 [ta](../ta/03-security-policy.md) · 🇮🇳 [te](../te/03-security-policy.md) · 🇹🇭 [th](../th/03-security-policy.md) · 🇹🇷 [tr](../tr/03-security-policy.md) · 🇺🇦 [uk-UA](../uk-UA/03-security-policy.md) · 🇵🇰 [ur](../ur/03-security-policy.md) · 🇻🇳 [vi](../vi/03-security-policy.md) · 🇨🇳 [zh-CN](../zh-CN/03-security-policy.md) · 🇹🇼 [zh-TW](../zh-TW/03-security-policy.md)

---

## Melaporkan Kerentanan

Jika Anda menemukan kerentanan keamanan di OmniRoute, harap laporkan secara bertanggung jawab:

1. **JANGAN** membuka isu GitHub yang bersifat publik
2. Gunakan [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Sertakan: deskripsi, langkah-langkah reproduksi, dan potensi dampak

## Linimasa Respons

| Tahap                 | Target                 |
| --------------------- | ---------------------- |
| Konfirmasi Penerimaan | 48 jam                 |
| Triase & Penilaian    | 5 hari kerja           |
| Rilis Patch           | 14 hari kerja (kritis) |

## Versi yang Didukung

| Versi   | Status Dukungan   |
| ------- | ----------------- |
| 3.6.x   | ✅ Aktif          |
| 3.5.x   | ✅ Keamanan       |
| < 3.5.0 | ❌ Tidak Didukung |

---

## Arsitektur Keamanan

OmniRoute menerapkan model keamanan berlapis:

```
Request → CORS → API Key Auth → Prompt Injection Guard → Input Sanitizer → Rate Limiter → Circuit Breaker → Provider
```

### 🔐 Autentikasi & Otorisasi

| Fitur                   | Implementasi                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| **Login Dashboard**     | Autentikasi berbasis kata sandi dengan token JWT (cookie HttpOnly)   |
| **Autentikasi API Key** | Kunci bertanda tangan HMAC dengan validasi CRC                       |
| **OAuth 2.0 + PKCE**    | Autentikasi penyedia yang aman (Claude, Codex, Gemini, Cursor, dll.) |
| **Pembaruan Token**     | Pembaruan token OAuth otomatis sebelum kedaluwarsa                   |
| **Cookie Aman**         | `AUTH_COOKIE_SECURE=true` untuk lingkungan HTTPS                     |
| **Ruang Lingkup MCP**   | 32 ruang lingkup terperinci untuk kontrol akses alat MCP             |

### 🛡️ Enkripsi Data Tersimpan

Semua data sensitif yang disimpan di SQLite dienkripsi menggunakan **AES-256-GCM** dengan derivasi kunci scrypt:

- Kunci API, token akses, token penyegaran, dan token ID
- Format berversi: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Mode passthrough (teks biasa) ketika `STORAGE_ENCRYPTION_KEY` tidak disetel

```bash
# Generate encryption key:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🧠 Penjaga Injeksi Prompt

Middleware yang mendeteksi dan memblokir serangan injeksi prompt dalam permintaan LLM:

| Jenis Pola          | Tingkat Keparahan | Contoh                                             |
| ------------------- | ----------------- | -------------------------------------------------- |
| Penimpaan Sistem    | Tinggi            | "ignore all previous instructions"                 |
| Pembajakan Peran    | Tinggi            | "you are now DAN, you can do anything"             |
| Injeksi Pembatas    | Sedang            | Pemisah yang dikodekan untuk merusak batas konteks |
| DAN/Jailbreak       | Tinggi            | Pola prompt jailbreak yang telah diketahui         |
| Kebocoran Instruksi | Sedang            | "show me your system prompt"                       |

Konfigurasikan melalui dashboard (Settings → Security) atau `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block | redact
```

### 🔒 Redaksi PII

Deteksi otomatis dan redaksi opsional informasi yang dapat mengidentifikasi pribadi:

| Jenis PII     | Pola                  | Pengganti          |
| ------------- | --------------------- | ------------------ |
| Email         | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasil)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasil) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kartu Kredit  | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telepon       | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (AS)      | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true
```

### 🌐 Keamanan Jaringan

| Fitur                    | Deskripsi                                                                         |
| ------------------------ | --------------------------------------------------------------------------------- |
| **CORS**                 | Kontrol origin yang dapat dikonfigurasi (variabel env `CORS_ORIGIN`, default `*`) |
| **Pemfilteran IP**       | Daftar izin/blokir rentang IP di dashboard                                        |
| **Pembatasan Laju**      | Batas laju per-penyedia dengan backoff otomatis                                   |
| **Anti-Thundering Herd** | Mutex + penguncian per-koneksi mencegah kegagalan 502 beruntun                    |
| **Sidik Jari TLS**       | Spoofing sidik jari TLS menyerupai browser untuk mengurangi deteksi bot           |
| **Sidik Jari CLI**       | Pengurutan header/body per-penyedia agar sesuai tanda tangan CLI native           |

### 🔌 Ketahanan & Ketersediaan

| Fitur                      | Deskripsi                                                                   |
| -------------------------- | --------------------------------------------------------------------------- |
| **Pemutus Sirkuit**        | 3 status (Closed → Open → Half-Open) per penyedia, dipersistenkan di SQLite |
| **Idempotansi Permintaan** | Jendela deduplikasi 5 detik untuk permintaan duplikat                       |
| **Backoff Eksponensial**   | Percobaan ulang otomatis dengan penundaan yang semakin meningkat            |
| **Dashboard Kesehatan**    | Pemantauan kesehatan penyedia secara real-time                              |

### 📋 Kepatuhan

| Fitur                 | Deskripsi                                                          |
| --------------------- | ------------------------------------------------------------------ |
| **Retensi Log**       | Pembersihan otomatis setelah `CALL_LOG_RETENTION_DAYS`             |
| **Opt-out Tanpa Log** | Tanda `noLog` per kunci API menonaktifkan pencatatan permintaan    |
| **Log Audit**         | Tindakan administratif dilacak di tabel `audit_log`                |
| **Audit MCP**         | Pencatatan audit berbasis SQLite untuk semua pemanggilan alat MCP  |
| **Validasi Zod**      | Semua input API divalidasi dengan skema Zod v4 saat pemuatan modul |

---

## Variabel Lingkungan yang Wajib Disetel

Semua rahasia harus disetel sebelum menjalankan server. Server akan **gagal cepat** jika nilainya tidak ada atau terlalu lemah.

```bash
# REQUIRED — server will not start without these:
JWT_SECRET=$(openssl rand -base64 48)     # min 32 chars
API_KEY_SECRET=$(openssl rand -hex 32)    # min 16 chars

# RECOMMENDED — enables encryption at rest:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Server secara aktif menolak nilai yang diketahui lemah seperti `changeme`, `secret`, atau `password`.

---

## Keamanan Docker

- Gunakan pengguna non-root di lingkungan produksi
- Pasang rahasia sebagai volume hanya-baca
- Jangan pernah menyalin file `.env` ke dalam image Docker
- Gunakan `.dockerignore` untuk mengecualikan file sensitif
- Setel `AUTH_COOKIE_SECURE=true` saat berada di belakang HTTPS

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Dependensi

- Jalankan `npm audit` secara berkala
- Jaga agar dependensi tetap diperbarui
- Proyek menggunakan `husky` + `lint-staged` untuk pemeriksaan pra-commit
- Pipeline CI menjalankan aturan keamanan ESLint pada setiap push
- Konstanta penyedia divalidasi saat pemuatan modul melalui Zod (`src/shared/validation/providerSchema.ts`)
