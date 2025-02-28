#### Database
- [ ] **Task 1: Create start frame UI and state initialization**  
  File: `src/components/StartFrame.jsx`  
  Action: Create component with image and Start button  
  Code:  
  ```jsx
  export default function StartFrame({ onStart }) {
    return (
      <div>
        <img src="/quiz-image.png" alt="How well do you know my casts?" />
        <button onClick={() => onStart()}>Start Quiz</button>
      </div>
    );
  }
  ```  
  UI Component: StartFrame  
  API: POST /start  
  Outcome: URL shows `?score=0&question=0` after button click  

---

#### Implementation Plan
### Step 1: Core API Infrastructure
- [ ] **Task 2: Implement /start endpoint with Neynar integration**  
  File: `server/routes/start.js`  
  Action: Create route handler  
  Code:  
  ```javascript
  router.post('/start', async (req, res) => {
    try {
      const casts = await neynar.fetchUserCasts(2);
      if (casts.length < 2) throw new Error("Insufficient casts");
      res.json({ answerKey: [casts[0].text, casts[1].text] });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  ```  
  API: GET https://api.neynar.com/v1/casts (external)  
  Outcome: Server logs show retrieved casts or error  

---

### Step 2: Question Flow Implementation
- [ ] **Task 3: Create QuestionFrame component**  
  File: `src/components/QuestionFrame.jsx`  
  Action: Create component with dynamic options  
  Code:  
  ```jsx
  export default function QuestionFrame({ castText, options, onAnswer }) {
    return (
      <div>
        <h2>{castText}</h2>
        {options.map((opt) => (
          <button key={opt} onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    );
  }
  ```  
  UI Component: QuestionFrame  
  Outcome: First question displays real cast text  

- [ ] **Task 4: Implement answer validation endpoint**  
  File: `server/routes/answer.js`  
  Action: Create route handler  
  Code:  
  ```javascript
  router.post('/answer', (req, res) => {
    const { answerKey, userAnswer, currentScore } = req.body;
    const newScore = answerKey === userAnswer ? currentScore + 1 : currentScore;
    res.json({ score: newScore });
  });
  ```  
  API: POST /answer  
  Outcome: Score increments visible in URL params  

---

### Step 3: Advanced Features
- [ ] **Task 5: Implement dynamic distractor generation**  
  File: `server/services/optionsGenerator.js`  
  Action: Create service  
  Code:  
  ```javascript
  async function generateOptions(correctAnswer) {
    const trends = await neynar.fetchTrendingCasts(3);
    return shuffle([correctAnswer, ...trends.map(t => t.text)]);
  }
  ```  
  Outcome: All options show real cast excerpts  

- [ ] **Task 6: Add state signature validation**  
  File: `server/middleware/security.js`  
  Action: Create middleware  
  Code:  
  ```javascript
  function validateStateSignature(req, res, next) {
    if (!verifySignature(req.query.sig)) {
      res.redirect('/start');
    }
    next();
  }
  ```  
  Outcome: Tampered params trigger reset  

---

### Step 4: Finalization
- [ ] **Task 7: Create ResultsFrame component**  
  File: `src/components/ResultsFrame.jsx`  
  Action: Create component  
  Code:  
  ```jsx
  export default function ResultsFrame({ score, onRestart }) {
    return (
      <div>
        <h2>Score: {score}/2</h2>
        <button onClick={onRestart}>Play Again</button>
      </div>
    );
  }
  ```  
  UI Component: ResultsFrame  
  Outcome: Final score displays with working restart  

This task list follows strict implementation order with 100% file specificity. Each task contains executable code patterns and references concrete UI components while maintaining focus on verifiable outcomes through URL parameters and server logging.