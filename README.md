# Bezzzier Game

Bezzzier Game is a browser puzzle about animation easing, or how an animation speeds up and slows down. Watch a target square move, then adjust a cubic Bézier curve to make your square match it. Five levels take you from constant speed to overshooting the finish.

## Run locally

Use Node.js 24 and pnpm 12.16.1. From the project folder, install the locked dependencies and start the development server.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open the URL printed by Vite, usually [http://localhost:5173](http://localhost:5173).

## Play

1. Select **Start game**, then **Play** to watch both squares move. Use **Loop** to repeat the motion while you edit.
2. Drag the two control points on the curve or use the arrow keys when a point has keyboard focus. The horizontal axis is time and the vertical axis is distance.
3. Select **Check** to compare the two motions. Matching the target within the level's tolerance unlocks the next level.

Completed levels are saved in your browser. After all five, **Finish** opens the results and sharing screen.

## Project structure

| Path | What it contains |
| --- | --- |
| [src/components](src/components) | Game screens, motion preview, and curve editor |
| [src/hooks](src/hooks) | Playback timing and pointer and keyboard controls |
| [src/store](src/store) | Zustand state, game actions, and browser progress storage |
| [src/utils/curve.ts](src/utils/curve.ts) | Bézier evaluation and motion comparison |
| [src/utils/levels.ts](src/utils/levels.ts) | Level targets, clues, and tolerances |
| [tests](tests) | Curve math and progress tests |

React and TypeScript implement the interface, Vite serves and builds it, and Biome checks code style. The game samples both squares at the same points in time and scores the largest difference in distance. This lets different control point positions pass when they produce sufficiently similar motion.

## Development commands

| Command | What it does |
| --- | --- |
| `pnpm test` | Run the Node.js tests |
| `pnpm run build` | Check TypeScript and build the static site into `dist/` |
| `pnpm run preview` | Serve the built site locally after running the build |
| `pnpm run format:check` / `pnpm run format` | Check or apply formatting |
| `pnpm run lint` / `pnpm run lint:fix` | Check for lint errors or apply safe fixes |
| `pnpm run imports:check` / `pnpm run imports:fix` | Check or sort imports |
| `pnpm run hooks:install` | Enable the Git pre-commit hook in the current clone |

The pre-commit hook checks formatting, linting, and import order in the files staged for the commit.
