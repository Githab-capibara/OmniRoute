---
title: "OmniRoute — Przewodnik deinstalacji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Przewodnik deinstalacji

🌐 **Languages:** 🇺🇸 [English](../../../../guides/24-uninstall.md) · 🇸🇦 [ar](../../../ar/docs/guides/24-uninstall.md) · 🇦🇿 [az](../../../az/docs/guides/24-uninstall.md) · 🇧🇬 [bg](../../../bg/docs/guides/24-uninstall.md) · 🇧🇩 [bn](../../../bn/docs/guides/24-uninstall.md) · 🇨🇿 [cs](../../../cs/docs/guides/24-uninstall.md) · 🇩🇰 [da](../../../da/docs/guides/24-uninstall.md) · 🇩🇪 [de](../../../de/docs/guides/24-uninstall.md) · 🇬🇷 [el](../../../el/docs/guides/24-uninstall.md) · 🇪🇸 [es](../../../es/docs/guides/24-uninstall.md) · 🇪🇪 [et](../../../et/docs/guides/24-uninstall.md) · 🇮🇷 [fa](../../../fa/docs/guides/24-uninstall.md) · 🇫🇮 [fi](../../../fi/docs/guides/24-uninstall.md) · 🇫🇷 [fr](../../../fr/docs/guides/24-uninstall.md) · 🇮🇪 [ga](../../../ga/docs/guides/24-uninstall.md) · 🇮🇳 [gu](../../../gu/docs/guides/24-uninstall.md) · 🇮🇱 [he](../../../he/docs/guides/24-uninstall.md) · 🇮🇳 [hi](../../../hi/docs/guides/24-uninstall.md) · 🇭🇷 [hr](../../../hr/docs/guides/24-uninstall.md) · 🇭🇺 [hu](../../../hu/docs/guides/24-uninstall.md) · 🇮🇩 [id](../../../id/docs/guides/24-uninstall.md) · 🇮🇹 [it](../../../it/docs/guides/24-uninstall.md) · 🇯🇵 [ja](../../../ja/docs/guides/24-uninstall.md) · 🇰🇷 [ko](../../../ko/docs/guides/24-uninstall.md) · 🇱🇹 [lt](../../../lt/docs/guides/24-uninstall.md) · 🇱🇻 [lv](../../../lv/docs/guides/24-uninstall.md) · 🇮🇳 [mr](../../../mr/docs/guides/24-uninstall.md) · 🇲🇾 [ms](../../../ms/docs/guides/24-uninstall.md) · 🇲🇹 [mt](../../../mt/docs/guides/24-uninstall.md) · 🇳🇱 [nl](../../../nl/docs/guides/24-uninstall.md) · 🇳🇴 [no](../../../no/docs/guides/24-uninstall.md) · 🇵🇭 [phi](../../../phi/docs/guides/24-uninstall.md) · 🇵🇹 [pt](../../../pt/docs/guides/24-uninstall.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/24-uninstall.md) · 🇷🇴 [ro](../../../ro/docs/guides/24-uninstall.md) · 🇷🇺 [ru](../../../ru/docs/guides/24-uninstall.md) · 🇸🇰 [sk](../../../sk/docs/guides/24-uninstall.md) · 🇸🇮 [sl](../../../sl/docs/guides/24-uninstall.md) · 🇷🇸 [sr](../../../sr/docs/guides/24-uninstall.md) · 🇸🇪 [sv](../../../sv/docs/guides/24-uninstall.md) · 🇰🇪 [sw](../../../sw/docs/guides/24-uninstall.md) · 🇮🇳 [ta](../../../ta/docs/guides/24-uninstall.md) · 🇮🇳 [te](../../../te/docs/guides/24-uninstall.md) · 🇹🇭 [th](../../../th/docs/guides/24-uninstall.md) · 🇹🇷 [tr](../../../tr/docs/guides/24-uninstall.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/24-uninstall.md) · 🇵🇰 [ur](../../../ur/docs/guides/24-uninstall.md) · 🇻🇳 [vi](../../../vi/docs/guides/24-uninstall.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/24-uninstall.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/24-uninstall.md)

Ten przewodnik opisuje, jak czysto usunąć OmniRoute z systemu.

---

## Szybka deinstalacja (v3.6.2+)

OmniRoute udostępnia dwa wbudowane skrypty do czystego usunięcia:

### Zachowaj dane

```bash
npm run uninstall
```

To usuwa aplikację OmniRoute, ale **zachowuje** bazę danych, konfiguracje, klucze API oraz ustawienia providerów w `~/.omniroute/`. Użyj tej opcji, jeśli planujesz ponowną instalację i chcesz zachować swoją konfigurację.

### Pełne usunięcie

```bash
npm run uninstall:full
```

To usuwa aplikację **i trwale kasuje** wszystkie dane:

- Bazę danych (`storage.sqlite`)
- Konfiguracje providerów i klucze API
- Pliki kopii zapasowych
- Pliki logów
- Wszystkie pliki w katalogu `~/.omniroute/`

> ⚠️ **Ostrzeżenie:** `npm run uninstall:full` jest nieodwracalne. Wszystkie połączenia z providerami, combo, klucze API oraz historia użycia zostaną trwale usunięte.

---

## Deinstalacja ręczna

### Instalacja globalna NPM

```bash
# Remove the global package
npm uninstall -g omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

### Instalacja globalna pnpm

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

### Aplikacja desktopowa Electron

**Windows:**

- Otwórz `Settings → Apps → OmniRoute → Uninstall`
- Lub uruchom deinstalator NSIS z katalogu instalacji

**macOS:**

- Przeciągnij `OmniRoute.app` z `/Applications` do Kosza
- Usuń dane: `rm -rf ~/Library/Application Support/omniroute`

**Linux:**

- Usuń plik AppImage
- Usuń dane: `rm -rf ~/.omniroute`

### Instalacja ze źródeł (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

---

## Katalogi danych

OmniRoute domyślnie przechowuje dane w następujących lokalizacjach:

| Platforma     | Domyślna ścieżka              | Nadpisanie                |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` env var        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` env var |

### Pliki w katalogu danych

| Plik/katalog         | Opis                                                      |
| -------------------- | --------------------------------------------------------- |
| `storage.sqlite`     | Główna baza danych (providery, combo, ustawienia, klucze) |
| `storage.sqlite-wal` | Dziennik write-ahead SQLite (tymczasowy)                  |
| `storage.sqlite-shm` | Pamięć współdzielona SQLite (tymczasowa)                  |
| `call_logs/`         | Archiwa payloadów żądań                                   |
| `backups/`           | Automatyczne kopie zapasowe bazy danych                   |
| `log.txt`            | Starszy log żądań (opcjonalny)                            |

---

## Weryfikacja pełnego usunięcia

Po deinstalacji sprawdź, czy nie pozostały żadne pliki:

```bash
# Check for global npm package
npm list -g omniroute 2>/dev/null

# Check for data directory
ls -la ~/.omniroute/ 2>/dev/null

# Check for running processes
pgrep -f omniroute
```

Jeśli jakiś proces nadal działa, zatrzymaj go:

```bash
pkill -f omniroute
```
