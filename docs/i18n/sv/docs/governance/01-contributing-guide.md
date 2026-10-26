# Contributing to OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../01-contributing-guide.md) · 🇸🇦 [ar](../ar/01-contributing-guide.md) · 🇦🇿 [az](../az/01-contributing-guide.md) · 🇧🇬 [bg](../bg/01-contributing-guide.md) · 🇧🇩 [bn](../bn/01-contributing-guide.md) · 🇨🇿 [cs](../cs/01-contributing-guide.md) · 🇩🇰 [da](../da/01-contributing-guide.md) · 🇩🇪 [de](../de/01-contributing-guide.md) · 🇬🇷 [el](../el/01-contributing-guide.md) · 🇪🇸 [es](../es/01-contributing-guide.md) · 🇪🇪 [et](../et/01-contributing-guide.md) · 🇮🇷 [fa](../fa/01-contributing-guide.md) · 🇫🇮 [fi](../fi/01-contributing-guide.md) · 🇫🇷 [fr](../fr/01-contributing-guide.md) · 🇮🇪 [ga](../ga/01-contributing-guide.md) · 🇮🇳 [gu](../gu/01-contributing-guide.md) · 🇮🇱 [he](../he/01-contributing-guide.md) · 🇮🇳 [hi](../hi/01-contributing-guide.md) · 🇭🇷 [hr](../hr/01-contributing-guide.md) · 🇭🇺 [hu](../hu/01-contributing-guide.md) · 🇮🇩 [id](../id/01-contributing-guide.md) · 🇮🇹 [it](../it/01-contributing-guide.md) · 🇯🇵 [ja](../ja/01-contributing-guide.md) · 🇰🇷 [ko](../ko/01-contributing-guide.md) · 🇱🇹 [lt](../lt/01-contributing-guide.md) · 🇱🇻 [lv](../lv/01-contributing-guide.md) · 🇮🇳 [mr](../mr/01-contributing-guide.md) · 🇲🇾 [ms](../ms/01-contributing-guide.md) · 🇲🇹 [mt](../mt/01-contributing-guide.md) · 🇳🇱 [nl](../nl/01-contributing-guide.md) · 🇳🇴 [no](../no/01-contributing-guide.md) · 🇵🇭 [phi](../phi/01-contributing-guide.md) · 🇵🇱 [pl](../pl/01-contributing-guide.md) · 🇵🇹 [pt](../pt/01-contributing-guide.md) · 🇧🇷 [pt-BR](../pt-BR/01-contributing-guide.md) · 🇷🇴 [ro](../ro/01-contributing-guide.md) · 🇷🇺 [ru](../ru/01-contributing-guide.md) · 🇸🇰 [sk](../sk/01-contributing-guide.md) · 🇸🇮 [sl](../sl/01-contributing-guide.md) · 🇷🇸 [sr](../sr/01-contributing-guide.md) · 🇰🇪 [sw](../sw/01-contributing-guide.md) · 🇮🇳 [ta](../ta/01-contributing-guide.md) · 🇮🇳 [te](../te/01-contributing-guide.md) · 🇹🇭 [th](../th/01-contributing-guide.md) · 🇹🇷 [tr](../tr/01-contributing-guide.md) · 🇺🇦 [uk-UA](../uk-UA/01-contributing-guide.md) · 🇵🇰 [ur](../ur/01-contributing-guide.md) · 🇻🇳 [vi](../vi/01-contributing-guide.md) · 🇨🇳 [zh-CN](../zh-CN/01-contributing-guide.md) · 🇹🇼 [zh-TW](../zh-TW/01-contributing-guide.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Development Setup

### Prerequisites

- **Node.js** >= 18 < 24 (recommended: 22 LTS)
- **npm** 10+
- **Git**

### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Key variables for development:

| Variable               | Development Default      | Description           |
| ---------------------- | ------------------------ | --------------------- |
| `PORT`                 | `20128`                  | Server port           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Base URL for frontend |
| `JWT_SECRET`           | (generate above)         | JWT signing secret    |
| `INITIAL_PASSWORD`     | `CHANGEME`               | First login password  |
| `APP_LOG_LEVEL`        | `info`                   | Log verbosity level   |

### Dashboard Settings

The dashboard provides UI toggles for features that can also be configured via environment variables:

