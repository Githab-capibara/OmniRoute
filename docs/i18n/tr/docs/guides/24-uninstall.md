---
title: "OmniRoute — Kaldırma Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute — Kaldırma Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/24-uninstall.md) · 🇸🇦 [ar](../../../ar/docs/guides/24-uninstall.md) · 🇦🇿 [az](../../../az/docs/guides/24-uninstall.md) · 🇧🇬 [bg](../../../bg/docs/guides/24-uninstall.md) · 🇧🇩 [bn](../../../bn/docs/guides/24-uninstall.md) · 🇨🇿 [cs](../../../cs/docs/guides/24-uninstall.md) · 🇩🇰 [da](../../../da/docs/guides/24-uninstall.md) · 🇩🇪 [de](../../../de/docs/guides/24-uninstall.md) · 🇬🇷 [el](../../../el/docs/guides/24-uninstall.md) · 🇪🇸 [es](../../../es/docs/guides/24-uninstall.md) · 🇪🇪 [et](../../../et/docs/guides/24-uninstall.md) · 🇮🇷 [fa](../../../fa/docs/guides/24-uninstall.md) · 🇫🇮 [fi](../../../fi/docs/guides/24-uninstall.md) · 🇫🇷 [fr](../../../fr/docs/guides/24-uninstall.md) · 🇮🇪 [ga](../../../ga/docs/guides/24-uninstall.md) · 🇮🇳 [gu](../../../gu/docs/guides/24-uninstall.md) · 🇮🇱 [he](../../../he/docs/guides/24-uninstall.md) · 🇮🇳 [hi](../../../hi/docs/guides/24-uninstall.md) · 🇭🇷 [hr](../../../hr/docs/guides/24-uninstall.md) · 🇭🇺 [hu](../../../hu/docs/guides/24-uninstall.md) · 🇮🇩 [id](../../../id/docs/guides/24-uninstall.md) · 🇮🇹 [it](../../../it/docs/guides/24-uninstall.md) · 🇯🇵 [ja](../../../ja/docs/guides/24-uninstall.md) · 🇰🇷 [ko](../../../ko/docs/guides/24-uninstall.md) · 🇱🇹 [lt](../../../lt/docs/guides/24-uninstall.md) · 🇱🇻 [lv](../../../lv/docs/guides/24-uninstall.md) · 🇮🇳 [mr](../../../mr/docs/guides/24-uninstall.md) · 🇲🇾 [ms](../../../ms/docs/guides/24-uninstall.md) · 🇲🇹 [mt](../../../mt/docs/guides/24-uninstall.md) · 🇳🇱 [nl](../../../nl/docs/guides/24-uninstall.md) · 🇳🇴 [no](../../../no/docs/guides/24-uninstall.md) · 🇵🇭 [phi](../../../phi/docs/guides/24-uninstall.md) · 🇵🇱 [pl](../../../pl/docs/guides/24-uninstall.md) · 🇵🇹 [pt](../../../pt/docs/guides/24-uninstall.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/24-uninstall.md) · 🇷🇴 [ro](../../../ro/docs/guides/24-uninstall.md) · 🇷🇺 [ru](../../../ru/docs/guides/24-uninstall.md) · 🇸🇰 [sk](../../../sk/docs/guides/24-uninstall.md) · 🇸🇮 [sl](../../../sl/docs/guides/24-uninstall.md) · 🇷🇸 [sr](../../../sr/docs/guides/24-uninstall.md) · 🇸🇪 [sv](../../../sv/docs/guides/24-uninstall.md) · 🇰🇪 [sw](../../../sw/docs/guides/24-uninstall.md) · 🇮🇳 [ta](../../../ta/docs/guides/24-uninstall.md) · 🇮🇳 [te](../../../te/docs/guides/24-uninstall.md) · 🇹🇭 [th](../../../th/docs/guides/24-uninstall.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/24-uninstall.md) · 🇵🇰 [ur](../../../ur/docs/guides/24-uninstall.md) · 🇻🇳 [vi](../../../vi/docs/guides/24-uninstall.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/24-uninstall.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/24-uninstall.md)

---

Bu kılavuz, OmniRoute'u sisteminizden nasıl temiz bir şekilde kaldıracağınızı kapsar.

---

## Hızlı Kaldırma (v3.6.2+)

OmniRoute temiz kaldırma için iki yerleşik betik sunar:

### Verilerinizi Koruyarak Kaldırma

```bash
npm run uninstall
```

Bu, OmniRoute uygulamasını kaldırır ancak `~/.omniroute/` içindeki veritabanınızı, yapılandırmalarınızı, API anahtarlarınızı ve sağlayıcı ayarlarınızı **korur**. Daha sonra yeniden yüklemeyi planlıyorsanız ve kurulumunuzu saklamak istiyorsanız bunu kullanın.

### Tam Kaldırma (Tüm Verileri Sil)

```bash
npm run uninstall:full
```

Bu, uygulamayı kaldırır **ve tüm verileri kalıcı olarak siler**:

- Veritabanı (`storage.sqlite`)
- Sağlayıcı yapılandırmaları ve API anahtarları
- Yedekleme dosyaları
- Günlük dosyaları
- `~/.omniroute/` dizinindeki tüm dosyalar

> ⚠️ **Uyarı:** `npm run uninstall:full` işlemi geri alınamaz. Tüm sağlayıcı bağlantılarınız, kombolarınız, API anahtarlarınız ve kullanım geçmişiniz kalıcı olarak silinir.

---

## Manuel Kaldırma

### NPM Global Kurulumu

```bash
# Global paketi kaldırın
npm uninstall -g omniroute

# (İsteğe bağlı) Veri dizinini silin
rm -rf ~/.omniroute
```

### Docker

```bash
# Konteyneri durdurun ve silin
docker stop omniroute
docker rm omniroute

# Hacmi kaldırın (tüm verileri siler)
docker volume rm omniroute-data

# (İsteğe bağlı) İmajı silin
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# Konteynerleri durdurun ve kaldırın
docker compose down

# Hacimleri de kaldırın (tüm verileri siler)
docker compose down -v
```

### Electron Masaüstü Uygulaması

**macOS:**

- `OmniRoute.app` uygulamasını `/Applications` dizininden Çöp Sepetine sürükleyin
- Verileri silin: `rm -rf ~/Library/Application Support/omniroute`

**Windows:**

- `Ayarlar → Uygulamalar → OmniRoute → Kaldır`

**Linux:**

- AppImage veya paket yöneticisi üzerinden kaldırın
- Verileri silin: `rm -rf ~/.config/omniroute`
