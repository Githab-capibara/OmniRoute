---
title: "Dokumentacja OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacja OmniRoute

Nawigowalny indeks zestawu dokumentacji OmniRoute. Tematy są pogrupowane według celu, abyś szybko znalazł to, czego potrzebujesz.

> Szukasz przeglądu projektu, kroków instalacji lub informacji o wydaniach? Zobacz główne pliki [README.md](../README.md), [CHANGELOG.md](../CHANGELOG.md) oraz [01-contributing-guide.md](../01-contributing-guide.md).

---

## Dla użytkowników nietechnicznych

Proste przewodniki po korzystaniu z OmniRoute — bez wymaganej wiedzy technicznej.

### getting-started/

- [01-quick-start.md](getting-started/01-quick-start.md) — zainstaluj i uruchom OmniRoute w 3 minuty.
- [03-auto-combo-guide.md](getting-started/03-auto-combo-guide.md) — pozwól OmniRoute wybrać dla Ciebie najlepsze AI.
- [02-providers-guide.md](getting-started/02-providers-guide.md) — jak podłączyć dostawców AI.
- [04-free-tiers-guide.md](getting-started/04-free-tiers-guide.md) — darmowe AI bez karty kredytowej.
- [23-troubleshooting.md](getting-started/23-troubleshooting.md) — rozwiązywanie typowych problemów.

### guides/

- [02-setup-guide.md](guides/02-setup-guide.md) — pierwsza konfiguracja OmniRoute.
- [01-user-guide.md](guides/01-user-guide.md) — codzienne korzystanie z panelu i API.
- [03-features-overview.md](guides/03-features-overview.md) — galeria funkcji panelu.
- [06-tiers-overview.md](guides/06-tiers-overview.md) — poziomy OmniRoute wyjaśnione (przewodnik użytkownika).
- [07-usage-quota-guide.md](guides/07-usage-quota-guide.md) — śledzenie użycia, limitów (quota) i wydatków.
- [08-cost-tracking.md](guides/08-cost-tracking.md) — śledzenie kosztów i wydatków.
- [27-free-provider-rankings.md](guides/27-free-provider-rankings.md) — rankingi darmowych dostawców (Arena ELO).
- [09-docker-guide.md](guides/09-docker-guide.md) — uruchamianie OmniRoute w Dockerze.
- [10-electron-guide.md](guides/10-electron-guide.md) — buildy desktopowe (Electron).
- [11-termux-guide.md](guides/11-termux-guide.md) — uruchamianie na Androidzie przez Termux.
- [12-pwa-guide.md](guides/12-pwa-guide.md) — instalacja panelu jako PWA.
- [13-remote-mode.md](guides/13-remote-mode.md) — udostępnianie OmniRoute zdalnie + tokeny z zakresem (scoped tokens).
- [14-cli-integrations.md](guides/14-cli-integrations.md) — główna tabela integracji CLI `setup-*`.
- [16-claude-code-configuration.md](guides/16-claude-code-configuration.md) — Claude Code CLI z OmniRoute.
- [17-codex-cli-configuration.md](guides/17-codex-cli-configuration.md) — Codex CLI z OmniRoute.
- [20-kiro-setup.md](guides/20-kiro-setup.md) — konfiguracja Kiro.
- [22-i18n-guide.md](guides/22-i18n-guide.md) — workflow tłumaczeń i locale.
- [23-troubleshooting.md](guides/23-troubleshooting.md) — szczegółowa referencja rozwiązywania problemów.
- [24-uninstall.md](guides/24-uninstall.md) — czyste usuwanie instalacji.

---

## Dla użytkowników technicznych

Dokumentacja techniczna dla deweloperów i współtwórców.

## architecture/

Jak zbudowany jest system — przeczytaj te materiały, aby zrozumieć runtime, układ kodu i model odporności.

- [01-system-overview.md](architecture/01-system-overview.md) — wysokopoziomowa architektura systemu (potok żądań, warstwy, moduły).
- [10-codebase-documentation.md](architecture/10-codebase-documentation.md) — referencja inżynierska bazy kodu.
- [11-repository-map.md](architecture/11-repository-map.md) — przewodnik nawigacji katalog po katalogu.
- [04-authorization-pipeline.md](architecture/04-authorization-pipeline.md) — potok autoryzacji (klasyfikator tras + silnik polityk).
- [07-resilience-guide.md](architecture/07-resilience-guide.md) — circuit breaker dostawcy, cooldown połączeń i lockout modeli.
- [08-quality-gates.md](architecture/08-quality-gates.md) — inwentarz skryptów bramek jakości i jobów CI.
- [09-monitoring-sections.md](architecture/09-monitoring-sections.md) — nawigacja panelu monitoringu/kosztów.
- [03-cluster-sidecar-profiles.md](architecture/03-cluster-sidecar-profiles.md) — opcjonalne decyzje profili sidecar/klaster.

## reference/

