
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Message from './Message';
import LoadingSpinner from './LoadingSpinner';
import { LOGO_URL } from '../constants';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, error, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full p-4 max-w-4xl mx-auto w-full">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start space-x-4">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                 <img src={LOGO_URL} alt="Mwalimu AI is thinking" className="w-5 h-5" />
               </div>
              <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-3">
                <LoadingSpinner />
                <span className="text-slate-400 italic">Mwalimu AI is thinking...</span>
              </div>
            </div>
          )}
          {error && <p className="text-red-400 text-center">{error}</p>}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-2 sticky bottom-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
            placeholder="Andika swali lako hapa... (Type your question here...)"
            className="flex-1 bg-transparent p-2 text-slate-200 resize-none max-h-40 focus:outline-none placeholder-slate-500"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-amber-500 text-slate-900 font-semibold rounded-lg p-2 h-10 w-10 flex items-center justify-center transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-amber-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
