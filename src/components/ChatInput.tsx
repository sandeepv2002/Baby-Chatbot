import React, { useState, useRef } from 'react';
import { Send, Mic, Image, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would handle voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage("Voice message: Hello Baby, how are you today?");
      }, 2000);
    }
  };

  const handleImageUpload = () => {
    // In a real implementation, this would handle image upload
    onSendMessage("I've uploaded an image. Can you analyze it for me?");
  };

  const addEmoji = () => {
    const emojis = ['😊', '❤️', '🎉', '🤔', '👍', '🔥', '✨', '🚀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessage(prev => prev + randomEmoji);
    inputRef.current?.focus();
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message to Baby..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={addEmoji}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleImageUpload}
            className="p-3 text-gray-500 hover:text-purple-500 hover:bg-purple-50 rounded-full transition-all duration-200"
            title="Upload image"
          >
            <Image className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
            }`}
            title={isRecording ? 'Stop recording' : 'Voice message'}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};