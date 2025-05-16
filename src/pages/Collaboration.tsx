import React, { useState } from "react";
import { Input, Button, List, Space } from "antd";
import Chat from "../components/Chat/Chat";
import styles from "./Collaboration.module.css";

const Collaboration: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>(["Alice", "Bob"]);
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = () => {
    if (!newParticipant.trim()) return;
    setParticipants((prev) => [...prev, newParticipant.trim()]);
    setNewParticipant("");
  };

  return (
    <div className={styles.collabContainer}>
      <div className={styles.participantsSection}>
        <h2>Collaboration</h2>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Participant name"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
          <Button onClick={handleAddParticipant} type="primary">
            Add
          </Button>
        </Space>
        <List
          size="small"
          header={<strong>Participants</strong>}
          bordered
          dataSource={participants}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
      <div className={styles.chatSection}>
        <h2>Chat</h2>
        <Chat />
      </div>
    </div>
  );
};

export default Collaboration;
