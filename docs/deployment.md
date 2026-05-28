# Deployment Guide

## Local

1. Start infra:

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

2. Install and build:

```bash
pnpm install
pnpm --filter @expo-audit/database db:generate
pnpm --filter @expo-audit/api build
pnpm --filter @expo-audit/worker build
pnpm --filter @expo-audit/web build
pnpm --filter expo-audit build
```

3. Run apps:

```bash
pnpm dev
```

This starts the long-running app services only:
- Web (Next.js)
- API (NestJS)
- Worker (BullMQ)

Required environment values for local runtime:

```bash
export DATABASE_URL='postgresql://expoaudit:expoaudit@localhost:5432/expo_audit'
export REDIS_URL='redis://localhost:6379'
pnpm dev
```

If port 3000 is already in use, free it or run web on another port:

```bash
pnpm --filter @expo-audit/web exec next dev -p 3001
```

If port 4000 is already in use, free it or run API on another port:

```bash
PORT=4001 pnpm --filter @expo-audit/api dev
```

Quick cleanup for existing local listeners:

```bash
lsof -ti :3000 | xargs kill -9
lsof -ti :4000 | xargs kill -9
```

Optional CLI usage in another terminal:

```bash
pnpm --filter expo-audit dev --help
```

Run audit commands against the bundled sample Expo app:

```bash
pnpm --filter expo-audit exec tsx src/index.ts scan --path examples/expo-sample-app
pnpm --filter expo-audit exec tsx src/index.ts bundle --path examples/expo-sample-app
pnpm --filter expo-audit exec tsx src/index.ts doctor --path examples/expo-sample-app
pnpm --filter expo-audit exec tsx src/index.ts profile
```

## Cloud

1. Build and push:

```bash
docker build -f infra/docker/Dockerfile.api -t ghcr.io/your-org/expo-audit-api:latest .
docker build -f infra/docker/Dockerfile.web -t ghcr.io/your-org/expo-audit-web:latest .
docker build -f infra/docker/Dockerfile.worker -t ghcr.io/your-org/expo-audit-worker:latest .
```

2. Apply k8s manifests:

```bash
kubectl apply -f infra/k8s/namespace.yaml
kubectl apply -f infra/k8s/api-deployment.yaml
kubectl apply -f infra/k8s/web-deployment.yaml
kubectl apply -f infra/k8s/worker-deployment.yaml
kubectl apply -f infra/k8s/ingress.yaml
```

## Scaling

- API: HPA on CPU + request latency
- Worker: HPA on queue depth + CPU
- Web: HPA on response latency

## Reliability

- Use Postgres HA with daily backups
- Redis persistence AOF enabled for queue durability
- Configure dead-letter queue and failed job replay UI
