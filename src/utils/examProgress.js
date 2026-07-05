const PROGRESS_PREFIX = 'examProgress_';

export function getProgressKey(testId) {
  return `${PROGRESS_PREFIX}${testId}`;
}

export function loadTestProgress(testId) {
  try {
    const raw = localStorage.getItem(getProgressKey(testId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveTestProgress(testId, state) {
  localStorage.setItem(getProgressKey(testId), JSON.stringify(state));
}

export function clearTestProgress(testId) {
  localStorage.removeItem(getProgressKey(testId));
}

export function getAllSavedProgress() {
  const saved = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PROGRESS_PREFIX)) {
      const testId = key.slice(PROGRESS_PREFIX.length);
      const progress = loadTestProgress(testId);
      if (progress && !progress.isSubmitted) {
        saved[testId] = progress;
      }
    }
  }
  return saved;
}

export function migrateLegacyProgress() {
  const legacy = localStorage.getItem('examState');
  if (!legacy) return;

  try {
    const state = JSON.parse(legacy);
    if (state.testId && !loadTestProgress(state.testId)) {
      saveTestProgress(state.testId, {
        ...state,
        isSubmitted: false,
      });
    }
  } catch {
    // ignore invalid legacy state
  }

  localStorage.removeItem('examState');
}
