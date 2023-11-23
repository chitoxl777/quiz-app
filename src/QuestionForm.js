// QuestionForm.js
import React from "react";
import AnswerForm from "./AnswerForm";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const QuestionForm = ({
  question,
  onQuestionChange,
  onAnswerChange,
  onAddAnswer,
}) => (
  <div className="container create-add-quiz" fluid>
    <Form>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label column sm="3">
          Question Text:
        </Form.Label>
        <Col sm="7">
          <Form.Control
            type="text"
            value={question.text}
            onChange={(e) => onQuestionChange("text", e.target.value)}
          />
        </Col>
      </Form.Group>
    </Form>

    <h4>Answers</h4>
    {question.answers.map((answer, answerIndex) => (
      <AnswerForm
        key={answerIndex}
        answer={answer}
        onAnswerChange={(field, value) =>
          onAnswerChange(answerIndex, field, value)
        }
      />
    ))}
    <Button variant="primary" onClick={onAddAnswer}>
      Add Answer
    </Button>
  </div>
);

export default QuestionForm;
