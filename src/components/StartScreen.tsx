// This component will handle the initial screen before the game begins and include a countdown before starting the game.

import React, {useState, useEffect} from "react";

interface StartScreenProps {
    onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({onStartGame}) => {
    const [countdown, setCountdown] = useState<number>(5);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    useEffect (()=>{
        let cdInterval: number;

        if(gameStarted && countdown > 0){
            cdInterval=setInterval(()=>{
                setCountdown((prev)=>prev-1);
            },1000);
        }
        else if(gameStarted && countdown === 0){
            const timeout = setTimeout(() => {
            onStartGame();
            }, 1000);

            return () => clearTimeout(timeout);
        }
        
        return () => {
            clearInterval(cdInterval);
        };
    }, [gameStarted, countdown, onStartGame]);

    const handleStartClick = () => {
        setGameStarted(true);
    };

    return(
        <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-center text-white">
        <h1 className="text-3xl mb-4">TYPE-RUSH</h1>
        {!gameStarted ? (
          <button
            onClick={handleStartClick}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-200"
          >
            Start To Rush🔥
          </button>
        ) : (
          <h2 className="text-4xl">{countdown > 0 ? countdown : 'Go!'}</h2>
        )}
      </div>
    </div>
  );
};

export default StartScreen;