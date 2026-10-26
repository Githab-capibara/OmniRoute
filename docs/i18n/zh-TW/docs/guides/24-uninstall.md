---
title: "OmniRoute — 解除安裝指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 解除安裝指南

🌐 **Languages:** 🇺🇸 [English](../../../../guides/24-uninstall.md) · 🇸🇦 [ar](../../../ar/docs/guides/24-uninstall.md) · 🇦🇿 [az](../../../az/docs/guides/24-uninstall.md) · 🇧🇬 [bg](../../../bg/docs/guides/24-uninstall.md) · 🇧🇩 [bn](../../../bn/docs/guides/24-uninstall.md) · 🇨🇿 [cs](../../../cs/docs/guides/24-uninstall.md) · 🇩🇰 [da](../../../da/docs/guides/24-uninstall.md) · 🇩🇪 [de](../../../de/docs/guides/24-uninstall.md) · 🇬🇷 [el](../../../el/docs/guides/24-uninstall.md) · 🇪🇸 [es](../../../es/docs/guides/24-uninstall.md) · 🇪🇪 [et](../../../et/docs/guides/24-uninstall.md) · 🇮🇷 [fa](../../../fa/docs/guides/24-uninstall.md) · 🇫🇮 [fi](../../../fi/docs/guides/24-uninstall.md) · 🇫🇷 [fr](../../../fr/docs/guides/24-uninstall.md) · 🇮🇪 [ga](../../../ga/docs/guides/24-uninstall.md) · 🇮🇳 [gu](../../../gu/docs/guides/24-uninstall.md) · 🇮🇱 [he](../../../he/docs/guides/24-uninstall.md) · 🇮🇳 [hi](../../../hi/docs/guides/24-uninstall.md) · 🇭🇷 [hr](../../../hr/docs/guides/24-uninstall.md) · 🇭🇺 [hu](../../../hu/docs/guides/24-uninstall.md) · 🇮🇩 [id](../../../id/docs/guides/24-uninstall.md) · 🇮🇹 [it](../../../it/docs/guides/24-uninstall.md) · 🇯🇵 [ja](../../../ja/docs/guides/24-uninstall.md) · 🇰🇷 [ko](../../../ko/docs/guides/24-uninstall.md) · 🇱🇹 [lt](../../../lt/docs/guides/24-uninstall.md) · 🇱🇻 [lv](../../../lv/docs/guides/24-uninstall.md) · 🇮🇳 [mr](../../../mr/docs/guides/24-uninstall.md) · 🇲🇾 [ms](../../../ms/docs/guides/24-uninstall.md) · 🇲🇹 [mt](../../../mt/docs/guides/24-uninstall.md) · 🇳🇱 [nl](../../../nl/docs/guides/24-uninstall.md) · 🇳🇴 [no](../../../no/docs/guides/24-uninstall.md) · 🇵🇭 [phi](../../../phi/docs/guides/24-uninstall.md) · 🇵🇱 [pl](../../../pl/docs/guides/24-uninstall.md) · 🇵🇹 [pt](../../../pt/docs/guides/24-uninstall.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/24-uninstall.md) · 🇷🇴 [ro](../../../ro/docs/guides/24-uninstall.md) · 🇷🇺 [ru](../../../ru/docs/guides/24-uninstall.md) · 🇸🇰 [sk](../../../sk/docs/guides/24-uninstall.md) · 🇸🇮 [sl](../../../sl/docs/guides/24-uninstall.md) · 🇷🇸 [sr](../../../sr/docs/guides/24-uninstall.md) · 🇸🇪 [sv](../../../sv/docs/guides/24-uninstall.md) · 🇰🇪 [sw](../../../sw/docs/guides/24-uninstall.md) · 🇮🇳 [ta](../../../ta/docs/guides/24-uninstall.md) · 🇮🇳 [te](../../../te/docs/guides/24-uninstall.md) · 🇹🇭 [th](../../../th/docs/guides/24-uninstall.md) · 🇹🇷 [tr](../../../tr/docs/guides/24-uninstall.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/24-uninstall.md) · 🇵🇰 [ur](../../../ur/docs/guides/24-uninstall.md) · 🇻🇳 [vi](../../../vi/docs/guides/24-uninstall.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/24-uninstall.md)

