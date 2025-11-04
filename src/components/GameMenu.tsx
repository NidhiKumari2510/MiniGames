interface GameMenuProps {
  onGameSelect: (game: string) => void;
  darkMode: boolean;
}

const games = [
  {
    id: "tictactoe",
    name: "Tic Tac Toe",
    image: "/tictactoe.webp",
  },
  {
    id: "memory",
    name: "Memory Match",
    image: "/memory.webp",
  },
  {
    id: "snakeladder",
    name: "Snake & Ladder",
    image: "/snakeladder.png",
  },
  {
    id: "rps",
    name: "Rock Paper Scissors",
    image: "/rps.jpg",
  },
  {
    id: "whackamole",
    name: "Whack-a-Mole",
    image: "/whackamole.jpg",
  },
  {
    id: "sudoku",
    name: "Sudoku",
    image: "/sudoku.png", 
  },
  {
    id: "bulletmatch",
    name: "Bullet Maths",
    image: "/bulletmaths.png", 
  },
  {
    id: "scuttletable",
    name: "Scuttle Table",
    image: "/scuttletable.jpg", 
  },
];

export default function GameMenu({ onGameSelect, darkMode }: GameMenuProps) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200"
      }`}
    >
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1
          className={`text-4xl sm:text-5xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Choose Your Game
        </h1>
        <p
          className={`text-lg sm:text-xl ${
            darkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Explore fun, logic-based, and skill-challenging mini-games — from classics to quick brain workouts!
        </p>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => onGameSelect(game.id)}
            className={`relative w-40 sm:w-48 md:w-56 aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Background Image */}
            <img
              src={game.image}
              alt={game.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between">
              {/* Game Name */}
              <h3 className="text-xl font-semibold text-white text-center mt-6 drop-shadow-lg">
                {game.name}
              </h3>

              {/* Play Button */}
              <button
                className="w-full py-2 text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
