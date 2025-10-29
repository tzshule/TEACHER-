
import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import { LOGO_URL } from '../constants';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <img src={LOGO_URL} alt="Mwalimu AI Avatar" className="w-7 h-7" />
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-lg xl:max-w-2xl rounded-xl p-4 text-white ${
          isUser
            ? 'bg-amber-600 rounded-br-none'
            : 'bg-slate-800 rounded-bl-none border border-slate-700'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
        </div>
      )}
    </div>
  );
};

export default Message;
