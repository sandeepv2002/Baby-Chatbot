import React from 'react';
import { Message } from '../types';
import { Bot, User, Heart, Brain, Globe, Zap } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex items-start space-x-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isBot 
          ? 'bg-white shadow-md border border-gray-100' 
          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
      }`}>
        {isBot && (
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-xs font-semibold text-purple-600">Baby AI</span>
            <div className="flex space-x-1">
              {message.sentiment === 'positive' && <Heart className="w-3 h-3 text-red-400" />}
              <Brain className="w-3 h-3 text-purple-400" />
              <Globe className="w-3 h-3 text-blue-400" />
              <Zap className="w-3 h-3 text-yellow-400" />
            </div>
          </div>
        )}
        
        <p className={`text-sm leading-relaxed ${isBot ? 'text-gray-800' : 'text-white'}`}>
          {message.text}
        </p>
        
        <div className={`text-xs mt-2 ${isBot ? 'text-gray-500' : 'text-blue-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {message.language && message.language !== 'english' && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {message.language}
            </span>
          )}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};