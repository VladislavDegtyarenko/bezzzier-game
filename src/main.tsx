import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { CurveEditor } from './components/CurveEditor.tsx';
import { Feedback } from './components/Feedback.tsx';
import { FinishScreen } from './components/FinishScreen.tsx';
import { HomeLink } from './components/HomeLink.tsx';
import { Levels } from './components/Levels.tsx';
import { Playback } from './components/Playback.tsx';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { usePlayback } from './hooks/usePlayback.ts';
import { useGame } from './store/game.ts';
import { LEVELS } from './utils/levels.ts';
import './styles/game.css';

function App() {
  usePlayback();
  const screen = useGame((state) => state.screen);
  const stages = useRef<HTMLDivElement>(null);
  const previousScreen = useRef(screen);
  useEffect(() => {
    if (previousScreen.current === screen) return;
    previousScreen.current = screen;
    stages.current?.querySelector<HTMLElement>('h1')?.focus();
  }, [screen]);

  const levelIndex = useGame((state) => state.levelIndex);
  const completed = useGame((state) => state.completed.length);
  const level = LEVELS[levelIndex];

  return (
    <div className="console">
      <Levels />
      <main>
        <div className="masthead">
          <HomeLink className="wordmark">Bezzzier Game</HomeLink>
          <span>
            {completed} of {LEVELS.length} complete
          </span>
        </div>
        <div className="stages" ref={stages}>
          {screen === 'welcome' && (
            <section className="welcome">
              <WelcomeScreen />
              {}
            </section>
          )}
          {screen === 'game' && (
            <section className="challenge">
              <header>
                <p className="level-meta">
                  <span>Level {levelIndex + 1}</span>
                  <span className="difficulty">{level.difficulty}</span>
                </p>
                <h1 tabIndex={-1}>{level.name}</h1>
                <p className="intro">{level.clue}</p>
              </header>
              <div className="board">
                <Playback />
                <CurveEditor key={level.id} />
              </div>
              <Feedback />
            </section>
          )}
          {screen === 'finish' && (
            <section className="finale">
              <FinishScreen />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('Missing Bezzzier Game root element');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
