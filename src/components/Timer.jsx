import React, { useState, useEffect } from 'react';

export default function Timer({ testDuration, onTimeUp, isTestSubmitted }) {
  const [timeRemaining, setTimeRemaining] = useState(testDuration * 60);

  useEffect(() => {
    if (isTestSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTestSubmitted, onTimeUp]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (num) => String(num).padStart(2, '0');
  const timerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

  const timePercentage = (timeRemaining / (testDuration * 60)) * 100;
  const timerColor = timePercentage > 25 ? '#2196F3' : timePercentage > 10 ? '#ff9800' : '#f44336';

  return (
    <div className="timer" style={{ borderColor: timerColor }}>
      <div className="timer-label">Time Remaining</div>
      <div className="timer-display" style={{ color: timerColor }}>
        {timerText}
      </div>
      <div className="timer-bar" style={{ backgroundColor: timerColor, width: `${timePercentage}%` }}></div>
    </div>
  );
}
