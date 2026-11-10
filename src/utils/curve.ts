export type Curve = readonly [number, number, number, number];

export const LINEAR: Curve = [1 / 3, 1 / 3, 2 / 3, 2 / 3];
export const DURATION = 1200;
export const LOOP_PAUSE = 350;

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function coordinate(t: number, first: number, second: number) {
  const inverse = 1 - t;
  return (
    3 * inverse * inverse * t * first + 3 * inverse * t * t * second + t ** 3
  );
}

export function positionAt(curve: Curve, time: number) {
  if (time <= 0) return 0;
  if (time >= 1) return 1;

  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 26; iteration++) {
    const middle = (low + high) / 2;
    if (coordinate(middle, curve[0], curve[2]) < time) low = middle;
    else high = middle;
  }

  return coordinate((low + high) / 2, curve[1], curve[3]);
}

export function compareCurves(target: Curve, player: Curve, tolerance: number) {
  let error = 0;
  let time = 0;

  for (let sample = 0; sample <= 120; sample++) {
    const sampleTime = sample / 120;
    const difference =
      positionAt(player, sampleTime) - positionAt(target, sampleTime);
    if (Math.abs(difference) > Math.abs(error)) {
      error = difference;
      time = sampleTime;
    }
  }

  return { error, time, passed: Math.abs(error) <= tolerance + 1e-9 };
}
