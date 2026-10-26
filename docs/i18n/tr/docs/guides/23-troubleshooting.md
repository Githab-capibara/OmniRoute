---
title: "Sorun Giderme"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Sorun Giderme (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/23-troubleshooting.md) · 🇸🇦 [ar](../../../ar/docs/guides/23-troubleshooting.md) · 🇦🇿 [az](../../../az/docs/guides/23-troubleshooting.md) · 🇧🇬 [bg](../../../bg/docs/guides/23-troubleshooting.md) · 🇧🇩 [bn](../../../bn/docs/guides/23-troubleshooting.md) · 🇨🇿 [cs](../../../cs/docs/guides/23-troubleshooting.md) · 🇩🇰 [da](../../../da/docs/guides/23-troubleshooting.md) · 🇩🇪 [de](../../../de/docs/guides/23-troubleshooting.md) · 🇬🇷 [el](../../../el/docs/guides/23-troubleshooting.md) · 🇪🇸 [es](../../../es/docs/guides/23-troubleshooting.md) · 🇪🇪 [et](../../../et/docs/guides/23-troubleshooting.md) · 🇮🇷 [fa](../../../fa/docs/guides/23-troubleshooting.md) · 🇫🇮 [fi](../../../fi/docs/guides/23-troubleshooting.md) · 🇫🇷 [fr](../../../fr/docs/guides/23-troubleshooting.md) · 🇮🇪 [ga](../../../ga/docs/guides/23-troubleshooting.md) · 🇮🇳 [gu](../../../gu/docs/guides/23-troubleshooting.md) · 🇮🇱 [he](../../../he/docs/guides/23-troubleshooting.md) · 🇮🇳 [hi](../../../hi/docs/guides/23-troubleshooting.md) · 🇭🇷 [hr](../../../hr/docs/guides/23-troubleshooting.md) · 🇭🇺 [hu](../../../hu/docs/guides/23-troubleshooting.md) · 🇮🇩 [id](../../../id/docs/guides/23-troubleshooting.md) · 🇮🇹 [it](../../../it/docs/guides/23-troubleshooting.md) · 🇯🇵 [ja](../../../ja/docs/guides/23-troubleshooting.md) · 🇰🇷 [ko](../../../ko/docs/guides/23-troubleshooting.md) · 🇱🇹 [lt](../../../lt/docs/guides/23-troubleshooting.md) · 🇱🇻 [lv](../../../lv/docs/guides/23-troubleshooting.md) · 🇮🇳 [mr](../../../mr/docs/guides/23-troubleshooting.md) · 🇲🇾 [ms](../../../ms/docs/guides/23-troubleshooting.md) · 🇲🇹 [mt](../../../mt/docs/guides/23-troubleshooting.md) · 🇳🇱 [nl](../../../nl/docs/guides/23-troubleshooting.md) · 🇳🇴 [no](../../../no/docs/guides/23-troubleshooting.md) · 🇵🇭 [phi](../../../phi/docs/guides/23-troubleshooting.md) · 🇵🇱 [pl](../../../pl/docs/guides/23-troubleshooting.md) · 🇵🇹 [pt](../../../pt/docs/guides/23-troubleshooting.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/23-troubleshooting.md) · 🇷🇴 [ro](../../../ro/docs/guides/23-troubleshooting.md) · 🇷🇺 [ru](../../../ru/docs/guides/23-troubleshooting.md) · 🇸🇰 [sk](../../../sk/docs/guides/23-troubleshooting.md) · 🇸🇮 [sl](../../../sl/docs/guides/23-troubleshooting.md) · 🇷🇸 [sr](../../../sr/docs/guides/23-troubleshooting.md) · 🇸🇪 [sv](../../../sv/docs/guides/23-troubleshooting.md) · 🇰🇪 [sw](../../../sw/docs/guides/23-troubleshooting.md) · 🇮🇳 [ta](../../../ta/docs/guides/23-troubleshooting.md) · 🇮🇳 [te](../../../te/docs/guides/23-troubleshooting.md) · 🇹🇭 [th](../../../th/docs/guides/23-troubleshooting.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/23-troubleshooting.md) · 🇵🇰 [ur](../../../ur/docs/guides/23-troubleshooting.md) · 🇻🇳 [vi](../../../vi/docs/guides/23-troubleshooting.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/23-troubleshooting.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/23-troubleshooting.md)

