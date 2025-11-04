import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface WhackAMoleProps {
  onBack: () => void;
  darkMode: boolean;
}

export default function WhackAMole({ onBack, darkMode }: WhackAMoleProps) {
  const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setMoles(Array(9).fill(false));

    gameIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      setMoles((prev) => {
        const newMoles = Array(9).fill(false);
        newMoles[randomIndex] = true;
        return newMoles;
      });
    }, 800);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
    if (score > highScore) {
      setHighScore(score);
    }
    setMoles(Array(9).fill(false));
  };

  const whackMole = (index: number) => {
    if (!isPlaying || !moles[index]) return;

    setScore((prev) => prev + 1);
    setMoles((prev) => {
      const newMoles = [...prev];
      newMoles[index] = false;
      return newMoles;
    });
  };

  const resetGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(30);
    setMoles(Array(9).fill(false));
  };

  return (
    <div className="animate-fadeIn">
      <button
        onClick={onBack}
        className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
          darkMode
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Menu</span>
      </button>

      <div className={`max-w-2xl mx-auto rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Whack-a-Mole
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Score</div>
            <div className="text-3xl font-bold text-cyan-500">{score}</div>
          </div>
          <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time</div>
            <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-rose-500' : 'text-green-500'}`}>
              {timeLeft}s
            </div>
          </div>
          <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Trophy className="w-4 h-4 inline" /> Best
            </div>
            <div className="text-3xl font-bold text-yellow-500">{highScore}</div>
          </div>
        </div>

        {!isPlaying && timeLeft === 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-400 to-teal-600 text-white rounded-lg text-center">
            <div className="font-bold text-lg mb-1">Game Over!</div>
            <div className="text-sm">Final Score: {score}</div>
            {score === highScore && score > 0 && (
              <div className="text-sm mt-2">🎉 New High Score!</div>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6 aspect-square">
          {moles.map((isMoleVisible, index) => (
            <button
              key={index}
              onClick={() => whackMole(index)}
              disabled={!isPlaying}
              className={`relative rounded-2xl transition-all duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } ${!isPlaying ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
            >
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${
                isMoleVisible ? 'scale-100' : 'scale-0'
              }`}>
                <div className="text-6xl">🐹</div>
              </div>
              <div className={`absolute inset-x-0 bottom-4 flex items-center justify-center transition-opacity duration-200 ${
                isMoleVisible ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className={`w-20 h-6 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {!isPlaying ? (
            <button
              onClick={startGame}
              className="col-span-2 py-3 px-6 bg-gradient-to-r from-cyan-400 to-teal-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              {timeLeft === 0 ? 'Play Again' : 'Start Game'}
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="col-span-2 py-3 px-6 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              Stop Game
            </button>
          )}
          <button
            onClick={resetGame}
            disabled={isPlaying}
            className={`col-span-2 flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg font-semibold transition-transform duration-300 ${
              !isPlaying ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        <div className={`mt-6 p-4 rounded-lg text-center text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
          Click on the moles as they appear! You have 30 seconds to get the highest score possible.
        </div>
      </div>
    </div>
  );
}
