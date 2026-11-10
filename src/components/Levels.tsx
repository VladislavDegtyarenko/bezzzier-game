import { useGame } from '../store/game.ts';
import { isUnlocked, LEVELS } from '../utils/levels.ts';
import { HomeLink } from './HomeLink.tsx';
import { Icon } from './Icon.tsx';

export function Levels() {
  const screen = useGame((state) => state.screen);
  const current = useGame((state) => state.levelIndex);
  const completed = useGame((state) => state.completed);
  const openScreen = useGame((state) => state.openScreen);
  const canFinish = completed.length === LEVELS.length;
  const selectLevel = useGame((state) => state.selectLevel);

  return (
    <nav className="levels" aria-label="Levels">
      <HomeLink className="brand-mark">
        <Icon name="mark" />
      </HomeLink>
      <ol>
        {LEVELS.map((level, index) => {
          const locked = !isUnlocked(index, completed);
          const passed = completed.includes(level.id);
          return (
            <li key={level.id}>
              <button
                type="button"
                className="level"
                disabled={locked}
                aria-current={
                  screen === 'game' && index === current ? 'step' : undefined
                }
                aria-label={`Level ${index + 1}: ${level.name}${locked ? ', locked' : passed ? ', complete' : ''}`}
                onClick={() => selectLevel(index)}
              >
                <span className="level-number">
                  {locked ? (
                    <Icon name="lock" />
                  ) : passed ? (
                    <Icon name="check" />
                  ) : (
                    String(index + 1).padStart(2, '0')
                  )}
                </span>
                <span>{level.difficulty}</span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            className="level"
            disabled={!canFinish}
            aria-label={canFinish ? 'Finish' : 'Finish, locked'}
            aria-current={screen === 'finish' ? 'step' : undefined}
            onClick={() => openScreen('finish')}
          >
            <span className="level-number">
              <Icon name={canFinish ? 'flag' : 'lock'} />
            </span>
            <span>Finish</span>
          </button>
        </li>
      </ol>
    </nav>
  );
}
