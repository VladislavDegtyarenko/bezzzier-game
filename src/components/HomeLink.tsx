import type { MouseEvent, ReactNode } from 'react';
import { useGame } from '../store/game.ts';

export function HomeLink({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const openScreen = useGame((state) => state.openScreen);

  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    openScreen('welcome');
  }

  return (
    <a
      className={className}
      href={window.location.pathname}
      aria-label="Bezzzier Game home"
      onClick={goHome}
    >
      {children}
    </a>
  );
}
