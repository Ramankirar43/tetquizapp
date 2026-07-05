import { writeFileSync } from 'fs';
import { scienceQuestionsHindi2023 } from '../src/data/science2023_hindi.js';

const shifts = [
  { date: '12 May 2023', fileDate: '12_may_2023', shiftList: ['Shift 1', 'Shift 2'] },
  { date: '13 May 2023', fileDate: '13_may_2023', shiftList: ['Shift 1', 'Shift 2'] },
  { date: '19 May 2023', fileDate: '19_may_2023', shiftList: ['Shift 1', 'Shift 2'] },
];

for (const { date, fileDate, shiftList } of shifts) {
  for (const shift of shiftList) {
    const questions = scienceQuestionsHindi2023
      .filter((q) => q.date === date && q.shift === shift)
      .map((q, i) => ({ ...q, no: i + 1 }));

    const shiftNum = shift.replace('Shift ', '');
    const examName = `Science 2023 Hindi - ${date} (Shift ${shiftNum})`;
    const content = `export const questions = ${JSON.stringify(questions, null, 2)};

export const TEST_DURATION = 120;
export const MARKS_PER_QUESTION = 1;
export const NEGATIVE_MARKING = 0.25;
export const EXAM_NAME = ${JSON.stringify(examName)};
`;

    const filename = `src/data/science_2023_hindi_${fileDate}_shift_${shiftNum}.js`;
    writeFileSync(filename, content, 'utf8');
    console.log('Wrote', filename, questions.length, 'questions');
  }
}
