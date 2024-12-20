import React, { useState, useEffect } from 'react';

import './chat.css';
import { GoogleGenerativeAI } from "@google/generative-ai";


const ChatBotLogic = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "introMsg", text: "Hi there! I'm FitBot, your AI assistant for fitness and daily tasks." },
  ]); // Initial message
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const hitRequest = async (msg) => {
    if (!msg) return;

    setIsLoading(true); // Set loading indicator to true
    const genAI = new GoogleGenerativeAI('AIzaSyB-yowSsPAcoJRDP6-EjcbIQgYctSwjxIQ');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages);
    setisResponseScreen(true);
    setMessage("");
    setIsLoading(false); // Set loading indicator to false after receiving response
    console.log(result.response.text());
  };

  const generateResponse = () => {
    hitRequest(message); // Call hitRequest function with user message
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = { type: "userMsg", text: message };
    setMessages([...messages, newMessage]); // Add user message immediately
    generateResponse(); // Generate response asynchronously
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const renderLoading = () => {
    return (
      <div className="loading">
        {/* Add your loading indicator here, e.g., spinner, text */}
        Loading...
      </div>
    );
  };

  return (
    <div className='hi'>
      <div className='container'>
        <div className='img'></div>
        <div className="chatbot-container">
          <div className="chat-area">
            {messages?.map((msg, index) => (
              <div key={index} className={msg.type}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="loading-message">
                {renderLoading()}
              </div>
            )}
          </div>
          <div className="user-input">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleInputChange}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <div className='botbody'>
          <h1 className='h1'>MyBot</h1>
          <p className='p'>Introducing FitBot - your personal AI assistant that can help you with all your fitness and day-to-day queries. With advanced machine learning algorithms, FotBot provides accurate and personalized solutions in real-time. Whether you need workout routines, healthy eating tips, or guidance on managing your daily schedule, FitBot has got you covered. Interact with FotBot through a simple and user-friendly interface, and customize your experience by setting your goals and preferences. FitBot is here to make your life easier, healthier, and more balanced.</p>
          <h3 className='h3'>
            Excuses don't burn calories.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ChatBotLogic;
