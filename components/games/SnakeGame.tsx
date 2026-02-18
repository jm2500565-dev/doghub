
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const SPEED = 150;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE
      };

      // Self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collection
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(moveSnake, SPEED);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [moveSnake, direction]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center space-y-6" ref={gameRef} tabIndex={0}>
      <div className="flex justify-between w-full max-w-[400px]">
        <h3 className="text-2xl font-bold text-white">Snake.io</h3>
        <span className="font-mono text-emerald-500 text-xl">Score: {score}</span>
      </div>

      <div className="relative bg-[#0d1117] border border-[#30363d] shadow-2xl rounded-lg overflow-hidden">
        <div 
          className="grid gap-0" 
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: '400px',
            height: '400px'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`w-full h-full transition-colors duration-200 border border-[#161b22]/50 ${
                  isHead ? 'bg-emerald-400 scale-110 z-10' : 
                  isSnake ? 'bg-emerald-600 rounded-sm' : 
                  isFood ? 'bg-red-500 animate-pulse rounded-full' : ''
                }`}
              />
            );
          })}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center">
            <h4 className="text-4xl font-bold text-white mb-2">Game Over</h4>
            <p className="text-[#8b949e] mb-6">You crashed the production server!</p>
            <button 
              onClick={resetGame}
              className="px-8 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all transform hover:scale-105"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <div className="flex space-x-4 text-xs text-[#8b949e] font-mono">
        <span>Use arrow keys to move</span>
        <span>•</span>
        <span>Don't hit yourself</span>
      </div>
    </div>
  );
};

export default SnakeGame;
