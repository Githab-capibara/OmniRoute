# OmniRoute — Panduan Mencopot Pemasangan (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/24-uninstall.md) · 🇸🇦 [ar](../../../ar/docs/guides/24-uninstall.md) · 🇦🇿 [az](../../../az/docs/guides/24-uninstall.md) · 🇧🇬 [bg](../../../bg/docs/guides/24-uninstall.md) · 🇧🇩 [bn](../../../bn/docs/guides/24-uninstall.md) · 🇨🇿 [cs](../../../cs/docs/guides/24-uninstall.md) · 🇩🇰 [da](../../../da/docs/guides/24-uninstall.md) · 🇩🇪 [de](../../../de/docs/guides/24-uninstall.md) · 🇬🇷 [el](../../../el/docs/guides/24-uninstall.md) · 🇪🇸 [es](../../../es/docs/guides/24-uninstall.md) · 🇪🇪 [et](../../../et/docs/guides/24-uninstall.md) · 🇮🇷 [fa](../../../fa/docs/guides/24-uninstall.md) · 🇫🇮 [fi](../../../fi/docs/guides/24-uninstall.md) · 🇫🇷 [fr](../../../fr/docs/guides/24-uninstall.md) · 🇮🇪 [ga](../../../ga/docs/guides/24-uninstall.md) · 🇮🇳 [gu](../../../gu/docs/guides/24-uninstall.md) · 🇮🇱 [he](../../../he/docs/guides/24-uninstall.md) · 🇮🇳 [hi](../../../hi/docs/guides/24-uninstall.md) · 🇭🇷 [hr](../../../hr/docs/guides/24-uninstall.md) · 🇭🇺 [hu](../../../hu/docs/guides/24-uninstall.md) · 🇮🇹 [it](../../../it/docs/guides/24-uninstall.md) · 🇯🇵 [ja](../../../ja/docs/guides/24-uninstall.md) · 🇰🇷 [ko](../../../ko/docs/guides/24-uninstall.md) · 🇱🇹 [lt](../../../lt/docs/guides/24-uninstall.md) · 🇱🇻 [lv](../../../lv/docs/guides/24-uninstall.md) · 🇮🇳 [mr](../../../mr/docs/guides/24-uninstall.md) · 🇲🇾 [ms](../../../ms/docs/guides/24-uninstall.md) · 🇲🇹 [mt](../../../mt/docs/guides/24-uninstall.md) · 🇳🇱 [nl](../../../nl/docs/guides/24-uninstall.md) · 🇳🇴 [no](../../../no/docs/guides/24-uninstall.md) · 🇵🇭 [phi](../../../phi/docs/guides/24-uninstall.md) · 🇵🇱 [pl](../../../pl/docs/guides/24-uninstall.md) · 🇵🇹 [pt](../../../pt/docs/guides/24-uninstall.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/24-uninstall.md) · 🇷🇴 [ro](../../../ro/docs/guides/24-uninstall.md) · 🇷🇺 [ru](../../../ru/docs/guides/24-uninstall.md) · 🇸🇰 [sk](../../../sk/docs/guides/24-uninstall.md) · 🇸🇮 [sl](../../../sl/docs/guides/24-uninstall.md) · 🇷🇸 [sr](../../../sr/docs/guides/24-uninstall.md) · 🇸🇪 [sv](../../../sv/docs/guides/24-uninstall.md) · 🇰🇪 [sw](../../../sw/docs/guides/24-uninstall.md) · 🇮🇳 [ta](../../../ta/docs/guides/24-uninstall.md) · 🇮🇳 [te](../../../te/docs/guides/24-uninstall.md) · 🇹🇭 [th](../../../th/docs/guides/24-uninstall.md) · 🇹🇷 [tr](../../../tr/docs/guides/24-uninstall.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/24-uninstall.md) · 🇵🇰 [ur](../../../ur/docs/guides/24-uninstall.md) · 🇻🇳 [vi](../../../vi/docs/guides/24-uninstall.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/24-uninstall.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/24-uninstall.md)

---

Panduan ini menjelaskan cara mencopot pemasangan OmniRoute dari sistem Anda secara bersih.

---

## Mencopot Pemasangan dengan Cepat (v3.6.2+)

OmniRoute menyediakan dua skrip bawaan untuk penghapusan yang bersih:

### Pertahankan Data Anda

```bash
npm run uninstall
```

Perintah ini menghapus aplikasi OmniRoute tetapi **mempertahankan** basis data, konfigurasi, kunci API, dan pengaturan penyedia Anda di `~/.omniroute/`. Gunakan ini jika Anda berencana memasang ulang nanti dan ingin menyimpan pengaturan yang ada.

### Penghapusan Penuh

```bash
npm run uninstall:full
```

Perintah ini menghapus aplikasi **dan menghapus secara permanen** semua data:

- Basis data (`storage.sqlite`)
- Konfigurasi penyedia dan kunci API
- Berkas cadangan
- Berkas log
- Semua berkas di direktori `~/.omniroute/`

> ⚠️ **Peringatan:** `npm run uninstall:full` tidak dapat dibatalkan. Semua koneksi penyedia, combo, kunci API, dan riwayat penggunaan Anda akan dihapus secara permanen.

---

## Mencopot Pemasangan Secara Manual

### Instalasi Global NPM

```bash
# Remove the global package
npm uninstall -g omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

### Instalasi Global pnpm

```bash
pnpm uninstall -g omniroute
rm -rf ~/.omniroute
```

### Docker

```bash
# Stop and remove the container
docker stop omniroute
docker rm omniroute

# Remove the volume (deletes all data)
docker volume rm omniroute-data

# (Optional) Remove the image
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# Stop and remove containers
docker compose down

# Also remove volumes (deletes all data)
docker compose down -v
```

### Aplikasi Desktop Electron

**Windows:**

- Buka `Settings → Apps → OmniRoute → Uninstall`
- Atau jalankan uninstaller NSIS dari direktori instalasi

**macOS:**

- Seret `OmniRoute.app` dari `/Applications` ke Trash
- Hapus data: `rm -rf ~/Library/Application Support/omniroute`

**Linux:**

- Hapus berkas AppImage
- Hapus data: `rm -rf ~/.omniroute`

### Instalasi dari Sumber (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

---

## Direktori Data

OmniRoute menyimpan data di lokasi-lokasi berikut secara default:

| Platform      | Jalur Default                 | Pengganti                 |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` env var        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` env var |

### Berkas di dalam direktori data

| Berkas/Direktori     | Deskripsi                                             |
| -------------------- | ----------------------------------------------------- |
| `storage.sqlite`     | Basis data utama (penyedia, combo, pengaturan, kunci) |
| `storage.sqlite-wal` | Write-ahead log SQLite (sementara)                    |
| `storage.sqlite-shm` | Shared memory SQLite (sementara)                      |
| `call_logs/`         | Arsip payload permintaan                              |
| `backups/`           | Cadangan basis data otomatis                          |
| `log.txt`            | Log permintaan lama (opsional)                        |

---

## Verifikasi Penghapusan Lengkap

Setelah mencopot pemasangan, verifikasi bahwa tidak ada berkas yang tersisa:

```bash
# Check for global npm package
npm list -g omniroute 2>/dev/null

# Check for data directory
ls -la ~/.omniroute/ 2>/dev/null

# Check for running processes
pgrep -f omniroute
```

Jika ada proses yang masih berjalan, hentikan dengan perintah berikut:

```bash
pkill -f omniroute
```
