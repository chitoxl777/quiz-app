import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import QuizTaker from "./Quiz";
import "./App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./images/question.jpeg";
import header from "./images/Beige Leaf Simple Quote Email Header.png";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

const initialQuizState = {
  title: "",
  description: "",
  finalScore: 0,
  youtubeUrl: "",
  questions: [],
};

const QuizApp = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(initialQuizState);
  const [editing, setEditing] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [takingQuiz, setTakingQuiz] = useState(false);

  const handleInputChange = (name, value) => {
    setCurrentQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setCurrentQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      updatedQuestions[index][field] = value;
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    setCurrentQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      const updatedAnswers = [...updatedQuestions[questionIndex].answers];
      updatedAnswers[answerIndex][field] = value;
      updatedQuestions[questionIndex].answers = updatedAnswers;
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleAddQuestion = () => {
    setCurrentQuiz((prevQuiz) => {
      const updatedQuestions = [
        ...prevQuiz.questions,
        { text: newQuestion, answers: [] },
      ];
      return { ...prevQuiz, questions: updatedQuestions };
    });
    setNewQuestion("");
  };

  const handleAddAnswer = (questionIndex) => {
    setCurrentQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      updatedQuestions[questionIndex].answers.push({
        text: "",
        isCorrect: false,
      });
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleAddQuiz = () => {
    setQuizzes((prevQuizzes) => [
      ...prevQuizzes,
      { ...currentQuiz, id: Date.now() },
    ]);
    setCurrentQuiz(initialQuizState);
  };

  const handleEditQuiz = (quiz) => {
    setEditing(true);
    setCurrentQuiz(quiz);
  };

  const handleSaveQuiz = () => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === currentQuiz.id ? currentQuiz : quiz
      )
    );
    setEditing(false);
    setCurrentQuiz(initialQuizState);
  };

  const handleDeleteQuiz = (quizId) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz.id !== quizId)
    );
  };

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setTakingQuiz(true);
  };

  const handleQuizSubmit = (userAnswers) => {
    // implement scoring logic or any other actions based on user answers
    console.log("User Answers:", userAnswers);

    // Reset the quiz state after submitting
    setCurrentQuiz(initialQuizState);
    setTakingQuiz(false);
  };

  return (
    <div>
      <div className="header">
        <Image src={header} fluid className="img" />
        <div className="centered">
          <h1>Quizzes</h1>
        </div>
      </div>
      <div className="container-lg row1">
        <Row xs={1} md={2} lg={4} className="g-4">
          {quizzes.map((quiz) => (
            <Col key={quiz.id}>
              <Card style={{ width: "100%", height: "auto" }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title>
                    <h4>{quiz.title}</h4>
                  </Card.Title>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleEditQuiz(quiz)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteQuiz(quiz.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      Take Quiz
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="row2">
        {takingQuiz ? (
          <QuizTaker quiz={currentQuiz} onSubmit={handleQuizSubmit} />
        ) : (
          <div className="quiz-action">
            <h2>{editing ? "Edit Quiz" : "Create New Quiz"}</h2>
            {/* ... (code for quiz creation/editing) */}
          </div>
        )}
        <div className="container create-add-quiz" fluid>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label column sm="3">
                Title:
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  name="title"
                  value={currentQuiz.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="ex. Quiz 1"
                />
              </Col>
            </Form.Group>

            {editing ? (
              <Button variant="warning" onClick={handleSaveQuiz}>
                Save Quiz
              </Button>
            ) : (
              <Button variant="primary" onClick={handleAddQuiz}>
                Add Quiz
              </Button>
            )}
          </Form>
        </div>
        {/* Add other input fields for description, finalScore, youtubeUrl */}
        <h3>Questions</h3>
        {currentQuiz.questions.map((question, questionIndex) => (
          <QuestionForm
            key={questionIndex}
            question={question}
            onQuestionChange={(field, value) =>
              handleQuestionChange(questionIndex, field, value)
            }
            onAnswerChange={(answerIndex, field, value) =>
              handleAnswerChange(questionIndex, answerIndex, field, value)
            }
            onAddAnswer={() => handleAddAnswer(questionIndex)}
          />
        ))}
        <div className="container create-add-quiz" fluid>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label column sm="3">
                New Question:
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="ex. What is 1+1?"
                />
              </Col>
            </Form.Group>
            <Button variant="success" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
