// QuizDetails.js
import React from "react";
import { Link } from "react-router-dom";

const QuizDetails = ({ quiz }) => (
  <div>
    <h2>Quiz Details: {quiz.title}</h2>
    {/* Display details of the selected quiz */}
    <p>Title: {quiz.title}</p>
    <p>Description: {quiz.description}</p>
    <p>Final Score: {quiz.finalScore}</p>
    <p>YouTube URL: {quiz.youtubeUrl}</p>
    {/* ... (display other details) */}
    <Link to="/">Go Back to Quizzes</Link>
  </div>
);

export default QuizDetails;
