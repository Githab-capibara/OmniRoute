#!/usr/bin/env node
// One-shot FASE-3 docs migration (numbered kebab-case restructure).
//
//   node scripts/docs/rename-docs.mjs --dry      # validate + report, change nothing
//   node scripts/docs/rename-docs.mjs           # execute the full migration
//
// Phases:
//   MV      git mv of English docs, i18n mirrors, root moves, task-c restore
//   REKEY   .i18n-state.json source-key remap (moved sources only; in-folder
//           renames are fixed by the token pass)
//   TOKEN   repo-wide old→new basename rewrite (longest-first) on all tracked
//           text files (docs, mirrors, scripts, configs, tests, state)
//   DEPTH   relative-link depth shift in files that moved to a subfolder
//   FM      frontmatter backfill for docs entering compiled folders
//
// Safe to re-run in stages; every phase is idempotent (no-op if already done).
// After a successful full run: `npm run i18n:run -- --adopt --targets-only`,
// `npm run i18n:check`, then this script is deleted (it is a one-shot).

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const DRY = process.argv.includes("--dry");
const PHASE = process.argv.find((a) => a.startsWith("--phase="))?.split("=")[1] ?? "all";

const sh = (cmd) => {
  const out = execSync(cmd, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
  return out.toString();
};

// ---------------------------------------------------------------------------
// 1. In-folder renames: docs/<folder>/<OLD>.md -> docs/<folder>/<new>.md
// (new names are exactly the ones declared by each folder's README.md)
// ---------------------------------------------------------------------------
const RENAMES = {
  "docs/architecture/ARCHITECTURE.md": "docs/architecture/01-system-overview.md",
  "docs/architecture/ADAPTIVE_ROUTING.md": "docs/architecture/02-adaptive-routing.md",
  "docs/architecture/admission-lanes.md": "docs/architecture/03-admission-lanes.md",
  "docs/architecture/AUTHZ_GUIDE.md": "docs/architecture/04-authorization-pipeline.md",
  "docs/architecture/RESILIENCE_GUIDE.md": "docs/architecture/07-resilience-guide.md",
  "docs/architecture/QUALITY_GATES.md": "docs/architecture/08-quality-gates.md",
  "docs/architecture/MONITORING_SECTIONS.md": "docs/architecture/09-monitoring-sections.md",
  "docs/architecture/CODEBASE_DOCUMENTATION.md": "docs/architecture/10-codebase-documentation.md",
  "docs/architecture/REPOSITORY_MAP.md": "docs/architecture/11-repository-map.md",
  "docs/architecture/DESIGN_SYSTEM.md": "docs/architecture/12-design-system.md",
  "docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md": "docs/comparison/01-omniroute-vs-alternatives.md",
  "docs/compression/COMPRESSION_GUIDE.md": "docs/compression/01-compression-guide.md",
  "docs/compression/COMPRESSION_ENGINES.md": "docs/compression/02-compression-engines.md",
  "docs/compression/COMPRESSION_RULES_FORMAT.md": "docs/compression/03-compression-rules-format.md",
  "docs/compression/COMPRESSION_LANGUAGE_PACKS.md":
    "docs/compression/04-compression-language-packs.md",
  "docs/compression/RTK_COMPRESSION.md": "docs/compression/05-rtk-compression-engine.md",
  "docs/compression/CONTEXT_EDITING.md": "docs/compression/06-context-editing.md",
  "docs/compression/EXTENDING_COMPRESSION.md": "docs/compression/07-extending-compression.md",
  "docs/frameworks/A2A-SERVER.md": "docs/frameworks/01-a2a-server.md",
  "docs/frameworks/ACP.md": "docs/frameworks/02-acp-agent-client-protocol.md",
  "docs/frameworks/AGENT_PROTOCOLS_GUIDE.md": "docs/frameworks/03-agent-protocols-guide.md",
  "docs/frameworks/AGENTBRIDGE.md": "docs/frameworks/04-agentbridge-ide-integration.md",
  "docs/frameworks/AGENT-SKILLS.md": "docs/frameworks/05-agent-skills-catalog.md",
  "docs/frameworks/CLOUD_AGENT.md": "docs/frameworks/06-cloud-agent-runtime.md",
  "docs/frameworks/MCP-SERVER.md": "docs/frameworks/07-mcp-server.md",
  "docs/frameworks/SKILLS.md": "docs/frameworks/08-skills-framework.md",
  "docs/frameworks/MEMORY.md": "docs/frameworks/09-persistent-memory.md",
  "docs/frameworks/WEBHOOKS.md": "docs/frameworks/10-webhooks-dispatch.md",
  "docs/frameworks/EVALS.md": "docs/frameworks/11-evals-suites.md",
  "docs/frameworks/GAMIFICATION.md": "docs/frameworks/12-gamification-system.md",
  "docs/frameworks/EMBEDDED-SERVICES.md": "docs/frameworks/13-embedded-sidecar-services.md",
  "docs/frameworks/NOTION_CONTEXT.md": "docs/frameworks/14-notion-context-source.md",
  "docs/frameworks/OBSIDIAN_CONTEXT.md": "docs/frameworks/15-obsidian-context-source.md",
  "docs/frameworks/LOCAL_CORPUS_CONTEXT.md": "docs/frameworks/16-local-corpus-context.md",
  "docs/frameworks/OPENCODE.md": "docs/frameworks/17-opencode-integration.md",
  "docs/frameworks/OPEN_SSE_ARCHITECTURE.md": "docs/frameworks/18-open-sse-streaming-engine.md",
  "docs/frameworks/PLAYGROUND_STUDIO.md": "docs/frameworks/19-playground-studio.md",
  "docs/frameworks/SEARCH_TOOLS_STUDIO.md": "docs/frameworks/20-search-tools-studio.md",
  "docs/frameworks/TRAFFIC_INSPECTOR.md": "docs/frameworks/21-traffic-inspector.md",
  "docs/frameworks/LOG-EXPORT.md": "docs/frameworks/22-log-export.md",
  "docs/frameworks/PLUGINS.md": "docs/frameworks/23-plugin-system-overview.md",
  "docs/frameworks/PLUGIN_SDK.md": "docs/frameworks/24-plugin-sdk-reference.md",
  "docs/frameworks/PLUGIN_MARKETPLACE.md": "docs/frameworks/25-plugin-marketplace.md",
  "docs/frameworks/RADAR.md": "docs/frameworks/26-radar-free-model-catalog.md",
  "docs/getting-started/QUICK-START.md": "docs/getting-started/01-quick-start.md",
  "docs/getting-started/PROVIDERS-GUIDE.md": "docs/getting-started/02-providers-guide.md",
  "docs/getting-started/AUTO-COMBO-GUIDE.md": "docs/getting-started/03-auto-combo-guide.md",
  "docs/getting-started/FREE-TIERS-GUIDE.md": "docs/getting-started/04-free-tiers-guide.md",
  "docs/getting-started/WEB-COOKIE-GUIDE.md": "docs/getting-started/05-web-cookie-guide.md",
  "docs/guides/USER_GUIDE.md": "docs/guides/01-user-guide.md",
  "docs/guides/SETUP_GUIDE.md": "docs/guides/02-setup-guide.md",
  "docs/guides/FEATURES.md": "docs/guides/03-features-overview.md",
  "docs/guides/THINKING_BUDGET.md": "docs/guides/04-thinking-budget.md",
  "docs/guides/CHAOS-MODE.md": "docs/guides/05-chaos-mode.md",
  "docs/guides/TIERS.md": "docs/guides/06-tiers-overview.md",
  "docs/guides/USAGE_QUOTA_GUIDE.md": "docs/guides/07-usage-quota-guide.md",
  "docs/guides/COST_TRACKING.md": "docs/guides/08-cost-tracking.md",
  "docs/guides/DOCKER_GUIDE.md": "docs/guides/09-docker-guide.md",
  "docs/guides/ELECTRON_GUIDE.md": "docs/guides/10-electron-guide.md",
  "docs/guides/TERMUX_GUIDE.md": "docs/guides/11-termux-guide.md",
  "docs/guides/PWA_GUIDE.md": "docs/guides/12-pwa-guide.md",
  "docs/guides/REMOTE-MODE.md": "docs/guides/13-remote-mode.md",
  "docs/guides/CLI-INTEGRATIONS.md": "docs/guides/14-cli-integrations.md",
  "docs/guides/OPENCODE-V2-PLUGIN.md": "docs/guides/15-opencode-v2-plugin.md",
  "docs/guides/CLAUDE-CODE-CONFIGURATION.md": "docs/guides/16-claude-code-configuration.md",
  "docs/guides/CODEX-CLI-CONFIGURATION.md": "docs/guides/17-codex-cli-configuration.md",
  "docs/guides/CODEX-APP-SERVER-PROVIDER.md": "docs/guides/18-codex-app-server-provider.md",
  "docs/guides/ANTIGRAVITY-ONBOARDING.md": "docs/guides/19-antigravity-onboarding.md",
  "docs/guides/KIRO_SETUP.md": "docs/guides/20-kiro-setup.md",
  "docs/guides/MANAGEMENT-AUTH.md": "docs/guides/21-management-auth.md",
  "docs/guides/I18N.md": "docs/guides/22-i18n-guide.md",
  "docs/guides/TROUBLESHOOTING.md": "docs/guides/23-troubleshooting.md",
  "docs/guides/UNINSTALL.md": "docs/guides/24-uninstall.md",
  "docs/guides/FREE_PROVIDER_RANKINGS.md": "docs/guides/27-free-provider-rankings.md",
  "docs/guides/VSCODE-COPILOT.md": "docs/guides/28-vscode-copilot.md",
  "docs/ops/RELEASE_CHECKLIST.md": "docs/ops/01-release-checklist.md",
  "docs/ops/RELEASE_GREEN.md": "docs/ops/02-release-green-policy.md",
  "docs/ops/BRANCHING_MODEL.md": "docs/ops/03-branching-model.md",
  "docs/ops/BRANCH_PROTECTION_MAIN.md": "docs/ops/04-branch-protection-main.md",
  "docs/ops/MERGE_TRAIN.md": "docs/ops/05-merge-train-runbook.md",
  "docs/ops/CONTRIBUTION_GOLDEN_PATH.md": "docs/ops/06-contribution-golden-path.md",
  "docs/ops/HOMOLOGATION.md": "docs/ops/07-homologation-suite.md",
  "docs/ops/QUALITY_GATE_PLAYBOOK.md": "docs/ops/08-quality-gate-playbook.md",
  "docs/ops/RUNNER_BOX.md": "docs/ops/09-runner-box-operations.md",
  "docs/ops/COVERAGE_PLAN.md": "docs/ops/10-coverage-plan.md",
  "docs/ops/DATABASE_GUIDE.md": "docs/ops/11-database-guide.md",
  "docs/ops/SQLITE_RUNTIME.md": "docs/ops/12-sqlite-runtime.md",
  "docs/ops/REDIS_PRODUCTION_CONFIG.md": "docs/ops/13-redis-production-config.md",
  "docs/ops/MONITORING_GUIDE.md": "docs/ops/14-monitoring-observability.md",
  "docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md": "docs/ops/15-fly-io-deployment.md",
  "docs/ops/VM_DEPLOYMENT_GUIDE.md": "docs/ops/16-vm-deployment.md",
  "docs/ops/PROXY_GUIDE.md": "docs/ops/17-proxy-guide.md",
  "docs/ops/TUNNELS_GUIDE.md": "docs/ops/18-tunnels-guide.md",
  "docs/plans/11690-anysearch-provider-integration.md":
    "docs/plans/01-anysearch-provider-integration.md",
  "docs/plans/7778-hierarchical-admission.md": "docs/plans/02-hierarchical-admission.md",
  "docs/providers/CLAUDE_WEB.md": "docs/providers/01-claude-web.md",
  "docs/providers/CHATGPT_WEB.md": "docs/providers/02-chatgpt-web.md",
  "docs/providers/ALIBABA-QWEN-PROVIDER-FAMILIES.md": "docs/providers/03-alibaba-qwen-families.md",
  "docs/providers/AGENTROUTER.md": "docs/providers/04-agentrouter-setup.md",
  "docs/providers/CURSOR-API-KEY-AND-CLI.md": "docs/providers/05-cursor-api-key-and-cli.md",
  "docs/providers/CURSOR-DOCKER.md": "docs/providers/06-cursor-docker.md",
  "docs/providers/CURSOR_IMAGE.md": "docs/providers/07-cursor-image.md",
  "docs/providers/ZED-DOCKER.md": "docs/providers/08-zed-docker.md",
  "docs/providers/CSV-IMPORT.md": "docs/providers/09-csv-import.md",
  "docs/reference/API_REFERENCE.md": "docs/reference/01-api-reference.md",
  "docs/reference/CLI-TOOLS.md": "docs/reference/02-cli-tools.md",
  "docs/reference/ENVIRONMENT.md": "docs/reference/03-environment-variables.md",
  "docs/reference/FEATURE_FLAGS.md": "docs/reference/04-feature-flags.md",
  "docs/reference/EMBEDDINGS.md": "docs/reference/05-embeddings.md",
  "docs/reference/FREE_TIERS.md": "docs/reference/06-free-tiers-directory.md",
  "docs/reference/FREE_PROXIES_API.md": "docs/reference/07-free-proxies-api.md",
  "docs/reference/PROVIDER_REFERENCE.md": "docs/reference/09-provider-reference.md",
  "docs/reference/PROVIDER_PLUGIN_MANIFEST.md": "docs/reference/10-provider-plugin-manifest.md",
  "docs/reference/REMOVED_PROVIDERS.md": "docs/reference/11-removed-providers.md",
  "docs/reference/RELAY_BACKEND_STRATEGY.md": "docs/reference/12-relay-backend-strategy.md",
  "docs/reference/RELAY_TROUBLESHOOTING.md": "docs/reference/13-relay-troubleshooting.md",
  "docs/routing/AUTO-COMBO.md": "docs/routing/01-auto-combo.md",
  "docs/routing/QUOTA_SHARE.md": "docs/routing/03-quota-share.md",
  "docs/routing/REASONING_REPLAY.md": "docs/routing/04-reasoning-replay-cache.md",
  "docs/routing/REASONING_ROUTING.md": "docs/routing/05-reasoning-routing-rules.md",
  "docs/routing/STRICT_ZERO_COST.md": "docs/routing/06-strict-zero-cost.md",
  "docs/routing/SUBSCRIPTION_LADDER.md": "docs/routing/07-subscription-ladder.md",
  "docs/routing/MODEL_EXPOSURE_LIST.md": "docs/routing/08-model-exposure-list.md",
  "docs/security/GUARDRAILS.md": "docs/security/01-guardrails.md",
  "docs/security/COMPLIANCE.md": "docs/security/02-compliance.md",
  "docs/security/STEALTH_GUIDE.md": "docs/security/03-stealth-guide.md",
  "docs/security/PUBLIC_CREDS.md": "docs/security/04-public-creds-pattern.md",
  "docs/security/ERROR_SANITIZATION.md": "docs/security/05-error-sanitization.md",
  "docs/security/ROUTE_GUARD_TIERS.md": "docs/security/06-route-guard-tiers.md",
  "docs/security/CLI_TOKEN.md": "docs/security/07-cli-token-auth.md",
  "docs/security/EGRESS_POLICY.md": "docs/security/08-egress-policy.md",
  "docs/security/BAN_DETECTION.md": "docs/security/09-ban-detection.md",
  "docs/security/AGENTROUTER_WAF.md": "docs/security/10-agentrouter-waf.md",
  "docs/security/CORS.md": "docs/security/11-cors-configuration.md",
  "docs/security/MITM-TPROXY-DECRYPT.md": "docs/security/12-mitm-tproxy-decrypt.md",
  "docs/security/SUPPLY_CHAIN.md": "docs/security/13-supply-chain-gates.md",
  "docs/security/SOCKET_DEV_FINDINGS.md": "docs/security/14-socket-dev-findings.md",
};

// 2. Cross-folder / root moves.
const MOVES = {
  // architecture -> adr
  "docs/architecture/ROUTER_BACKENDS.md": "docs/adr/02-router-backends-contract.md",
  "docs/architecture/cluster-decisions.md": "docs/adr/03-cluster-sidecar-profiles.md",
  "docs/architecture/persistence-backend-boundary.md": "docs/adr/04-persistence-boundary.md",
  // root -> docs/governance
  "CONTRIBUTING.md": "docs/governance/01-contributing-guide.md",
  "CODE_OF_CONDUCT.md": "docs/governance/02-code-of-conduct.md",
  "SECURITY.md": "docs/governance/03-security-policy.md",
  // root -> docs/plans
  "ROADMAP.md": "docs/plans/03-roadmap.md",
  // root -> docs/reference
  "THIRD_PARTY_NOTICES.md": "docs/reference/14-third-party-notices.md",
  // docs root -> subfolders
  "docs/DEVELOPER-ENVIRONMENT.md": "docs/guides/25-developer-environment.md",
  "docs/DEVIN_CLAUDE_BRIDGE.md": "docs/guides/26-devin-claude-bridge.md",
  "docs/OMNIROUTE_ALLOCATION_HANDOFF.md": "docs/architecture/05-allocation-handoff.md",
  "docs/OMNIROUTE_PROVIDER_FAILOVER.md": "docs/architecture/06-provider-failover.md",
  "docs/OMNIROUTE_QUOTA_TELEMETRY.md": "docs/reference/08-quota-telemetry.md",
  "docs/OMNIROUTE_ROUTING_POLICY.md": "docs/routing/02-routing-policy.md",
};

// 3. Restore (recovered from git; the root files are already staged-deleted).
const RESTORE = {
  "task-c1-report.md": "docs/development/01-task-c1-history-hydration.md",
  "task-c2-report.md": "docs/development/02-task-c2-memory-recall-timeout.md",
  "task-c3-report.md": "docs/development/03-task-c3-conductor-requirements.md",
};

// 4. Relative-link depth shift, applied to files that moved one level down
//    (key = NEW path). Root-level target files stay at root -> "..".
const DEPTH_SHIFT = {
  "docs/governance/01-contributing-guide.md": [
    ["](docs/", "](../"],
    ["](./docs/", "](../"],
    ["](./changelog.d/", "](../../changelog.d/"],
    ["](docs/security/PUBLIC_CREDS.md)", "(../security/04-public-creds-pattern.md)"],
    ["](./docs/security/PUBLIC_CREDS.md)", "(../security/04-public-creds-pattern.md)"],
  ],
  "docs/reference/14-third-party-notices.md": [["](config/release/", "](../../config/release/"]],
};

// 5. Frontmatter backfill: [new path, title]. (Compiled folders require it.)
const FRONTMATTER = {
  "docs/guides/25-developer-environment.md": "Developer Environment",
  "docs/guides/26-devin-claude-bridge.md": "Devin Claude Bridge",
  "docs/architecture/05-allocation-handoff.md": "Allocation Handoff",
  "docs/architecture/06-provider-failover.md": "Provider Failover",
  "docs/reference/08-quota-telemetry.md": "Quota Telemetry",
  "docs/reference/14-third-party-notices.md": "Third-Party Notices",
  "docs/routing/02-routing-policy.md": "Routing Policy",
  "docs/governance/01-contributing-guide.md": "Contributing Guide",
  "docs/governance/02-code-of-conduct.md": "Code of Conduct",
  "docs/governance/03-security-policy.md": "Security Policy",
};

const ALL = { ...RENAMES, ...MOVES };
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const isMigrated = (rel) => !exists(rel) && exists(ALL[rel] ?? "");

// ---------------------------------------------------------------------------
// Phase MV
// ---------------------------------------------------------------------------
function phaseMV() {
  const gitMv = (from, to) => {
    if (isMigrated(from)) return 0;
    const absFrom = path.join(ROOT, from);
    const absTo = path.join(ROOT, to);
    if (!fs.existsSync(absFrom)) {
      if (exists(to)) return 0; // already done
      console.error(`MV-MISS  ${from} (not found, ${to} also missing)`);
      process.exitCode = 1;
      return 0;
    }
    if (fs.existsSync(absTo)) {
      console.error(`MV-COLLIDE  ${to} already exists (from ${from})`);
      process.exitCode = 1;
      return 0;
    }
    fs.mkdirSync(path.dirname(absTo), { recursive: true });
    if (DRY) {
      console.log(`[dry] git mv ${from} -> ${to}`);
      return 1;
    }
    execSync(`git mv -- "${from}" "${to}"`, { cwd: ROOT });
    return 1;
  };

  let n = 0;
  // 1. in-folder renames
  n += Object.values(RENAMES).reduce((acc, to) => acc + gitMv(to, to), 0) * 0;
  n += Object.entries(RENAMES).reduce((acc, [from, to]) => acc + gitMv(from, to), 0);
  // 2. moves
  n += Object.entries(MOVES).reduce((acc, [from, to]) => acc + gitMv(from, to), 0);
  // 3. task-c restore (via git show, since root copies are staged-deleted)
  for (const [from, to] of Object.entries(RESTORE)) {
    if (exists(to)) continue;
    if (DRY) {
      console.log(`[dry] git show HEAD:${from} -> ${to}`);
      n += 1;
      continue;
    }
    fs.mkdirSync(path.dirname(path.join(ROOT, to)), { recursive: true });
    const out = execSync(`git show HEAD:"${from}"`, { cwd: ROOT }).toString();
    fs.writeFileSync(path.join(ROOT, to), out);
    execSync(`git add -- "${to}"`, { cwd: ROOT });
    n += 1;
  }
  // 4. i18n mirrors: docs/i18n/<loc>/<from> -> docs/i18n/<loc>/<to>
  const i18nDir = path.join(ROOT, "docs/i18n");
  const locales = fs
    .readdirSync(i18nDir)
    .filter((e) => fs.statSync(path.join(i18nDir, e)).isDirectory());
  n += locales.reduce(
    (acc, loc) =>
      acc +
      [...Object.entries(ALL), ...Object.entries(RESTORE)].reduce((a2, [from, to]) => {
        if (from.startsWith("task-c")) return a2; // not translated
        return a2 + gitMv(`docs/i18n/${loc}/${from}`, `docs/i18n/${loc}/${to}`);
      }, 0),
    0
  );
  console.log(`MV: ${n} files moved (${DRY ? "dry-run" : "executed"})`);
}

// ---------------------------------------------------------------------------
// Phase REKEY (.i18n-state.json: only moved sources; in-folder keys are
// fixed by the global token pass below)
// ---------------------------------------------------------------------------
function phaseREKEY() {
  const rel = ".i18n-state.json";
  const abs = path.join(ROOT, rel);
  const state = JSON.parse(fs.readFileSync(abs, "utf8"));
  let changed = 0;
  const rekey = (oldKey, newKey) => {
    if (!(oldKey in state.sources) || oldKey === newKey) return;
    if (newKey in state.sources) {
      // merge locale maps (target hashes stay valid: content is unchanged)
      state.sources[newKey] = {
        source_hash: state.sources[oldKey].source_hash,
        locales: { ...state.sources[oldKey].locales, ...state.sources[newKey].locales },
      };
    } else {
      state.sources[newKey] = state.sources[oldKey];
    }
    delete state.sources[oldKey];
    changed += 1;
  };
  for (const [from, to] of Object.entries(MOVES)) rekey(from, to);
  if (changed || !DRY) {
    if (!DRY) fs.writeFileSync(abs, JSON.stringify(state, null, 2) + "\n");
    console.log(`REKEY: ${changed} state keys remapped (${DRY ? "dry-run" : "executed"})`);
  } else console.log("REKEY: nothing to do");
}

// ---------------------------------------------------------------------------
// Phase TOKEN (repo-wide basename rewrite, longest-first)
// ---------------------------------------------------------------------------
const TEXT_EXT = new Set([
  ".md",
  ".txt",
  ".mjs",
  ".js",
  ".cjs",
  ".ts",
  ".tsx",
  ".json",
  ".yaml",
  ".yml",
  ".sh",
  ".toml",
]);
const TEXT_EXACT = new Set([".env.example", "llm.txt", "docker-compose.yml", ".i18n-state.json"]);

function trackedTextFiles() {
  const files = sh("git ls-files").split("\n").filter(Boolean);
  return files.filter((f) => {
    const ext = path.extname(f);
    if (ext && TEXT_EXT.has(ext)) return true;
    if (TEXT_EXACT.has(f) || TEXT_EXACT.has(path.basename(f))) return true;
    return false;
  });
}

function buildTokenReplacer() {
  // basename-level mapping (covers in-folder renames AND moved files; the moved
  // docs root-loose files have no folder prefix on disk links, so plain
  // basename replacement is correct for their cross-references too, EXCEPT
  // the .i18n-state.json which is handled in REKEY)
  const pairs = Object.entries(ALL).map(([from, to]) => [path.basename(from), path.basename(to)]);
  const seen = new Set();
  const uniq = [];
  for (const p of pairs) {
    if (seen.has(p[0])) continue;
    seen.add(p[0]);
    uniq.push(p);
  }
  // Also: the root governance files' old basenames must map to new basenames
  // so that in-doc references like "CONTRIBUTING.md" become
  // "01-contributing-guide.md" (folder is added by the DEPTH pass for the
  // moved files themselves, and by callers that use full paths like
  // "docs/CONTRIBUTING.md" -> "docs/01-contributing-guide.md").
  const ordered = uniq.sort((a, b) => b[0].length - a[0].length);
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(ordered.map((p) => esc(p[0])).join("|"), "g");
  const map = new Map(ordered);
  return { regex, map, ordered };
}

function phaseTOKEN() {
  const { regex, map } = buildTokenReplacer();
  const files = trackedTextFiles();
  let filesTouched = 0;
  let replacements = 0;
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    let text = fs.readFileSync(abs, "utf8");
    let localCount = 0;
    const rewritten = text.replace(regex, (m) => {
      const rep = map.get(m);
      if (rep === m) return m;
      localCount += 1;
      return rep;
    });
    if (localCount > 0) {
      replacements += localCount;
      filesTouched += 1;
      if (!DRY) fs.writeFileSync(abs, rewritten);
      else console.log(`[dry] token: ${rel} (${localCount})`);
    }
  }
  console.log(
    `TOKEN: ${filesTouched} files / ${replacements} replacements (${DRY ? "dry-run" : "executed"})`
  );
}

