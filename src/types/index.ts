export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'image' | 'voice';
  language?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface UserProfile {
  name: string;
  interests: string[];
  preferredLanguage: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'frustrated';
  chatHistory: Message[];
}

export interface ChatbotFeatures {
  multiModal: boolean;
  emotionalIntelligence: boolean;
  taskAutomation: boolean;
  multiLanguage: boolean;
  learningMode: boolean;
  funMode: boolean;
}