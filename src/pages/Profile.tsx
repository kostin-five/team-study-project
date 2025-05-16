import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";

interface ProfileData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm<ProfileData>();

  // При монтировании загружаем сохранённые данные профиля из localStorage
  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      form.setFieldsValue(JSON.parse(stored));
    }
  }, [form]);

  const onFinish = (values: ProfileData) => {
    // Сохраняем данные профиля в localStorage
    localStorage.setItem("profile", JSON.stringify(values));
  };

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <Form
        form={form}
        layout="vertical"
        name="profileForm"
        onFinish={onFinish}
      >
        <Form.Item label="Имя" name="name">
          <Input placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="Ваш email" />
        </Form.Item>
        <Form.Item>
          <Button className="my-button" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
