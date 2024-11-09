import React, { useEffect, useState } from 'react';
import { fetchQuestions } from './api';
import Result from './Result';
import Quiz from './Quiz';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const questions = await fetchQuestions();
      setQuestions(questions);
    };
    getQuestions();
  }, []);

  return (
    <div className="app">
      {showResult ? (
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
