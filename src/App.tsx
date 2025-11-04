import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import GameMenu from "./components/GameMenu";
import TicTacToe from "./games/TicTacToe";
import MemoryGame from "./games/MemoryGame";
import SnakeAndLadder from "./games/SnakeAndLadder";
import RockPaperScissors from "./games/RockPaperScissors";
import WhackAMole from "./games/WhackAMole";
import Sudoku from "./games/Sudoku";
import BulletMatch from "./games/BulletMatch";
import ScuttleTable from "./games/ScuttleTable";

type GameType =
  | "menu"
  | "tictactoe"
  | "memory"
  | "snakeladder"
  | "rps"
  | "whackamole"
  | "sudoku"
  | "bulletmatch"
  | "scuttletable";

export default function App() {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");
  const [darkMode, setDarkMode] = useState(false);

  const handleGameSelect = (game: string) => {
    setCurrentGame(game as GameType);
  };

  const handleBackToMenu = () => {
    setCurrentGame("menu");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md ${
          darkMode ? "bg-gray-800/90" : "bg-white/80"
        } shadow-md transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="FunZone Logo"
                className="w-10 h-10 rounded-full object-cover"
              />

              <span
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                FunZone
              </span>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentGame === "menu" && (
          <GameMenu onGameSelect={handleGameSelect} darkMode={darkMode} />
        )}

        {currentGame === "tictactoe" && (
          <TicTacToe onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "memory" && (
          <MemoryGame onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "snakeladder" && (
          <SnakeAndLadder onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "rps" && (
          <RockPaperScissors onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "whackamole" && (
          <WhackAMole onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "sudoku" && (
          <Sudoku onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "bulletmatch" && (
          <BulletMatch onBack={handleBackToMenu} darkMode={darkMode} />
        )}
        {currentGame === "scuttletable" && (
          <ScuttleTable onBack={handleBackToMenu} darkMode={darkMode} />
        )}
      </main>

      {/* Footer */}
      <footer
        className={`mt-16 py-6 ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
        } transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2025 FunZone. All rights reserved.</p>
          <p className="text-xs mt-2">Mini Games Hub - Have Fun!</p>
        </div>
      </footer>
    </div>
  );
}
