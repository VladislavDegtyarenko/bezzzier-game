import { useGame } from '../store/game.ts';
import { LEVELS } from '../utils/levels.ts';
import { Icon } from './Icon.tsx';

export function WelcomeScreen() {
  const completed = useGame((state) => state.completed.length);
  const openScreen = useGame((state) => state.openScreen);

  return (
    <div className="screen-content">
      <h1 tabIndex={-1}>Match the motion</h1>
      <p className="intro">
        Learn how a Bézier curve changes the speed of an animation. Your goal is
        to make your square move like the target.
      </p>
      <ol className="welcome-steps">
        <li>
          <strong>Watch</strong>
          <span>Play the target motion.</span>
        </li>
        <li>
          <strong>Shape</strong>
          <span>Drag the two points to change your square’s speed.</span>
        </li>
        <li>
          <strong>Check</strong>
          <span>Match the motion to unlock the next level.</span>
        </li>
      </ol>
      <button
        type="button"
        className="action primary"
        onClick={() =>
          openScreen(completed === LEVELS.length ? 'finish' : 'game')
        }
      >
        {completed === LEVELS.length
          ? 'View results'
          : completed
            ? 'Continue'
            : 'Start game'}{' '}
        <Icon name="next" />
      </button>
    </div>
  );
}
