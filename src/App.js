import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bot, RefreshCw } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // URL encode the message for the path segment
      const encodedMsg = encodeURIComponent(text);
      // Construct the API URL
      const apiUrl = `https://ec2-13-48-133-166.eu-north-1.compute.amazonaws.com:8443/${encodedMsg}`;

      const response = await axios.get(apiUrl);

      // Determine how the API returns data. Assuming it's simple text for now,
      // but if it's JSON, adjust accordingly (e.g., response.data.message)
      const botResponseData = response.data;
      console.log(botResponseData);
      
      const botMessageContent = typeof botResponseData === 'string'
        ? botResponseData
        : JSON.stringify(botResponseData, null, 2);

      const botMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: botMessageContent,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('API Error:', err);
      setError('An error occurred while communicating with the API. This might be due to a Mixed Content policy if the app is served over HTTPS.');

      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please try again later.`,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
            <Bot size={20} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
            ChatGPT Clone
          </h1>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto w-full relative">
        {messages.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="h-16 w-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
              <Bot size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-3">How can I help you today?</h2>
            <p className="text-gray-400 max-w-sm">
              Type a message below to start chatting with the Gemini-powered AI model.
            </p>
          </div>
        ) : (
          <div className="w-full h-full">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="py-8 bg-gray-800/50 border-b border-gray-800 flex justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="w-full max-w-4xl mx-auto pt-4 relative">
        <div className="bg-gradient-to-t from-gray-900 via-gray-900 h-24 absolute bottom-0 left-0 right-0 pointer-events-none" />
        <div className="relative z-10">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
