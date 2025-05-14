import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Input } from 'antd';
import { useProjects } from '../store/ProjectsContext';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, addTask } = useProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Проект не найден</div>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    form.validateFields().then(values => {
      addTask(project.id, { title: values.title, description: values.description });
      form.resetFields();
      setIsModalOpen(false);
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const columns = [
    { title: 'Название задачи', dataIndex: 'title', key: 'title' },
    { title: 'Описание', dataIndex: 'description', key: 'description' },
  ];

  return (
    <div>
      <Link to="/">← Назад к списку проектов</Link>
      <h2>Проект: {project.name}</h2>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Добавить задачу
      </Button>
      <Table dataSource={project.tasks} columns={columns} rowKey="id" />

      <Modal title="Добавить задачу" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="taskForm">
          <Form.Item
            name="title"
            label="Название задачи"
            rules={[{ required: true, message: 'Введите название задачи' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectPage;