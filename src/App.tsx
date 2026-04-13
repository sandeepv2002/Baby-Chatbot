import React, { useState, useEffect, useRef } from 'react';
import { Message, UserProfile } from './types';
import { BabyChatbot } from './utils/chatbotLogic';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { QuickReplies } from './components/QuickReplies';
import { TypingIndicator } from './components/TypingIndicator';
import { detectLanguage, translateText } from './utils/languageDetector';
import { analyzeSentiment } from './utils/sentimentAnalysis';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile] = useState<UserProfile>({
    name: 'User',
    interests: ['technology', 'learning', 'conversation'],
    preferredLanguage: 'english',
    mood: 'neutral',
    chatHistory: []
  });
  
  const chatbot = useRef(new BabyChatbot(userProfile));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    const initialMessage: Message = {
      id: '1',
      text: `Hello! I'm Baby, your advanced AI assistant created by Abhi! 🤖✨

I'm designed with cutting-edge features:
• 🧠 **Emotional Intelligence** - I understand and respond to your feelings
• 🌍 **Multilingual Support** - I can communicate in multiple languages
• 🎯 **Task Automation** - I can help with scheduling, reminders, and more
• 📚 **Learning Mode** - I can teach and explain complex topics
• 🎮 **Fun Mode** - I love jokes, games, and creative conversations
• 💭 **Context Memory** - I remember our conversation flow

How can I help you today? Try asking me anything or use the quick actions below!`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      sentiment: 'positive'
    };
    
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      language: detectLanguage(messageText),
      sentiment: analyzeSentiment(messageText)
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      try {
        const response = await chatbot.current.processMessage(messageText);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
          sentiment: 'positive'
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I encountered an error processing your message. Please try again!",
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
          sentiment: 'neutral'
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <ChatHeader 
          isOnline={true} 
          messageCount={messages.length}
        />
        
        <div className="h-96 md:h-[500px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        <QuickReplies onQuickReply={handleSendMessage} />
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
      
      <div className="text-center mt-6 text-gray-600">
        <p className="text-sm">
          🤖 <strong>Baby AI</strong> - Advanced Multilingual Chatbot by <strong>Abhi</strong>
        </p>
        <p className="text-xs mt-1">
          Featuring Emotional Intelligence • Task Automation • Multi-language Support • Learning Mode
        </p>
      </div>
    </div>
  );
}

export default App;