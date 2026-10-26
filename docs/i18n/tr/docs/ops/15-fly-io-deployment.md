---
title: "OmniRoute Fly.io Dağıtım Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute Fly.io Dağıtım Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/15-fly-io-deployment.md) · 🇸🇦 [ar](../../../ar/docs/ops/15-fly-io-deployment.md) · 🇦🇿 [az](../../../az/docs/ops/15-fly-io-deployment.md) · 🇧🇬 [bg](../../../bg/docs/ops/15-fly-io-deployment.md) · 🇧🇩 [bn](../../../bn/docs/ops/15-fly-io-deployment.md) · 🇨🇿 [cs](../../../cs/docs/ops/15-fly-io-deployment.md) · 🇩🇰 [da](../../../da/docs/ops/15-fly-io-deployment.md) · 🇩🇪 [de](../../../de/docs/ops/15-fly-io-deployment.md) · 🇬🇷 [el](../../../el/docs/ops/15-fly-io-deployment.md) · 🇪🇸 [es](../../../es/docs/ops/15-fly-io-deployment.md) · 🇪🇪 [et](../../../et/docs/ops/15-fly-io-deployment.md) · 🇮🇷 [fa](../../../fa/docs/ops/15-fly-io-deployment.md) · 🇫🇮 [fi](../../../fi/docs/ops/15-fly-io-deployment.md) · 🇫🇷 [fr](../../../fr/docs/ops/15-fly-io-deployment.md) · 🇮🇪 [ga](../../../ga/docs/ops/15-fly-io-deployment.md) · 🇮🇳 [gu](../../../gu/docs/ops/15-fly-io-deployment.md) · 🇮🇱 [he](../../../he/docs/ops/15-fly-io-deployment.md) · 🇮🇳 [hi](../../../hi/docs/ops/15-fly-io-deployment.md) · 🇭🇷 [hr](../../../hr/docs/ops/15-fly-io-deployment.md) · 🇭🇺 [hu](../../../hu/docs/ops/15-fly-io-deployment.md) · 🇮🇩 [id](../../../id/docs/ops/15-fly-io-deployment.md) · 🇮🇹 [it](../../../it/docs/ops/15-fly-io-deployment.md) · 🇯🇵 [ja](../../../ja/docs/ops/15-fly-io-deployment.md) · 🇰🇷 [ko](../../../ko/docs/ops/15-fly-io-deployment.md) · 🇱🇹 [lt](../../../lt/docs/ops/15-fly-io-deployment.md) · 🇱🇻 [lv](../../../lv/docs/ops/15-fly-io-deployment.md) · 🇮🇳 [mr](../../../mr/docs/ops/15-fly-io-deployment.md) · 🇲🇾 [ms](../../../ms/docs/ops/15-fly-io-deployment.md) · 🇲🇹 [mt](../../../mt/docs/ops/15-fly-io-deployment.md) · 🇳🇱 [nl](../../../nl/docs/ops/15-fly-io-deployment.md) · 🇳🇴 [no](../../../no/docs/ops/15-fly-io-deployment.md) · 🇵🇭 [phi](../../../phi/docs/ops/15-fly-io-deployment.md) · 🇵🇱 [pl](../../../pl/docs/ops/15-fly-io-deployment.md) · 🇵🇹 [pt](../../../pt/docs/ops/15-fly-io-deployment.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/15-fly-io-deployment.md) · 🇷🇴 [ro](../../../ro/docs/ops/15-fly-io-deployment.md) · 🇷🇺 [ru](../../../ru/docs/ops/15-fly-io-deployment.md) · 🇸🇰 [sk](../../../sk/docs/ops/15-fly-io-deployment.md) · 🇸🇮 [sl](../../../sl/docs/ops/15-fly-io-deployment.md) · 🇷🇸 [sr](../../../sr/docs/ops/15-fly-io-deployment.md) · 🇸🇪 [sv](../../../sv/docs/ops/15-fly-io-deployment.md) · 🇰🇪 [sw](../../../sw/docs/ops/15-fly-io-deployment.md) · 🇮🇳 [ta](../../../ta/docs/ops/15-fly-io-deployment.md) · 🇮🇳 [te](../../../te/docs/ops/15-fly-io-deployment.md) · 🇹🇭 [th](../../../th/docs/ops/15-fly-io-deployment.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/15-fly-io-deployment.md) · 🇵🇰 [ur](../../../ur/docs/ops/15-fly-io-deployment.md) · 🇻🇳 [vi](../../../vi/docs/ops/15-fly-io-deployment.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/15-fly-io-deployment.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/15-fly-io-deployment.md)

---

Bu belge, OmniRoute'un Fly.io platformunda dağıtım sürecini adım adım açıklar.

---

## 1. Dağıtım Hedefleri

- **Platform:** Fly.io
- **Dağıtım yöntemi:** Yerel `flyctl` ile doğrudan yayınlama
- **Çalışma Zamanı:** Depodaki mevcut `Dockerfile` ve `fly.toml`
- **Veri Kalıcılığı:** `/data` dizinine bağlanmış Fly Volume
- **Erişim Adresi:** `https://omniroute.fly.dev/`

---

## 2. Ön Koşullar ve `flyctl` Kurulumu

```bash
# Fly CLI kurulumu (macOS / Linux):
curl -L https://fly.io/install.sh | sh

# Giriş yapma:
flyctl auth login
```

---

## 3. İlk Dağıtım Adımları

1. **Volume Oluşturma (Kalıcı Depolama):**

   ```bash
   flyctl volumes create data --size 3 --region sin
   ```

2. **Gizli Değişkenleri (Secrets) Ayarlama:**

   ```bash
   flyctl secrets set \
     JWT_SECRET="guclu-jwt-anahtariniz" \
     API_KEY_SECRET="guclu-aes-anahtariniz" \
     INITIAL_PASSWORD="yonetici-sifreniz" \
     DATA_DIR="/data"
   ```

3. **Uygulamayı Dağıtma:**
   ```bash
   flyctl deploy
   ```
