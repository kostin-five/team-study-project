import React, { useState } from "react";
import { Collapse, Input, Button, Space, message } from "antd";

const { Panel } = Collapse;

interface TestTask {
  question: string;
  answer: string;
}

interface Lesson {
  id: number;
  title: string;
  tasks?: TestTask[]; // test tasks for this lesson
}

const ToolsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]); // list of lessons
  const [newLessonTitle, setNewLessonTitle] = useState(""); // new lesson title input
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null); // which lesson is in "add/edit test" mode
  const [takingLessonId, setTakingLessonId] = useState<number | null>(null); // which lesson is in "take test" mode
  const [newQuestion, setNewQuestion] = useState(""); // new test question input
  const [newAnswer, setNewAnswer] = useState(""); // new test answer input
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // answers provided by user when taking test

  // Track next lesson ID for unique identification
  const [nextLessonId, setNextLessonId] = useState(1);

  // Add a new lesson to the list
  const addLesson = () => {
    if (!newLessonTitle.trim()) {
      return; // don't add empty titles
    }
    const newLesson: Lesson = {
      id: nextLessonId,
      title: newLessonTitle.trim(),
      tasks: undefined,
    };
    setLessons((prev) => [...prev, newLesson]);
    setNextLessonId((prev) => prev + 1);
    setNewLessonTitle(""); // clear input
  };

  // Start creating a test for a lesson
  const startEditingTest = (lessonId: number) => {
    setEditingLessonId(lessonId);
    setTakingLessonId(null); // if was taking any test, cancel it
    setNewQuestion("");
    setNewAnswer("");
  };

  // Add a task (question & answer) to the test of the lesson being edited
  const addTestTask = (lessonId: number) => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      message.warning("Введите вопрос и ответ");
      return;
    }
    setLessons((prev) =>
      prev.map((lesson) => {
        if (lesson.id === lessonId) {
          const existingTasks = lesson.tasks ? [...lesson.tasks] : [];
          existingTasks.push({
            question: newQuestion.trim(),
            answer: newAnswer.trim(),
          });
          return { ...lesson, tasks: existingTasks };
        }
        return lesson;
      })
    );
    // Clear question/answer inputs for next entry
    setNewQuestion("");
    setNewAnswer("");
  };

  // Finish editing test (close the editing UI)
  const finishEditingTest = () => {
    setEditingLessonId(null);
    // We could show a message or animation here indicating the test is saved
    message.success("Тест сохранён");
  };

  // Start taking a test for a lesson
  const startTakingTest = (lessonId: number) => {
    setTakingLessonId(lessonId);
    setEditingLessonId(null); // cancel any editing mode
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson && lesson.tasks) {
      // Initialize an answers array with empty strings for each task
      setUserAnswers(Array(lesson.tasks.length).fill(""));
    } else {
      setUserAnswers([]);
    }
  };

  // Handle answering input change
  const onAnswerChange = (taskIndex: number, value: string) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[taskIndex] = value;
      return newAnswers;
    });
  };

  // Submit answers for the test
  const submitTest = (lessonId: number) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson || !lesson.tasks) {
      return;
    }
    // Calculate score
    let correctCount = 0;
    lesson.tasks.forEach((task, index) => {
      if (
        userAnswers[index] &&
        task.answer.toLowerCase().trim() ===
          userAnswers[index].toLowerCase().trim()
      ) {
        correctCount++;
      }
    });
    const total = lesson.tasks.length;
    message.info(
      `Вы правильно ответили на ${correctCount} из ${total} заданий.`
    );
    // Exit test-taking mode
    setTakingLessonId(null);
    setUserAnswers([]);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Уроки</h2>
      {/* Add Lesson input and button */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Название урока"
          value={newLessonTitle}
          onChange={(e) => setNewLessonTitle(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={addLesson}>
          Добавить урок
        </Button>
      </Space>

      {/* List of lessons with collapsible panels for details/tests */}
      <Collapse accordion>
        {lessons.map((lesson) => (
          <Panel header={lesson.title} key={lesson.id}>
            {/* If currently adding/editing test for this lesson */}
            {editingLessonId === lesson.id ? (
              <div style={{ marginBottom: 16 }}>
                <h4>Создание теста для урока</h4>
                {/* Form to add a new question-answer pair */}
                <Input
                  placeholder="Вопрос"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <Input
                  placeholder="Ответ"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <Button
                  type="dashed"
                  onClick={() => addTestTask(lesson.id)}
                  style={{ marginBottom: 12 }}
                >
                  Добавить задание
                </Button>
                {/* List existing tasks/questions if any */}
                {lesson.tasks && lesson.tasks.length > 0 && (
                  <ul>
                    {lesson.tasks.map((task, idx) => (
                      <li key={idx}>
                        {task.question} – <em>{task.answer}</em>
                      </li>
                    ))}
                  </ul>
                )}
                <div>
                  <Button type="primary" onClick={finishEditingTest}>
                    Готово
                  </Button>
                </div>
              </div>
            ) : takingLessonId === lesson.id ? (
              // If currently taking the test for this lesson
              <div style={{ marginBottom: 16 }}>
                <h4>Тест: {lesson.title}</h4>
                {lesson.tasks && lesson.tasks.length > 0 ? (
                  <div>
                    {lesson.tasks.map((task, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div>
                          <strong>Вопрос {idx + 1}:</strong> {task.question}
                        </div>
                        <Input
                          placeholder="Ваш ответ"
                          value={userAnswers[idx] || ""}
                          onChange={(e) => onAnswerChange(idx, e.target.value)}
                        />
                      </div>
                    ))}
                    <Button
                      type="primary"
                      onClick={() => submitTest(lesson.id)}
                    >
                      Отправить ответы
                    </Button>
                  </div>
                ) : (
                  <p>Тест отсутствует для этого урока.</p>
                )}
              </div>
            ) : (
              // Default view for a lesson (no active edit/take modes)
              <div>
                {lesson.tasks && lesson.tasks.length > 0 ? (
                  <p>Тест: {lesson.tasks.length} заданий</p>
                ) : (
                  <p>Тест не создан</p>
                )}
                {/* Action buttons */}
                <div>
                  {lesson.tasks && lesson.tasks.length > 0 ? (
                    <>
                      <Button
                        onClick={() => startEditingTest(lesson.id)}
                        style={{ marginRight: 8 }}
                      >
                        Изменить тест
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => startTakingTest(lesson.id)}
                      >
                        Пройти тест
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => startEditingTest(lesson.id)}
                    >
                      Создать тест
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default ToolsPage;
