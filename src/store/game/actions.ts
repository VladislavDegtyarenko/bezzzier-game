import type { StateCreator } from 'zustand';
import { type Curve, clamp, compareCurves } from '../../utils/curve.ts';
import { getStartingCurve, isUnlocked, LEVELS } from '../../utils/levels.ts';
import { saveProgress } from './progress.ts';
import type { Game, GameActions } from './types.ts';

export const createGameActions: StateCreator<Game, [], [], GameActions> = (
  set,
  get,
) => ({
  openScreen: (screen) => {
    if (screen === 'finish' && get().completed.length !== LEVELS.length) return;
    set({ screen, mode: 'idle' });
  },
  selectLevel: (index) => {
    if (!isUnlocked(index, get().completed)) return;
    if (index === get().levelIndex) {
      set({ screen: 'game' });
      return;
    }
    set({
      screen: 'game',
      levelIndex: index,
      curve: getStartingCurve(index),
      mode: 'idle',
      time: 0,
      result: null,
    });
  },
  movePoint: (index, x, y) => {
    const { curve, mode, levelIndex } = get();
    if (mode === 'check') return;
    const nextX = clamp(x, 0, 1);
    const nextY = clamp(y, 0, LEVELS[levelIndex].maxY);
    const next: Curve =
      index === 0
        ? [nextX, nextY, curve[2], curve[3]]
        : [curve[0], curve[1], nextX, nextY];
    set({ curve: next, result: null });
  },
  resetCurve: () => {
    const { mode, levelIndex } = get();
    if (mode !== 'check')
      set({ curve: getStartingCurve(levelIndex), result: null });
  },
  start: (mode) => {
    if (get().mode === 'check') return;
    if (mode === 'loop' && get().mode === 'loop') {
      set({ mode: 'idle' });
      return;
    }
    set((state) => ({ mode, time: 0, result: null, runId: state.runId + 1 }));
  },
  setTime: (time) => set({ time }),
  finish: () => {
    const { mode, curve, levelIndex, completed } = get();
    if (mode === 'play') {
      set({ mode: 'idle', time: 1 });
      return;
    }
    if (mode !== 'check') return;

    const level = LEVELS[levelIndex];
    const result = compareCurves(level.target, curve, level.tolerance);
    if (result.passed && !completed.includes(level.id)) {
      const updated = [...completed, level.id];
      saveProgress(updated);
      set({ completed: updated, result, mode: 'idle', time: result.time });
      return;
    }
    set({ result, mode: 'idle', time: result.time });
  },
});
