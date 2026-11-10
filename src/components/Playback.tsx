import { useGame } from '../store/game.ts';
import { DURATION, positionAt } from '../utils/curve.ts';
import { LEVELS } from '../utils/levels.ts';
import { Icon } from './Icon.tsx';

function Track({
  label,
  position,
  finish,
  player = false,
}: {
  label: string;
  position: number;
  finish: number;
  player?: boolean;
}) {
  return (
    <div className={player ? 'lane player' : 'lane'}>
      <div className="lane-label">
        <span>{label}</span>
        <span>{Math.round(position * 100)}%</span>
      </div>
      <div className="track" aria-hidden="true">
        <div className="track-range">
          <i className="finish" style={{ left: `${finish * 100}%` }} />
          <i
            className="square"
            style={{ left: `${position * finish * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function Playback() {
  const levelIndex = useGame((state) => state.levelIndex);
  const curve = useGame((state) => state.curve);
  const mode = useGame((state) => state.mode);
  const time = useGame((state) => state.time);
  const start = useGame((state) => state.start);
  const level = LEVELS[levelIndex];
  const finish = level.maxY > 1 ? 1 / 1.5 : 1;
  const checking = mode === 'check';

  return (
    <section className="panel playback" aria-labelledby="playback-title">
      <div className="panel-heading">
        <h2 id="playback-title">Motion preview</h2>
        <span className="time">
          {((time * DURATION) / 1000).toFixed(2)} /{' '}
          {(DURATION / 1000).toFixed(2)} s
        </span>
      </div>
      <div className="tracks">
        <Track
          label="Target"
          position={positionAt(level.target, time)}
          finish={finish}
        />
        <Track
          label="Your run"
          position={positionAt(curve, time)}
          finish={finish}
          player
        />
      </div>
      <fieldset className="transport" aria-label="Playback controls">
        <button type="button" disabled={checking} onClick={() => start('play')}>
          <Icon name="play" />
          Play
        </button>
        <button
          type="button"
          disabled={checking}
          aria-pressed={mode === 'loop'}
          onClick={() => start('loop')}
        >
          <Icon name="loop" />
          Loop
        </button>
        <button
          type="button"
          className="primary"
          disabled={checking}
          onClick={() => start('check')}
        >
          <Icon name="check" />
          Check
        </button>
      </fieldset>
    </section>
  );
}