// ---------------------------------------------------------------------------
// Phase DEPTH
// ---------------------------------------------------------------------------
function phaseDEPTH() {
  for (const [rel, pairs] of Object.entries(DEPTH_SHIFT)) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    let text = fs.readFileSync(abs, "utf8");
    let local = 0;
    for (const [from, to] of pairs) {
      const before = text.length;
      text = text.split(from).join(to);
      if (text.length !== before) local += 1;
    }
    if (local) {
      if (!DRY) fs.writeFileSync(abs, text);
      console.log(`${DRY ? "[dry] " : ""}DEPTH: ${rel} (${local} rules applied)`);
    }
  }
}

// ---------------------------------------------------------------------------
// Phase FM
// ---------------------------------------------------------------------------
function phaseFM() {
  for (const [rel, title] of Object.entries(FRONTMATTER)) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    let text = fs.readFileSync(abs, "utf8");
    if (text.startsWith("---\n") || text.startsWith("---\r\n")) {
      // already has frontmatter
      console.log(`FM: skip ${rel} (frontmatter present)`);
      continue;
    }
    const fm = `---\ntitle: "${title}"\n---\n\n`;
    if (!DRY) fs.writeFileSync(abs, fm + text);
    console.log(`${DRY ? "[dry] " : ""}FM: added frontmatter to ${rel}`);
  }
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
if (PHASE === "mv") phaseMV();
if (PHASE === "rekey") phaseREKEY();
if (PHASE === "token") phaseTOKEN();
if (PHASE === "depth") phaseDEPTH();
if (PHASE === "fm") phaseFM();
if (PHASE === "all") {
  phaseMV();
  phaseREKEY();
  phaseTOKEN();
  phaseDEPTH();
  phaseFM();
}
if (!DRY) {
  console.log("\nAll phases done. Next:");
  console.log("  npm run i18n:run -- --adopt --targets-only");
  console.log("  npm run i18n:check");
  console.log(
    "  node scripts/docs/rename-docs.mjs --phase=mv --dry  # verify idempotency (expect 0)"
  );
}
