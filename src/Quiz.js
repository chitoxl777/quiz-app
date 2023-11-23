// QuizTaker.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const QuizTaker = ({ quiz, onSubmit }) => {
  const [userAnswers, setUserAnswers] = useState(
    Array(quiz.questions.length).fill("")
  );

  const handleAnswerChange = (index, value) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    onSubmit(userAnswers);
  };

  return (
    <div>
      <h2>Quiz: {quiz.title}</h2>
      {quiz.questions.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <label>
                  <input
                    type="radio"
                    value={answerIndex}
                    checked={userAnswers[index] === answerIndex}
                    onChange={() => handleAnswerChange(index, answerIndex)}
                  />
                  {answer.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Button variant="success" onClick={handleSubmit}>
        Submit Answers
      </Button>
    </div>
  );
};

export default QuizTaker;
