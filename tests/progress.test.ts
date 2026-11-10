import assert from 'node:assert/strict';
import { test } from 'node:test';
import { LEVELS } from '../src/utils/levels.ts';

test('check unlocks sequentially and restores all completed levels after a reload', async () => {
  const storage = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  });

  const { useGame } = await import('../src/store/game.ts');
  const game = () => useGame.getState();

  game().selectLevel(1);
  assert.equal(game().levelIndex, 0);
  game().start('play');
  game().finish();
  assert.deepEqual(game().completed, []);

  game().start('check');
  game().finish();
  assert.equal(game().result?.passed, false);
  assert.deepEqual(game().completed, []);

  for (const [index, level] of LEVELS.entries()) {
    game().selectLevel(index);
    assert.equal(game().levelIndex, index);
    const [x1, y1, x2, y2] = level.target;
    game().movePoint(0, x1, y1);
    game().movePoint(1, x2, y2);
    game().start('check');
    game().resetCurve();
    game().finish();
    assert.equal(game().result?.passed, true);
    assert.equal(game().completed.length, index + 1);
  }

  game().selectLevel(4);
  game().resetCurve();
  game().start('check');
  game().finish();
  assert.equal(game().result?.passed, false);
  assert.equal(game().completed.length, 5);

  const reloaded = await import(
    new URL('../src/store/game.ts?reload', import.meta.url).href
  );
  assert.deepEqual(
    reloaded.useGame.getState().completed,
    LEVELS.map(({ id }) => id),
  );
  assert.equal(reloaded.useGame.getState().levelIndex, 4);
});
