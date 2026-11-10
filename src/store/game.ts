import { create } from 'zustand';
import { getStartingCurve, LEVELS } from '../utils/levels.ts';
import { createGameActions } from './game/actions.ts';
import { loadProgress } from './game/progress.ts';
import type { Game } from './game/types.ts';

export const useGame = create<Game>((set, get, store) => {
  const completed = loadProgress();
  const levelIndex = Math.min(completed.length, LEVELS.length - 1);

  return {
    screen: 'welcome',
    levelIndex,
    completed,
    curve: getStartingCurve(levelIndex),
    mode: 'idle',
    time: 0,
    runId: 0,
    result: null,
    ...createGameActions(set, get, store),
  };
});
