import React, { useState } from "react";
import "./App.css";
import IncorrectAnswers from "./IncorrectAnswers";
import questions from "./questions";

/**
 * Main component that controls the quiz logic and displays results.
 */
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question
  const [correctCount, setCorrectCount] = useState(0); // Tracks the number of correct answers
  const [showScore, setShowScore] = useState(false); // Flag to display results after quiz completion
  const [incorrectQuestions, setIncorrectQuestions] = useState([]); // Stores incorrect answers for review
  const [userLevel, setUserLevel] = useState(""); // Stores the user's English level
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Stores the user's selected answers
  const [answeredQuestions, setAnsweredQuestions] = useState(0); // Tracks the number of answered questions

  /**
   * Handles the selection of an answer and updates the quiz state.
   * It checks if the answer is correct and proceeds to the next question.
   */
  const handleAnswerOptionClick = (option) => {
    const userAnswer = option;
    const correctAnswer = questions[currentQuestion].answer;

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = userAnswer;
    setSelectedAnswers(updatedSelectedAnswers);

    setAnsweredQuestions(answeredQuestions + 1);

    if (userAnswer === correctAnswer) {
      setCorrectCount(correctCount + 1); // Correct answer count
    } else {
      setIncorrectQuestions([
        ...incorrectQuestions,
        {
          question: questions[currentQuestion].question,
          correctAnswer: correctAnswer,
          userAnswer: userAnswer,
        },
      ]);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion); // Move to next question
    } else {
      if (answeredQuestions >= 4) {
        setShowScore(true); // Show score when 5 or more questions are answered
        evaluateLevel(correctCount + (userAnswer === correctAnswer ? 1 : 0));
      } else {
        alert("YOU NEED TO ANSWER AT LEAST 5 QUESTIONS TO SEE THE RESULT.");
      }
    }
  };

  /**
   * Moves to the next question.
   */
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  /**
   * Moves to the previous question.
   */
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  /**
   * Evaluates the user's level based on the number of correct answers.
   */
  const evaluateLevel = (correctAnswers) => {
    if (correctAnswers === 0) {
      setUserLevel("YOU DO NOT HAVE A LEVEL IN ENGLISH.");
    } else if (correctAnswers >= 26) {
      setUserLevel("C2");
    } else if (correctAnswers >= 23) {
      setUserLevel("C1");
    } else if (correctAnswers >= 20) {
      setUserLevel("B2");
    } else if (correctAnswers >= 15) {
      setUserLevel("B1");
    } else if (correctAnswers >= 6) {
      setUserLevel("A2");
    } else if (correctAnswers === 5) {
      setUserLevel("A1");
    } else {
      setUserLevel("YOU NEED TO ANSWER AT LEAST 5 QUESTIONS TO DETERMINE YOUR LEVEL.");
    }
  };
  /**
   * Restarts the quiz by resetting all the states.
   */
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setCorrectCount(0);
    setShowScore(false);
    setIncorrectQuestions([]);
    setUserLevel("");
    setSelectedAnswers([]);
    setAnsweredQuestions(0);
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <h2>YOUR ENGLISH LEVEL: {userLevel}</h2>
          <IncorrectAnswers
            incorrectQuestions={incorrectQuestions}
            correctCount={correctCount}
            restartQuiz={restartQuiz}
          />
        </div>
      ) : (
        <div className="question-section">
          <h2>
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <p>{questions[currentQuestion].question}</p>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={
                  selectedAnswers[currentQuestion] === option
                    ? "selected-answer"
                    : ""
                }
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrev} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
