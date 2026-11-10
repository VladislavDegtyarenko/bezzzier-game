import { type RefObject, useRef } from 'react';
import { useCurveHandle } from '../hooks/useCurveHandle.ts';
import { useGame } from '../store/game.ts';
import { LEVELS } from '../utils/levels.ts';

function Handle({
  index,
  x,
  y,
  maxY,
  plot,
  disabled,
}: {
  index: 0 | 1;
  x: number;
  y: number;
  maxY: number;
  plot: RefObject<HTMLDivElement | null>;
  disabled: boolean;
}) {
  const interactions = useCurveHandle(index, x, y, maxY, plot);
  return (
    <button
      type="button"
      className="handle"
      disabled={disabled}
      style={{ left: `${x * 100}%`, top: `${(1 - y / maxY) * 100}%` }}
      aria-label={`Control point ${index + 1}, time ${Math.round(x * 100)}%, distance ${Math.round(y * 100)}%`}
      aria-describedby="curve-instructions"
      {...interactions}
    />
  );
}

export function CurveEditor() {
  const levelIndex = useGame((state) => state.levelIndex);
  const [x1, y1, x2, y2] = useGame((state) => state.curve);
  const checking = useGame((state) => state.mode === 'check');
  const reset = useGame((state) => state.resetCurve);
  const plot = useRef<HTMLDivElement>(null);
  const { maxY, startingCurve } = LEVELS[levelIndex];
  const y = (value: number) => 100 * (1 - value / maxY);

  return (
    <section className="panel editor" aria-labelledby="editor-title">
      <div className="panel-heading">
        <h2 id="editor-title">Your curve</h2>
        <button
          type="button"
          className="quiet"
          disabled={checking}
          onClick={reset}
        >
          Reset curve
        </button>
      </div>
      <div className="axes-top">
        <span>Distance ↑</span>
        <span>{Math.round(maxY * 100)}%</span>
      </div>
      <div className="plot" ref={plot}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="guide"
            d={`M0 100L${x1 * 100} ${y(y1)} M100 ${y(1)}L${x2 * 100} ${y(y2)}`}
          />
          {startingCurve && (
            <path className="guide diagonal" d={`M0 100L100 ${y(1)}`} />
          )}
          <path
            className="easing"
            d={`M0 100C${x1 * 100} ${y(y1)} ${x2 * 100} ${y(y2)} 100 ${y(1)}`}
          />
        </svg>
        <Handle
          index={0}
          x={x1}
          y={y1}
          maxY={maxY}
          plot={plot}
          disabled={checking}
        />
        <Handle
          index={1}
          x={x2}
          y={y2}
          maxY={maxY}
          plot={plot}
          disabled={checking}
        />
      </div>
      <div className="axes-bottom">
        <span>0</span>
        <span>Time →</span>
      </div>
      <p className="hint" id="curve-instructions">
        Drag the points or use the arrow keys.
      </p>
    </section>
  );
}
