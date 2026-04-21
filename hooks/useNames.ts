import { useState, useCallback } from 'react';

const STORAGE_KEY = 'namepicker_names';

function readNames(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function writeNames(names: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
}

export function useNames() {
  const [names, setNamesState] = useState<string[]>(readNames);

  const setNames = useCallback((updated: string[]) => {
    writeNames(updated);
    setNamesState(updated);
  }, []);

  return { names, setNames };
}
