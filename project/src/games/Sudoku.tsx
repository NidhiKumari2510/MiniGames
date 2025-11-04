import { useState } from 'react';
import { ArrowLeft, RotateCcw, Check } from 'lucide-react';

interface SudokuProps {
  onBack: () => void;
  darkMode: boolean;
}

const initialPuzzle = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

const solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9],
];

export default function Sudoku({ onBack, darkMode }: SudokuProps) {
  const [board, setBoard] = useState<(number | null)[][]>(initialPuzzle);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleChange = (row: number, col: number, value: string) => {
    if (initialPuzzle[row][col] !== null) return; // can't change preset cells
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value ? Number(value) : null;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    const correct = board.every((r, i) =>
      r.every((val, j) => val === solution[i][j])
    );
    setIsCorrect(correct);
  };

  const resetGame = () => {
    setBoard(initialPuzzle.map((r) => [...r]));
    setIsCorrect(null);
  };

  return (
    <div className="animate-fadeIn">
      <button
        onClick={onBack}
        className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Menu</span>
      </button>

      <div
        className={`max-w-xl mx-auto p-6 rounded-2xl shadow-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : ''}`}>
          Sudoku
        </h2>

        <div className="grid grid-cols-9 gap-1 mb-6">
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <input
                key={`${rIdx}-${cIdx}`}
                type="number"
                min="1"
                max="9"
                value={cell ?? ''}
                onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                className={`w-10 h-10 text-center text-lg font-semibold border ${
                  darkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                } ${initialPuzzle[rIdx][cIdx] !== null ? 'font-bold' : 'font-normal'}`}
              />
            ))
          )}
        </div>

        {isCorrect !== null && (
          <div
            className={`mb-4 text-center font-semibold ${
              isCorrect ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isCorrect ? '🎉 Correct Solution!' : '❌ Try Again!'}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={checkSolution}
            className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            <Check className="w-5 h-5" /> Check
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <RotateCcw className="w-5 h-5" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
