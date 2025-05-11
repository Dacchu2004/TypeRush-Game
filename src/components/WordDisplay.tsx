// This component is responsible for showing the current word the player needs to type — optionally with some simple animation or styling to emphasize it.

import React from "react";

interface WordDisplayProps {
  currentWord: string;
  typedWord: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ currentWord, typedWord }) => {
  const renderWord = () => {
    return currentWord.split("").map((char, index) => {
      let color = "text-white";

      if (index < typedWord.length) {
        color = typedWord[index] === char ? "text-green-400" : "text-red-500";
      }

      return (
        <span key={index} className={`${color} text-4xl font-bold`}>
          {char}
        </span>
      );
    });
  };

  return <div className="mt-8 text-center">{renderWord()}</div>;
};

export default WordDisplay;
