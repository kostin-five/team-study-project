import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { useProjects } from "../store/ProjectsContext";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { projects, addProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
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

  const columns = [
    { title: "Название проекта", dataIndex: "name", key: "name" },
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
        <Link to={`/projects/${record.id}`}>Открыть</Link>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Создать проект
      </Button>
      <Table dataSource={projects} columns={columns} rowKey="id" />

      <Modal
        title="Создать проект"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="projectForm">
          <Form.Item
            name="name"
            label="Название проекта"
            rules={[{ required: true, message: "Введите название проекта" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
