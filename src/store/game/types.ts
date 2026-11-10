import type { Curve, compareCurves } from '../../utils/curve.ts';

type Screen = 'welcome' | 'game' | 'finish';
type Mode = 'idle' | 'play' | 'loop' | 'check';
type Result = ReturnType<typeof compareCurves>;

type GameState = {
  screen: Screen;
  levelIndex: number;
  completed: string[];
  curve: Curve;
  mode: Mode;
  time: number;
  runId: number;
  result: Result | null;
};

export type GameActions = {
  openScreen: (screen: Screen) => void;
  selectLevel: (index: number) => void;
  movePoint: (index: 0 | 1, x: number, y: number) => void;
  resetCurve: () => void;
  start: (mode: Exclude<Mode, 'idle'>) => void;
  setTime: (time: number) => void;
  finish: () => void;
};

export type Game = GameState & GameActions;
