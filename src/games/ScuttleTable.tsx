import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface ScuttleTableProps {
  onBack: () => void;
  darkMode: boolean;
}

export default function ScuttleTable({ onBack, darkMode }: ScuttleTableProps) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  //  Shuffle numbers 1–25
  const generateGrid = () => {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
  };

  //  Start timer
  const startTimer = () => {
    const start = Date.now();
    setStartTime(start);
    const id = setInterval(() => {
      setElapsedTime(((Date.now() - start) / 1000).toFixed(2) as unknown as number);
    }, 100);
    setIntervalId(id);
  };

  //  Stop timer
  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId);
  };

  //  Start Game
  const startGame = () => {
    generateGrid();
    setNextNumber(1);
    setIsPlaying(true);
    setElapsedTime(0);
    setStartTime(null);
  };

  //  Handle click on number
  const handleClick = (num: number) => {
    if (!isPlaying) return;
    if (num === 1 && nextNumber === 1 && !startTime) startTimer();

    if (num === nextNumber) {
      if (num === 25) {
        stopTimer();
        setIsPlaying(false);
        alert(`🎉 Congratulations! You completed in ${elapsedTime} seconds!`);
      }
      setNextNumber((prev) => prev + 1);
    } else if (num > nextNumber) {
      alert("❌ Oops! Wrong sequence! Try again.");
      stopTimer();
      setIsPlaying(false);
    }
  };

  //  Reset game
  const resetGame = () => {
    stopTimer();
    startGame();
  };

  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-900 hover:bg-gray-100"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Menu</span>
      </button>

      <div
        className={`max-w-md mx-auto rounded-2xl shadow-xl p-8 text-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Scuttle Table 🔢
        </h2>

        {!isPlaying && nextNumber === 1 ? (
          <>
            <p
              className={`mb-4 text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Click numbers in sequence from <b>1 to 25</b> as fast as possible!
            </p>
            <button
              onClick={startGame}
              className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
            >
              Start Game 🚀
            </button>
          </>
        ) : (
          <>
            <div
              className={`flex justify-between mb-4 font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <span>Next: {nextNumber <= 25 ? nextNumber : "✅ Done!"}</span>
              <span>⏱ {elapsedTime}s</span>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-6">
              {numbers.map((num) => (
                <button
                  key={num}
                  onClick={() => handleClick(num)}
                  className={`aspect-square rounded-lg text-2xl font-bold transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  } ${
                    num < nextNumber
                      ? "opacity-50 scale-90 bg-green-400 text-white"
                      : ""
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={resetGame}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Restart</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
