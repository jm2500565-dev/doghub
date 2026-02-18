
import React, { useState } from 'react';
import { GameType } from '../types.ts';
import SnakeGame from './games/SnakeGame.tsx';
import MemoryGame from './games/MemoryGame.tsx';
import GeminiQuest from './games/GeminiQuest.tsx';
import { ChevronLeft, Play } from 'lucide-react';

const Arcade: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  const games = [
    {
      id: GameType.SNAKE,
      title: 'Snake.io',
      description: 'The classic snake game. Eat bits, grow long, avoid the bug.',
      image: 'https://picsum.photos/seed/snake/400/300',
      tags: ['Classic', 'Arcade']
    },
    {
      id: GameType.MEMORY,
      title: 'Dev Match',
      description: 'Find matching programming icons. Test your memory.',
      image: 'https://picsum.photos/seed/memory/400/300',
      tags: ['Logic', 'Puzzle']
    },
    {
      id: GameType.GEMINI_QUEST,
      title: 'Gemini Quest',
      description: 'An AI-powered text adventure. Navigate the Silicon Dungeon.',
      image: 'https://picsum.photos/seed/adventure/400/300',
      tags: ['AI', 'Story']
    }
  ];

  if (activeGame) {
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setActiveGame(null)}
          className="flex items-center text-[#8b949e] hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Arcade
        </button>
        <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
          {activeGame === GameType.SNAKE && <SnakeGame />}
          {activeGame === GameType.MEMORY && <MemoryGame />}
          {activeGame === GameType.GEMINI_QUEST && <GeminiQuest />}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">The Arcade</h2>
          <p className="text-[#8b949e] mt-1">Unlock games using focus tokens earned during work.</p>
        </div>
        <div className="flex space-x-2">
          {['All', 'Classic', 'Logic', 'AI'].map(tag => (
            <button key={tag} className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#30363d] hover:bg-[#21262d] transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div 
            key={game.id}
            className="group relative bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] to-transparent opacity-60" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {game.tags.map(t => (
                  <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/30">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
              <p className="text-sm text-[#8b949e] mb-6 line-clamp-2">{game.description}</p>
              <button 
                onClick={() => setActiveGame(game.id)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#21262d] hover:bg-emerald-500 hover:text-black text-white font-bold rounded-xl transition-all"
              >
                <Play size={18} />
                <span>Play Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arcade;
