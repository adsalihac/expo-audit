# Expo Sample App (Testing Fixture)

This sample app is included for testing the Expo App Performance Auditor CLI and backend pipeline.

## Install and Run

1. Install dependencies:

```bash
pnpm install
```

2. Start the sample app:

```bash
pnpm --dir examples/expo-sample-app start
```

## Test CLI Commands Against This Project

Run from repo root:

```bash
pnpm --filter expo-audit exec tsx src/index.ts scan --path examples/expo-sample-app
pnpm --filter expo-audit exec tsx src/index.ts bundle --path examples/expo-sample-app
pnpm --filter expo-audit exec tsx src/index.ts doctor --path examples/expo-sample-app
pnpm --filter expo-audit exec tsx src/index.ts profile
```

Optional upload example:

```bash
pnpm --filter expo-audit exec tsx src/index.ts upload \
  --path examples/expo-sample-app \
  --api-url http://localhost:4000 \
  --token your_api_token \
  --project-id your_project_id
```
