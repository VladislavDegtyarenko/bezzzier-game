import { type Curve, LINEAR } from './curve.ts';

type Level = {
  id: string;
  name: string;
  difficulty: string;
  clue: string;
  target: Curve;
  startingCurve?: Curve;
  tolerance: number;
  maxY: number;
};

export const LEVELS: readonly Level[] = [
  {
    id: 'steady',
    name: 'Steady Pace',
    difficulty: 'Beginner',
    clue: 'The target moves at a constant speed. Drag the two points toward the dashed diagonal to match it.',
    target: LINEAR,
    startingCurve: [0.55, 0.1, 0.65, 0.85],
    tolerance: 0.045,
    maxY: 1,
  },
  {
    id: 'finish',
    name: 'Smooth Finish',
    difficulty: 'Easy',
    clue: 'The square covers most of the distance early, then eases into the finish.',
    target: [0, 0, 0.58, 1],
    tolerance: 0.08,
    maxY: 1,
  },
  {
    id: 'rush',
    name: 'Middle Rush',
    difficulty: 'Medium',
    clue: 'Look for the burst of speed between the quiet start and finish.',
    target: [0.42, 0, 0.58, 1],
    tolerance: 0.05,
    maxY: 1,
  },
  {
    id: 'late',
    name: 'Late Surge',
    difficulty: 'Hard',
    clue: 'The square holds back, then makes up most of the distance near the finish.',
    target: [0.78, 0.05, 0.86, 0.36],
    tolerance: 0.045,
    maxY: 1,
  },
  {
    id: 'overshoot',
    name: 'Overshoot',
    difficulty: 'Expert',
    clue: 'The square goes beyond the finish before returning to it.',
    target: [0.3, 0, 0.6, 1.4],
    tolerance: 0.04,
    maxY: 1.5,
  },
];

export function isUnlocked(index: number, completed: readonly string[]) {
  return (
    index >= 0 &&
    index < LEVELS.length &&
    LEVELS.slice(0, index).every((level) => completed.includes(level.id))
  );
}

export function getStartingCurve(index: number) {
  return LEVELS[index].startingCurve ?? LINEAR;
}
