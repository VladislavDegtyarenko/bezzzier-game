import { useEffect } from 'react';
import { useGame } from '../store/game.ts';
import { DURATION, LOOP_PAUSE } from '../utils/curve.ts';

export function usePlayback() {
  const mode = useGame((state) => state.mode);
  const runId = useGame((state) => state.runId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Each run restarts playback even when the mode stays the same.
  useEffect(() => {
    if (mode === 'idle') return;

    const { setTime, finish } = useGame.getState();
    const startedAt = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - startedAt;
      if (mode !== 'loop' && elapsed >= DURATION) {
        finish();
        return;
      }

      const cycleTime =
        mode === 'loop' ? elapsed % (DURATION + LOOP_PAUSE) : elapsed;
      setTime(Math.min(1, cycleTime / DURATION));
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode, runId]);
}
