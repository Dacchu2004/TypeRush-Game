// this will handle either a countdown (like 60 seconds left) or a stopwatch-style timer (e.g., time elapsed). 

import React  from "react";

interface TimerProps {
    timeLeft: number;
    totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
    const percentage = (timeLeft/ totalTime) * 100;

    return (
        <div className="w-full px-4 mt-4">
          <div className="text-center text-white text-xl font-medium">
            Time Left: {timeLeft}s
          </div>

          <div className="mt-2 h-3 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
    );
};

export default Timer;