import React, { useState, useEffect } from "react";
import Colors from "./colors";
import { BounceLoader } from "react-spinners";

function Quiz({ question, totalQuestions, onAnswer }) {
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1); // Track the current question number

  

  //its using loader that show loader then move next screen
  useEffect(() => {
    if (quizStarted) {
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after 3 seconds
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  // const handleAnswer = (answer) => {
  //   onAnswer(answer === question.correct_answer);
  // };
  const handleAnswer = (answer) => {
    onAnswer(answer === question.correct_answer);
    // Update current question number after each answer
    setCurrentQuestion((prev) => prev + 1); 
  };
  
  
  // Loader component
  const Loader = () => (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: Colors.background }}
    >
      {/* The BounceLoader will be centered with margin */}
      <BounceLoader color={Colors.buttonGreen} size={100} />
    </div>
  );

  if (!quizStarted) {
    // Welcome screen before the quiz starts
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: Colors.background }}
      >
        <div
          className="flex flex-col items-center justify-center  text-white p-10 rounded-lg text-center gap-5 w-[90%] sm:w-[60%] md:w-[60%] lg:w-[40%]"
          style={{ backgroundColor: Colors.backgroundDarker }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome to the React Quiz</h1>
          <p className="text-lg">Number of Questions: 10</p>
          <button
            onClick={startQuiz}
            className="mt-4  text-white py-2 px-4 rounded-md text-lg"
            style={{ backgroundColor: Colors.buttonGreen }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = Colors.buttonGreenHover)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = Colors.buttonGreen)
            }
          >
            Let's Start
          </button>
        </div>
      </div>
    );
  }

  // Main quiz content
  if (loading) return <Loader />;

  return (
    <div
      className="flex flex-col gap-5 justify-center h-screen items-center"
      style={{ backgroundColor: Colors.background }}
    >
      <div
        className="flex flex-col items-center justify-center  text-white p-10 rounded-lg text-center gap-5 w-[90%] sm:w-[60%] md:w-[60%] lg:w-[60%]"
        style={{ backgroundColor: Colors.backgroundDarker }}
      >
        <h4 className="text-2xl font-semibold mb-2 text-left w-full">
          {question.question}
        </h4>

        <hr
          className="border-t-2  w-full"
          style={{ borderColor: Colors.background }}
        />

        <div className="flex flex-col gap-4 w-full">
          {[...question.incorrect_answers, question.correct_answer]
            .sort()
            .map((answer, index) => (
              <button
                key={index}
                className="rounded-md text-lg py-3 px-5 font-medium w-full text-left transition-transform duration-200 ease-in-out"
                style={{
                  backgroundColor: Colors.background,
                  color: Colors.white,
                }}
               
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = Colors.buttonGreen;
                  e.target.style.transform = "scale(0.95)"; // Shrinks the button slightly
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = Colors.background;
                  e.target.style.transform = "scale(1)"; // Resets the scale to normal
                }}
                onClick={() => handleAnswer(answer)}
              >
                {answer}
              </button>
            ))}
        </div>

        <hr
          className="border-t-2  w-full"
          style={{ borderColor: Colors.background }}
        />
  
  
  <p className="text-lg text-left w-full">
  Number of Questions: {currentQuestion}/10
</p>

      </div>
    </div>
  );
}

export default Quiz;