Materiały referencyjne — powierzchnia API, zmienne środowiskowe, flagi CLI, katalog dostawców.

- [01-api-reference.md](reference/01-api-reference.md) — endpointy REST API i kształty danych.
- [09-provider-reference.md](reference/09-provider-reference.md) — automatycznie generowany katalog dostawców (nie edytuj ręcznie).
- [10-provider-plugin-manifest.md](reference/10-provider-plugin-manifest.md) — kontrakt wtyczki dostawcy bezpieczny dla sidecarów przy migracji Bifrost i CLIProxyAPI.
- [openapi.yaml](openapi.yaml) — specyfikacja OpenAPI publicznego API.
- [03-environment-variables.md](reference/03-environment-variables.md) — referencja zmiennych środowiskowych.
- [04-feature-flags.md](reference/04-feature-flags.md) — flagi funkcji i ich wartości domyślne.
- [02-cli-tools.md](reference/02-cli-tools.md) — dołączone polecenia CLI.
- [06-free-tiers-directory.md](reference/06-free-tiers-directory.md) — katalog darmowych poziomów dostawców LLM.

## frameworks/

Podsystemy wtykowe udostępniane klientom, agentom i operatorom.

- [07-mcp-server.md](frameworks/07-mcp-server.md) — serwer Model Context Protocol.
- [01-a2a-server.md](frameworks/01-a2a-server.md) — serwer Agent-to-Agent (A2A) JSON-RPC.
- [02-acp-agent-client-protocol.md](frameworks/02-acp-agent-client-protocol.md) — Agent Client Protocol.
- [03-agent-protocols-guide.md](frameworks/03-agent-protocols-guide.md) — przegląd agentów A2A / ACP / Cloud.
- [04-agentbridge-ide-integration.md](frameworks/04-agentbridge-ide-integration.md) — most agenta IDE.
- [05-agent-skills-catalog.md](frameworks/05-agent-skills-catalog.md) — katalog umiejętności agentów.
- [06-cloud-agent-runtime.md](frameworks/06-cloud-agent-runtime.md) — runtime i dostawcy cloud agent.
- [08-skills-framework.md](frameworks/08-skills-framework.md) — framework Skills (piaskownicowe rozszerzenie).
- [09-persistent-memory.md](frameworks/09-persistent-memory.md) — trwała pamięć (FTS5 + Qdrant).
- [10-webhooks-dispatch.md](frameworks/10-webhooks-dispatch.md) — zdarzenia webhook i dyspozycja.
- [11-evals-suites.md](frameworks/11-evals-suites.md) — zestawy ewaluacji.
- [12-gamification-system.md](frameworks/12-gamification-system.md) — system grywalizacji i rankingów.
- [13-embedded-sidecar-services.md](frameworks/13-embedded-sidecar-services.md) — wbudowane usługi sidecar (9Router, CLIProxyAPI).
- [14-notion-context-source.md](frameworks/14-notion-context-source.md) — źródło kontekstu Notion.
- [15-obsidian-context-source.md](frameworks/15-obsidian-context-source.md) — źródło kontekstu Obsidian.
- [17-opencode-integration.md](frameworks/17-opencode-integration.md) — integracja OpenCode.
- [18-open-sse-streaming-engine.md](frameworks/18-open-sse-streaming-engine.md) — wnętrze silnika streamingu open-sse.
- [19-playground-studio.md](frameworks/19-playground-studio.md) — UI Playground Studio.
- [20-search-tools-studio.md](frameworks/20-search-tools-studio.md) — UI Search Tools Studio.
- [21-traffic-inspector.md](frameworks/21-traffic-inspector.md) — inspector ruchu (MITM).
- [23-plugin-system-overview.md](frameworks/23-plugin-system-overview.md) — przegląd systemu wtyczek CLI.
- [24-plugin-sdk-reference.md](frameworks/24-plugin-sdk-reference.md) — referencja SDK wtyczek.
- [25-plugin-marketplace.md](frameworks/25-plugin-marketplace.md) — marketplace wtyczek.

## routing/

Routing combo, scorowanie i replay.

- [01-auto-combo.md](routing/01-auto-combo.md) — Auto-Combo (scorowanie 13-czynnikowe, 19 strategii publicznych).
- [03-quota-share.md](routing/03-quota-share.md) — silnik współdzielenia limitów (quota).
- [04-reasoning-replay-cache.md](routing/04-reasoning-replay-cache.md) — cache replay rozumowania (reasoning).

## security/

Guardrails, zgodność (compliance), stealth oraz obowiązkowe wzorce obsługi publicznych poświadczeń i komunikatów błędów.

