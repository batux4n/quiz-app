import React from "react";

const IncorrectAnswers = ({ incorrectQuestions, correctCount, restartQuiz }) => {
  return (
    <div className="incorrect-section">
      <h2>Congratulations! You answered {correctCount} questions correctly. 🎉</h2>
      {incorrectQuestions.length > 0 ? (
        <>
          <h3>Questions You Answered Incorrectly:</h3>
          <ul>
            {incorrectQuestions.map((item, index) => (
              <li key={index}>
                <strong>{item.question}</strong>
                <br />
                <span>
                  Correct Answer: <strong>{item.correctAnswer}</strong>
                </span>
                <br />
                <span>
                  Your Answer: <em>{item.userAnswer}</em>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Perfect! You answered all questions correctly. 👏</p>
      )}
      <button onClick={restartQuiz}>Restart</button>
    </div>
  );
};

export default IncorrectAnswers;
