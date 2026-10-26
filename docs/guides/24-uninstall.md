---
title: "OmniRoute — Uninstall Guide"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Uninstall Guide

🌐 **Languages:** 🇺🇸 [English](./24-uninstall.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/24-uninstall.md) | 🇦🇿 [Azərbaycan dili](../i18n/az/docs/guides/24-uninstall.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/24-uninstall.md) | 🇧🇩 [বাংলা](../i18n/bn/docs/guides/24-uninstall.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/24-uninstall.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/24-uninstall.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/24-uninstall.md) | 🇬🇷 [Ελληνικά](../i18n/el/docs/guides/24-uninstall.md) | 🇪🇸 [Español](../i18n/es/docs/guides/24-uninstall.md) | 🇪🇪 [Eesti](../i18n/et/docs/guides/24-uninstall.md) | 🇮🇷 [فارسی](../i18n/fa/docs/guides/24-uninstall.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/24-uninstall.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/24-uninstall.md) | 🇮🇪 [Gaeilge](../i18n/ga/docs/guides/24-uninstall.md) | 🇮🇳 [ગુજરાતી](../i18n/gu/docs/guides/24-uninstall.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/24-uninstall.md) | 🇮🇳 [हिन्दी](../i18n/hi/docs/guides/24-uninstall.md) | 🇭🇷 [Hrvatski](../i18n/hr/docs/guides/24-uninstall.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/24-uninstall.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/24-uninstall.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/24-uninstall.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/24-uninstall.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/24-uninstall.md) | 🇱🇹 [Lietuvių](../i18n/lt/docs/guides/24-uninstall.md) | 🇱🇻 [Latviešu](../i18n/lv/docs/guides/24-uninstall.md) | 🇮🇳 [मराठी](../i18n/mr/docs/guides/24-uninstall.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/24-uninstall.md) | 🇲🇹 [Malti](../i18n/mt/docs/guides/24-uninstall.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/24-uninstall.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/24-uninstall.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/24-uninstall.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/24-uninstall.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/24-uninstall.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/24-uninstall.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/24-uninstall.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/24-uninstall.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/24-uninstall.md) | 🇸🇮 [Slovenščina](../i18n/sl/docs/guides/24-uninstall.md) | 🇷🇸 [Српски](../i18n/sr/docs/guides/24-uninstall.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/24-uninstall.md) | 🇰🇪 [Kiswahili](../i18n/sw/docs/guides/24-uninstall.md) | 🇮🇳 [தமிழ்](../i18n/ta/docs/guides/24-uninstall.md) | 🇮🇳 [తెలుగు](../i18n/te/docs/guides/24-uninstall.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/24-uninstall.md) | 🇹🇷 [Türkçe](../i18n/tr/docs/guides/24-uninstall.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/24-uninstall.md) | 🇵🇰 [اردو](../i18n/ur/docs/guides/24-uninstall.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/24-uninstall.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/24-uninstall.md) | 🇹🇼 [中文 (繁體)](../i18n/zh-TW/docs/guides/24-uninstall.md)

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
