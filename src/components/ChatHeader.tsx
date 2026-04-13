import React from 'react';
import { Bot, Heart, Brain, Globe, Zap, Settings } from 'lucide-react';

interface ChatHeaderProps {
  isOnline: boolean;
  messageCount: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isOnline, messageCount }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              isOnline ? 'bg-green-400' : 'bg-gray-400'
            }`}></div>
          </div>
          
          <div>
            <h1 className="text-xl font-bold">Baby AI</h1>
            <p className="text-sm text-purple-100">
              Created by Abhi • {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-1 bg-white bg-opacity-20 rounded-full px-3 py-1">
            <Heart className="w-4 h-4 text-red-300" title="Emotional Intelligence" />
            <Brain className="w-4 h-4 text-blue-300" title="Smart AI" />
            <Globe className="w-4 h-4 text-green-300" title="Multilingual" />
            <Zap className="w-4 h-4 text-yellow-300" title="Fast Response" />
          </div>
          
          <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
            💬 {messageCount} messages
          </span>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
            🌍 Multi-language support
          </span>
        </div>
        
        <div className="text-purple-100">
          Advanced AI Assistant
        </div>
      </div>
    </div>
  );
};