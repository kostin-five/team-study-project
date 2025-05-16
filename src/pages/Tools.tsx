import React, { useState } from "react";
import { Input, Button, message } from "antd";
import styles from "./Tools.module.css";

const Tools: React.FC = () => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const saveLesson = () => {
    // Save lesson (for demo, just show a message)
    message.success("Lesson saved");
    setLessonTitle("");
    setLessonContent("");
  };

  const checkAnswer = () => {
    if (answer.trim() === "4") {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect, try again.");
    }
  };

  return (
    <div className={styles.toolsContainer}>
      <div className={styles.editorSection}>
        <h2>Lesson Editor</h2>
        <Input
          placeholder="Lesson title"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          style={{ marginBottom: "8px" }}
        />
        <Input.TextArea
          placeholder="Lesson content"
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
          rows={4}
          style={{ marginBottom: "8px" }}
        />
        <Button type="primary" onClick={saveLesson}>
          Save Lesson
        </Button>
      </div>
      <div className={styles.testSection}>
        <h2>Test</h2>
        <p>
          <strong>Question:</strong> What is 2 + 2?
        </p>
        <Input
          placeholder="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ width: "200px", marginBottom: "8px" }}
        />
        <Button type="primary" onClick={checkAnswer}>
          Submit
        </Button>
        {feedback && (
          <p>
            <strong>Result:</strong> {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default Tools;
