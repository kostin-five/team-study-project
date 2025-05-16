import React, { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Button, Radio, Alert } from "antd";
import type { Lesson } from "../../types";
import { loadLessons, addTestResult } from "../../utils/storage";
import ChatDrawer from "./ChatDrawer";

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessons: Lesson[] = loadLessons();
  const lesson = lessons.find((l) => l.id === id);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  if (!lesson) {
    // Redirect back if lesson not found
    return <Navigate to="/lessons" replace />;
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === lesson.test.correctIndex;
    setResult(isCorrect);
    addTestResult(lesson.id);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Button onClick={() => navigate("/lessons")}>Назад</Button>
        <Button onClick={() => setChatOpen(true)}>Чат</Button>
      </div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <h3>Тест</h3>
      <p>
        <strong>{lesson.test.question}</strong>
      </p>
      <Radio.Group
        onChange={(e) => setSelectedAnswer(e.target.value)}
        value={selectedAnswer}
      >
        {lesson.test.options.map((opt, index) => (
          <Radio key={index} value={index}>
            {opt}
          </Radio>
        ))}
      </Radio.Group>
      <div style={{ marginTop: "16px" }}>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
        >
          Отправить
        </Button>
      </div>
      {result !== null && (
        <div style={{ marginTop: "16px", maxWidth: "300px" }}>
          {result ? (
            <Alert message="Верно!" type="success" showIcon />
          ) : (
            <Alert
              message={`Неверно. Правильный ответ: ${
                lesson.test.options[lesson.test.correctIndex]
              }`}
              type="error"
              showIcon
            />
          )}
        </div>
      )}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default LessonDetail;
