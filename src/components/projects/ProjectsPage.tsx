import React, { useState, useEffect } from "react";
import { Tabs, Modal, Input, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import type { Task, TasksData } from "../../types";
import {
  loadTasksData,
  saveTasksData,
  getNextTaskId,
  addTaskCompletion,
} from "../../utils/storage";
import KanbanBoard from "./KanbanBoard";
import CalendarView from "./CalendarView";

const ProjectsPage: React.FC = () => {
  const [tasksData, setTasksData] = useState<TasksData>({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [activeTab, setActiveTab] = useState<string>("board");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDesc, setNewTaskDesc] = useState<string>("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Dayjs | null>(null);
  const [newTaskColumn, setNewTaskColumn] = useState<
    "todo" | "inProgress" | "done"
  >("todo");

  useEffect(() => {
    try {
      const stored = loadTasksData();
      if (
        stored &&
        typeof stored === "object" &&
        "todo" in stored &&
        "inProgress" in stored &&
        "done" in stored
      ) {
        setTasksData(stored);
      } else {
        setTasksData({ todo: [], inProgress: [], done: [] });
      }
    } catch {
      setTasksData({ todo: [], inProgress: [], done: [] });
    }
  }, []);

  useEffect(() => {
    try {
      saveTasksData(tasksData);
    } catch (e) {
      console.error("Ошибка сохранения задач:", e);
    }
  }, [tasksData]);

  const openAddTaskModal = (column: "todo" | "inProgress" | "done") => {
    setNewTaskColumn(column);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskDueDate(null);
    setModalVisible(true);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !newTaskDueDate) {
      alert("Введите название задачи и срок выполнения.");
      return;
    }

    const newTask: Task = {
      id: getNextTaskId(),
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim(),
      dueDate: newTaskDueDate.endOf("day").valueOf(),
      status: newTaskColumn,
    };

    const updated = { ...tasksData };
    updated[newTaskColumn] = [...updated[newTaskColumn], newTask];
    setTasksData(updated);

    if (newTaskColumn === "done") {
      addTaskCompletion();
    }
    setModalVisible(false);
  };

  return (
    <div>
      <h2>Проекты</h2>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "board",
            label: "Доска задач",
            children: (
              <KanbanBoard
                tasksData={tasksData}
                setTasksData={setTasksData}
                openAddTaskModal={openAddTaskModal}
              />
            ),
          },
          {
            key: "calendar",
            label: "Календарь",
            children: <CalendarView tasksData={tasksData} />,
          },
        ]}
      />

      <Modal
        title="Новая задача"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddTask}
        okText="Добавить"
        cancelText="Отмена"
      >
        <div style={{ marginBottom: "8px" }}>
          <label>Заголовок:</label>
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Описание:</label>
          <Input.TextArea
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            rows={3}
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Дедлайн:</label>
          <DatePicker
            value={newTaskDueDate}
            onChange={setNewTaskDueDate}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
