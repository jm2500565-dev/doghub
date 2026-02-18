
import React, { useState } from 'react';
// Added ShieldAlert to the lucide-react imports to fix line 121 error
import { Search, Loader2, ExternalLink, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { summarizeRepo } from '../services/gemini';
import { GitHubSummary } from '../types';

interface GitHubShieldProps {
  isFocusActive: boolean;
}

const GitHubShield: React.FC<GitHubShieldProps> = ({ isFocusActive }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<GitHubSummary | null>(null);

  const handleShield = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    // In a real app, you'd fetch the HTML content here. 
    // For the demo, we'll simulate repo data for Gemini to process.
    const mockContent = `
      Repository: microsoft/vscode
      Description: Visual Studio Code is a type-safe code editor...
      Open Issues: 2,400. Top issues: "Extension host crash", "Type mismatch in editor.tsx", "Performance regression on macOS".
      Recent Activity: 40 merged PRs today.
    `;
    
    const result = await summarizeRepo(mockContent);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">GitHub Repo Shield</h2>
        <p className="text-[#8b949e] max-w-xl mx-auto">
          Don't fall into the GitHub rabbit hole. Paste a link to a repo, issue, or PR, and our AI will give you the essentials without the distractions.
        </p>
      </div>

      <form onSubmit={handleShield} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#8b949e] group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/owner/repo/..."
          className="w-full bg-[#161b22] border border-[#30363d] rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-white placeholder-[#8b949e] transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 text-black rounded-lg font-semibold hover:bg-emerald-400 disabled:opacity-50 flex items-center"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Shield Me'}
        </button>
      </form>

      {summary && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden animate-in zoom-in duration-300">
          <div className="p-6 border-b border-[#30363d] bg-[#21262d]/50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white flex items-center">
              <CheckCircle2 className="text-emerald-500 mr-2" size={20} />
              {summary.repoName}
            </h3>
            <a href={url} target="_blank" rel="noreferrer" className="text-xs text-[#8b949e] hover:text-white flex items-center transition-colors">
              View Source <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
          
          <div className="p-8 space-y-8">
            <section>
              <h4 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">The Gist</h4>
              <p className="text-lg text-white leading-relaxed">
                {summary.summary}
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-3">Top Concerns</h4>
                <ul className="space-y-3">
                  {summary.keyIssues.map((issue, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-[#c9d1d9]">
                      <AlertTriangle size={16} className="text-orange-500 mt-0.5 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">Pulse Check</h4>
                <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-sm italic text-[#8b949e]">
                  "{summary.recentActivity}"
                </div>
              </div>
            </section>

            <div className="pt-4 border-t border-[#30363d]">
              <div className="flex items-center justify-between p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                <p className="text-emerald-400 font-medium">Stay focused. You have the info you need.</p>
                <button 
                  onClick={() => setSummary(null)}
                  className="px-4 py-2 bg-emerald-500 text-black rounded-lg text-sm font-bold"
                >
                  I'm Done Here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isFocusActive && !summary && (
        <div className="p-12 border-2 border-dashed border-[#30363d] rounded-3xl text-center">
          <ShieldAlert size={48} className="mx-auto text-[#30363d] mb-4" />
          <h3 className="text-xl font-semibold text-white">Shield Engaged</h3>
          <p className="text-[#8b949e] mt-2">Deep work is active. Use the shield if you absolutely need info from GitHub.</p>
        </div>
      )}
    </div>
  );
};

export default GitHubShield;
