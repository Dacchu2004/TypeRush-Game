import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen />
      )}
    </div>
  );
};

export default App;
