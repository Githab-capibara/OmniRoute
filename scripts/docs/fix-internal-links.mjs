#!/usr/bin/env node
// One-shot: FASE 3 helper, safe to delete after merge.
//
// Rewrites doc-file references after the docs/ flat -> subfolder restructure.
//
// Modes:
//   --internal  Rewrite relative links inside docs/<subfolder>/*.md to point at
//               the new subfolder paths (e.g. ./01-auto-combo.md -> ../routing/01-auto-combo.md).
//   --external  Rewrite absolute-style `docs/<DOC>.md` references in files
//               outside docs/ (README, CLAUDE.md, .agents, .claude, scripts, src,
//               tests, etc.) to `docs/<subfolder>/<DOC>.md`.
//
// Usage:
//   node scripts/docs/fix-internal-links.mjs --internal
//   node scripts/docs/fix-internal-links.mjs --external
//   node scripts/docs/fix-internal-links.mjs --internal --external --dry
//
// Notes:
// - Idempotent: rerunning does not double-rewrite (it only matches the old shape).
// - openapi.yaml lives under docs/reference/ — also handled.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const DOCS = path.join(ROOT, "docs");

const args = new Set(process.argv.slice(2));
const RUN_INTERNAL = args.has("--internal");
const RUN_EXTERNAL = args.has("--external");
const DRY = args.has("--dry");
if (!RUN_INTERNAL && !RUN_EXTERNAL) {
  console.error("Pass --internal and/or --external (and optionally --dry).");
  process.exit(2);
}

// ----------------------------------------------------------------------
// Mapping: stem -> subfolder
// ----------------------------------------------------------------------
const DOC_TO_SUBFOLDER = {
  // architecture
  "01-system-overview.md": "architecture",
  "10-codebase-documentation.md": "architecture",
  "11-repository-map.md": "architecture",
  "04-authorization-pipeline.md": "architecture",
  "07-resilience-guide.md": "architecture",
  // guides
  "02-setup-guide.md": "guides",
  "01-user-guide.md": "guides",
  "09-docker-guide.md": "guides",
  "10-electron-guide.md": "guides",
  "11-termux-guide.md": "guides",
  "12-pwa-guide.md": "guides",
  "23-troubleshooting.md": "guides",
  "24-uninstall.md": "guides",
  "22-i18n-guide.md": "guides",
  "03-features-overview.md": "guides",
  // reference
  "01-api-reference.md": "reference",
  "09-provider-reference.md": "reference",
  "openapi.yaml": "reference",
  "03-environment-variables.md": "reference",
  "02-cli-tools.md": "reference",
  "06-free-tiers-directory.md": "reference",
  // frameworks
  "07-mcp-server.md": "frameworks",
  "01-a2a-server.md": "frameworks",
  "03-agent-protocols-guide.md": "frameworks",
  "06-cloud-agent-runtime.md": "frameworks",
  "08-skills-framework.md": "frameworks",
  "09-persistent-memory.md": "frameworks",
  "10-webhooks-dispatch.md": "frameworks",
  "11-evals-suites.md": "frameworks",
  // routing
  "01-auto-combo.md": "routing",
  "04-reasoning-replay-cache.md": "routing",
  // security
  "01-guardrails.md": "security",
  "02-compliance.md": "security",
  "03-stealth-guide.md": "security",
  // compression
  "01-compression-guide.md": "compression",
  "02-compression-engines.md": "compression",
  "03-compression-rules-format.md": "compression",
  "04-compression-language-packs.md": "compression",
  "05-rtk-compression-engine.md": "compression",
  // ops
  "01-release-checklist.md": "ops",
  "10-coverage-plan.md": "ops",
  "15-fly-io-deployment.md": "ops",
  "16-vm-deployment.md": "ops",
  "17-proxy-guide.md": "ops",
  "18-tunnels-guide.md": "ops",
};

// Build alternation regex (longest-first) of file basenames we know about.
// Escape regex metacharacters (including backslash) defensively, even though
// the source list is internal — keeps CodeQL happy and future-proofs against
// names like "FOO\BAR.md".
const RE_META = /[\\^$.*+?()[\]{}|]/g;
const FILES_ALT = Object.keys(DOC_TO_SUBFOLDER)
  .sort((a, b) => b.length - a.length)
  .map((s) => s.replace(RE_META, "\\$&"))
  .join("|");

// ----------------------------------------------------------------------
// Internal rewriter (within docs/**)
// ----------------------------------------------------------------------

function listDocFiles() {
  const out = [];
  // walk subfolders we created
  for (const sub of new Set(Object.values(DOC_TO_SUBFOLDER))) {
    const dir = path.join(DOCS, sub);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".md") && !f.endsWith(".yaml")) continue;
      out.push(path.join(dir, f));
    }
  }
  // also rewrite the new README and diagrams README
  out.push(path.join(DOCS, "README.md"));
  return out;
}

