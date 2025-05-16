import React, { useState } from "react";
import { useProjectContext } from "../context/ProjectsContext";
import { Select, Button, Modal, Input, message } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
// Import CSS module for styling
import styles from "../styles/Dashboard.module.css";

const { Option } = Select;

const DashboardPage: React.FC = () => {
  const { projects, addProject, addTask, moveTask } = useProjectContext();
  // Track currently selected project by id
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    projects.length > 0 ? projects[0].id : 0
  );
  // State for "Add Project" modal
  const [isProjectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>("");
  // State for "Add Task" modal
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>(""); // store as YYYY-MM-DD string

  // If no projects exist, prompt user to create one
  if (projects.length === 0) {
    return (
      <div>
        <h3>Нет проектов</h3>
        <Button type="primary" onClick={() => setProjectModalOpen(true)}>
          Добавить проект
        </Button>
        {/* Modal for creating a new project */}
        <Modal
          title="Новый проект"
          open={isProjectModalOpen}
          onOk={() => {
            if (!newProjectName.trim()) {
              message.warning("Введите название проекта");
              return;
            }
            addProject(newProjectName.trim());
            // Select the newly added project
            // setSelectedProjectId(
            //   projects.length > 0
            //     ? projects[projects.length - 1].id
            //     : nextProjectIdPlaceholder
            // );
            // (Note: nextProjectIdPlaceholder is conceptual; we'll reset selection properly after state update)
            setNewProjectName("");
            setProjectModalOpen(false);
          }}
          onCancel={() => {
            setProjectModalOpen(false);
            setNewProjectName("");
          }}
          okText="Создать"
          cancelText="Отмена"
        >
          <Input
            placeholder="Название проекта"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </Modal>
      </div>
    );
  }

  // Ensure selectedProjectId is valid (if a project was removed, adjust selection)
  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];
  if (selectedProjectId !== selectedProject.id) {
    setSelectedProjectId(selectedProject.id);
  }

  // Handle project selection change
  const onSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId);
  };

  // Prepare tasks by status for the selected project
  const tasksTodo = selectedProject.tasks.todo;
  const tasksInProgress = selectedProject.tasks.inProgress;
  const tasksDone = selectedProject.tasks.done;

  // Handle drag-and-drop end event for tasks
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return; // dropped outside any droppable area
    }
    const fromStatus = source.droppableId as "todo" | "inProgress" | "done";
    const toStatus = destination.droppableId as "todo" | "inProgress" | "done";
    const fromIndex = source.index;
    const toIndex = destination.index;
    // If position or status changed, update via context
    if (fromStatus !== toStatus || fromIndex !== toIndex) {
      moveTask(selectedProject.id, fromStatus, toStatus, fromIndex, toIndex);
    }
  };

  // Handle adding a new task (open modal)
  const openAddTaskModal = () => {
    setNewTaskTitle("");
    setNewTaskDate("");
    setTaskModalOpen(true);
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) {
      message.warning("Введите название задачи");
      return;
    }
    // Add task to current project (status defaults to "todo")
    addTask(selectedProject.id, newTaskTitle.trim(), newTaskDate || undefined);
    setTaskModalOpen(false);
    // Clear task fields
    setNewTaskTitle("");
    setNewTaskDate("");
    // (Optionally show a success message or animation)
    message.success("Задача добавлена");
  };

  return (
    <div>
      {/* Project selection and add project button */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Проект:</span>
        <Select
          value={selectedProject.id}
          onChange={(value: number) => onSelectProject(value)}
          style={{ width: 200, marginRight: 16 }}
        >
          {projects.map((project) => (
            <Option key={project.id} value={project.id}>
              {project.name}
            </Option>
          ))}
        </Select>
        <Button
          onClick={() => setProjectModalOpen(true)}
          style={{ marginRight: 8 }}
        >
          Добавить проект
        </Button>
        <Button type="primary" onClick={openAddTaskModal}>
          Добавить задачу
        </Button>
      </div>

      {/* Modal for adding a new project */}
      <Modal
        title="Новый проект"
        open={isProjectModalOpen}
        okText="Создать"
        cancelText="Отмена"
        onOk={() => {
          if (!newProjectName.trim()) {
            message.warning("Введите название проекта");
            return;
          }
          addProject(newProjectName.trim());
          // After adding, select the newly added project (which will be last in array)
          const newProjList = projects; // (projects state will update after this function call)
          // We schedule setting selection after state updates by using a callback
          setTimeout(() => {
            const latestProject = newProjList[newProjList.length - 1];
            if (latestProject) {
              setSelectedProjectId(latestProject.id);
            }
          });
          setNewProjectName("");
          setProjectModalOpen(false);
        }}
        onCancel={() => {
          setProjectModalOpen(false);
          setNewProjectName("");
        }}
      >
        <Input
          placeholder="Название проекта"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
      </Modal>

      {/* Modal for adding a new task */}
      <Modal
        title="Новая задача"
        open={isTaskModalOpen}
        okText="Добавить"
        cancelText="Отмена"
        onOk={handleCreateTask}
        onCancel={() => setTaskModalOpen(false)}
      >
        <Input
          placeholder="Название задачи"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Срок выполнения (ГГГГ-ММ-ДД)"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
        />
        {/* Note: For a real app, use DatePicker from AntD for date selection. 
             Here we accept date as text (YYYY-MM-DD) for simplicity. */}
      </Modal>

      {/* Kanban board: To Do, In Progress, Done columns with drag-and-drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {/* To Do Column */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className={`${styles.column} ${styles.todo}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className={styles.columnTitle}>Запланировано</h3>
                {tasksTodo.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`task-${task.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.title}
                        {task.dueDate && (
                          <div className={styles.taskDate}>
                            Дедлайн: {task.dueDate}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* In Progress Column */}
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                className={`${styles.column} ${styles.inProgress}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className={styles.columnTitle}>В процессе</h3>
                {tasksInProgress.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`task-${task.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.title}
                        {task.dueDate && (
                          <div className={styles.taskDate}>
                            Дедлайн: {task.dueDate}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* Done Column */}
          <Droppable droppableId="done">
            {(provided) => (
              <div
                className={`${styles.column} ${styles.done}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className={styles.columnTitle}>Выполнено</h3>
                {tasksDone.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`task-${task.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.title}
                        {task.dueDate && (
                          <div className={styles.taskDate}>
                            Дедлайн: {task.dueDate}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DashboardPage;
