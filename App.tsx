
import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import { getAnswer } from './services/geminiService';
import { ChatMessage, MessageRole } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: MessageRole.MODEL,
      content: "Habari! Karibu Mwalimu AI. Una swali gani leo?\n\nHello! Welcome to Mwalimu AI. What is your question today?",
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (question: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = { role: MessageRole.USER, content: question };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const answer = await getAnswer(question);
      const modelMessage: ChatMessage = { role: MessageRole.MODEL, content: answer };
      setMessages(prevMessages => [...prevMessages, modelMessage]);
    } catch (err) {
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
      const errorModelMessage: ChatMessage = { role: MessageRole.MODEL, content: errorMessage };
      setMessages(prevMessages => [...prevMessages, errorModelMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default App;
