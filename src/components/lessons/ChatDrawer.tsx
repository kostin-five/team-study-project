import React, { useState, useEffect, useRef } from "react";
import { Drawer, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface ChatMessage {
  text: string;
  time: number;
}

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages update or drawer opens
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    // Add user message
    const newMsg: ChatMessage = { text: trimmed, time: Date.now() };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    // No echo: simply add user message, no server echo response
  };

  return (
    <Drawer
      title="Чат"
      placement="right"
      width={300}
      open={open}
      onClose={onClose}
      bodyStyle={{ display: "flex", flexDirection: "column" }}
    >
      <div
        ref={containerRef}
        style={{ flex: 1, overflowY: "auto", paddingRight: "8px" }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: "right", marginBottom: "8px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#f0f0f0",
                borderRadius: "4px",
                padding: "4px 8px",
              }}
            >
              <span>{msg.text}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {new Date(msg.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "8px" }}>
        <Input
          placeholder="Введите сообщение..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={sendMessage}
          suffix={
            <Button type="text" icon={<SendOutlined />} onClick={sendMessage} />
          }
        />
      </div>
    </Drawer>
  );
};

export default ChatDrawer;
