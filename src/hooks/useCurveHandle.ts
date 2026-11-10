import {
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useRef,
} from 'react';
import { useGame } from '../store/game.ts';

export function useCurveHandle(
  index: 0 | 1,
  x: number,
  y: number,
  maxY: number,
  plot: RefObject<HTMLDivElement | null>,
) {
  const active = useRef<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const move = useGame((state) => state.movePoint);

  function coordinates(event: PointerEvent<HTMLButtonElement>) {
    const bounds = plot.current?.getBoundingClientRect();
    if (!bounds?.width || !bounds.height) return;
    return {
      x: (event.clientX - bounds.left) / bounds.width,
      y: (1 - (event.clientY - bounds.top) / bounds.height) * maxY,
    };
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || active.current !== null) return;
    const point = coordinates(event);
    if (!point) return;
    offset.current = { x: point.x - x, y: point.y - y };
    active.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (active.current !== event.pointerId) return;
    const point = coordinates(event);
    if (point)
      move(index, point.x - offset.current.x, point.y - offset.current.y);
  }

  function release(event: PointerEvent<HTMLButtonElement>) {
    if (active.current === event.pointerId) active.current = null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 0.05 : 0.01;
    switch (event.key) {
      case 'ArrowLeft':
        move(index, x - step, y);
        break;
      case 'ArrowRight':
        move(index, x + step, y);
        break;
      case 'ArrowDown':
        move(index, x, y - step);
        break;
      case 'ArrowUp':
        move(index, x, y + step);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  return {
    onPointerDown,
    onPointerMove,
    onLostPointerCapture: release,
    onPointerUp: release,
    onPointerCancel: release,
    onKeyDown,
  };
}
