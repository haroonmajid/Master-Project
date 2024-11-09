import React from 'react';

function Quiz({ question, onAnswer }) {
  if (!question) return <div>Loading...</div>;

  const handleAnswer = (answer) => {
    onAnswer(answer === question.correct_answer);
  };

  return (
  <div className="flex flex-col gap-5 justify-center h-screen items-center text-purple-600 bg-purple-100">
    <h1 className='text-[48px] font-semibold mb-4'>Quiz</h1>
      <h2 className="text-[24px] font-semibold mb-4">{question.question}</h2>
      <div className="grid grid-cols-2 gap-4 w-[50%]">
        {[...question.incorrect_answers, question.correct_answer]
          .sort()
          .map((answer, index) => (
            <button
              key={index}
              className="rounded-md text-[24px] py-2 bg-purple-600 px-5 hover:bg-purple-700 text-purple-100"
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </button>
          ))}
      </div>
    </div>

  );
}

export default Quiz;
