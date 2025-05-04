import { useState } from "react";
import { askGemini } from "./gemini";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const reply = await askGemini(input);
    const botMsg = { sender: "ImpactBot", text: reply };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f7fa",
      fontFamily: "Poppins, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "600px",
        height: "85vh",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        border: "2px solid #11244A"
      }}>
        <h2 style={{
          marginBottom: "1rem",
          textAlign: "center",
          color: "#11244A"
        }}>
          💬 ImpactBot — TIU Impact Hub Assistant
        </h2>

        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#f0f4f8",
          borderRadius: "12px",
          marginBottom: "1rem",
          border: "1px solid #ccc"
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              marginBottom: "0.75rem",
              textAlign: msg.sender === "You" ? "right" : "left"
            }}>
              <span style={{
                display: "inline-block",
                padding: "0.75rem",
                borderRadius: "16px",
                backgroundColor: msg.sender === "You" ? "#11244A" : "#F9C84B",
                color: msg.sender === "You" ? "#fff" : "#000",
                maxWidth: "80%"
              }}>
                <strong>{msg.sender}:</strong><br />{msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask me anything about TIU Impact Hub..."
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              backgroundColor: "#11244A",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
