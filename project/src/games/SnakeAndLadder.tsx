import { useState } from 'react';
import { ArrowLeft, RotateCcw, Dices } from 'lucide-react';

interface SnakeAndLadderProps {
  onBack: () => void;
  darkMode: boolean;
}

const snakes: { [key: number]: number } = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 36,
  93: 73,
  95: 75,
  98: 79,
};

const ladders: { [key: number]: number } = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,
  27: 53,
  40: 59,
  51: 67,
  71: 92,
  80: 99,
};

export default function SnakeAndLadder({ onBack, darkMode }: SnakeAndLadderProps) {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState('Roll the dice to start!');
  const [isWon, setIsWon] = useState(false);

  const rollDice = () => {
    if (isRolling || isWon) return;

    setIsRolling(true);
    setMessage('Rolling...');

    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;

      if (rolls >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        movePlayer(finalValue);
        setIsRolling(false);
      }
    }, 100);
  };

  const movePlayer = (dice: number) => {
    let newPosition = playerPosition + dice;

    if (newPosition > 100) {
      setMessage(`Need exactly ${100 - playerPosition} to win!`);
      return;
    }

    if (newPosition === 100) {
      setPlayerPosition(100);
      setMessage('🎉 Congratulations! You Won!');
      setIsWon(true);
      return;
    }

    if (snakes[newPosition]) {
      setTimeout(() => {
        setPlayerPosition(snakes[newPosition]);
        setMessage(`😱 Snake! Slid down to ${snakes[newPosition]}`);
      }, 500);
    } else if (ladders[newPosition]) {
      setTimeout(() => {
        setPlayerPosition(ladders[newPosition]);
        setMessage(`🎉 Ladder! Climbed up to ${ladders[newPosition]}`);
      }, 500);
    } else {
      setPlayerPosition(newPosition);
      setMessage(`Moved to position ${newPosition}`);
    }
  };

  const resetGame = () => {
    setPlayerPosition(0);
    setDiceValue(null);
    setMessage('Roll the dice to start!');
    setIsWon(false);
    setIsRolling(false);
  };

  const getCellColor = (position: number) => {
    if (position === playerPosition) return 'bg-gradient-to-br from-blue-400 to-blue-600';
    if (snakes[position]) return 'bg-gradient-to-br from-red-400 to-red-600';
    if (ladders[position]) return 'bg-gradient-to-br from-green-400 to-green-600';
    return darkMode ? 'bg-gray-700' : 'bg-gray-100';
  };

  const renderBoard = () => {
    const cells = [];
    for (let row = 9; row >= 0; row--) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        const position = row % 2 === 0 ? row * 10 + col + 1 : row * 10 + (9 - col) + 1;
        rowCells.push(
          <div
            key={position}
            className={`${getCellColor(position)} aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              position === playerPosition ? 'scale-110 shadow-lg text-white' : darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {position}
          </div>
        );
      }
      cells.push(
        <div key={row} className="grid grid-cols-10 gap-1">
          {rowCells}
        </div>
      );
    }
    return cells;
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

      <div className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-4 sm:p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Snake & Ladder
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="space-y-1">{renderBoard()}</div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`text-center mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Position
              </div>
              <div className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg">
                {playerPosition}/100
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`text-center mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dice
              </div>
              <div className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-white py-6 rounded-lg">
                {diceValue || '-'}
              </div>
            </div>

            <button
              onClick={rollDice}
              disabled={isRolling || isWon}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold transition-transform duration-300 ${
                !isRolling && !isWon ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Dices className="w-5 h-5" />
              <span>{isRolling ? 'Rolling...' : 'Roll Dice'}</span>
            </button>

            <button
              onClick={resetGame}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset Game</span>
            </button>

            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              {message}
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div>
            <div className="font-semibold mb-2">🪜 Ladders:</div>
            <div className="space-y-1">
              {Object.entries(ladders).map(([from, to]) => (
                <div key={from}>{from} → {to}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">🐍 Snakes:</div>
            <div className="space-y-1">
              {Object.entries(snakes).map(([from, to]) => (
                <div key={from}>{from} → {to}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
