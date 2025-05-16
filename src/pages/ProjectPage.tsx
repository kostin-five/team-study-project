import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Button, Modal, Form, Input } from "antd";
import { useProjects } from "../store/ProjectsContext";

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, addTask } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Проект не найден</div>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    form.validateFields().then((values) => {
      addTask(project.id, {
        title: values.title,
        description: values.description,
      });
      form.resetFields();
      setIsModalOpen(false);
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // Колонки таблицы задач проекта
  const columns = [
    {
      title: "Название задачи",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div>
      {/* Ссылка для возврата к списку проектов */}
      <p>
        <Link to="/">← Назад к списку проектов</Link>
      </p>

      <h2>Проект: {project.name}</h2>

      {/* Кнопка для добавления новой задачи */}
      <Button
        className="my-button"
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Добавить задачу
      </Button>

      {/* Таблица задач текущего проекта */}
      <Table
        columns={columns}
        dataSource={project.tasks}
        rowKey="id"
        locale={{ emptyText: "Нет задач" }}
      />

      {/* Модальное окно для добавления задачи */}
      <Modal
        title="Новая задача"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" name="taskForm">
          <Form.Item
            label="Название задачи"
            name="title"
            rules={[{ required: true, message: "Введите название задачи" }]}
          >
            <Input placeholder="Введите название задачи" />
          </Form.Item>
          <Form.Item
            label="Описание"
            name="description"
            rules={[{ required: true, message: "Введите описание задачи" }]}
          >
            <Input placeholder="Введите описание (опционально)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectPage;
