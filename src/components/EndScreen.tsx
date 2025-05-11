import React from 'react';

interface EndScreenProps {
  score: number;
  wpm: number;
  accuracy: string;
  errorRate: string;  // Added errorRate prop
  speed: number;
  totalWordsTyped: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({
  score,
  wpm,
  accuracy,
  errorRate,  // Added errorRate prop
  speed,
  totalWordsTyped,
  onRestart
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4">🎉 Game Over!</h2>
      <p className="text-xl mb-2">Score: <span className="font-semibold">{score}</span></p>
      <p className="text-xl mb-2">WPM: <span className="font-semibold">{wpm}</span></p>
      <p className="text-xl mb-2">Speed (CPM): <span className="font-semibold">{speed}</span></p>
      <p className="text-xl mb-2">Accuracy: <span className="font-semibold">{accuracy}%</span></p>
      <p className="text-red-400">Error Rate: <span className="font-semibold">{errorRate}%</span></p> {/* Display errorRate */}

      <p className="text-xl mb-6">Total Words Typed: <span className="font-semibold">{totalWordsTyped}</span></p>
      <button
        onClick={onRestart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg transition-all duration-200"
      >
        🔁 Play Again
      </button>
    </div>
  );
};

export default EndScreen;