function relativeFromTo(fromAbsFile, targetSub, targetBasename) {
  const fromDir = path.dirname(fromAbsFile);
  const toAbs = path.join(DOCS, targetSub, targetBasename);
  let rel = path.relative(fromDir, toAbs);
  // posix-style
  rel = rel.split(path.sep).join("/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel;
}

function rewriteInternal(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  let out = src;

  // Pattern A: relative refs like ./FOO.md, ../FOO.md, or bare FOO.md inside (... ).
  // We match `]( <optional ./ or ../+> <basename> )` and `]( <basename> )`.
  // Captures: prefix (=./ or ../ chains, may be empty), basename.
  const reA = new RegExp(`\\]\\(\\s*((?:\\.{1,2}/)*)(${FILES_ALT})((?:#[^\\s)]+)?)\\s*\\)`, "g");
  out = out.replace(reA, (full, prefix, basename, anchor) => {
    const subFolder = DOC_TO_SUBFOLDER[basename];
    if (!subFolder) return full;
    const newRel = relativeFromTo(filePath, subFolder, basename);
    return `](${newRel}${anchor || ""})`;
  });

  // Pattern B: absolute-style `docs/FOO.md` inside markdown links — convert
  // to `docs/<sub>/FOO.md`. We avoid double-rewriting if a subfolder is
  // already present.
  const reB = new RegExp(`docs/(${FILES_ALT})((?:#[^\\s)\"']+)?)`, "g");
  out = out.replace(reB, (full, basename, anchor) => {
    const subFolder = DOC_TO_SUBFOLDER[basename];
    if (!subFolder) return full;
    // If preceded by `<sub>/` already, skip — but the regex won't capture that
    // because it only matches `docs/<basename>`. So this is safe.
    return `docs/${subFolder}/${basename}${anchor || ""}`;
  });

  if (out !== src) {
    if (!DRY) fs.writeFileSync(filePath, out, "utf8");
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------
// External rewriter (files outside docs/)
// ----------------------------------------------------------------------

function listExternalFiles() {
  // We rewrite a curated set of paths to avoid wandering into vendor / build dirs.
  const candidates = [];

  // 1) Root-level documentation files
  for (const f of fs.readdirSync(ROOT)) {
    const full = path.join(ROOT, f);
    if (!fs.statSync(full).isFile()) continue;
    if (/\.(md|txt)$/i.test(f)) candidates.push(full);
  }

  // 2) Specific directories we know contain doc references
  const dirs = [
    ".agents",
    ".claude",
    ".github",
    "bin",
    "electron",
    "open-sse",
    "scripts",
    "src",
    "tests",
    "vscode-extension",
    // i18n mirrors — root-level locale files (llm.txt, CHANGELOG.md, etc.) reference
    // the root /docs/ paths and must stay in sync after restructure.
    "docs/i18n",
  ];
  for (const d of dirs) {
    const full = path.join(ROOT, d);
    if (!fs.existsSync(full)) continue;
    walk(full, candidates);
  }
  return candidates;
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    if (entry.name.startsWith(".git")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile()) {
      // accept text-y file types
      if (/\.(md|txt|ts|tsx|mjs|cjs|js|json|yaml|yml|sh)$/i.test(entry.name)) {
        out.push(full);
      }
    }
  }
}

function rewriteExternal(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  let out = src;

  // Rewrite any `docs/FOO.md` (only the bare-basename form, not already
  // pointing into a subfolder) to `docs/<sub>/FOO.md`.
  // Word-boundary lookbehind/lookahead-ish: use (?<![\w/-]) so we don't touch
  // already-prefixed `docs/architecture/FOO.md`.
  const re = new RegExp(`(?<![A-Za-z0-9_./-])docs/(${FILES_ALT})((?:#[^\\s)\"'\`]+)?)`, "g");
  out = out.replace(re, (full, basename, anchor) => {
    const subFolder = DOC_TO_SUBFOLDER[basename];
    if (!subFolder) return full;
    return `docs/${subFolder}/${basename}${anchor || ""}`;
  });

  if (out !== src) {
    if (!DRY) fs.writeFileSync(filePath, out, "utf8");
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------

let internalChanged = 0;
let externalChanged = 0;
let internalScanned = 0;
let externalScanned = 0;

if (RUN_INTERNAL) {
  const files = listDocFiles();
  for (const f of files) {
    internalScanned++;
    if (rewriteInternal(f)) internalChanged++;
  }
  console.log(
    `[internal] scanned=${internalScanned} changed=${internalChanged}${DRY ? " (dry-run)" : ""}`
  );
}

if (RUN_EXTERNAL) {
  const files = listExternalFiles();
  for (const f of files) {
    externalScanned++;
    if (rewriteExternal(f)) externalChanged++;
  }
  console.log(
    `[external] scanned=${externalScanned} changed=${externalChanged}${DRY ? " (dry-run)" : ""}`
  );
}
