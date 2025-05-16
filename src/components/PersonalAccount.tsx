import React, { useState, useEffect } from "react";
import { Input, Button, Select, Tag, message } from "antd";
import { loadUserName, saveUserName } from "../utils/storage";

const { Option } = Select;

const roleColors: Record<string, string> = {
  student: "blue",
  teacher: "green",
  manager: "purple",
};

const roleLabels: Record<string, string> = {
  student: "Студент",
  teacher: "Преподаватель",
  manager: "Менеджер",
};

const PersonalAccount: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [role, setRole] = useState<string>("student");
  const [editing, setEditing] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setName(parsed.name || "");
        setSurname(parsed.surname || "");
        setRole(parsed.role || "student");
        if (parsed.name && parsed.name.trim() !== "") {
          setEditing(false);
        }
      }
    } catch {
      setEditing(true);
    }
  }, []);

  const handleSave = () => {
    if (!name.trim()) {
      message.error("Имя обязательно для заполнения");
      return;
    }
    const userData = { name: name.trim(), surname: surname.trim(), role };
    localStorage.setItem("user", JSON.stringify(userData));
    message.success("Данные сохранены");
    setEditing(false);
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        fontSize: "17px",
        letterSpacing: "0.5px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>Личный кабинет</h2>

      <div style={{ marginBottom: "20px" }}>
        <strong style={{ display: "block", marginBottom: "6px" }}>Имя:</strong>
        {editing ? (
          <Input
            value={name}
            placeholder="Введите имя"
            onChange={(e) => setName(e.target.value)}
            onPressEnter={handleSave}
            style={{ maxWidth: 400 }}
            status={!name.trim() ? "error" : ""}
          />
        ) : (
          <div>{name}</div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong style={{ display: "block", marginBottom: "6px" }}>
          Фамилия:
        </strong>
        {editing ? (
          <Input
            value={surname}
            placeholder="Введите фамилию"
            onChange={(e) => setSurname(e.target.value)}
            onPressEnter={handleSave}
            style={{ maxWidth: 400 }}
          />
        ) : (
          <div>{surname}</div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong style={{ display: "block", marginBottom: "6px" }}>Роль:</strong>
        {editing ? (
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <Option value="student">Студент</Option>
            <Option value="teacher">Преподаватель</Option>
            <Option value="manager">Менеджер</Option>
          </Select>
        ) : (
          <Tag color={roleColors[role]}>{roleLabels[role]}</Tag>
        )}
      </div>

      <div>
        {editing ? (
          <Button type="primary" onClick={handleSave}>
            Сохранить
          </Button>
        ) : (
          <Button onClick={() => setEditing(true)}>Изменить</Button>
        )}
      </div>
    </div>
  );
};

export default PersonalAccount;
