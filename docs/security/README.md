# Security

Guardrails, compliance, stealth, and the mandatory secure-coding patterns.

- **Audience:** Developers
- **Doc set index:** [docs/README.md](../README.md)

| Document                                                   | Purpose                                        |
| ---------------------------------------------------------- | ---------------------------------------------- |
| [01-guardrails.md](./01-guardrails.md)                     | Guardrails                                     |
| [02-compliance.md](./02-compliance.md)                     | Compliance & Audit                             |
| [03-stealth-guide.md](./03-stealth-guide.md)               | Stealth Guide                                  |
| [04-public-creds-pattern.md](./04-public-creds-pattern.md) | Public Credentials Handling                    |
| [05-error-sanitization.md](./05-error-sanitization.md)     | Error Message Sanitization                     |
| [06-route-guard-tiers.md](./06-route-guard-tiers.md)       | Route Guard Tiers                              |
| [07-cli-token-auth.md](./07-cli-token-auth.md)             | CLI Machine-ID Token                           |
| [08-egress-policy.md](./08-egress-policy.md)               | Egress IP Family Policy (IPv4/IPv6)            |
| [09-ban-detection.md](./09-ban-detection.md)               | Account-Ban / Banned-Keyword Detection         |
| [10-agentrouter-waf.md](./10-agentrouter-waf.md)           | agentrouter.org WAF (Web Application Firewall) |
| [11-cors-configuration.md](./11-cors-configuration.md)     | CORS Configuration & Security                  |
| [12-mitm-tproxy-decrypt.md](./12-mitm-tproxy-decrypt.md)   | MITM TPROXY Transparent Decrypt                |
| [13-supply-chain-gates.md](./13-supply-chain-gates.md)     | Supply-Chain Gates                             |
| [14-socket-dev-findings.md](./14-socket-dev-findings.md)   | Socket.dev Supply-Chain Finding Attestation    |

New here? Copy [template.md](./template.md) to `NN-kebab-case.md`, fill _"Purpose"_ here, in `meta.json` (if rendered), and in the [docs index](../README.md).