本指南說明如何從系統中徹底移除 OmniRoute。

---

## 快速解除安裝（v3.6.2+）

OmniRoute 提供兩個內建指令碼來進行乾淨的移除：

### 保留資料

```bash
npm run uninstall
```

此指令會移除 OmniRoute 應用程式，但**保留**您的資料庫、設定檔、API 金鑰及提供者設定於 `~/.omniroute/`。若您日後打算重新安裝並保留既有設定，請使用此方式。

### 完整移除

```bash
npm run uninstall:full
```

此指令會移除應用程式，**並永久刪除**所有資料：

- 資料庫（`storage.sqlite`）
- 提供者設定與 API 金鑰
- 備份檔案
- 日誌檔案
- `~/.omniroute/` 目錄中的所有檔案

> ⚠️ **警告：** `npm run uninstall:full` 為不可逆操作。所有提供者連線、組合設定、API 金鑰及使用記錄都將永久刪除。

---

## 手動解除安裝

### NPM 全域安裝

```bash
# 移除全域套件
npm uninstall -g omniroute

# （選擇性）移除資料目錄
rm -rf ~/.omniroute
```

### pnpm 全域安裝

```bash
pnpm uninstall -g omniroute
rm -rf ~/.omniroute
```

### Docker

```bash
# 停止並移除容器
docker stop omniroute
docker rm omniroute

# 移除資料卷（刪除所有資料）
docker volume rm omniroute-data

# （選擇性）移除映像檔
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# 停止並移除容器
docker compose down

# 一併移除資料卷（刪除所有資料）
docker compose down -v
```

### Electron 桌面應用程式

**Windows：**

- 開啟 `設定 → 應用程式 → OmniRoute → 解除安裝`
- 或從安裝目錄執行 NSIS 解除安裝程式

**macOS：**

- 將 `/Applications` 中的 `OmniRoute.app` 拖入垃圾桶
- 移除資料：`rm -rf ~/Library/Application Support/omniroute`

**Linux：**

- 刪除 AppImage 檔案
- 移除資料：`rm -rf ~/.omniroute`

### 原始碼安裝（git clone）

```bash
# 移除複製的目錄
rm -rf /path/to/omniroute

# （選擇性）移除資料目錄
rm -rf ~/.omniroute
```

---

## 資料目錄

OmniRoute 預設將資料存放於以下位置：

| 平台         | 預設路徑                      | 覆蓋方式                   |
| ------------ | ----------------------------- | -------------------------- |
| Linux        | `~/.omniroute/`               | `DATA_DIR` 環境變數        |
| macOS        | `~/.omniroute/`               | `DATA_DIR` 環境變數        |
| Windows      | `%APPDATA%/omniroute/`        | `DATA_DIR` 環境變數        |
| Docker       | `/app/data/`（掛載資料卷）    | `DATA_DIR` 環境變數        |
| XDG 相容模式 | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` 環境變數 |

### 資料目錄中的檔案

| 檔案/目錄            | 說明                                   |
| -------------------- | -------------------------------------- |
| `storage.sqlite`     | 主要資料庫（提供者、組合、設定、金鑰） |
| `storage.sqlite-wal` | SQLite 預寫式日誌（暫存）              |
| `storage.sqlite-shm` | SQLite 共享記憶體（暫存）              |
| `call_logs/`         | 請求承載記錄封存                       |
| `backups/`           | 自動資料庫備份                         |
| `log.txt`            | 舊版請求日誌（選用）                   |

---

## 驗證是否完整移除

解除安裝後，請確認無殘留檔案：

```bash
# 檢查全域 npm 套件
npm list -g omniroute 2>/dev/null

# 檢查資料目錄
ls -la ~/.omniroute/ 2>/dev/null

# 檢查正在執行的程序
pgrep -f omniroute
```

若仍有程序在執行，請將其停止：

```bash
pkill -f omniroute
```
