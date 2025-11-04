import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface TicTacToeProps {
  onBack: () => void;
  darkMode: boolean;
}

type Player = 'X' | 'O' | null;

export default function TicTacToe({ onBack, darkMode }: TicTacToeProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = (squares: Player[]): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
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

      <div className={`max-w-md mx-auto rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Tic-Tac-Toe
        </h2>

        <div className={`text-center mb-6 text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {winner
            ? winner === 'Draw'
              ? "It's a Draw!"
              : `Player ${winner} Wins!`
            : `Current Player: ${isXNext ? 'X' : 'O'}`}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square text-4xl font-bold rounded-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                cell
                  ? cell === 'X'
                    ? 'text-blue-500'
                    : 'text-rose-500'
                  : darkMode
                  ? 'text-gray-600'
                  : 'text-gray-300'
              } ${!cell && !winner ? 'hover:scale-105' : ''} ${
                winner ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={!!winner || !!cell}
            >
              {cell}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset Game</span>
        </button>
      </div>
    </div>
  );
}
