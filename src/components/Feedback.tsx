import { useGame } from '../store/game.ts';
import { LEVELS } from '../utils/levels.ts';
import { Icon } from './Icon.tsx';

export function Feedback() {
  const openScreen = useGame((state) => state.openScreen);
  const checking = useGame((state) => state.mode === 'check');
  const index = useGame((state) => state.levelIndex);
  const completed = useGame((state) => state.completed);
  const result = useGame((state) => state.result);
  const selectLevel = useGame((state) => state.selectLevel);
  const hasNext = index < LEVELS.length - 1;
  const showFinish =
    !hasNext && completed.length === LEVELS.length && !checking;
  const showNext = hasNext && result?.passed;
  const level = LEVELS[index];
  const title = checking
    ? 'Checking…'
    : result && !result.passed
      ? 'Try again'
      : showFinish
        ? 'All levels complete'
        : result
          ? 'Level passed'
          : 'Ready to check';

  const gap = Math.abs(result?.error ?? 0) * 100;
  const limit = level.tolerance * 100;
  const detail = !result
    ? checking
      ? 'Watch both squares as they run side by side.'
      : showFinish
        ? 'You matched every motion.'
        : 'Shape your curve, then press Check to see how close you are.'
    : result.passed
      ? gap < 0.05
        ? 'Perfect match!'
        : `Nice match! Your square stayed within ${gap.toFixed(1)}% of the target along the track.`
      : `Your square got too far ${result.error > 0 ? 'ahead' : 'behind'}. Aim to stay within ${limit}% of the track length from the target.`;

  return (
    <section className="feedback" aria-label="Challenge feedback">
      <div role="status">
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      {(showNext || showFinish) && (
        <button
          type="button"
          className="action primary feedback-action"
          onClick={() =>
            showFinish ? openScreen('finish') : selectLevel(index + 1)
          }
        >
          {showFinish ? 'Finish' : 'Next level'} <Icon name="next" />
        </button>
      )}
    </section>
  );
}
