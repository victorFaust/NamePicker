import { Link } from 'react-router-dom';
import NamePicker from '@/components/NamePicker';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </div>
            <span className="text-lg font-700 tracking-tight text-foreground">NamePicker</span>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-600 hover:bg-foreground/90 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Manage Names
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-accent/5 to-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-700 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <span>🎯</span> Random Selection Tool
          </div>
          <h1 className="text-5xl sm:text-6xl font-800 text-foreground mb-4 tracking-tight leading-tight">
            Pick Your <span className="text-accent">Winners</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-400 leading-relaxed">
            Upload your list, choose how many to pick, and get instant random results.
          </p>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <NamePicker />
      </main>
    </div>
  );
}
