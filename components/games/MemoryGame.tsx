
import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  Github, 
  GitBranch,
  RefreshCw
} from 'lucide-react';

const ICONS = [Code2, Terminal, Cpu, Database, Globe, Server, Github, GitBranch];
const BOARD_SIZE = 16; // 4x4

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardSet = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((Icon, index) => ({ id: index, Icon }));
    setCards(cardSet);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].Icon === cards[second].Icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex justify-between w-full max-w-[400px] items-center">
        <h3 className="text-2xl font-bold text-white">Dev Match</h3>
        <div className="flex items-center space-x-4">
          <span className="font-mono text-[#8b949e]">Moves: <span className="text-white">{moves}</span></span>
          <button onClick={initializeGame} className="p-2 bg-[#21262d] rounded-full text-white hover:bg-emerald-500 hover:text-black transition-all">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
          const isSolved = solved.includes(card.id);
          const Icon = card.Icon;

          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl transition-all duration-300 transform preserve-3d ${
                isFlipped ? 'rotate-y-180 bg-emerald-500 text-black' : 'bg-[#21262d] hover:bg-[#30363d]'
              }`}
            >
              {isFlipped ? (
                <Icon size={32} className={isSolved ? 'animate-pulse' : ''} />
              ) : (
                <div className="w-4 h-4 rounded-full bg-emerald-500/20" />
              )}
            </button>
          );
        })}
      </div>

      {solved.length === BOARD_SIZE && (
        <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <p className="text-emerald-400 font-bold text-xl">Perfect Match! Memory leak resolved.</p>
          <button onClick={initializeGame} className="px-8 py-2 bg-emerald-500 text-black font-bold rounded-xl">Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
