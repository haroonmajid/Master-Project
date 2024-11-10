import React, { useEffect, useState } from 'react'; 
import { fetchQuestions } from './api';
import Result from './Result';
import Quiz from './Quiz';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true); // Default loading to true

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);  // Start loading
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setLoading(false);  // End loading
    };
    getQuestions();
  }, []);

  return (
    <div className="app">
      {loading ? (
        <p>Loading questions...</p>
      ) : showResult ? (
        <Result score={score} total={questions.length} />
      ) : (
        <Quiz
          question={questions[currentQuestionIndex]}
          onAnswer={(isCorrect) => {
            if (isCorrect) setScore(score + 1);
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < questions.length) {
              setCurrentQuestionIndex(nextIndex);
            } else {
              setShowResult(true);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
