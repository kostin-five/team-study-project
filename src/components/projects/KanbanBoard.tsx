import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Task, TasksData } from "../../types";
import { addTaskCompletion } from "../../utils/storage";
import "./KanbanBoard.css"; // подключаем стили

const columnConfig = {
  todo: { title: "Запланировано", color: "#fff9e6", taskColor: "#fff3cd" },
  inProgress: { title: "В работе", color: "#edf7f9", taskColor: "#d1ecf1" },
  done: { title: "Готово", color: "#eff5ef", taskColor: "#d4edda" },
};

interface KanbanBoardProps {
  tasksData: TasksData;
  setTasksData: React.Dispatch<React.SetStateAction<TasksData>>;
  openAddTaskModal: (column: "todo" | "inProgress" | "done") => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasksData,
  setTasksData,
  openAddTaskModal,
}) => {
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId as keyof TasksData;
    const destCol = destination.droppableId as keyof TasksData;

    if (sourceCol === destCol) {
      const newTasks = Array.from(tasksData[sourceCol]);
      const [moved] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, moved);
      setTasksData((prev) => ({ ...prev, [sourceCol]: newTasks }));
    } else {
      const sourceTasks = Array.from(tasksData[sourceCol]);
      const [moved] = sourceTasks.splice(source.index, 1);
      moved.status = destCol;
      const destTasks = Array.from(tasksData[destCol]);
      destTasks.splice(destination.index, 0, moved);
      setTasksData((prev) => ({
        ...prev,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      }));
      if (destCol === "done" && sourceCol !== "done") {
        addTaskCompletion(moved.id);
      }
    }
  };

  const isDueSoon = (dueDate: number): boolean => {
    const now = Date.now();
    const diff = dueDate - now;
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  };

  const handleDelete = (taskId: string, col: keyof TasksData) => {
    setDeletingTaskId(taskId);
    setTimeout(() => {
      const updated = {
        ...tasksData,
        [col]: tasksData[col].filter((task) => task.id !== taskId),
      };
      setTasksData(updated);
      setDeletingTaskId(null);
    }, 300); // длительность анимации
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "8px",
        }}
      >
        {(Object.keys(columnConfig) as Array<keyof TasksData>).map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: columnConfig[col].color,
                  padding: "8px",
                  width: "300px",
                  minHeight: "400px",
                  borderRadius: "4px",
                }}
              >
                <h3 style={{ textAlign: "center" }}>
                  {columnConfig[col].title}
                </h3>

                {(tasksData[col] || []).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={
                          task.id === deletingTaskId
                            ? "fade-out-task"
                            : "task-container"
                        }
                        style={{
                          ...provided.draggableProps.style,
                          marginBottom: "8px",
                        }}
                      >
                        <Card
                          size="small"
                          title={task.title}
                          extra={
                            <Button
                              type="link"
                              size="small"
                              danger
                              onClick={() => handleDelete(task.id, col)}
                            >
                              Удалить
                            </Button>
                          }
                          style={{
                            background: columnConfig[col].taskColor,
                          }}
                        >
                          <p>{task.description}</p>
                          <p
                            style={{
                              color: isDueSoon(task.dueDate)
                                ? "red"
                                : "inherit",
                            }}
                          >
                            Дедлайн:{" "}
                            {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => openAddTaskModal(col)}
                >
                  Добавить задачу
                </Button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
