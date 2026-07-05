import React from 'react';
import Timer from './Timer';

export default function Header({ 
  examName, 
  totalQuestions, 
  attemptedCount, 
  testDuration,
  onTimeUp,
  isTestSubmitted,
  violations,
  onBackToTests,
  testMode
}) {
  const remainingCount = totalQuestions - attemptedCount;

  return (
    <header className="header">
      <div className="header-container">
        <div className="exam-info">
          {onBackToTests && (
            <button 
              className="back-to-tests-btn"
              onClick={onBackToTests}
              title="Go back to test selection"
            >
              ← Back to Tests
            </button>
          )}
          <h1 className="exam-title">{examName}</h1>
          <div className="mode-pill">{testMode === 'practice' ? 'Practice Mode' : 'Exam Mode'}</div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Questions</span>
              <span className="stat-value">{totalQuestions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Attempted</span>
              <span className="stat-value attempted">{attemptedCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Remaining</span>
              <span className="stat-value remaining">{remainingCount}</span>
            </div>
          </div>
        </div>
        <Timer 
          testDuration={testDuration} 
          onTimeUp={onTimeUp}
          isTestSubmitted={isTestSubmitted}
        />
      </div>
    </header>
  );
}
