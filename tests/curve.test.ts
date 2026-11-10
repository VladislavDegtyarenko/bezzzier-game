import assert from 'node:assert/strict';
import { test } from 'node:test';
import { compareCurves, LINEAR, positionAt } from '../src/utils/curve.ts';
import { isUnlocked, LEVELS } from '../src/utils/levels.ts';

test('position is evaluated at time, including a linear curve with uneven handles', () => {
  for (const time of [0, 0.1, 0.37, 0.75, 1]) {
    assert.ok(Math.abs(positionAt([0, 0, 1, 1], time) - time) < 1e-7);
  }
  assert.ok(positionAt(LEVELS[1].target, 0.25) > 0.35);
});

test('grading identifies the peak gap and accepts the threshold inclusively', () => {
  const target = LEVELS[2].target;
  const { error, time, passed } = compareCurves(target, LINEAR, 0.05);
  assert.equal(passed, false);
  assert.ok(time > 0 && time < 1);
  assert.ok(Math.abs(error) > 0.05);
  assert.equal(compareCurves(target, LINEAR, Math.abs(error)).passed, true);
  assert.equal(compareCurves(target, target, 0).passed, true);
});

test('expert curve goes past the finish then settles at exactly 100%', () => {
  const expert = LEVELS[4].target;
  assert.ok(positionAt(expert, 0.9) > 1);
  assert.equal(positionAt(expert, 1), 1);
});

test('all earlier challenges must be complete to unlock the next one', () => {
  assert.equal(isUnlocked(0, []), true);
  assert.equal(isUnlocked(1, []), false);
  assert.equal(isUnlocked(2, ['finish']), false);
  assert.equal(isUnlocked(2, ['steady', 'finish']), true);
  assert.equal(
    isUnlocked(
      5,
      LEVELS.map(({ id }) => id),
    ),
    false,
  );
});
