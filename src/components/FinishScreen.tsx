import { ShareGame } from './ShareGame.tsx';

const DONATION_URL = 'https://base.monobank.ua/77PRpdwKEegT3p';

export function FinishScreen() {
  return (
    <div className="screen-content">
      <p className="screen-label">Run complete</p>
      <h1 tabIndex={-1}>All levels complete</h1>
      <p className="intro">
        You matched every motion. Challenge a friend or support the project.
      </p>
      <div className="screen-actions">
        <ShareGame />
        <a
          className="action"
          href={DONATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Support the project ↗
        </a>
      </div>
      <p className="finish-credit">
        2026 · Created by{' '}
        <a href="https://www.vd-developer.online">Vladyslav Dihtiarenko</a>
      </p>
    </div>
  );
}
