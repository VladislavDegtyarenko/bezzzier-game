import { LEVELS } from '../../utils/levels.ts';

const STORAGE_KEY = 'bezier-lab.completed.v1';

export function loadProgress(): string[] {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '[]',
    );
    if (!Array.isArray(saved)) return [];
    const firstMissing = LEVELS.findIndex((level) => !saved.includes(level.id));
    return LEVELS.slice(
      0,
      firstMissing === -1 ? LEVELS.length : firstMissing,
    ).map((level) => level.id);
  } catch {
    return [];
  }
}

export function saveProgress(completed: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  } catch {
    // Progress remains available for this session when storage is unavailable.
  }
}
