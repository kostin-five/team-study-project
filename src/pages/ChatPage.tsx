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
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Подключаем WebSocket к echo-серверу
    ws.current = new WebSocket("wss://echo.websocket.org");
    ws.current.onmessage = (event) => {
      const isMine = event.data.startsWith("##MY##");
      const cleanText = event.data.replace("##MY##", "");
      // Добавляем новое сообщение (отправителя определяем по префиксу)
      setMessages((prev) => [
        ...prev,
        { text: cleanText, from: isMine ? "me" : "server" },
      ]);
    };
    // При размонтировании закрываем соединение
    return () => {
      ws.current?.close();
    };
  }, []);

  // Отправка сообщения по WebSocket
  const sendMessage = () => {
    if (
      input.trim() &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      ws.current.send("##MY##" + input);
      setInput("");
    }
  };

  return (
    <Card title="Чат" style={{ maxWidth: 600 }}>
      {/* Список сообщений */}
      <List
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            {/* Сообщение отображаем синим цветом */}
            <Text style={{ color: "#1890ff" }}>{item.text}</Text>
          </List.Item>
        )}
        style={{ height: 300, overflowY: "auto", marginBottom: 16 }}
      />
      {/* Поле ввода нового сообщения */}
      <Input
        placeholder="Введите сообщение..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={sendMessage}
        style={{ marginBottom: 8 }}
      />
      {/* Кнопка отправки сообщения */}
      <Button className="my-button" onClick={sendMessage}>
        Отправить
      </Button>
    </Card>
  );
};

export default ChatPage;