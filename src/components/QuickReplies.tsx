import React from 'react';
import { MessageCircle, HelpCircle, Lightbulb, Heart, Globe, Calendar } from 'lucide-react';

interface QuickRepliesProps {
  onQuickReply: (message: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onQuickReply }) => {
  const quickReplies = [
    { text: "Tell me about yourself", icon: MessageCircle, color: "from-purple-500 to-pink-500" },
    { text: "Help me with a task", icon: HelpCircle, color: "from-blue-500 to-cyan-500" },
    { text: "Teach me something", icon: Lightbulb, color: "from-yellow-500 to-orange-500" },
    { text: "I need emotional support", icon: Heart, color: "from-red-500 to-pink-500" },
    { text: "Speak in another language", icon: Globe, color: "from-green-500 to-teal-500" },
    { text: "Schedule something", icon: Calendar, color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="p-4 bg-gray-50 border-t">
      <p className="text-sm text-gray-600 mb-3 font-medium">Quick actions:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickReplies.map((reply, index) => {
          const Icon = reply.icon;
          return (
            <button
              key={index}
              onClick={() => onQuickReply(reply.text)}
              className={`flex items-center space-x-2 p-3 rounded-xl bg-gradient-to-r ${reply.color} text-white text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{reply.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};