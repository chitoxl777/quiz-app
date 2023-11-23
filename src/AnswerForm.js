// AnswerForm.js
import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AnswerForm = ({ answer, onAnswerChange }) => (
  <div className="container create-add-quiz" fluid>
    <Form>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label column sm="3">
          Answer Text:
        </Form.Label>
        <Col sm="7">
          <Form.Control
            type="text"
            value={answer.text}
            onChange={(e) => onAnswerChange("text", e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label column sm="3">
          Is Correct:
        </Form.Label>
        <Col sm="1">
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                checked={answer.isCorrect}
                onChange={(e) => onAnswerChange("isCorrect", e.target.checked)}
              />
            </div>
          ))}
        </Col>
      </Form.Group>
    </Form>
  </div>
);

export default AnswerForm;
