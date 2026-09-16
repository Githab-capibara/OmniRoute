// Server-free leaf: CodeBuddy CN (Tencent) CLI/CodeBuddy version string.
//
// Single source of truth — MUST stay identical across OAuth
// (src/lib/oauth/constants/oauth.ts, which re-exports this), chat completions
// (open-sse/config/providers/registry/codebuddy-cn/index.ts) and usage/quota
// (open-sse/services/usage/codebuddy-cn.ts): a mismatched version string across
// a single account's auth vs. chat calls would be flagged as anomalous by
// Tencent's WAF (#12702).
//
// Kept in its own leaf (not under src/lib/oauth/constants/oauth) so the provider
// registry barrel — reachable from client components via providerModels.ts —
// does not drag OAuth constants that read node:fs/node:path into the dashboard
// browser bundle ("chunking context does not support external modules").
export const CODEBUDDY_CN_USER_AGENT = "CLI/2.108.1 CodeBuddy/2.108.1";
