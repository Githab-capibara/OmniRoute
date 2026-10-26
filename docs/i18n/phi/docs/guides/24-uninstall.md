# OmniRoute — Uninstall Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/24-uninstall.md) · 🇸🇦 [ar](../../../ar/docs/guides/24-uninstall.md) · 🇦🇿 [az](../../../az/docs/guides/24-uninstall.md) · 🇧🇬 [bg](../../../bg/docs/guides/24-uninstall.md) · 🇧🇩 [bn](../../../bn/docs/guides/24-uninstall.md) · 🇨🇿 [cs](../../../cs/docs/guides/24-uninstall.md) · 🇩🇰 [da](../../../da/docs/guides/24-uninstall.md) · 🇩🇪 [de](../../../de/docs/guides/24-uninstall.md) · 🇬🇷 [el](../../../el/docs/guides/24-uninstall.md) · 🇪🇸 [es](../../../es/docs/guides/24-uninstall.md) · 🇪🇪 [et](../../../et/docs/guides/24-uninstall.md) · 🇮🇷 [fa](../../../fa/docs/guides/24-uninstall.md) · 🇫🇮 [fi](../../../fi/docs/guides/24-uninstall.md) · 🇫🇷 [fr](../../../fr/docs/guides/24-uninstall.md) · 🇮🇪 [ga](../../../ga/docs/guides/24-uninstall.md) · 🇮🇳 [gu](../../../gu/docs/guides/24-uninstall.md) · 🇮🇱 [he](../../../he/docs/guides/24-uninstall.md) · 🇮🇳 [hi](../../../hi/docs/guides/24-uninstall.md) · 🇭🇷 [hr](../../../hr/docs/guides/24-uninstall.md) · 🇭🇺 [hu](../../../hu/docs/guides/24-uninstall.md) · 🇮🇩 [id](../../../id/docs/guides/24-uninstall.md) · 🇮🇹 [it](../../../it/docs/guides/24-uninstall.md) · 🇯🇵 [ja](../../../ja/docs/guides/24-uninstall.md) · 🇰🇷 [ko](../../../ko/docs/guides/24-uninstall.md) · 🇱🇹 [lt](../../../lt/docs/guides/24-uninstall.md) · 🇱🇻 [lv](../../../lv/docs/guides/24-uninstall.md) · 🇮🇳 [mr](../../../mr/docs/guides/24-uninstall.md) · 🇲🇾 [ms](../../../ms/docs/guides/24-uninstall.md) · 🇲🇹 [mt](../../../mt/docs/guides/24-uninstall.md) · 🇳🇱 [nl](../../../nl/docs/guides/24-uninstall.md) · 🇳🇴 [no](../../../no/docs/guides/24-uninstall.md) · 🇵🇱 [pl](../../../pl/docs/guides/24-uninstall.md) · 🇵🇹 [pt](../../../pt/docs/guides/24-uninstall.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/24-uninstall.md) · 🇷🇴 [ro](../../../ro/docs/guides/24-uninstall.md) · 🇷🇺 [ru](../../../ru/docs/guides/24-uninstall.md) · 🇸🇰 [sk](../../../sk/docs/guides/24-uninstall.md) · 🇸🇮 [sl](../../../sl/docs/guides/24-uninstall.md) · 🇷🇸 [sr](../../../sr/docs/guides/24-uninstall.md) · 🇸🇪 [sv](../../../sv/docs/guides/24-uninstall.md) · 🇰🇪 [sw](../../../sw/docs/guides/24-uninstall.md) · 🇮🇳 [ta](../../../ta/docs/guides/24-uninstall.md) · 🇮🇳 [te](../../../te/docs/guides/24-uninstall.md) · 🇹🇭 [th](../../../th/docs/guides/24-uninstall.md) · 🇹🇷 [tr](../../../tr/docs/guides/24-uninstall.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/24-uninstall.md) · 🇵🇰 [ur](../../../ur/docs/guides/24-uninstall.md) · 🇻🇳 [vi](../../../vi/docs/guides/24-uninstall.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/24-uninstall.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/24-uninstall.md)

---

This guide covers how to cleanly remove OmniRoute from your system.

---

## Quick Uninstall (v3.6.2+)

OmniRoute provides two built-in scripts for clean removal:

### Keep Your Data

```bash
npm run uninstall
```

This removes the OmniRoute application but **preserves** your database, configurations, API keys, and provider settings in `~/.omniroute/`. Use this if you plan to reinstall later and want to keep your setup.

### Full Removal

```bash
npm run uninstall:full
```

This removes the application **and permanently erases** all data:

- Database (`storage.sqlite`)
- Provider configurations and API keys
- Backup files
- Log files
- All files in the `~/.omniroute/` directory

> ⚠️ **Warning:** `npm run uninstall:full` is irreversible. All your provider connections, combos, API keys, and usage history will be permanently deleted.

---

## Manual Uninstall

### NPM Global Install

```bash
# Remove the global package
npm uninstall -g omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

### pnpm Global Install

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

### Electron Desktop App

**Windows:**

- Open `Settings → Apps → OmniRoute → Uninstall`
- Or run the NSIS uninstaller from the install directory

**macOS:**

- Drag `OmniRoute.app` from `/Applications` to Trash
- Remove data: `rm -rf ~/Library/Application Support/omniroute`

**Linux:**

- Remove the AppImage file
- Remove data: `rm -rf ~/.omniroute`

### Source Install (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

---

## Data Directories

OmniRoute stores data in the following locations by default:

| Platform      | Default Path                  | Override                  |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` env var        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` env var |

### Files in the data directory

| File/Directory       | Description                                       |
| -------------------- | ------------------------------------------------- |
| `storage.sqlite`     | Main database (providers, combos, settings, keys) |
| `storage.sqlite-wal` | SQLite write-ahead log (temporary)                |
| `storage.sqlite-shm` | SQLite shared memory (temporary)                  |
| `call_logs/`         | Request payload archives                          |
| `backups/`           | Automatic database backups                        |
| `log.txt`            | Legacy request log (optional)                     |

---

## Verify Complete Removal

After uninstalling, verify there are no remaining files:

```bash
# Check for global npm package
npm list -g omniroute 2>/dev/null

# Check for data directory
ls -la ~/.omniroute/ 2>/dev/null

# Check for running processes
pgrep -f omniroute
```

If any process is still running, stop it:

```bash
pkill -f omniroute
```
