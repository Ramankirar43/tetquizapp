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
import { questions as upsi, TEST_DURATION as upsiDur, EXAM_NAME as upsiName } from './up_police_si_14mar2026_shift1';
import { questions as practiceSet01 } from './practice_set01';
import { questions as practiceSet02 } from './practiceset02';
import { questions as practiceSet03 } from './practice_set3';
import { questions as chapterUniverse } from './chapterwise_test/Universe';
import { questions as chapterEnvironment } from './chapterwise_test/environment';
import { questions as chapterFoodHealth } from './chapterwise_test/food and health.js';
import { questions as chapterFoodManagement } from './chapterwise_test/food_management';
import { questions as chapterForcePressureSpeed } from './chapterwise_test/force_pressure_speed';
import { questions as chapterLivingThings } from './chapterwise_test/livingthings';
import { questions as chapterMagnet } from './chapterwise_test/magnet';
import { questions as chapterMatter } from './chapterwise_test/matter';
import { questions as chapterMeasurement } from './chapterwise_test/measurement';
import { questions as chapterNaturalResources } from './chapterwise_test/natural_resources';
import { questions as chapterPedagogy } from './chapterwise_test/pedagogy';
import { questions as chapterSoundLight } from './chapterwise_test/sound_light';
import { questions as chapterTemperature } from './chapterwise_test/temperature';
import { questions as chapterWorkEnergy } from './chapterwise_test/work_energy';
import { questions as chapterMirrorLens } from './chapterwise_test/mirror';
const fallbackChapterQuestions = chapterUniverse;

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
  makeTest('UPSI TEST 2026', '14 Mar 2026 — Shift 1', '2026', upsi, upsiDur, upsiName, 'UPSI 2026'),
];

const hindiScience2023 = [
  makeTest('science_hindi_12_may_2023_s1', '12 May 2023 — Shift 1', '2023', hi12S1, hi12S1Dur, hi12S1Name, 'Science PYQ 2023'),
  makeTest('science_hindi_12_may_2023_s2', '12 May 2023 — Shift 2', '2023', hi12S2, hi12S2Dur, hi12S2Name, 'Science PYQ 2023'),
  makeTest('science_hindi_13_may_2023_s1', '13 May 2023 — Shift 1', '2023', hi13S1, hi13S1Dur, hi13S1Name, 'Science PYQ 2023'),
  makeTest('science_hindi_13_may_2023_s2', '13 May 2023 — Shift 2', '2023', hi13S2, hi13S2Dur, hi13S2Name, 'Science PYQ 2023'),
  makeTest('science_hindi_19_may_2023_s1', '19 May 2023 — Shift 1', '2023', hi19S1, hi19S1Dur, hi19S1Name, 'Science PYQ 2023'),
  makeTest('science_hindi_19_may_2023_s2', '19 May 2023 — Shift 2', '2023', hi19S2, hi19S2Dur, hi19S2Name, 'Science PYQ 2023'),
 makeTest(
  'practice_set_01',
  'Practice Set 01',
  'Practice',
  practiceSet01,
  120,
  'Practice Set 01',
  'Practice Sets'
),

makeTest(
  'practice_set_02',
  'Practice Set 02',
  'Practice',
  practiceSet02,
  120,
  'Practice Set 02',
  'Practice Sets'
),
makeTest(
  'practice_set_03',
  'Practice Set 03',
  'Practice',
  practiceSet03,
  120,
  'Practice Set 03',
  'Practice Sets'
),
];

const chapterWiseTests = [
  { id: 'chapter_universe', name: 'ब्रह्मांड', questions: chapterUniverse },
  { id: 'chapter_environment', name: 'पर्यावरण', questions: chapterEnvironment },
  { id: 'chapter_food_health', name: 'खाद्य एवं स्वास्थ्य', questions: chapterFoodHealth },
  { id: 'chapter_food_management', name: 'खाद्य प्रबंधन', questions: chapterFoodManagement },
  { id: 'chapter_force_pressure_speed', name: 'बल, दाब एवं गति', questions: chapterForcePressureSpeed },
  { id: 'chapter_living_things', name: 'जीव', questions: chapterLivingThings },
  { id: 'chapter_magnet', name: 'चुंबक', questions: chapterMagnet },
  { id: 'chapter_matter', name: 'पदार्थ', questions: chapterMatter },
  { id: 'chapter_measurement', name: 'मापन', questions: chapterMeasurement },
  { id: 'chapter_natural_resources', name: 'प्राकृतिक संसाधन', questions: chapterNaturalResources },
  { id: 'chapter_pedagogy', name: 'शिक्षाशास्त्र', questions: chapterPedagogy },
  { id: 'chapter_sound_light', name: 'ध्वनि एवं प्रकाश', questions: chapterSoundLight },
  { id: 'chapter_temperature', name: 'तापमान', questions: chapterTemperature },
  { id: 'chapter_work_energy', name: 'कार्य एवं ऊर्जा', questions: chapterWorkEnergy },
  { id: 'chapter_mirror_lens', name: 'दर्पण एवं लेंस', questions: chapterMirrorLens },
].map((chapter) => {
  const questionsList = Array.isArray(chapter.questions) && chapter.questions.length > 0 ? chapter.questions : fallbackChapterQuestions;
  const duration = Math.max(15, Math.ceil(questionsList.length * 1.5));
  return makeTest(chapter.id, chapter.name, 'अध्याय', questionsList, duration, chapter.name, 'Chapter Wise Tests');
});

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
  {
    id: 'chapterwise',
    name: 'Chapter Wise Tests',
    description: 'प्रत्येक अध्याय का अलग टेस्ट — Hindi chapter-wise practice sets',
    languages: [
      {
        id: 'hi',
        name: 'Hindi',
        nativeLabel: 'हिंदी',
        tests: chapterWiseTests,
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
