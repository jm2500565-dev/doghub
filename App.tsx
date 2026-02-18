
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  LayoutDashboard, 
  ShieldAlert, 
  Gamepad2, 
  Settings, 
  Timer,
  Github,
  Zap
} from 'lucide-react';
import { AppView, FocusSession } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import GitHubShield from './components/GitHubShield.tsx';
import Arcade from './components/Arcade.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [session, setSession] = useState<FocusSession>({
    isActive: false,
    startTime: null,
    duration: 1500, // 25 mins
    timeLeft: 1500
  });

  // Timer logic
  useEffect(() => {
    let interval: number;
    if (session.isActive && session.timeLeft > 0) {
      interval = window.setInterval(() => {
        setSession(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (session.timeLeft === 0) {
      // Session finished
      setSession(prev => ({ ...prev, isActive: false }));
      alert("Focus session complete! Head to the Arcade for a reward.");
    }
    return () => clearInterval(interval);
  }, [session.isActive, session.timeLeft]);

  const toggleSession = () => {
    setSession(prev => ({
      ...prev,
      isActive: !prev.isActive,
      startTime: !prev.isActive ? Date.now() : prev.startTime,
      timeLeft: !prev.isActive ? prev.duration : prev.timeLeft
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#30363d] flex flex-col p-4 space-y-8">
        <div className="flex items-center space-x-2 px-2">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <ShieldAlert className="text-black h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">GitFocus</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setCurrentView(AppView.DASHBOARD)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${currentView === AppView.DASHBOARD ? 'bg-[#21262d] text-white shadow-sm' : 'hover:bg-[#161b22] text-[#8b949e]'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentView(AppView.GITHUB_SHIELD)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${currentView === AppView.GITHUB_SHIELD ? 'bg-[#21262d] text-white shadow-sm' : 'hover:bg-[#161b22] text-[#8b949e]'}`}
          >
            <Github size={20} />
            <span>Repo Shield</span>
          </button>
          <button 
            onClick={() => setCurrentView(AppView.ARCADE)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${currentView === AppView.ARCADE ? 'bg-[#21262d] text-white shadow-sm' : 'hover:bg-[#161b22] text-[#8b949e]'}`}
          >
            <Gamepad2 size={20} />
            <span>The Arcade</span>
          </button>
        </nav>

        {/* Focus Timer Mini-Widget */}
        <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Focus Mode</span>
            <div className={`h-2 w-2 rounded-full ${session.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          </div>
          <div className="text-3xl font-bold text-white mono text-center my-3">
            {formatTime(session.timeLeft)}
          </div>
          <button 
            onClick={toggleSession}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all transform active:scale-95 ${
              session.isActive 
                ? 'bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/30' 
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg'
            }`}
          >
            {session.isActive ? 'Pause' : 'Start Focus'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0d1117]">
        <header className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-md border-b border-[#30363d] p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-white capitalize">{currentView.replace('_', ' ')}</h2>
            {session.isActive && (
              <span className="flex items-center text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                <Zap size={12} className="mr-1 fill-emerald-400" />
                Deep Work Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-[#8b949e]">
              Tokens Earned: <span className="text-white font-mono">1,240</span>
            </div>
            <button className="p-2 hover:bg-[#21262d] rounded-full text-[#8b949e] transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {currentView === AppView.DASHBOARD && <Dashboard />}
          {currentView === AppView.GITHUB_SHIELD && <GitHubShield isFocusActive={session.isActive} />}
          {currentView === AppView.ARCADE && <Arcade />}
        </div>
      </main>
    </div>
  );
};

export default App;
