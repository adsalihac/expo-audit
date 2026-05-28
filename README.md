# Expo App Performance Auditor

Production-grade SaaS platform for auditing, profiling, and improving Expo React Native app performance.

## Monorepo

- apps/web: Next.js 15 dashboard + landing page
- apps/api: NestJS API + WebSocket gateway
- apps/worker: BullMQ analytics processing workers
- tools/cli: `npx expo-audit` command line client
- packages/*: shared domain logic, analytics engines, UI, database, and SDKs
- infra/docker: Docker and Compose templates
- infra/k8s: Kubernetes manifests
- .github/workflows: CI/CD and performance gates
- docs: architecture and deployment documentation

## Project Details

- Project details structure and AI agent purpose: [docs/PROJECT_DETAILS_STRUCTURE.md](docs/PROJECT_DETAILS_STRUCTURE.md)

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Start local services:

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

3. Generate Prisma client and migrate DB:

```bash
pnpm db:generate
pnpm db:migrate
```

4. Run all apps:

```bash
pnpm dev
```
