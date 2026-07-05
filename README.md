# Online Examination System

A production-quality online examination system built with React 18, Vite, and plain CSS. Features a complete exam interface similar to popular platforms like Testbook, Oliveboard, and Adda247.

## Features

### Core Functionality

- **Multi-question exam interface** with smooth navigation
- **Real-time timer** with automatic submission at timeout
- **Question palette** with color-coded status indicators
- **State persistence** using LocalStorage
- **Fullscreen mode** with anti-cheat features
- **Answer review** section with detailed feedback

### Question Management

- Support for multiple-choice questions
- Visual feedback for selected answers
- Mark for review functionality
- Clear response option
- Navigation between questions

### Exam Features

- **Header Display**
  - Exam name
  - Total questions count
  - Attempted questions count
  - Remaining questions count
  - Live countdown timer

- **Question Palette**
  - Government exam style button grid
  - Color coding:
    - Grey: Not Visited
    - Red: Visited but not answered
    - Green: Answered
    - Purple: Marked for Review
    - Blue Border: Current Question
  - Quick navigation to any question

- **Question Card**
  - Question number and text
  - Radio button options
  - Selected option highlighting
  - Navigation buttons (Previous, Save & Next)
  - Mark for Review button
  - Clear Response button

- **Keyboard Shortcuts**
  - Alt + N → Next Question
  - Alt + P → Previous Question
  - Alt + R → Mark for Review
  - Alt + S → Submit Test

- **Result Page**
  - Total questions, attempted, correct, incorrect counts
  - Score calculation
  - Percentage display
  - Anti-cheat violations report
  - Detailed answer review with:
    - Question display
    - All options shown
    - User's answer (if given)
    - Correct answer
    - Status indicator

### Anti-Cheat Features

- Automatic fullscreen mode on test start
- Tab switch detection
- Fullscreen exit tracking
- Violation logging and display

### Scoring System

- Configurable marks per question
- Configurable negative marking
- Automatic score calculation
- Percentage display

### Data Persistence

- Auto-save exam state every 5 seconds
- Restore session on page reload
- Save answers, visited questions, marked questions

### Multiple Test Support

- **Test Selection Screen** on application start
- **Pre-configured Mock Tests**:
  - MPTET Latest Mock Test (150 min, 12 questions)
  - PYQ 2019 Mock Test (120 min, 25 questions)
- **Back to Tests Button** to switch between tests
- **Separate State** for each test (answers, progress, time tracking)

## Project Structure

```
exam-system/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top header with stats and timer
│   │   ├── QuestionCard.jsx     # Question display and options
│   │   ├── QuestionPalette.jsx  # Color-coded question grid
│   │   ├── Timer.jsx            # Countdown timer
│   │   ├── ResultPage.jsx       # Results and answer review
│   │   ├── SubmitConfirmation.jsx # Submission modal
│   │   └── TestSelector.jsx     # Test selection screen
│   ├── data/
│   │   ├── questions.js         # MPTET latest test questions
│   │   ├── questionpyq.js       # Original PYQ questions
│   │   └── questions2019.js     # PYQ 2019 test questions
│   ├── styles/
│   │   └── exam.css            # Comprehensive styling
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Entry point
├── public/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd exam-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Configuration

### Exam Settings

Edit `src/data/questions.js` to configure:

```javascript
// Test duration in minutes (150 = 2.5 hours)
export const TEST_DURATION = 150;

// Marks per correct answer
export const MARKS_PER_QUESTION = 1;

// Negative marking per wrong answer
export const NEGATIVE_MARKING = 0;

// Exam name displayed in header
export const EXAM_NAME = "MPTET Mock Test";
```

### Available Tests

The application includes multiple pre-configured tests that can be selected from the test selection screen:

#### 1. MPTET Latest Mock Test

- **File**: `src/data/questions.js`
- **Questions**: 12
- **Duration**: 150 minutes (2 hours 30 minutes)
- **Marks Per Question**: 1
- **Negative Marking**: 0
- **Type**: Multiple Choice Questions (MCQ)

#### 2. PYQ 2019 Mock Test

- **File**: `src/data/questions2019.js`
- **Questions**: 25
- **Duration**: 120 minutes (2 hours)
- **Marks Per Question**: 1
- **Negative Marking**: 0
- **Type**: Previous Year Questions from 2019

### Adding New Tests

To add a new test:

1. Create a new data file in `src/data/` (e.g., `questions2020.js`)
2. Export questions array and test configuration:

```javascript
export const questions2020 = [
  { no: 1, q: "Question", opts: ["A.", "B.", "C.", "D."], ans: "A" },
  // ... more questions
];

