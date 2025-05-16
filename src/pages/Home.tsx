import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useProjects } from "../store/ProjectsContext";

const Home: React.FC = () => {
  const { projects, addProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Открыть модальное окно создания проекта
  const showModal = () => setIsModalOpen(true);

  // Обработка подтверждения создания проекта
  const handleOk = () => {
    form.validateFields().then((values) => {
      addProject(values.name);
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // Колонки таблицы проектов
  const columns = [
    {
      title: "Название проекта",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество задач",
      dataIndex: "tasks",
      key: "tasks",
      render: (tasks: any[]) => tasks.length,
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: any) => (
        <Link to={`/project/${record.id}`}>Открыть</Link>
      ),
    },
  ];

  return (
    <div>
      {/* Кнопка создания нового проекта */}
      <Button className="my-button" onClick={showModal}>
        Создать проект
      </Button>

      {/* Таблица проектов */}
      <Table
        className="my-table"
        columns={columns}
        dataSource={projects}
        rowKey="id"
        locale={{
          emptyText: "Нет проектов",
        }} /* сообщение при отсутствии данных */
        style={{ marginTop: 16 }}
      />

      {/* Модальное окно для создания проекта */}
      <Modal
        title="Новый проект"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" name="projectForm">
          <Form.Item
            label="Название проекта"
            name="name"
            rules={[{ required: true, message: "Введите название проекта" }]}
          >
            <Input placeholder="Введите название проекта" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;