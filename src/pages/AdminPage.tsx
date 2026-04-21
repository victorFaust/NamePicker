import { Link } from 'react-router-dom';
import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
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
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-foreground text-sm font-600 hover:bg-muted transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Picker
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-accent/5 to-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-700 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <span>⚙️</span> Admin Panel
          </div>
          <h1 className="text-4xl sm:text-5xl font-800 text-foreground mb-3 tracking-tight">
            Manage Names
          </h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto font-400">
            Add names manually, import from Excel, or clean up your list.
          </p>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdminPanel />
      </main>
    </div>
  );
}
