import React, { useEffect, useRef, useState } from "react";
import { Input, Button, List, Typography, Card } from "antd";

const { Text } = Typography;

interface Message {
  text: string;
  from: "me" | "server";
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://echo.websocket.org");

    ws.current.onopen = () => setConnected(true);

    ws.current.onmessage = (event) => {
      const isMine = event.data.startsWith("##MY##");
      const cleanText = event.data.replace("##MY##", "");
      setMessages((prev) => [
        ...prev,
        { text: cleanText, from: isMine ? "me" : "server" },
      ]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send("##MY##" + input);
      setInput("");
    }
  };

  return (
    <Card
      title="Чат"
      style={{
        maxWidth: 800,
        margin: "0 auto",
        boxShadow: "none",
        border: "none",
      }}
    >
      <List
        size="small"
        bordered
        locale={{ emptyText: null }}
        loading={!connected}
        dataSource={messages}
        renderItem={(item) => (
          <List.Item
            style={{
              justifyContent: item.from === "me" ? "flex-end" : "flex-start",
            }}
          >
            <Text type={item.from === "me" ? "success" : "secondary"}>
              {item.text}
            </Text>
          </List.Item>
        )}
        style={{ height: 300, overflowY: "auto", marginBottom: 16 }}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <Input
          style={{ flex: 1 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button type="primary" onClick={sendMessage}>
          Отправить
        </Button>
      </div>
    </Card>
  );
};

export default ChatPage;
