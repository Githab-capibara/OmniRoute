import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "docs",
  docs: {
    files: [
      "./architecture/**/*.md",
      "./guides/**/*.md",
      "./reference/**/*.md",
      "./frameworks/**/*.md",
      "./routing/**/*.md",
      "./security/**/*.md",
      // Operator-internal: TLS impersonation, MITM decrypt, supply-chain
      // attestation, XOR-mask recipe. Stay in git; do not compile into /docs.
      "!./security/03-stealth-guide.md",
      "!./security/14-socket-dev-findings.md",
      "!./security/12-mitm-tproxy-decrypt.md",
      "!./security/04-public-creds-pattern.md",
      "./governance/**/*.md",
      "./compression/**/*.md",
      "./ops/**/*.md",
    ],
  },
});

export default defineConfig();
