# Expo App Performance Auditor Architecture

## 1) Full SaaS Architecture

- Interface Layer: Next.js 15 app (landing + dashboard + realtime widgets)
- API Layer: NestJS modular monolith with domain modules
- Processing Layer: BullMQ workers for async analytics/report generation
- Data Layer: PostgreSQL + Prisma for relational data and historical metrics
- Cache/Queue Layer: Redis (low-latency queues + ephemeral caches)
- Storage Layer: S3-compatible storage for reports/artifacts
- Realtime Layer: WebSockets for live audit and runtime updates
- Intelligence Layer: Expo-specific checks, scoring engine, AI recommendation synthesizer

## 2) Monorepo Structure

- apps/web: Next.js premium product experience
- apps/api: NestJS API + security + websockets
- apps/worker: asynchronous processors
- packages/database: Prisma schema + client
- packages/types: shared DTO/domain types
- packages/analytics-engine: scoring and regression detection
- packages/expo-intelligence: Expo/Router/Hermes/SDK checks
- packages/ai-recommendations: optimization plan generator
- packages/queue: queue contracts and names
- packages/ui: reusable tokenized UI primitives
- packages/cli-core: reusable CLI domain logic
- tools/cli: distributable npm CLI
- infra/docker: compose and Dockerfiles
- infra/k8s: Kubernetes manifests

## 3) Backend API Architecture

- Auth Module: token verification, provider integration entrypoint
- Teams Module: team and membership boundary
- Projects Module: project metadata + Expo config baseline
- Audits Module: ingest endpoint, pre-processing, queue scheduling
- Analytics Module: project overview and trend computations
- Builds Module: build timeline retrieval
- Devices Module: benchmark tier endpoints
- Reports Module: weekly summaries and export orchestration
- Recommendations Module: AI/reviewed recommendations retrieval
- Notifications Module: in-app alerts + channel abstraction for Slack/Discord
- Realtime Module: project room events for metric and audit updates

## 4) Analytics Pipeline

1. CLI collects scan, bundle, startup, runtime metrics.
2. CLI signs and uploads payload to API.
3. API enriches with Expo intelligence and computes preliminary score.
4. API stores PENDING audit and enqueues audit-ingest job.
5. Worker computes final score, regression deltas, optimization plan.
6. Worker persists recommendations, updates audit status, emits notification.
7. Dashboard receives updates through WebSockets and query refresh.

## 5) AI Recommendation Engine Structure

- Signal Inputs: bundle metrics, startup profile, runtime telemetry, Expo config signals
- Rule Engine: deterministic first-pass issue extraction and severity assignment
- Synthesizer: creates optimization plan + prioritized actions + architecture risks
- Extensible Provider Slot: OpenAI/Anthropic adapter for advanced natural-language guidance

## 6) Realtime Infrastructure

- Namespace: /realtime
- Room model: per-project channels
- Event types: connected, joined, metric, audit-updated, notification
- Pub/Sub extension: Redis adapter recommended for multi-instance socket broadcast

## 7) Security Model

- Signed API tokens and JWT-based claims
- Role-based permissions at team/project boundary
- Rate limiting via Nest Throttler
- S3 signed URL pattern for report upload/download
- Audit logs for critical actions
- Secret rotation and encrypted secret storage through platform vault

## 8) CI/CD Performance Intelligence

- PR workflows run scan/bundle/profile gates
- Upload baseline and candidate report to API
- Regression engine decides pass/fail threshold
- PR comment bot (next step) summarizes score delta, startup delta, bundle delta

## 9) Production Deployment Strategy

- Build immutable images for web/api/worker
- Deploy to Kubernetes with horizontal scaling
- Isolate worker autoscaling from API latency scaling
- Use managed Postgres and Redis in production
- Front web via CDN + edge cache
- Persist reports/artifacts in S3-compatible bucket with lifecycle rules
