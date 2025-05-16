import React, { useState, useEffect } from "react";
import { Button, Input, Radio, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { Lesson } from "../../types";
import { loadLessons, saveLessons, getNextLessonId } from "../../utils/storage";

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  // Fields for new lesson creation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);

  useEffect(() => {
    const storedLessons = loadLessons();
    setLessons(storedLessons);
  }, []);

  const handleAddLesson = () => {
    // Basic validation
    if (
      !title.trim() ||
      !question.trim() ||
      options.filter((opt) => opt.trim()).length < 2
    ) {
      alert(
        "Пожалуйста, заполните название, вопрос и минимум 2 варианта ответа."
      );
      return;
    }
    const newLesson: Lesson = {
      id: getNextLessonId(),
      title: title.trim(),
      description: description.trim(),
      test: {
        question: question.trim(),
        options: options.map((opt) => opt.trim()),
        correctIndex: correctIndex,
      },
    };
    const updatedLessons = [...lessons, newLesson];
    setLessons(updatedLessons);
    saveLessons(updatedLessons);
    // Reset form and hide it
    setTitle("");
    setDescription("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setShowForm(false);
  };

  return (
    <div>
      <h2>Уроки</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowForm((prev) => !prev)}
        style={{ marginBottom: "16px" }}
      >
        {showForm ? "Отменить" : "Добавить урок"}
      </Button>
      {showForm && (
        <div
          style={{
            marginBottom: "24px",
            maxWidth: "600px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Новый урок</h3>
          <div style={{ marginBottom: "8px" }}>
            <label>Название урока:</label>
            <br />
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>Описание:</label>
            <br />
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>Вопрос:</label>
            <br />
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>Варианты ответа:</label>
            {options.map((opt, index) => (
              <div key={index} style={{ marginLeft: "16px", marginTop: "4px" }}>
                <span>{index + 1}.</span>{" "}
                <Input
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[index] = e.target.value;
                    setOptions(newOpts);
                  }}
                  style={{ width: "80%" }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Правильный ответ:</label>
            <br />
            <Radio.Group
              onChange={(e) => setCorrectIndex(e.target.value)}
              value={correctIndex}
            >
              {options.map((_, index) => (
                <Radio key={index} value={index}>
                  Вариант {index + 1}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <Button type="primary" onClick={handleAddLesson}>
            Сохранить урок
          </Button>
        </div>
      )}
      {lessons.length === 0 ? (
        <p>Уроков пока нет.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={lessons}
          renderItem={(lesson) => (
            <List.Item
              actions={[<Link to={`/lessons/${lesson.id}`}>Открыть</Link>]}
            >
              <List.Item.Meta
                title={lesson.title}
                description={lesson.description}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default LessonsPage;