| Setting Location    | Toggle             | Description                    |
| ------------------- | ------------------ | ------------------------------ |
| Settings → Advanced | Debug Mode         | Enable debug request logs (UI) |
| Settings → General  | Sidebar Visibility | Show/hide sidebar sections     |

These settings are stored in the database and persist across restarts, overriding env var defaults when set.

### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Default URLs:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git Workflow

> ⚠️ **NEVER commit directly to `main`.** Always use feature branches.

```bash
git checkout -b feat/your-feature-name
# ... make changes ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open a Pull Request on GitHub
```

### Branch Naming

| Prefix      | Purpose                   |
| ----------- | ------------------------- |
| `feat/`     | New features              |
| `fix/`      | Bug fixes                 |
| `refactor/` | Code restructuring        |
| `docs/`     | Documentation changes     |
| `test/`     | Test additions/fixes      |
| `chore/`    | Tooling, CI, dependencies |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update 03-security-policy.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.

---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

Coverage notes:

- `npm run test:coverage` measures source coverage for the main unit test suite, excludes `tests/**`, and includes `open-sse/**`
- Pull requests must keep the overall coverage gate at **60% or higher** for statements, lines, functions, and branches
- If a PR changes production code in `src/`, `open-sse/`, `electron/`, or `bin/`, it must add or update automated tests in the same PR
- `npm run coverage:report` prints the detailed file-by-file report from the latest coverage run
- `npm run test:coverage:legacy` preserves the older metric for historical comparison
- See `docs/ops/10-coverage-plan.md` for the phased coverage improvement roadmap

### Pull Request Requirements

Before opening or merging a PR:

- Run `npm run test:unit`
- Run `npm run test:coverage`
- Ensure the coverage gate stays at **60%+** for all metrics
- Include the changed or added test files in the PR description when production code changed
- Check the SonarQube result on the PR when the project secrets are configured in CI

Current test status: **122 unit test files** covering:

- Provider translators and format conversion
- Rate limiting, circuit breaker, and resilience
- Semantic cache, idempotency, progress tracking
- Database operations and schema (21 DB modules)
- OAuth flows and authentication
- API endpoint validation (Zod v4)
- MCP server tools and scope enforcement
- Memory and Skills systems

---

## Code Style

- **ESLint** — Run `npm run lint` before committing
- **Prettier** — Auto-formatted via `lint-staged` on commit (2 spaces, semicolons, double quotes, 100 char width, es5 trailing commas)
- **TypeScript** — All `src/` code uses `.ts`/`.tsx`; `open-sse/` uses `.ts`/`.js`; document with TSDoc (`@param`, `@returns`, `@throws`)
- **No `eval()`** — ESLint enforces `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validation** — Use Zod v4 schemas for all API input validation
- **Naming**: Files = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── 01-system-overview.md         # System architecture
├── 01-api-reference.md        # All endpoints
├── 01-user-guide.md           # Provider setup, CLI integration
├── 23-troubleshooting.md      # Common issues
├── 07-mcp-server.md           # MCP server (107 tools)
├── 01-a2a-server.md           # A2A agent protocol
├── 01-auto-combo.md           # Auto-combo engine
├── 02-cli-tools.md            # CLI tools integration
├── 10-coverage-plan.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

Add to `src/shared/constants/providers.ts` — Zod-validated at module load.

### Step 2: Add Executor (if custom logic needed)

Create executor in `open-sse/executors/your-provider.ts` extending the base executor.

### Step 3: Add Translator (if non-OpenAI format)

Create request/response translators in `open-sse/translator/`.

### Step 4: Add OAuth Config (if OAuth-based)

Add OAuth credentials in `src/lib/oauth/constants/oauth.ts` and service in `src/lib/oauth/services/`.

### Step 5: Register Models

Add model definitions in `open-sse/config/providerRegistry.ts`.

### Step 6: Add Tests

Write unit tests in `tests/unit/` covering at minimum:

- Provider registration
- Request/response translation
- Error handling

---

## Pull Request Checklist

- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] TypeScript types added for new public functions and interfaces
- [ ] No hardcoded secrets or fallback values
- [ ] All inputs validated with Zod schemas
- [ ] CHANGELOG updated (if user-facing change)
- [ ] Documentation updated (if applicable)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Getting Help

- **Architecture**: See [`docs/architecture/01-system-overview.md`](docs/architecture/01-system-overview.md)
- **API Reference**: See [`docs/reference/01-api-reference.md`](docs/reference/01-api-reference.md)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: See `docs/adr/` for architectural decision records
