# AGENTS.md

Bezzzier Game is a client-side React and TypeScript game built with Vite. See [README.md](README.md) for setup, game controls, and pnpm commands.

## Code changes

- Keep UI in `src/components/`, input and playback hooks in `src/hooks/`, and reusable curve math in `src/utils/`.
- Keep Zustand store initialization in `src/store/game.ts` and its actions, types, and progress storage in `src/store/game/`. Reuse existing selectors and actions when updating components.
- Define levels and tolerances in `src/utils/levels.ts`. Preserve existing level IDs and browser progress compatibility when changing level content.
- Keep pointer and keyboard controls working when editing the curve editor. Retain accessible names for icon-only controls.
- Use the repository's Biome configuration for formatting, linting, and import order.
- Update the README when setup, commands, or player-facing behavior changes.

## Verification

After changing code, run the checks from the project folder.

```sh
pnpm run format:check
pnpm run lint
pnpm run imports:check
pnpm test
pnpm run build
```

Check the affected game flow in a browser for UI or input changes. Use `pnpm run hooks:install` to enable the repository's pre-commit hook in a new clone.
