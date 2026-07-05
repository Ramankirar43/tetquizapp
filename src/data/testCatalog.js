import { questions, TEST_DURATION, EXAM_NAME } from './questions';
import { questions2019, TEST_DURATION_2019, EXAM_NAME_2019 } from './questions2019';
import { questions as en12S1, TEST_DURATION as en12S1Dur, EXAM_NAME as en12S1Name } from './science_2023_12_may_2023_shift_1';
import { questions as en12S2, TEST_DURATION as en12S2Dur, EXAM_NAME as en12S2Name } from './science_2023_12_may_2023_shift_2';
import { questions as en13S1, TEST_DURATION as en13S1Dur, EXAM_NAME as en13S1Name } from './science_2023_13_may_2023_shift_1';
import { questions as en13S2, TEST_DURATION as en13S2Dur, EXAM_NAME as en13S2Name } from './science_2023_13_may_2023_shift_2';
import { questions as en19S1, TEST_DURATION as en19S1Dur, EXAM_NAME as en19S1Name } from './science_2023_19_may_2023_shift_1';
import { questions as en19S2, TEST_DURATION as en19S2Dur, EXAM_NAME as en19S2Name } from './science_2023_19_may_2023_shift_2';
import { questions as hi12S1, TEST_DURATION as hi12S1Dur, EXAM_NAME as hi12S1Name } from './science_2023_hindi_12_may_2023_shift_1';
import { questions as hi12S2, TEST_DURATION as hi12S2Dur, EXAM_NAME as hi12S2Name } from './science_2023_hindi_12_may_2023_shift_2';
import { questions as hi13S1, TEST_DURATION as hi13S1Dur, EXAM_NAME as hi13S1Name } from './science_2023_hindi_13_may_2023_shift_1';
import { questions as hi13S2, TEST_DURATION as hi13S2Dur, EXAM_NAME as hi13S2Name } from './science_2023_hindi_13_may_2023_shift_2';
import { questions as hi19S1, TEST_DURATION as hi19S1Dur, EXAM_NAME as hi19S1Name } from './science_2023_hindi_19_may_2023_shift_1';
import { questions as hi19S2, TEST_DURATION as hi19S2Dur, EXAM_NAME as hi19S2Name } from './science_2023_hindi_19_may_2023_shift_2';

function makeTest(id, name, year, questionsList, duration, examName, group) {
  return {
    id,
    name,
    year,
    group,
    questions: questionsList,
    duration,
    examName,
    questionCount: questionsList.length,
    marks: 1,
  };
}

const englishScience2023 = [
  makeTest('science_12_may_2023_s1', '12 May 2023 — Shift 1', '2023', en12S1, en12S1Dur, en12S1Name, 'Science PYQ 2023'),
  makeTest('science_12_may_2023_s2', '12 May 2023 — Shift 2', '2023', en12S2, en12S2Dur, en12S2Name, 'Science PYQ 2023'),
  makeTest('science_13_may_2023_s1', '13 May 2023 — Shift 1', '2023', en13S1, en13S1Dur, en13S1Name, 'Science PYQ 2023'),
  makeTest('science_13_may_2023_s2', '13 May 2023 — Shift 2', '2023', en13S2, en13S2Dur, en13S2Name, 'Science PYQ 2023'),
  makeTest('science_19_may_2023_s1', '19 May 2023 — Shift 1', '2023', en19S1, en19S1Dur, en19S1Name, 'Science PYQ 2023'),
  makeTest('science_19_may_2023_s2', '19 May 2023 — Shift 2', '2023', en19S2, en19S2Dur, en19S2Name, 'Science PYQ 2023'),
];

const hindiScience2023 = [
  makeTest('science_hindi_12_may_2023_s1', '12 May 2023 — Shift 1', '2023', hi12S1, hi12S1Dur, hi12S1Name, 'Science PYQ 2023'),
  makeTest('science_hindi_12_may_2023_s2', '12 May 2023 — Shift 2', '2023', hi12S2, hi12S2Dur, hi12S2Name, 'Science PYQ 2023'),
  makeTest('science_hindi_13_may_2023_s1', '13 May 2023 — Shift 1', '2023', hi13S1, hi13S1Dur, hi13S1Name, 'Science PYQ 2023'),
  makeTest('science_hindi_13_may_2023_s2', '13 May 2023 — Shift 2', '2023', hi13S2, hi13S2Dur, hi13S2Name, 'Science PYQ 2023'),
  makeTest('science_hindi_19_may_2023_s1', '19 May 2023 — Shift 1', '2023', hi19S1, hi19S1Dur, hi19S1Name, 'Science PYQ 2023'),
  makeTest('science_hindi_19_may_2023_s2', '19 May 2023 — Shift 2', '2023', hi19S2, hi19S2Dur, hi19S2Name, 'Science PYQ 2023'),
];

export const examCatalog = [
  {
    id: 'mptet',
    name: 'MPTET',
    description: 'Madhya Pradesh Teacher Eligibility Test — mock tests and previous year papers',
    languages: [
      {
        id: 'en',
        name: 'English',
        nativeLabel: 'English',
        tests: [
          makeTest('mptet', 'MPTET Mock Test', 'Latest', questions, TEST_DURATION, EXAM_NAME, 'Mock Tests'),
          makeTest('pyq2019', 'PYQ 2019 Mock Test', '2019', questions2019, TEST_DURATION_2019, EXAM_NAME_2019, 'Mock Tests'),
          ...englishScience2023,
        ],
      },
      {
        id: 'hi',
        name: 'Hindi',
        nativeLabel: 'हिंदी',
        tests: hindiScience2023,
      },
    ],
  },
];

export function getTestConfigsMap() {
  const map = {};
  for (const exam of examCatalog) {
    for (const lang of exam.languages) {
      for (const test of lang.tests) {
        map[test.id] = test;
      }
    }
  }
  return map;
}

export function getAllTestsFlat() {
  return examCatalog.flatMap((exam) =>
    exam.languages.flatMap((lang) =>
      lang.tests.map((test) => ({
        ...test,
        examId: exam.id,
        examName: exam.name,
        languageId: lang.id,
        languageName: lang.name,
      }))
    )
  );
}
