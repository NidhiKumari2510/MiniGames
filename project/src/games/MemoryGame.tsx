import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface MemoryGameProps {
  onBack: () => void;
  darkMode: boolean;
}

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const symbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎹'];

export default function MemoryGame({ onBack, darkMode }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].symbol === cards[second].symbol) {
        setCards((prev) =>
          prev.map((card, index) =>
            index === first || index === second ? { ...card, isMatched: true } : card
          )
        );
        setMatches((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) =>
              index === first || index === second ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 800);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === symbols.length && matches > 0) {
      setIsWon(true);
    }
  }, [matches]);

  const initializeGame = () => {
    const shuffled = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched ||
      flippedCards.includes(index)
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
    );
    setFlippedCards((prev) => [...prev, index]);
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
          Memory Match
        </h2>

        <div className="flex justify-around mb-6">
          <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="text-2xl font-bold">{moves}</div>
            <div className="text-sm">Moves</div>
          </div>
          <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="text-2xl font-bold">
              {matches}/{symbols.length}
            </div>
            <div className="text-sm">Matches</div>
          </div>
        </div>

        {isWon && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <div className="font-bold text-lg">Congratulations!</div>
            <div className="text-sm">You won in {moves} moves!</div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square text-4xl rounded-xl transition-all duration-500 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-green-400 to-green-600 rotate-0'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 rotate-180'
                  : 'bg-gray-200 hover:bg-gray-300 rotate-180'
              } ${
                !card.isFlipped && !card.isMatched ? 'hover:scale-105' : ''
              } ${card.isMatched ? 'opacity-50' : ''}`}
              disabled={card.isFlipped || card.isMatched}
            >
              {card.isFlipped || card.isMatched ? card.symbol : '?'}
            </button>
          ))}
        </div>

        <button
          onClick={initializeGame}
          className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
