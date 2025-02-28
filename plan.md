### Step 1: Implement Start Frame and Basic State Initialization  
```text  
- Build: Create start frame with "How well do you know my casts?" image and Start button that triggers POST /start. Add basic state management with URL parameters (?score=0&question=0)  
- Outcome: Clicking Start button progresses to placeholder question frame (visible via frame debugging tools)  
```  

### Step 2: Fetch Recent Casts via Neynar API  
```text  
- Build: Implement Neynar API integration in /start handler to fetch user's last 2 casts. Store cast texts in answerKey. Add error handling for API failures.  
- Outcome: Server logs show retrieved cast texts or "Insufficient casts" error when testing with test accounts  
```  

### Step 3: Render First Question with Basic Options  
```text  
- Build: Create question frame template using first cast text. Generate options with 1 correct answer + 3 hardcoded distractors. Shuffle options.  
- Outcome: Users see first cast text as question with 4 choices (verify via test account with known casts)  
```  

### Step 4: Implement Answer Validation and Score Tracking  
```text  
- Build: Add /answer endpoint to check selected option against answerKey. Update score parameter and progress to question 2.  
- Outcome: Correct answer increases score (visible in URL params), incorrect answer leaves score unchanged  
```  

### Step 5: Implement Second Question Flow  
```text  
- Build: Repeat question rendering logic for second cast. Add conditional routing to results screen after second answer.  
- Outcome: Completing both questions shows final score in URL parameters (?score=2)  
```  

### Step 6: Build Results Frame with Restart Functionality  
```text  
- Build: Create results frame displaying final score. Add "Play Again" button that resets state parameters.  
- Outcome: Score displays correctly and restart button returns user to start frame  
```  

### Step 7: Add Dynamic Distractor Generation  
```text  
- Build: Replace hardcoded distractors with actual trending casts fetched from Neynar API (different authors). Implement option randomization.  
- Outcome: All question options show real cast excerpts from multiple authors  
```  

### Step 8: Implement State Security Measures  
```text  
- Build: Add signed message payloads to state parameters. Validate signatures on each request.  
- Outcome: Tampered URL parameters trigger quiz reset (test by manually modifying params)  
```  

### Step 9: Add Comprehensive Error Handling  
```text  
- Build: Implement retry logic for API calls, timeout handling, and user-friendly error frames for all failure scenarios.  
- Outcome: Network failures show "Try again" message, invalid states auto-reset quiz  
```