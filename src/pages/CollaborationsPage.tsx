import React, { useState, useRef } from "react";
import { Row, Col, Input, Button } from "antd";
// Import CSS module for chat styling
import styles from "../styles/Collaborations.module.css";

interface User {
  id: number;
  name: string;
}
interface Message {
  id: number;
  userId: number;
  userName: string;
  text: string;
}

const CollaborationsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // list of users
  const [messages, setMessages] = useState<Message[]>([]); // chat messages
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // currently active user
  const [newUserName, setNewUserName] = useState(""); // input for new user name
  const [newMessage, setNewMessage] = useState(""); // input for new chat message

  // Refs to generate unique IDs
  const nextUserId = useRef(1);
  const nextMessageId = useRef(1);

  // Add a new user to the collaboration
  const addUser = () => {
    const name = newUserName.trim();
    if (!name) return;
    const user: User = { id: nextUserId.current, name };
    nextUserId.current += 1;
    setUsers((prev) => [...prev, user]);
    setNewUserName("");
    // If this is the first user, set as current active user
    if (currentUserId === null) {
      setCurrentUserId(user.id);
    }
  };

  // Send a new message as the current user
  const sendMessage = () => {
    if (currentUserId === null || !newMessage.trim()) {
      return; // no user selected or message is empty
    }
    const sender = users.find((u) => u.id === currentUserId);
    if (!sender) return;
    const msg: Message = {
      id: nextMessageId.current,
      userId: sender.id,
      userName: sender.name,
      text: newMessage.trim(),
    };
    nextMessageId.current += 1;
    setMessages((prev) => [...prev, msg]);
    setNewMessage(""); // clear input field
  };

  // Handle pressing Enter in message input (to send)
  const onMessageKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Коллаборации</h2>
      <Row gutter={16}>
        {/* User list & add user section */}
        <Col xs={24} md={8}>
          <div className={styles.userList}>
            <h3>Пользователи</h3>
            {users.map((user) => (
              <div
                key={user.id}
                className={`${styles.userItem} ${
                  currentUserId === user.id ? styles.currentUser : ""
                }`}
                onClick={() => setCurrentUserId(user.id)}
              >
                {user.name}
              </div>
            ))}
            {/* Add user form */}
            <Input
              placeholder="Имя пользователя"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              onPressEnter={addUser}
              style={{ marginTop: 8 }}
            />
            <Button type="primary" onClick={addUser} style={{ marginTop: 4 }}>
              Добавить
            </Button>
          </div>
        </Col>

        {/* Chat messages section */}
        <Col xs={24} md={16}>
          <div className={styles.chatWindow}>
            <h3>Чат</h3>
            <div className={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${
                    msg.userId === currentUserId ? styles.mine : ""
                  }`}
                >
                  <span className={styles.messageAuthor}>{msg.userName}:</span>{" "}
                  {msg.text}
                </div>
              ))}
            </div>
            {/* New message input */}
            {users.length === 0 ? (
              <p>
                <em>Сначала добавьте пользователя для начала чата.</em>
              </p>
            ) : (
              <div className={styles.newMessage}>
                <Input
                  placeholder="Сообщение"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={onMessageKeyPress}
                  style={{ width: "80%", marginRight: "4px" }}
                  disabled={currentUserId === null}
                />
                <Button
                  type="primary"
                  onClick={sendMessage}
                  disabled={currentUserId === null}
                >
                  Отправить
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CollaborationsPage;