export const TEST_DURATION_2020 = 120;
export const EXAM_NAME_2020 = "PYQ 2020 Mock Test";
```

3. Update `src/App.jsx` to include the new test in `testConfigs`:

```javascript
pyq2020: {
  id: 'pyq2020',
  name: 'PYQ 2020 Mock Test',
  year: '2020',
  questions: questions2020,
  duration: TEST_DURATION_2020,
  examName: EXAM_NAME_2020,
  questionCount: questions2020.length,
  marks: 1
}
```

4. The new test will automatically appear in the test selection screen!

### Adding Questions

Add questions to the `questions` array in `src/data/questions.js`:

```javascript
{
  no: 1,
  q: "Question text here",
  opts: [
    "A. Option 1",
    "B. Option 2",
    "C. Option 3",
    "D. Option 4"
  ],
  ans: "A"  // Correct answer (A, B, C, or D)
}
```

## UI Components

### Header.jsx

Displays exam information, statistics, and timer.

**Props:**

- `examName`: Name of the exam
- `totalQuestions`: Total number of questions
- `attemptedCount`: Number of questions attempted
- `testDuration`: Duration in minutes
- `onTimeUp`: Callback when timer reaches zero
- `isTestSubmitted`: Whether test is submitted

### QuestionCard.jsx

Displays a single question with options and navigation buttons.

**Props:**

- `question`: Question object
- `selectedAnswer`: Currently selected answer
- `onAnswerSelect`: Callback for option selection
- `onMarkReview`: Callback for marking/unmarking review
- `onClearResponse`: Callback for clearing response
- `onPrevious`: Callback for previous button
- `onNext`: Callback for next button
- `isMarkedForReview`: Whether question is marked
- `isFirst`: Whether it's the first question
- `isLast`: Whether it's the last question

### QuestionPalette.jsx

Displays color-coded grid of questions for quick navigation.

**Props:**

- `totalQuestions`: Total number of questions
- `currentQuestion`: Currently displayed question number
- `answers`: Dictionary of answered questions
- `visitedQuestions`: Array of visited question numbers
- `reviewQuestions`: Array of questions marked for review
- `onQuestionSelect`: Callback for selecting a question

### Timer.jsx

Displays countdown timer with color indication.

**Props:**

- `testDuration`: Duration in minutes
- `onTimeUp`: Callback when timer reaches zero
- `isTestSubmitted`: Whether test is submitted

### ResultPage.jsx

Displays results and answer review.

**Props:**

- `questions`: Array of all questions
- `answers`: Dictionary of answers
- `reviewQuestions`: Array of marked questions
- `violations`: Object with violation counts
- `examName`: Name of the exam

### SubmitConfirmation.jsx

Modal confirmation for test submission.

**Props:**

- `isOpen`: Whether modal is visible
- `attemptedCount`: Number of attempted questions
- `notAttemptedCount`: Number of unattempted questions
- `reviewCount`: Number of marked questions
- `onConfirm`: Callback on confirm
- `onCancel`: Callback on cancel

## Styling

The application uses plain CSS with comprehensive responsive design. Styles are organized in `src/styles/exam.css`.

### Color Scheme

- Primary Blue: `#2196F3`
- Green (Correct): `#4CAF50`
- Red (Incorrect): `#f44336`
- Purple (Marked): `#9C27B0`
- Orange (Warning): `#FF9800`
- Gray (Not Attempted): `#999`

### Responsive Breakpoints

- Desktop: Full layout with side palette
- Tablet (1024px): Stacked layout with collapsible palette
- Mobile (768px): Bottom drawer for palette
- Small Mobile (480px): Optimized touch interface

## LocalStorage Data

The application saves the following to LocalStorage under `examState`:

```javascript
{
  currentQuestion: 1,
  answers: { 1: "A", 2: "C", ... },
  visitedQuestions: [1, 2, 3, ...],
  reviewQuestions: [5, 8, ...],
  violations: { tabSwitches: 0, fullscreenExits: 0 },
  testStartTime: 1234567890
}
```

## Keyboard Shortcuts

| Shortcut | Action                 |
| -------- | ---------------------- |
| Alt + N  | Next Question          |
| Alt + P  | Previous Question      |
| Alt + R  | Mark/Unmark for Review |
| Alt + S  | Submit Test            |

## Browser Support

- Chrome/Chromium 88+
- Firefox 87+
- Safari 14+
- Edge 88+

## Features Implemented

✅ Multi-section layout (Header, Question, Palette)
✅ Real-time countdown timer
✅ Question palette with color coding
✅ Answer persistence
✅ Fullscreen mode with violation tracking
✅ Tab switch detection
✅ Keyboard shortcuts
✅ Auto-save to LocalStorage
✅ Result calculation and display
✅ Answer review section
✅ Responsive design
✅ Mobile support with collapsible palette
✅ Anti-cheat features
✅ Submission confirmation modal
✅ Plain CSS (no frameworks)
✅ React 18 hooks
✅ Production-ready code

## Performance

- Efficient state management with React hooks
- Optimized re-renders using callback memoization
- LocalStorage for data persistence
- CSS animations for smooth transitions
- Minimal bundle size with Vite

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus indicators for keyboard users

## Future Enhancements

- Question categories/sections
- Shuffle questions option
- Image/formula support
- Audio questions
- Multiple correct answers
- Match the following question type
- Score analytics and progress tracking
- Admin dashboard for managing exams
- Export results as PDF

## License

MIT License

## Support

For issues or questions, please create an issue in the repository.

## Credits

Built with React 18, Vite, and plain CSS inspired by leading online examination platforms.
