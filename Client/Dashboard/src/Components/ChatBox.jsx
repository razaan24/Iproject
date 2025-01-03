import React, { useState } from "react";
import { BaseUrl } from "../Api/BaseUrl";
import axios from "axios";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Send message to backend and get response
  async function sendMessage() {
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput(""); // Clear input field after sending

    setChatLoading(true); // Indicate loading state
    try {
      const { data } = await axios.post(`${BaseUrl}/AI`, {
        message: chatInput,
      });

      // Check if 'text' is part of the response object
      const botMessage = {
        text: data.text || "Sorry, no response from AI.",
        sender: "AI",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Error: Unable to get a response. Try again later.",
          sender: "AI",
        },
      ]);
    } finally {
      setChatLoading(false); // Reset loading state
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Bubble Icon */}
      <div
        onClick={toggleChat}
        className={`cursor-pointer w-14 h-14 rounded-full bg-black flex items-center justify-center text-white transition-all ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        {isOpen ? (
          <span className="text-xl font-bold">AI</span>
        ) : (
          <span className="text-xl font-bold">AI</span>
        )}
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white border rounded-lg shadow-lg p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === "You" ? "bg-black text-white" : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* Loading Spinner */}
            {chatLoading && (
              <div className="text-center mt-4 text-black">AI is typing...</div>
            )}
          </div>

          {/* Input Field and Send Button */}
          <div className="flex">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message"
              className="flex-1 p-2 border rounded-l-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && chatInput.trim()) {
                  sendMessage(); // Send message on Enter
                }
              }}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded-r-lg"
              onClick={sendMessage} // Send message on button click
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
