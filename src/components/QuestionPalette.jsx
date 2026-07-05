import React, { useState } from 'react';

export default function QuestionPalette({ 
  totalQuestions, 
  currentQuestion, 
  answers, 
  visitedQuestions,
  reviewQuestions,
  onQuestionSelect 
}) {
  const [isOpen, setIsOpen] = useState(true);

  const getButtonClass = (qNo) => {
    let classes = 'palette-btn';
    
    if (qNo === currentQuestion) {
      classes += ' current';
    } else if (reviewQuestions.includes(qNo)) {
      classes += ' review';
    } else if (answers[qNo]) {
      classes += ' answered';
    } else if (visitedQuestions.includes(qNo)) {
      classes += ' visited';
    } else {
      classes += ' not-visited';
    }
    
    return classes;
  };

  const handleQuestionClick = (qNo) => {
    onQuestionSelect(qNo);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const getStats = () => {
    const answeredCount = Object.keys(answers).length;
    const reviewCount = reviewQuestions.length;
    const notAttemptedCount = totalQuestions - answeredCount;

    return { answeredCount, reviewCount, notAttemptedCount };
  };

  const { answeredCount, reviewCount, notAttemptedCount } = getStats();

  return (
    <>
      <button 
        className="palette-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Question Palette"
      >
        {isOpen ? '✕' : '☰'} Questions
      </button>

      <div className={`question-palette ${isOpen ? 'open' : 'closed'}`}>
        <div className="palette-header">
          <h3>Question Palette</h3>
        </div>

        <div className="palette-stats">
          <div className="stat-row">
            <span className="stat-dot answered"></span>
            <span className="stat-text">Answered: {answeredCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-dot visited"></span>
            <span className="stat-text">Not Attempted: {notAttemptedCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-dot review"></span>
            <span className="stat-text">Marked: {reviewCount}</span>
          </div>
        </div>

        <div className="palette-grid">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(qNo => (
            <button
              key={qNo}
              className={getButtonClass(qNo)}
              onClick={() => handleQuestionClick(qNo)}
              title={`Question ${qNo}`}
            >
              {qNo}
            </button>
          ))}
        </div>

        <div className="palette-legend">
          <div className="legend-item">
            <span className="legend-color not-visited"></span>
            <span>Not Visited</span>
          </div>
          <div className="legend-item">
            <span className="legend-color visited"></span>
            <span>Visited</span>
          </div>
          <div className="legend-item">
            <span className="legend-color answered"></span>
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <span className="legend-color review"></span>
            <span>Marked</span>
          </div>
        </div>
      </div>
    </>
  );
}
