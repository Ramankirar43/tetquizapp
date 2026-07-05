import React from 'react';

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  onMarkReview,
  onClearResponse,
  onPrevious,
  onNext,
  isMarkedForReview,
  isFirst,
  isLast,
  isPracticeMode,
  feedback
}) {
  const handleOptionChange = (option) => {
    onAnswerSelect(option);
  };

  const handleMarkReview = () => {
    onMarkReview(!isMarkedForReview);
  };

  const handleClearResponse = () => {
    onClearResponse();
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h2 className="question-number">Question {question.no}</h2>
        {isMarkedForReview && <span className="review-badge">Marked for Review</span>}
      </div>

      <div className="question-text">
        <p>{question.q}</p>
      </div>

      <div className="options-container">
        {question.opts.map((option, index) => {
          const optionValue = option[0]; // A, B, C, or D
          const isSelected = selectedAnswer === optionValue;

          return (
            <label key={index} className={`option ${isSelected ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`question-${question.no}`}
                value={optionValue}
                checked={isSelected}
                onChange={() => handleOptionChange(optionValue)}
                className="option-input"
              />
              <span className="option-text">{option}</span>
              {isSelected && <span className="option-check">✓</span>}
            </label>
          );
        })}
      </div>

      {isPracticeMode && feedback && (
        <div className={`practice-feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          <p><strong>Your answer:</strong> {feedback.selectedAnswer || 'Not answered'}</p>
          <p><strong>Correct answer:</strong> {feedback.correctAnswer || 'N/A'}</p>
          <p>{feedback.isCorrect ? 'Great job! Your selected answer is correct.' : 'That answer is not correct. Review the explanation and try the next one.'}</p>
        </div>
      )}

      <div className="button-group">
        <button 
          className="btn btn-secondary" 
          onClick={onPrevious}
          disabled={isFirst}
          title="Alt + P"
        >
          ← Previous
        </button>

        <button 
          className={`btn btn-action ${isMarkedForReview ? 'active' : ''}`}
          onClick={handleMarkReview}
          title="Alt + R"
        >
          {isMarkedForReview ? '✓ Marked' : 'Mark for Review'}
        </button>

        <button 
          className="btn btn-danger"
          onClick={handleClearResponse}
          disabled={!selectedAnswer}
        >
          Clear Response
        </button>

        <button 
          className="btn btn-primary" 
          onClick={onNext}
          disabled={isLast}
          title="Alt + N"
        >
          Save & Next →
        </button>
      </div>
    </div>
  );
}
