import React, { useState } from 'react';

export default function AnswerReviewPage({ 
  questions, 
  answers,
  onBackToResults
}) {
  const [reviewPageIndex, setReviewPageIndex] = useState(0);

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-header">
          <h1>Answer Review</h1>
          <p className="exam-name">Review your answers question by question</p>
        </div>

        <div className="answer-review">
          <div className="review-pagination-info">
            <span>Question {reviewPageIndex + 1} of {questions.length}</span>
            <div className="review-nav-buttons">
              <button 
                className="btn btn-secondary"
                onClick={() => setReviewPageIndex(Math.max(0, reviewPageIndex - 1))}
                disabled={reviewPageIndex === 0}
              >
                ← Previous Question
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setReviewPageIndex(Math.min(questions.length - 1, reviewPageIndex + 1))}
                disabled={reviewPageIndex === questions.length - 1}
              >
                Next Question →
              </button>
            </div>
          </div>

          <div className="review-container">
            {(() => {
              const question = questions[reviewPageIndex];
              const userAnswer = answers[question.no];
              const isCorrect = userAnswer === question.ans;
              const isUnattempted = !userAnswer;

              return (
                <div className={`review-item ${isUnattempted ? 'unattempted' : isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-question">
                    <h4>Question {question.no}</h4>
                    <p>{question.q}</p>
                  </div>

                  <div className="review-options">
                    {question.opts.map((option, index) => {
                      const optionValue = option[0];
                      const isUserSelected = userAnswer === optionValue;
                      const isCorrectAnswer = question.ans === optionValue;

                      let className = 'review-option';
                      if (isCorrectAnswer) className += ' correct-answer';
                      if (isUserSelected && !isCorrect) className += ' user-wrong';

                      return (
                        <div key={index} className={className}>
                          <span className="option-label">{option}</span>
                          {isCorrectAnswer && <span className="correct-indicator">✓ Correct</span>}
                          {isUserSelected && !isCorrect && <span className="wrong-indicator">✗ Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="review-answer">
                    {isUnattempted ? (
                      <p className="unattempted-text">Not Attempted</p>
                    ) : (
                      <>
                        <p><strong>Your Answer:</strong> {userAnswer}</p>
                        <p><strong>Correct Answer:</strong> {question.ans}</p>
                        <p><strong>Status:</strong> {isCorrect ? '✓ Correct' : '✗ Incorrect'}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="review-pagination-footer">
            <div className="page-indicator">
              <span className="current-page">{reviewPageIndex + 1}</span>
              <span className="total-pages">/ {questions.length}</span>
            </div>
            <div className="pagination-dots">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${index === reviewPageIndex ? 'active' : ''}`}
                  onClick={() => setReviewPageIndex(index)}
                  title={`Question ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="review-actions">
            <button 
              className="btn btn-primary"
              onClick={onBackToResults}
            >
              ← Back to Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
