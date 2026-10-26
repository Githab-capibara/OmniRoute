---
title: "OmniRoute — Cloudflare ile VM Üzerinde Dağıtım Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute — Cloudflare ile VM Üzerinde Dağıtım Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/16-vm-deployment.md) · 🇸🇦 [ar](../../../ar/docs/ops/16-vm-deployment.md) · 🇦🇿 [az](../../../az/docs/ops/16-vm-deployment.md) · 🇧🇬 [bg](../../../bg/docs/ops/16-vm-deployment.md) · 🇧🇩 [bn](../../../bn/docs/ops/16-vm-deployment.md) · 🇨🇿 [cs](../../../cs/docs/ops/16-vm-deployment.md) · 🇩🇰 [da](../../../da/docs/ops/16-vm-deployment.md) · 🇩🇪 [de](../../../de/docs/ops/16-vm-deployment.md) · 🇬🇷 [el](../../../el/docs/ops/16-vm-deployment.md) · 🇪🇸 [es](../../../es/docs/ops/16-vm-deployment.md) · 🇪🇪 [et](../../../et/docs/ops/16-vm-deployment.md) · 🇮🇷 [fa](../../../fa/docs/ops/16-vm-deployment.md) · 🇫🇮 [fi](../../../fi/docs/ops/16-vm-deployment.md) · 🇫🇷 [fr](../../../fr/docs/ops/16-vm-deployment.md) · 🇮🇪 [ga](../../../ga/docs/ops/16-vm-deployment.md) · 🇮🇳 [gu](../../../gu/docs/ops/16-vm-deployment.md) · 🇮🇱 [he](../../../he/docs/ops/16-vm-deployment.md) · 🇮🇳 [hi](../../../hi/docs/ops/16-vm-deployment.md) · 🇭🇷 [hr](../../../hr/docs/ops/16-vm-deployment.md) · 🇭🇺 [hu](../../../hu/docs/ops/16-vm-deployment.md) · 🇮🇩 [id](../../../id/docs/ops/16-vm-deployment.md) · 🇮🇹 [it](../../../it/docs/ops/16-vm-deployment.md) · 🇯🇵 [ja](../../../ja/docs/ops/16-vm-deployment.md) · 🇰🇷 [ko](../../../ko/docs/ops/16-vm-deployment.md) · 🇱🇹 [lt](../../../lt/docs/ops/16-vm-deployment.md) · 🇱🇻 [lv](../../../lv/docs/ops/16-vm-deployment.md) · 🇮🇳 [mr](../../../mr/docs/ops/16-vm-deployment.md) · 🇲🇾 [ms](../../../ms/docs/ops/16-vm-deployment.md) · 🇲🇹 [mt](../../../mt/docs/ops/16-vm-deployment.md) · 🇳🇱 [nl](../../../nl/docs/ops/16-vm-deployment.md) · 🇳🇴 [no](../../../no/docs/ops/16-vm-deployment.md) · 🇵🇭 [phi](../../../phi/docs/ops/16-vm-deployment.md) · 🇵🇱 [pl](../../../pl/docs/ops/16-vm-deployment.md) · 🇵🇹 [pt](../../../pt/docs/ops/16-vm-deployment.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/16-vm-deployment.md) · 🇷🇴 [ro](../../../ro/docs/ops/16-vm-deployment.md) · 🇷🇺 [ru](../../../ru/docs/ops/16-vm-deployment.md) · 🇸🇰 [sk](../../../sk/docs/ops/16-vm-deployment.md) · 🇸🇮 [sl](../../../sl/docs/ops/16-vm-deployment.md) · 🇷🇸 [sr](../../../sr/docs/ops/16-vm-deployment.md) · 🇸🇪 [sv](../../../sv/docs/ops/16-vm-deployment.md) · 🇰🇪 [sw](../../../sw/docs/ops/16-vm-deployment.md) · 🇮🇳 [ta](../../../ta/docs/ops/16-vm-deployment.md) · 🇮🇳 [te](../../../te/docs/ops/16-vm-deployment.md) · 🇹🇭 [th](../../../th/docs/ops/16-vm-deployment.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/16-vm-deployment.md) · 🇵🇰 [ur](../../../ur/docs/ops/16-vm-deployment.md) · 🇻🇳 [vi](../../../vi/docs/ops/16-vm-deployment.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/16-vm-deployment.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/16-vm-deployment.md)

---

Cloudflare üzerinden yönetilen bir alan adı ile VM (VPS) üzerinde OmniRoute kurulumu ve yapılandırması için eksiksiz kılavuz.

---

## Ön Koşullar

| Öğe                 | Minimum                     | Önerilen         |
| ------------------- | --------------------------- | ---------------- |
| **CPU**             | 1 vCPU                      | 2 vCPU           |
| **RAM**             | 1 GB                        | 2 GB             |
| **Disk**            | 10 GB SSD                   | 25 GB SSD        |
| **İşletim Sistemi** | Ubuntu 22.04 LTS            | Ubuntu 24.04 LTS |
| **Alan Adı**        | Cloudflare'e yönlendirilmiş | —                |
| **Docker**          | Docker Engine 24+           | Docker 27+       |

---

## 1. VM Yapılandırması

### 1.1 SSH ile Bağlantı

```bash
ssh root@SUNUCU_IP_ADRESINIZ
```

### 1.2 Sistemi Güncelleme

```bash
apt update && apt upgrade -y
```

### 1.3 Docker Kurulumu

```bash
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.4 Güvenlik Duvarı (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

---

## 2. OmniRoute Kurulumu

```bash
mkdir -p /opt/omniroute
cd /opt/omniroute
```

Docker Compose ile OmniRoute'u başlatın:

```bash
docker compose up -d
```
