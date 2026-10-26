---
title: "OmniRoute MCP Sunucu Dokümantasyonu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute MCP Sunucu Dokümantasyonu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/07-mcp-server.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/07-mcp-server.md) · 🇦🇿 [az](../../../az/docs/frameworks/07-mcp-server.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/07-mcp-server.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/07-mcp-server.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/07-mcp-server.md) · 🇩🇰 [da](../../../da/docs/frameworks/07-mcp-server.md) · 🇩🇪 [de](../../../de/docs/frameworks/07-mcp-server.md) · 🇬🇷 [el](../../../el/docs/frameworks/07-mcp-server.md) · 🇪🇸 [es](../../../es/docs/frameworks/07-mcp-server.md) · 🇪🇪 [et](../../../et/docs/frameworks/07-mcp-server.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/07-mcp-server.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/07-mcp-server.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/07-mcp-server.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/07-mcp-server.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/07-mcp-server.md) · 🇮🇱 [he](../../../he/docs/frameworks/07-mcp-server.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/07-mcp-server.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/07-mcp-server.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/07-mcp-server.md) · 🇮🇩 [id](../../../id/docs/frameworks/07-mcp-server.md) · 🇮🇹 [it](../../../it/docs/frameworks/07-mcp-server.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/07-mcp-server.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/07-mcp-server.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/07-mcp-server.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/07-mcp-server.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/07-mcp-server.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/07-mcp-server.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/07-mcp-server.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/07-mcp-server.md) · 🇳🇴 [no](../../../no/docs/frameworks/07-mcp-server.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/07-mcp-server.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/07-mcp-server.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/07-mcp-server.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/07-mcp-server.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/07-mcp-server.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/07-mcp-server.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/07-mcp-server.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/07-mcp-server.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/07-mcp-server.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/07-mcp-server.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/07-mcp-server.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/07-mcp-server.md) · 🇮🇳 [te](../../../te/docs/frameworks/07-mcp-server.md) · 🇹🇭 [th](../../../th/docs/frameworks/07-mcp-server.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/07-mcp-server.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/07-mcp-server.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/07-mcp-server.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/07-mcp-server.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/07-mcp-server.md)

---

> Yönlendirme, önbellek, sıkıştırma, bellek, yetenekler, proxy, havuz, Radar ve bağlam kaynak işlemleri genelinde 110 araç içeren Model Context Protocol (MCP) sunucusu.
>
> Doğruluk kaynağı: `open-sse/mcp-server/server.ts` dosyası `countUniqueMcpTools()` ile **110 benzersiz araç** hesaplar: 45 kurallı tanım (altı CCR yaşam döngüsü aracı, ajan yetenekleri üçlüsü, `omniroute_radar_catalog` ve `omniroute_x_search` dahil), artı bellek (3), yetenekler (4), GitHub yetenekleri (3), havuz (6), oyunlaştırma (8), eklentiler (8), Notion (6), Obsidian (22), yerel külliyat (3) ve iki RTK sıkıştırma aracı.

## Kurulum

OmniRoute MCP yerleşik olarak gelir. Şununla başlatın:

```bash
omniroute --mcp
```

Veya open-sse taşıması aracılığıyla:

```bash
# HTTP akış taşıması (port 20130)
omniroute --dev  # MCP /mcp uç noktasında otomatik başlar
```

## Taşıma Modları (Transports)

MCP sunucusu, tümü aynı `createMcpServer()` fabrikası tarafından desteklenen üç taşıma protokolü sunar:

| Taşıma            | Konum                                       | Ne zaman kullanılır                                  |
| :---------------- | :------------------------------------------ | :--------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE entegrasyonları (Claude Desktop, Cursor vb.)     |
| `sse`             | `httpTransport` ile `POST/GET /api/mcp/sse` | Olay akışına ihtiyaç duyan tarayıcı/ajan istemcileri |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Çoklu oturumlu HTTP istemcileri (`mcp-session-id`)   |

Etkin HTTP taşıması (`sse` veya `streamable-http`) `mcpTransport` ayarıyla seçilir. Taşıma modunu değiştirmek diğer taşımadaki mevcut oturumları kapatır.

### Uzaktan Erişim (`manage` Kapsamı)

