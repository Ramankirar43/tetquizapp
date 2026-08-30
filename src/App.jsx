import React, { useState, useEffect, useCallback, useRef } from 'react';

import Header from './components/Header';

import QuestionCard from './components/QuestionCard';

import QuestionPalette from './components/QuestionPalette';

import ResultPage from './components/ResultPage';

import AnswerReviewPage from './components/AnswerReviewPage';

import SubmitConfirmation from './components/SubmitConfirmation';

import TestSelector from './components/TestSelector';

import { examCatalog, getTestConfigsMap } from './data/testCatalog';

import {

  migrateLegacyProgress,

  saveTestProgress,

  clearTestProgress,

  loadTestProgress,

} from './utils/examProgress';



const testConfigs = getTestConfigsMap();



const emptyExamState = {

  currentQuestion: 1,

  answers: {},

  visitedQuestions: [],

  reviewQuestions: [],

  violations: { tabSwitches: 0, fullscreenExits: 0 },

  testStartTime: Date.now(),

  testMode: 'exam',

};



export default function App() {

  const [selectedTest, setSelectedTest] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [answers, setAnswers] = useState({});

  const [visitedQuestions, setVisitedQuestions] = useState([]);

  const [reviewQuestions, setReviewQuestions] = useState([]);

  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  const [showAnswerReview, setShowAnswerReview] = useState(false);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [violations, setViolations] = useState({ tabSwitches: 0, fullscreenExits: 0 });

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [testStartTime, setTestStartTime] = useState(Date.now());

  const [testMode, setTestMode] = useState('exam');

  const [pendingTestId, setPendingTestId] = useState(null);

  const [showModeModal, setShowModeModal] = useState(false);

  const [reviseQuestionNo, setReviseQuestionNo] = useState(null);

  const [feedbackByQuestion, setFeedbackByQuestion] = useState({});

  const testStartTimeRef = useRef(testStartTime);



  const currentTestConfig = selectedTest ? testConfigs[selectedTest] : null;



  useEffect(() => {

    migrateLegacyProgress();

  }, []);



  useEffect(() => {

    testStartTimeRef.current = testStartTime;

  }, [testStartTime]);



  const resetExamState = useCallback((overrides = {}) => {

    setCurrentQuestion(overrides.currentQuestion ?? 1);

    setAnswers(overrides.answers ?? {});

    setVisitedQuestions(overrides.visitedQuestions ?? []);

    setReviewQuestions(overrides.reviewQuestions ?? []);

    setViolations(overrides.violations ?? { tabSwitches: 0, fullscreenExits: 0 });

    setTestStartTime(overrides.testStartTime ?? Date.now());

    setTestMode(overrides.testMode ?? 'exam');

    setFeedbackByQuestion({});

    setIsTestSubmitted(false);

    setShowAnswerReview(false);

    setShowSubmitModal(false);

  }, []);



  const startTest = useCallback((testId, { fresh = false, progress = null, mode = null, questionNo = null, revealCorrectAnswer = false } = {}) => {

    if (fresh) {

      clearTestProgress(testId);

      resetExamState({ testMode: mode || 'exam' });

    } else if (progress) {

      resetExamState({

        currentQuestion: progress.currentQuestion || 1,

        answers: progress.answers || {},

        visitedQuestions: progress.visitedQuestions || [],

        reviewQuestions: progress.reviewQuestions || [],

        violations: progress.violations || { tabSwitches: 0, fullscreenExits: 0 },

        testStartTime: progress.testStartTime || Date.now(),

        testMode: progress.testMode || mode || 'exam',

      });

    } else {

      const saved = loadTestProgress(testId);

      if (saved) {

        resetExamState({

          currentQuestion: saved.currentQuestion || 1,

          answers: saved.answers || {},

          visitedQuestions: saved.visitedQuestions || [],

          reviewQuestions: saved.reviewQuestions || [],

          violations: saved.violations || { tabSwitches: 0, fullscreenExits: 0 },

          testStartTime: saved.testStartTime || Date.now(),

          testMode: saved.testMode || mode || 'exam',

        });

      } else {

        resetExamState({ testMode: mode || 'exam' });

      }

    }



    setSelectedTest(testId);

    const nextQuestionNo = questionNo || 1;

    if (nextQuestionNo) {
      setCurrentQuestion(nextQuestionNo);
    }

    if (revealCorrectAnswer) {
      const questionData = testConfigs[testId]?.questions?.find((q) => q.no === nextQuestionNo);
      if (questionData) {
        setFeedbackByQuestion({
          [nextQuestionNo]: {
            selectedAnswer: null,
            correctAnswer: questionData.ans || null,
            isCorrect: false,
            isRevise: true,
          },
        });
      }
    }

  }, [resetExamState]);



  useEffect(() => {

    if (!selectedTest || isTestSubmitted) return undefined;



    const persist = () => {

      saveTestProgress(selectedTest, {

        currentQuestion,

        answers,

        visitedQuestions,

        reviewQuestions,

        violations,

        testStartTime: testStartTimeRef.current,

        testMode,

        isSubmitted: false,

      });

    };



    persist();

    const interval = setInterval(persist, 3000);

    return () => clearInterval(interval);

  }, [

    selectedTest,

    currentQuestion,

    answers,

    visitedQuestions,

    reviewQuestions,

    violations,

    testMode,

    isTestSubmitted,

  ]);



  useEffect(() => {

    if (!selectedTest || isTestSubmitted) return undefined;



    const enterFullscreen = async () => {

      try {

        if (document.documentElement.requestFullscreen) {

          await document.documentElement.requestFullscreen();

          setIsFullscreen(true);

        }

      } catch (err) {

        console.log('Fullscreen request failed:', err);

      }

    };



    enterFullscreen();

  }, [selectedTest, isTestSubmitted]);



  useEffect(() => {

    if (!selectedTest || isTestSubmitted) return undefined;



    const handleFullscreenChange = () => {

      const isCurrentlyFullscreen = !!document.fullscreenElement;

      if (!isCurrentlyFullscreen && isFullscreen && !isTestSubmitted) {

        setViolations((prev) => ({

          ...prev,

          fullscreenExits: prev.fullscreenExits + 1,

        }));



        if (document.documentElement.requestFullscreen) {

          document.documentElement.requestFullscreen().catch(() => {});

        }

      }

      setIsFullscreen(isCurrentlyFullscreen);

    };



    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);

  }, [isFullscreen, isTestSubmitted, selectedTest]);



  useEffect(() => {

    if (!selectedTest || isTestSubmitted) return undefined;



    const handleBlur = () => {

      setViolations((prev) => ({

        ...prev,

        tabSwitches: prev.tabSwitches + 1,

      }));

    };



    window.addEventListener('blur', handleBlur);

    return () => window.removeEventListener('blur', handleBlur);

  }, [isTestSubmitted, selectedTest]);



  const markAsVisited = useCallback((qNo) => {

    setVisitedQuestions((prev) => (prev.includes(qNo) ? prev : [...prev, qNo]));

  }, []);



  const handleNext = useCallback(() => {

    if (currentTestConfig && currentQuestion < currentTestConfig.questions.length) {

      markAsVisited(currentQuestion);

      setCurrentQuestion(currentQuestion + 1);

    }

  }, [currentQuestion, currentTestConfig, markAsVisited]);



  const handlePrevious = useCallback(() => {

    if (currentQuestion > 1) {

      markAsVisited(currentQuestion);

      setCurrentQuestion(currentQuestion - 1);

    }

  }, [currentQuestion, markAsVisited]);



  const handleMarkReview = useCallback((shouldMark) => {

    setReviewQuestions((prev) => {

      if (shouldMark) {

        return prev.includes(currentQuestion) ? prev : [...prev, currentQuestion];

      }

      return prev.filter((q) => q !== currentQuestion);

    });

    markAsVisited(currentQuestion);

  }, [currentQuestion, markAsVisited]);



  const handleMarkReviewCallback = useCallback(() => {

    handleMarkReview(!reviewQuestions.includes(currentQuestion));

  }, [currentQuestion, reviewQuestions, handleMarkReview]);



  const handleSubmitClick = useCallback(() => {

    setShowSubmitModal(true);

  }, []);



  const handleSubmitClickCallback = useCallback(() => {

    handleSubmitClick();

  }, [handleSubmitClick]);



  useEffect(() => {

    if (!selectedTest || isTestSubmitted) return undefined;



    const handleKeyDown = (e) => {

      if (e.altKey) {

        if (e.key === 'n' || e.key === 'N') {

          e.preventDefault();

          handleNext();

        } else if (e.key === 'p' || e.key === 'P') {

          e.preventDefault();

          handlePrevious();

        } else if (e.key === 'r' || e.key === 'R') {

          e.preventDefault();

          handleMarkReviewCallback();

        } else if (e.key === 's' || e.key === 'S') {

          e.preventDefault();

          handleSubmitClickCallback();

        }

      }

    };



    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [selectedTest, isTestSubmitted, handleNext, handlePrevious, handleMarkReviewCallback, handleSubmitClickCallback]);



  const handleAnswerSelect = (option) => {

    setAnswers((prev) => ({

      ...prev,

      [currentQuestion]: option,

    }));

    if (testMode === 'practice') {

      const questionData = currentTestConfig?.questions.find((q) => q.no === currentQuestion);

      setFeedbackByQuestion((prev) => ({

        ...prev,

        [currentQuestion]: {

          selectedAnswer: option,

          correctAnswer: questionData?.ans || null,

          isCorrect: questionData?.ans ? option === questionData.ans : false,

        },

      }));

    } else {

      setFeedbackByQuestion((prev) => {

        const next = { ...prev };

        delete next[currentQuestion];

        return next;

      });

    }

    markAsVisited(currentQuestion);

  };



  const handleClearResponse = () => {

    setAnswers((prev) => {

      const next = { ...prev };

      delete next[currentQuestion];

      return next;

    });

    setFeedbackByQuestion((prev) => {

      const next = { ...prev };

      delete next[currentQuestion];

      return next;

    });

  };



  const handleConfirmSubmit = () => {

    setShowSubmitModal(false);

    setIsTestSubmitted(true);

    setShowAnswerReview(false);

    if (selectedTest) clearTestProgress(selectedTest);



    if (document.fullscreenElement) {

      document.exitFullscreen();

    }

  };



  const handleTimeUp = () => {

    setIsTestSubmitted(true);

    if (selectedTest) clearTestProgress(selectedTest);

    if (document.fullscreenElement) {

      document.exitFullscreen();

    }

  };



  const handleTestSelection = (testId, options = {}) => {

    if (options.reviseQuestionNo) {
      const hydrateRevise = (mode) => {
        const questionNo = options.reviseQuestionNo;
        const targetTest = testConfigs[testId];
        if (!targetTest) return;

        startTest(testId, {
          fresh: true,
          mode,
          questionNo,
          revealCorrectAnswer: true,
        });
      };

      hydrateRevise('practice');
      return;
    }

    setPendingTestId(testId);

    setShowModeModal(true);

  };



  const handleModeSelection = (mode) => {

    if (!pendingTestId) return;

    startTest(pendingTestId, { fresh: true, mode });

    setPendingTestId(null);

    setShowModeModal(false);

  };



  const handleBackToTests = () => {

    if (selectedTest && !isTestSubmitted) {

      saveTestProgress(selectedTest, {

        currentQuestion,

        answers,

        visitedQuestions,

        reviewQuestions,

        violations,

        testStartTime: testStartTimeRef.current,

        testMode,

        isSubmitted: false,

      });

    }



    if (document.fullscreenElement) {

      document.exitFullscreen();

    }



    setSelectedTest(null);

    setPendingTestId(null);

    setShowModeModal(false);

    setFeedbackByQuestion({});

    resetExamState(emptyExamState);

  };



  if (isTestSubmitted && currentTestConfig) {

    if (showAnswerReview) {

      return (

        <AnswerReviewPage

          questions={currentTestConfig.questions}

          answers={answers}

          onBackToResults={() => setShowAnswerReview(false)}

        />

      );

    }



    return (

      <ResultPage

        questions={currentTestConfig.questions}

        answers={answers}

        reviewQuestions={reviewQuestions}

        violations={violations}

        examName={currentTestConfig.examName}

        onReviewAnswers={() => setShowAnswerReview(true)}

      />

    );

  }



  if (!selectedTest) {

    return (

      <>

        <TestSelector

          examCatalog={examCatalog}

          onSelectTest={handleTestSelection}

          onResumeTest={(testId, progress) => startTest(testId, { progress })}

        />

        {showModeModal && (

          <div className="modal-overlay mode-modal" role="dialog" aria-modal="true">

            <div className="modal mode-selection-modal">

              <div className="modal-header">

                <h2>Select mode</h2>

              </div>

              <div className="modal-body">

                <p>Choose how you want to attempt this test.</p>

                <div className="mode-option-list">

                  <button className="mode-option-card" onClick={() => handleModeSelection('exam')} type="button">

                    <strong>Exam Mode</strong>

                    <span>Standard test flow. No answer feedback until the end.</span>

                  </button>

                  <button className="mode-option-card" onClick={() => handleModeSelection('practice')} type="button">

                    <strong>Practice Mode</strong>

                    <span>The correct answer appears immediately after you answer each question.</span>

                  </button>

                </div>

              </div>

              <div className="modal-footer">

                <button className="btn btn-secondary" onClick={() => { setShowModeModal(false); setPendingTestId(null); }} type="button">

                  Cancel

                </button>

              </div>

            </div>

          </div>

        )}

      </>

    );

  }



  const question = currentTestConfig.questions.find((q) => q.no === currentQuestion);

  const selectedAnswer = answers[currentQuestion] || null;

  const isMarkedForReview = reviewQuestions.includes(currentQuestion);

  const attemptedCount = Object.keys(answers).length;



  return (

    <div className="app">

      <Header

        examName={currentTestConfig.examName}

        totalQuestions={currentTestConfig.questions.length}

        attemptedCount={attemptedCount}

        testDuration={currentTestConfig.duration}

        onTimeUp={handleTimeUp}

        isTestSubmitted={isTestSubmitted}

        violations={violations}

        onBackToTests={handleBackToTests}

        testMode={testMode}

      />



      <div className="main-container">

        <QuestionPalette

          totalQuestions={currentTestConfig.questions.length}

          currentQuestion={currentQuestion}

          answers={answers}

          visitedQuestions={visitedQuestions}

          reviewQuestions={reviewQuestions}

          onQuestionSelect={(qNo) => {

            markAsVisited(currentQuestion);

            setCurrentQuestion(qNo);

          }}

        />



        <div className="question-section">

          <QuestionCard

            question={question}

            selectedAnswer={selectedAnswer}

            onAnswerSelect={handleAnswerSelect}

            onMarkReview={handleMarkReview}

            onClearResponse={handleClearResponse}

            onPrevious={handlePrevious}

            onNext={handleNext}

            isMarkedForReview={isMarkedForReview}

            isFirst={currentQuestion === 1}

            isLast={currentQuestion === currentTestConfig.questions.length}

            isPracticeMode={testMode === 'practice'}

            feedback={feedbackByQuestion[currentQuestion]}

          />



          <div className="submit-section">

            <button

              className="btn btn-submit"

              onClick={handleSubmitClick}

              title="Alt + S"

              type="button"

            >

              Submit Test

            </button>

          </div>

        </div>

      </div>



      <SubmitConfirmation

        isOpen={showSubmitModal}

        attemptedCount={attemptedCount}

        notAttemptedCount={currentTestConfig.questions.length - attemptedCount}

        reviewCount={reviewQuestions.length}

        onConfirm={handleConfirmSubmit}

        onCancel={() => setShowSubmitModal(false)}

      />

    </div>

  );

}

