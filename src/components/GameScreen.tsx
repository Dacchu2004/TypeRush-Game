import React, { useState, useEffect, useRef } from 'react';
import WordDisplay from './WordDisplay';
import Timer from './Timer';
import EndScreen from './EndScreen';

const GameScreen: React.FC = () => {
  const totalTime = 30;
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [typedWord, setTypedWord] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [totalWordsTyped, setTotalWordsTyped] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [errorRate, setErrorRate] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentWord(generateRandomWord());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) setGameOver(true);
  }, [timeLeft]);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const newChar = input[input.length - 1];

    setTypedWord(input);

    if (input.length > typedWord.length) {
      const index = input.length - 1;
      setTotalKeystrokes(prev => prev + 1);
      if (newChar === currentWord[index]) {
        setCorrectKeystrokes(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (typedWord === currentWord && typedWord !== '') {
      setScore(prev => prev + 1);
      setCorrectWords(prev => prev + 1);
      setTotalWordsTyped(prev => prev + 1);
      setTypedWord('');
      setCurrentWord(generateRandomWord());
    }
  }, [typedWord, currentWord]);

  useEffect(() => {
    const elapsedTime = totalTime - timeLeft;

    if (totalKeystrokes > 0) {
      const newAccuracy = (correctKeystrokes / totalKeystrokes) * 100;
      const newErrorRate = 100 - newAccuracy;

      setAccuracy(newAccuracy);
      setErrorRate(newErrorRate);
    }

    if (elapsedTime > 0) {
      const cpm = Math.round((totalKeystrokes / elapsedTime) * 60);
      setSpeed(cpm);
    }
  }, [totalKeystrokes, correctKeystrokes, timeLeft]);

  const generateRandomWord = () => {
    const words = ['apple', 'banana', 'grape', 'orange', 'strawberry', 'pineapple', 'blueberry'];
    return words[Math.floor(Math.random() * words.length)];
  };

  const wpm = correctWords === 0 ? 0 : Math.round(correctWords / (totalTime / 60));

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 p-4">
      {!gameOver && (
        <>
          <Timer timeLeft={timeLeft} totalTime={totalTime} />
          <WordDisplay currentWord={currentWord} typedWord={typedWord} />
          <input
            ref={inputRef}
            type="text"
            value={typedWord}
            onChange={handleInputChange}
            className="mt-4 p-2 text-2xl w-1/2 text-center rounded border-2 border-blue-500 focus:outline-none"
            disabled={gameOver}
            autoFocus
          />
        </>
      )}
      {gameOver && (
        <EndScreen
          score={score}
          wpm={wpm}
          accuracy={accuracy.toFixed(2)}
          errorRate={errorRate.toFixed(2)}
          speed={speed}
          totalWordsTyped={totalWordsTyped}
          onRestart={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default GameScreen;
