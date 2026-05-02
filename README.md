# AI 信号场

Next.js 14 + TypeScript + Tailwind CSS mock implementation for an AI frontier signal dashboard.

## Run

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Notes

- The requested `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes` command was run first, but the current environment could not resolve `registry.npmjs.org`.
- This repo was therefore scaffolded manually with the equivalent App Router structure.
- Mock content lives in `src/data/signals.ts`.
