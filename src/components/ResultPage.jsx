import React from 'react';

export default function ResultPage({ 
  questions, 
  answers, 
  reviewQuestions,
  violations,
  examName,
  onReviewAnswers
}) {

  const calculateStats = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let notAttemptedCount = 0;

    questions.forEach(question => {
      const userAnswer = answers[question.no];

      if (!userAnswer) {
        notAttemptedCount++;
      } else if (userAnswer === question.ans) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalAttempted = correctCount + incorrectCount;
    const score = correctCount * 1 + incorrectCount * -0.25; // MARKS_PER_QUESTION = 1, NEGATIVE_MARKING = 0.25
    const percentage = (correctCount / questions.length) * 100;

    return {
      correctCount,
      incorrectCount,
      notAttemptedCount,
      totalAttempted,
      score,
      percentage: percentage.toFixed(2)
    };
  };

  const stats = calculateStats();

  const handleRestart = () => {
    localStorage.removeItem('examState');
    window.location.reload();
  };

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-header">
          <h1>Test Submitted Successfully!</h1>
          <p className="exam-name">{examName}</p>
        </div>

        <div className="result-stats">
          <div className="stat-card">
            <span className="stat-title">Total Questions</span>
            <span className="stat-number">{questions.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Attempted</span>
            <span className="stat-number attempted">{stats.totalAttempted}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Not Attempted</span>
            <span className="stat-number unattempted">{stats.notAttemptedCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Correct</span>
            <span className="stat-number correct">{stats.correctCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Incorrect</span>
            <span className="stat-number incorrect">{stats.incorrectCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Score</span>
            <span className="stat-number score">{stats.score}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Percentage</span>
            <span className="stat-number percentage">{stats.percentage}%</span>
          </div>
        </div>

        {violations && (violations.tabSwitches > 0 || violations.fullscreenExits > 0) && (
          <div className="violations-section">
            <h3>Anti-Cheat Violations</h3>
            <div className="violations-info">
              <p>Tab Switches: <strong>{violations.tabSwitches || 0}</strong></p>
              <p>Fullscreen Exits: <strong>{violations.fullscreenExits || 0}</strong></p>
            </div>
            <p className="violation-warning">⚠️ Violations recorded during the examination may affect your results.</p>
          </div>
        )}

        <div className="result-actions">
          <button 
            className="btn btn-primary"
            onClick={onReviewAnswers}
          >
            Review Answers
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleRestart}
          >
            Take Another Test
          </button>
        </div>
      </div>
    </div>
  );
}