- [01-guardrails.md](security/01-guardrails.md) — guardrails PII, prompt injection, vision.
- [02-compliance.md](security/02-compliance.md) — ścieżki audytu i zgodność.
- [03-stealth-guide.md](security/03-stealth-guide.md) — stealth TLS / fingerprint.
- [04-public-creds-pattern.md](security/04-public-creds-pattern.md) — **obowiązkowy** wzorzec osadzania publicznych upstreamowych OAuth client_id/secret + kluczy Firebase Web bez uruchamiania skanerów sekretów.
- [05-error-sanitization.md](security/05-error-sanitization.md) — **obowiązkowy** wzorzec kierowania każdej odpowiedzi błędu przez `sanitizeErrorMessage`, aby zapobiec ujawnieniu stack-trace.
- [06-route-guard-tiers.md](security/06-route-guard-tiers.md) — poziomy klasyfikacji route-guard.
- [07-cli-token-auth.md](security/07-cli-token-auth.md) — auth tokenu machine-ID CLI (HMAC + legacy SHA-256).
- [08-egress-policy.md](security/08-egress-policy.md) — polityka rodziny IP egress (IPv4/IPv6).
- [12-mitm-tproxy-decrypt.md](security/12-mitm-tproxy-decrypt.md) — przezroczyste deszyfrowanie MITM.
- [13-supply-chain-gates.md](security/13-supply-chain-gates.md) — bramki łańcucha dostaw (SLSA, SBOM, Trivy, osv-scanner, Scorecard).
- [14-socket-dev-findings.md](security/14-socket-dev-findings.md) — atestacje ustaleń łańcucha dostaw.

## compression/

Silniki kompresji promptów, reguły i pakiety językowe.

- [01-compression-guide.md](compression/01-compression-guide.md) — ogólny przegląd kompresji.
- [02-compression-engines.md](compression/02-compression-engines.md) — dostępne silniki kompresji.
- [03-compression-rules-format.md](compression/03-compression-rules-format.md) — format pliku reguł.
- [04-compression-language-packs.md](compression/04-compression-language-packs.md) — pakiety językowe.
- [05-rtk-compression-engine.md](compression/05-rtk-compression-engine.md) — dogłębna analiza silnika RTK.
- [06-context-editing.md](compression/06-context-editing.md) — delegowana edycja kontekstu (Anthropic).
- [07-extending-compression.md](compression/07-extending-compression.md) — dodawanie własnego silnika kompresji.

## providers/

Przewodniki integracji specyficzne dla dostawców.

- [01-claude-web.md](providers/01-claude-web.md) — dostawca Claude Web (cookie-auth).
- [04-agentrouter-setup.md](providers/04-agentrouter-setup.md) — konfiguracja AgentRouter.
- [08-zed-docker.md](providers/08-zed-docker.md) — integracja Zed IDE w Dockerze.

## comparison/

- [01-omniroute-vs-alternatives.md](comparison/01-omniroute-vs-alternatives.md) — jak OmniRoute wypada na tle alternatyw.

## ops/

Wydania, wdrożenia, proxy, tunele, pokrycie testami, baza danych, monitoring.

- [01-release-checklist.md](ops/01-release-checklist.md) — checklista procesu wydania.
- [02-release-green-policy.md](ops/02-release-green-policy.md) — utrzymywanie kolejki PR i gałęzi wydania w stanie green.
- [08-quality-gate-playbook.md](ops/08-quality-gate-playbook.md) — playbook bramek jakości.
- [04-branch-protection-main.md](ops/04-branch-protection-main.md) — ochrona gałęzi `main`.
- [10-coverage-plan.md](ops/10-coverage-plan.md) — plan pokrycia testami.
- [11-database-guide.md](ops/11-database-guide.md) — schemat DB i operacje.
- [12-sqlite-runtime.md](ops/12-sqlite-runtime.md) — łańcuch rozwiązywania sterownika SQLite.
- [14-monitoring-observability.md](ops/14-monitoring-observability.md) — monitoring i obserwowalność.
- [15-fly-io-deployment.md](ops/15-fly-io-deployment.md) — wdrożenie na Fly.io.
- [16-vm-deployment.md](ops/16-vm-deployment.md) — generyczne wdrożenie na VM.
- [17-proxy-guide.md](ops/17-proxy-guide.md) — konfiguracja proxy upstream.
- [18-tunnels-guide.md](ops/18-tunnels-guide.md) — Cloudflare tunnel i pokrewne.

## diagrams/

Źródła Mermaid oraz wyeksportowane diagramy SVG/PNG przywoływane w powyższej dokumentacji. Zobacz [diagrams/README.md](diagrams/README.md).

## i18n/

Przetłumaczone lustrzane kopie dokumentacji w 41 locale. Listę obsługiwanych języków znajdziesz w [i18n/README.md](i18n/README.md).

## screenshots/

Statyczne zrzuty ekranu używane przez panel i README. Nie stanowią części treści dokumentacji.

---

## Artefakty generowane automatycznie

- [reference/09-provider-reference.md](reference/09-provider-reference.md) jest generowany przez `scripts/docs/gen-provider-reference.ts` z `src/shared/constants/providers.ts`. Nie edytuj ręcznie.
- UI `/docs` jest oparte na generowaniu źródeł Fumadocs MDX z powyższych podfolderów.
