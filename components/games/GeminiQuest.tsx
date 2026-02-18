
import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, Loader2, Sparkles } from 'lucide-react';
import { generateQuestStep } from '../../services/gemini';

const GeminiQuest: React.FC = () => {
  const [history, setHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial prompt
    handleAction("Start my quest to the Cloud Core.");
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleAction = async (actionText: string) => {
    if (loading || !actionText.trim()) return;

    setLoading(true);
    const userMsg = actionText;
    setInput('');
    
    if (userMsg !== "Start my quest to the Cloud Core.") {
      setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    }

    try {
      const response = await generateQuestStep(history, userMsg);
      setHistory(prev => [...prev, { role: 'model', text: response || "The dungeon's logic gates are stuck. Try again." }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl h-[600px] bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 bg-[#21262d] border-b border-[#30363d] flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="text-emerald-500" />
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Gemini Quest v1.0</h3>
        </div>
        <div className="flex items-center space-x-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
          <Sparkles size={12} />
          <span>POWERED BY AI</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-6 font-mono text-sm leading-relaxed"
      >
        {history.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-500 text-black font-bold' 
                  : 'bg-[#161b22] border border-[#30363d] text-[#c9d1d9]'
              }`}
            >
              {msg.role === 'model' && <span className="text-emerald-500 mb-1 block text-[10px]">GAME MASTER</span>}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl flex items-center space-x-3 text-[#8b949e]">
              <Loader2 className="animate-spin" size={16} />
              <span>Calculating game logic...</span>
            </div>
          </div>
        )}
      </div>

      <form 
        onSubmit={(e) => { e.preventDefault(); handleAction(input); }}
        className="p-4 bg-[#161b22] border-t border-[#30363d] flex space-x-4"
      >
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command (e.g. 'Enter the dark portal')..."
          className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button 
          disabled={loading}
          type="submit"
          className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default GeminiQuest;