---

OmniRoute için sık karşılaşılan sorunlar ve çözümleri.

---

## Hızlı Başvuru

**OmniRoute'ta yeni misiniz?** Buradan başlayın — sorunların %90'ını çözer:

| Gördüğüm Durum            | Ne Anlama Geliyor                    | Ne Yapılmalı                                                                                         |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| "Bağlanamıyor"            | OmniRoute çalışmıyor                 | `omniroute` veya `docker restart omniroute` çalıştırın                                               |
| "Geçersiz API Anahtarı"   | Anahtarınız yanlış veya süresi doldu | Sağlayıcının web sitesinden anahtarı yeniden kopyalayın                                              |
| "Hız Sınırı Aşıldı"       | Çok fazla istek gönderiyorsunuz      | 1 dakika bekleyin veya otomatik geri dönüş için `model: "auto"` kullanın                             |
| "Kota Aşıldı"             | Ücretsiz/ücretli kotanız bitti       | Daha fazla sağlayıcı bağlayın veya ücretsiz sağlayıcıları kullanın                                   |
| "Yavaş Yanıtlar"          | Sağlayıcı meşgul veya uzakta         | `model: "auto/fast"` kullanın veya daha hızlı bir sağlayıcı bağlayın (Groq, Cerebras)                |
| "Yanlış Sağlayıcı Seçimi" | `auto` farklı bir sağlayıcı seçti    | Bu normaldir! `auto` en iyisini seçer. Belirli bir sağlayıcıyı `model: "openai/gpt-4o"` ile zorlayın |
| "502 Bad Gateway"         | Sağlayıcı çöktü                      | Bekleyip yeniden deneyin veya sağlayıcı değiştirmek için `model: "auto"` kullanın                    |
| "401 Unauthorized"        | Kimlik bilgileriniz geçersiz         | API anahtarınızı kontrol edin veya OAuth ile yeniden doğrulayın                                      |
| "429 Too Many Requests"   | Hız sınırına takıldı                 | 1 dakika bekleyin veya daha fazla sağlayıcı bağlayın                                                 |

---

## Hızlı Düzeltmeler

| Sorun                                                      | Çözüm                                                                                                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| İlk giriş çalışmıyor                                       | `.env` dosyasında `INITIAL_PASSWORD` ayarlayın (sabit kodlanmış varsayılan yoktur)                                                     |
| Pano yanlış portta açılıyor                                | `PORT=20128` ve `NEXT_PUBLIC_BASE_URL=http://localhost:20128` ayarlayın                                                                |
| Diske günlük yazılmıyor                                    | `APP_LOG_TO_FILE=true` ayarlayın ve çağrı günlüğü kaydının etkin olduğunu doğrulayın                                                   |
| EACCES: permission denied                                  | `~/.omniroute` dizinini geçersiz kılmak için `DATA_DIR=/yazilabilir/dizin/yolu` ayarlayın                                              |
| Yönlendirme stratejisi kaydedilmiyor                       | En son v3.x sürümüne güncelleyin                                                                                                       |
| Giriş çökmesi / boş sayfa                                  | Node.js sürümünü kontrol edin (Node.js `>=22.22.2 <23` veya `>=24.0.0 <27` desteklenir)                                                |
| `dlopen` / `slice is not valid mach-o file` (macOS)        | `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` çalıştırın                                                |
| Proxy "fetch failed"                                       | Proxy yapılandırmasının doğru düzeyde ayarlandığından emin olun                                                                        |
| Docker `curl: (56) Recv failure: Connection reset by peer` | Docker port bağlamanız IPv6'ya düşüyor olabilir. IPv4'ü zorlamak için `-p 127.0.0.1:20128:20128` kullanın veya `curl -4` ile test edin |
| Antivirüs `README.md` dosyasını karantinaya alıyor         | Yanlış pozitif (false positive) alarmdır, güvenle geri yükleyebilirsiniz                                                               |
