import React, { useState } from "react";
import dayjs from "dayjs";
import { Input, Button } from "antd";
import styles from "./Chat.module.css";

interface Message {
  user: string;
  text: string;
  time: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Get user name from profile (localStorage)
    const profileData = localStorage.getItem("profile");
    const profile = profileData ? JSON.parse(profileData) : {};
    const userName = profile.name || "User";
    const time = dayjs().format("HH:mm");
    const message: Message = { user: userName, text: newMessage, time };
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={styles.message}>
            <span className={styles.messageUser}>{msg.user}</span>
            <span className={styles.messageTime}>{msg.time}</span>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className={styles.inputSection}>
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onPressEnter={(e) => {
            e.preventDefault();
            handleSend();
          }}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;