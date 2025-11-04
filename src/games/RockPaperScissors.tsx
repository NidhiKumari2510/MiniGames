import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface RockPaperScissorsProps {
  onBack: () => void;
  darkMode: boolean;
}

type Choice = 'rock' | 'paper' | 'scissors' | null;

const choices = [
  { id: 'rock', emoji: '✊', name: 'Rock' },
  { id: 'paper', emoji: '✋', name: 'Paper' },
  { id: 'scissors', emoji: '✌️', name: 'Scissors' },
];

export default function RockPaperScissors({ onBack, darkMode }: RockPaperScissorsProps) {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string>('');
  const [scores, setScores] = useState({ player: 0, computer: 0, draws: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const handleChoice = (choice: Choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);
    setResult('');

    let count = 0;
    const interval = setInterval(() => {
      const randomChoice = choices[Math.floor(Math.random() * 3)].id as Choice;
      setComputerChoice(randomChoice);
      count++;

      if (count >= 10) {
        clearInterval(interval);
        const finalComputerChoice = choices[Math.floor(Math.random() * 3)].id as Choice;
        setComputerChoice(finalComputerChoice);

        const winner = determineWinner(choice, finalComputerChoice);

        setTimeout(() => {
          if (winner === 'player') {
            setResult('You Win! 🎉');
            setScores((prev) => ({ ...prev, player: prev.player + 1 }));
          } else if (winner === 'computer') {
            setResult('Computer Wins! 😢');
            setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
          } else {
            setResult("It's a Draw! 🤝");
            setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
          }
          setIsPlaying(false);
        }, 300);
      }
    }, 100);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScores({ player: 0, computer: 0, draws: 0 });
    setIsPlaying(false);
  };

  const getChoiceEmoji = (choice: Choice) => {
    return choices.find((c) => c.id === choice)?.emoji || '❓';
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

      <div className={`max-w-3xl mx-auto rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Rock Paper Scissors
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Player</div>
            <div className="text-3xl font-bold text-blue-500">{scores.player}</div>
          </div>
          <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Draws</div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{scores.draws}</div>
          </div>
          <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Computer</div>
            <div className="text-3xl font-bold text-rose-500">{scores.computer}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className={`text-center p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Choice
            </div>
            <div className="text-7xl mb-2">{playerChoice ? getChoiceEmoji(playerChoice) : '❓'}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {playerChoice ? choices.find((c) => c.id === playerChoice)?.name : 'Choose below'}
            </div>
          </div>

          <div className={`text-center p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Computer Choice
            </div>
            <div className="text-7xl mb-2">{computerChoice ? getChoiceEmoji(computerChoice) : '❓'}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {computerChoice ? choices.find((c) => c.id === computerChoice)?.name : 'Waiting...'}
            </div>
          </div>
        </div>

        {result && (
          <div className={`mb-6 p-4 rounded-lg text-center text-xl font-bold ${
            result.includes('Win')
              ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
              : result.includes('Computer')
              ? 'bg-gradient-to-r from-rose-400 to-rose-600 text-white'
              : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
          }`}>
            {result}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id as Choice)}
              disabled={isPlaying}
              className={`p-6 rounded-xl text-6xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                !isPlaying ? 'hover:scale-110 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'
              } ${
                playerChoice === choice.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <div>{choice.emoji}</div>
              <div className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {choice.name}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-pink-400 to-rose-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset Scores</span>
        </button>
      </div>
    </div>
  );
}