`/api/mcp/*` LOCAL_ONLY katmanındadır (`src/server/authz/routeGuard.ts`) — varsayılan olarak yalnızca yerel döngü ana bilgisayarları (`localhost`, `127.0.0.1`, `::1`) erişebilir. v3.8.2'den bu yana, yerel olmayan istemciler `manage` kapsamına sahip bir `Authorization: Bearer <api-key>` anahtarı sunduklarında bağlanabilirler. Bu, tünel, ters proxy veya genel ana bilgisayar adı üzerinden uzak MCP sunucusuna erişmenin tek yoludur.

```bash
# Uzak bir MCP istemcisinden bağlanın:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

---

## Temel Araçlar (13) — Aşama 1

| Araç                            | Kapsamlar             | Açıklama                                                         |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Çalışma süresi, bellek, devre kesiciler, hız sınırları, önbellek |
| `omniroute_list_combos`         | `read:combos`         | Stratejileriyle birlikte yapılandırılmış tüm kombolar            |
| `omniroute_get_combo_metrics`   | `read:combos`         | Belirli bir kombo için performans metrikleri                     |
| `omniroute_switch_combo`        | `write:combos`        | Bir komboyu etkinleştirme veya devre dışı bırakma                |
| `omniroute_create_combo`        | `write:combos`        | Doğrulanmış bir kombo oluşturma                                  |
| `omniroute_check_quota`         | `read:quota`          | Kullanılan/toplam kota, kalan yüzde, sıfırlanma süresi           |
| `omniroute_route_request`       | `execute:completions` | OmniRoute yönlendirmesi üzerinden sohbet tamamlama gönderme      |
| `omniroute_cost_report`         | `read:usage`          | Döneme göre maliyet raporu (oturum/gün/hafta/ay)                 |
| `omniroute_list_models_catalog` | `read:models`         | Yetenekler, durum ve fiyatlandırma ile tam model kataloğu        |
| `omniroute_radar_catalog`       | `read:radar`          | Yerel imzalı Radar kataloğu; isteğe bağlı filtreler              |
| `omniroute_tool_search`         | `read:tools`          | Kayıtlı MCP kataloğundan araçları keşfetme                       |
| `omniroute_web_search`          | `execute:search`      | Yapılandırılmış sağlayıcılar üzerinden web araması               |
| `omniroute_x_search`            | `execute:search`      | SuperGrok / xAI üzerinden X (Twitter) araması                    |
| `omniroute_web_fetch`           | `execute:search`      | Yapılandırılmış getirme sağlayıcıları üzerinden web içeriği alma |

## Gelişmiş Araçlar (11) — Aşama 2

| Araç                               | Kapsamlar                            | Açıklama                                                                  |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Geri dönüş ağacı ile yönlendirme simülasyonu (kuru çalıştırma)            |
| `omniroute_set_budget_guard`       | `write:budget`                       | Düşürme/engelleme/uyarı eylemi ile oturum bütçesi koruması                |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Çalışma zamanında kombo stratejisini güncelleme                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` dayanıklılık önayarı uygulama  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Gerçek bir çağrı kullanarak kombodaki her sağlayıcıyı canlı test etme     |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 gecikme ve devre kesici durumu ile sağlayıcı başına metrikler |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Bütçe/gecikme kısıtlamalarıyla görev türüne göre kombo önerme             |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Bir isteğin neden belirli bir sağlayıcıya yönlendirildiğini açıklama      |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Tam oturum anlık görüntüsü: maliyet, tokenlar, modeller, hatalar          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Veritabanı sapmalarını tanılama (ve isteğe bağlı otomatik onarma)         |
| `omniroute_sync_pricing`           | `pricing:write`                      | Dış kaynaklardan (LiteLLM) fiyatlandırma verilerini senkronize etme       |

---

## Bağlam, Bellek ve Yetenek Araçları

- **Bellek Araçları:** `omniroute_memory_search`, `omniroute_memory_store`, `omniroute_memory_delete`
- **Yetenek Araçları:** `omniroute_skill_execute`, `omniroute_skill_list`, `omniroute_skill_register`
- **Bağlam Kaynakları:** Notion (`omniroute_notion_*`), Obsidian (`omniroute_obsidian_*`), Yerel Külliyat (`omniroute_corpus_*`)
