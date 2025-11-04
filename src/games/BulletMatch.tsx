import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface BulletMatchProps {
  onBack: () => void;
  darkMode: boolean;
}

interface Question {
  equation: string;
  answer: number;
}

export default function BulletMatch({ onBack, darkMode }: BulletMatchProps) {
  const [level, setLevel] = useState<"easy" | "normal" | "hard" | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  //  Generate a random question based on difficulty
  const generateQuestion = (difficulty: string): Question => {
    let num1, num2, operator, equation, answer;

    const ops = ["+", "-", "*", "/"];

    switch (difficulty) {
      case "easy":
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        operator = ops[Math.floor(Math.random() * 2)]; 
        break;
      case "normal":
        num1 = Math.floor(Math.random() * 20) + 5;
        num2 = Math.floor(Math.random() * 15) + 1;
        operator = ops[Math.floor(Math.random() * 3)]; 
        break;
      case "hard":
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 20) + 2;
        operator = ops[Math.floor(Math.random() * 4)]; 
        break;
      default:
        num1 = num2 = 0;
        operator = "+";
    }

    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      case "/":
        answer = parseFloat((num1 / num2).toFixed(1));
        break;
      default:
        answer = 0;
    }

    equation = `${num1} ${operator} ${num2}`;
    return { equation, answer };
  };

  //  Timer countdown
  useEffect(() => {
    if (level && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [level, gameOver]);

  //  Start Game
  const startGame = (difficulty: "easy" | "normal" | "hard") => {
    setLevel(difficulty);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setQuestion(generateQuestion(difficulty));
  };

  //  Check answer
  const checkAnswer = () => {
    if (!question) return;

    if (parseFloat(userAnswer) === question.answer) {
      setScore((s) => s + 10);
    }
    setUserAnswer("");
    setQuestion(generateQuestion(level!));
  };

  //  Reset everything
  const resetGame = () => {
    setLevel(null);
    setQuestion(null);
    setUserAnswer("");
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

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
          Bullet Math 🎯
        </h2>

        {!level ? (
          <>
            <p
              className={`mb-4 text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Choose your difficulty level and solve as many equations as you can
              in 30 seconds!
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => startGame("easy")}
                className="py-3 bg-green-400 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                Easy 😄
              </button>
              <button
                onClick={() => startGame("normal")}
                className="py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                Normal 💪
              </button>
              <button
                onClick={() => startGame("hard")}
                className="py-3 bg-red-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                Hard 🔥
              </button>
            </div>
          </>
        ) : gameOver ? (
          <>
            <h3
              className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              ⏰ Time’s Up!
            </h3>
            <p
              className={`text-lg mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Your final score: <span className="font-bold">{score}</span>
            </p>
            <button
              onClick={resetGame}
              className="py-3 w-full bg-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform flex justify-center items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </button>
          </>
        ) : (
          <>
            <div
              className={`mb-4 text-lg font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Time Left: ⏳ {timeLeft}s | Score: 💯 {score}
            </div>

            <div
              className={`text-4xl font-bold mb-6 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              {question?.equation}
            </div>

            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="Type your answer..."
              className={`w-full p-3 mb-4 rounded-lg text-center text-lg outline-none ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
            />

            <button
              onClick={checkAnswer}
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
            >
              Submit 🚀
            </button>
          </>
        )}
      </div>
    </div>
  );
}
