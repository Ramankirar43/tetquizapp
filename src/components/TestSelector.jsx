import React, { useMemo, useState, useEffect } from 'react';
import { getAllSavedProgress } from '../utils/examProgress';

const TESTS_PER_PAGE = 6;

function BreadcrumbNav({ items, onNavigate }) {
  return (
    <nav className="selector-breadcrumb" aria-label="Navigation">
      {items.map((item, index) => (
        <span key={item.id} className="breadcrumb-segment">
          {index > 0 && <span className="breadcrumb-divider">/</span>}
          {index < items.length - 1 ? (
            <button type="button" className="breadcrumb-link" onClick={() => onNavigate(item.level)}>
              {item.label}
            </button>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function ProgressBadge({ progress }) {
  if (!progress) return null;
  const attempted = Object.keys(progress.answers || {}).length;
  return (
    <span className="progress-badge" title="Saved progress available">
      {attempted} answered
    </span>
  );
}

export default function TestSelector({ examCatalog, onSelectTest, onResumeTest }) {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingTest, setPendingTest] = useState(null);

  const savedProgress = useMemo(() => getAllSavedProgress(), []);

  useEffect(() => {
    document.body.classList.add('portal-open');
    return () => document.body.classList.remove('portal-open');
  }, []);

  const selectedExam = examCatalog.find((e) => e.id === selectedExamId);
  const selectedLanguage = selectedExam?.languages.find((l) => l.id === selectedLanguageId);

  const breadcrumbItems = useMemo(() => {
    const items = [{ id: 'home', label: 'Exams', level: 'home' }];
    if (selectedExam) {
      items.push({ id: selectedExam.id, label: selectedExam.name, level: 'exam' });
    }
    if (selectedLanguage) {
      items.push({ id: selectedLanguage.id, label: selectedLanguage.name, level: 'language' });
    }
    return items;
  }, [selectedExam, selectedLanguage]);

  const paginatedTests = useMemo(() => {
    if (!selectedLanguage) return { tests: [], totalPages: 0 };
    const tests = selectedLanguage.tests;
    const totalPages = Math.max(1, Math.ceil(tests.length / TESTS_PER_PAGE));
    const start = (currentPage - 1) * TESTS_PER_PAGE;
    return {
      tests: tests.slice(start, start + TESTS_PER_PAGE),
      totalPages,
      total: tests.length,
    };
  }, [selectedLanguage, currentPage]);

  const handleNavigate = (level) => {
    if (level === 'home') {
      setSelectedExamId(null);
      setSelectedLanguageId(null);
    } else if (level === 'exam') {
      setSelectedLanguageId(null);
    }
    setCurrentPage(1);
    setPendingTest(null);
  };

  const handleTestClick = (test) => {
    const progress = savedProgress[test.id];
    if (progress) {
      setPendingTest({ test, progress });
      return;
    }
    onSelectTest(test.id, { fresh: true });
  };

  const handleResume = () => {
    if (!pendingTest) return;
    onResumeTest(pendingTest.test.id, pendingTest.progress);
    setPendingTest(null);
  };

  const handleStartFresh = () => {
    if (!pendingTest) return;
    onSelectTest(pendingTest.test.id, { fresh: true });
    setPendingTest(null);
  };

  return (
    <div className="test-selector-page">
      <div className="test-selector-shell">
        <header className="selector-header">
          <h1 className="selector-title">Exam Portal</h1>
          <p className="selector-subtitle">Select an exam, choose your language, and start practicing</p>
        </header>

        {(selectedExam || selectedLanguage) && (
          <BreadcrumbNav items={breadcrumbItems} onNavigate={handleNavigate} />
        )}

        {!selectedExamId && (
          <section className="selector-section">
            <h2 className="section-heading">Choose Exam</h2>
            <div className="card-grid card-grid--exams">
              {examCatalog.map((exam) => {
                const testCount = exam.languages.reduce((sum, lang) => sum + lang.tests.length, 0);
                const inProgress = exam.languages.some((lang) =>
                  lang.tests.some((test) => savedProgress[test.id])
                );
                return (
                  <button
                    key={exam.id}
                    type="button"
                    className="selector-card selector-card--exam"
                    onClick={() => {
                      setSelectedExamId(exam.id);
                      setCurrentPage(1);
                    }}
                  >
                    <div className="selector-card-top">
                      <h3>{exam.name}</h3>
                      {inProgress && <span className="status-pill status-pill--active">In progress</span>}
                    </div>
                    <p className="selector-card-desc">{exam.description}</p>
                    <div className="selector-card-meta">
                      <span>{exam.languages.length} languages</span>
                      <span>{testCount} tests</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {selectedExam && !selectedLanguageId && (
          <section className="selector-section">
            <h2 className="section-heading">Select Language</h2>
            <div className="card-grid card-grid--languages">
              {selectedExam.languages.map((lang) => {
                const savedCount = lang.tests.filter((t) => savedProgress[t.id]).length;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    className="selector-card selector-card--language"
                    onClick={() => {
                      setSelectedLanguageId(lang.id);
                      setCurrentPage(1);
                    }}
                  >
                    <h3>{lang.name}</h3>
                    {lang.nativeLabel !== lang.name && (
                      <span className="language-native">{lang.nativeLabel}</span>
                    )}
                    <div className="selector-card-meta">
                      <span>{lang.tests.length} tests</span>
                      {savedCount > 0 && (
                        <span className="status-pill status-pill--muted">{savedCount} saved</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {selectedLanguage && (
          <section className="selector-section">
            <div className="section-row">
              <h2 className="section-heading">{selectedLanguage.name} Tests</h2>
              <span className="section-count">{paginatedTests.total} total</span>
            </div>

            <div className="test-list">
              {paginatedTests.tests.map((test) => {
                const progress = savedProgress[test.id];
                return (
                  <button
                    key={test.id}
                    type="button"
                    className="test-list-item"
                    onClick={() => handleTestClick(test)}
                  >
                    <div className="test-list-main">
                      <span className="test-list-name">{test.name}</span>
                      <span className="test-list-group">{test.group}</span>
                    </div>
                    <div className="test-list-details">
                      <span>{test.questionCount} Q</span>
                      <span>{test.duration} min</span>
                      <span className="test-year">{test.year}</span>
                      <ProgressBadge progress={progress} />
                    </div>
                    <span className="test-list-action">
                      {progress ? 'Continue' : 'Start'}
                    </span>
                  </button>
                );
              })}
            </div>

            {paginatedTests.totalPages > 1 && (
              <div className="selector-pagination">
                <button
                  type="button"
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {paginatedTests.totalPages}
                </span>
                <button
                  type="button"
                  className="pagination-btn"
                  disabled={currentPage === paginatedTests.totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      {pendingTest && (
        <div className="modal-overlay" onClick={() => setPendingTest(null)}>
          <div className="modal resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Resume Test?</h2>
            </div>
            <div className="modal-body">
              <p>
                You have saved progress for <strong>{pendingTest.test.name}</strong>.
              </p>
              <div className="modal-stats">
                <p>Question: {pendingTest.progress.currentQuestion || 1}</p>
                <p>Answered: {Object.keys(pendingTest.progress.answers || {}).length}</p>
                <p>Marked for review: {(pendingTest.progress.reviewQuestions || []).length}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleStartFresh}>
                Start Fresh
              </button>
              <button type="button" className="btn btn-primary" onClick={handleResume}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
