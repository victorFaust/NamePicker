'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNames } from '@/hooks/useNames';

export default function NamePicker() {
  const { names } = useNames();
  const [selectedCount, setSelectedCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [revealedResults, setRevealedResults] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handlePick = () => {
    if (names.length === 0) return;
    setIsSpinning(true);
    setResults([]);
    setRevealedResults([]);
    const count = Math.min(selectedCount, names.length);
    const shuffled = shuffleArray(names);
    const picked = shuffled.slice(0, count);
    setResults(picked);
    picked.forEach((_, index) => {
      setTimeout(() => {
        setRevealedResults((prev) => [...prev, picked[index]]);
      }, 300 + index * 500);
    });
    setTimeout(() => setIsSpinning(false), 300 + picked.length * 500);
  };

  return (
    <div className="space-y-6">
      {/* Picker card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Card header stripe */}
        <div className="h-1.5 bg-gradient-to-r from-accent via-rose-400 to-accent/60" />

        <div className="p-8 space-y-7">
          {/* Count selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-600 text-foreground">How many to pick?</label>
              <div className="flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1">
                <span className="text-lg font-700 text-accent tabular-nums">{selectedCount}</span>
                <span className="text-muted-foreground text-sm font-500">/ {Math.max(names.length, 1)}</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max={Math.max(names.length, 1)}
              value={selectedCount}
              onChange={(e) => setSelectedCount(parseInt(e.target.value))}
              disabled={isSpinning || names.length === 0}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-accent disabled:opacity-40"
              style={{ background: `linear-gradient(to right, #e11d48 ${((selectedCount - 1) / Math.max(names.length - 1, 1)) * 100}%, #e4e4e7 ${((selectedCount - 1) / Math.max(names.length - 1, 1)) * 100}%)` }}
            />
          </div>

          {/* Names pool */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-sm font-600 text-foreground">Name Pool</label>
              <span className="text-xs font-500 text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {names.length} {names.length === 1 ? 'name' : 'names'}
              </span>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 border border-border min-h-16 max-h-36 overflow-y-auto">
              {names.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-2">
                  No names yet.{' '}
                  <Link to="/admin" className="text-accent font-600 hover:underline">
                    Add names in Admin Panel
                  </Link>
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {names.map((name, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-card text-foreground rounded-full text-sm font-500 border border-border"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pick button */}
          <button
            onClick={handlePick}
            disabled={isSpinning || names.length === 0}
            className="w-full h-13 rounded-xl bg-accent hover:bg-accent/90 active:scale-[0.98] text-white font-700 text-base transition-all shadow-md shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isSpinning ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Picking...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Pick {selectedCount} {selectedCount === 1 ? 'Name' : 'Names'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-accent via-rose-400 to-accent/60" />
          <div className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-700 text-foreground">Selected Winners</h3>
              <p className="text-muted-foreground text-sm mt-1">{revealedResults.length} of {results.length} revealed</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {revealedResults.map((name, index) => (
                <div
                  key={index}
                  className="animate-in zoom-in-50"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative bg-gradient-to-br from-accent to-rose-500 rounded-xl p-5 text-center shadow-lg shadow-accent/25 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white" />
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white" />
                    </div>
                    <p className="relative text-white/70 text-xs font-700 uppercase tracking-widest mb-1">#{index + 1}</p>
                    <p className="relative text-white text-2xl font-800 leading-snug break-words">{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  const [selectedCount, setSelectedCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [revealedResults, setRevealedResults] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handlePick = () => {
    if (names.length === 0) return;

    setIsSpinning(true);
    setResults([]);
    setRevealedResults([]);

    const count = Math.min(selectedCount, names.length);
    const shuffled = shuffleArray(names);
    const picked = shuffled.slice(0, count);
    setResults(picked);

    // Reveal results one by one
    let delay = 300;
    picked.forEach((_, index) => {
      setTimeout(() => {
        setRevealedResults((prev) => [...prev, picked[index]]);
      }, delay + index * 500);
    });

    setTimeout(() => {
      setIsSpinning(false);
    }, delay + picked.length * 500);
  };

  const maxSelectable = Math.min(selectedCount, names.length);

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              How many names to pick?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max={Math.max(names.length, 1)}
                value={selectedCount}
                onChange={(e) => setSelectedCount(parseInt(e.target.value))}
                disabled={isSpinning || names.length === 0}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max={Math.max(names.length, 1)}
                  value={selectedCount}
                  onChange={(e) =>
                    setSelectedCount(Math.min(parseInt(e.target.value) || 1, names.length))
                  }
                  disabled={isSpinning || names.length === 0}
                  className="w-16 px-3 py-2 border border-border rounded-lg text-center font-semibold text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <span className="text-sm text-muted-foreground font-medium">
                  / {Math.max(names.length, 1)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-foreground">
                Available Names ({names.length})
              </label>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border max-h-40 overflow-y-auto">
              {names.length === 0 ? (
                <p className="text-muted-foreground">
                  No names available. Visit the{' '}
                  <Link to="/admin" className="text-accent font-semibold hover:underline">
                    Admin Panel
                  </Link>{' '}
                  to add names.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {names.map((name, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handlePick}
            disabled={isSpinning || names.length === 0}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 rounded-lg font-bold text-lg transition-all"
          >
            {isSpinning ? 'Picking...' : 'Pick Names'}
          </Button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            🎉 Selected Names 🎉
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {revealedResults.map((name, index) => (
              <div
                key={index}
                className="animate-in fade-in zoom-in-50 duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-gradient-to-br from-accent to-accent/80 rounded-lg p-6 text-center shadow-lg">
                  <p className="text-accent-foreground font-bold text-xl">
                    #{index + 1}
                  </p>
                  <p className="text-accent-foreground text-3xl font-bold mt-2">
                    {name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
