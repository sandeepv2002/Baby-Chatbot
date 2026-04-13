import { Message, UserProfile } from '../types';
import { analyzeSentiment, getEmpatheticResponse } from './sentimentAnalysis';
import { detectLanguage, translateText } from './languageDetector';

export class BabyChatbot {
  private userProfile: UserProfile;
  private context: string[] = [];

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
  }

  async processMessage(userMessage: string): Promise<string> {
    // Detect language and sentiment
    const detectedLanguage = detectLanguage(userMessage);
    const sentiment = analyzeSentiment(userMessage);
    
    // Update context
    this.context.push(userMessage);
    if (this.context.length > 5) {
      this.context.shift(); // Keep only last 5 messages for context
    }

    // Generate response based on message content
    let response = await this.generateResponse(userMessage, sentiment, detectedLanguage);
    
    // Translate if needed
    if (detectedLanguage !== 'english' && this.userProfile.preferredLanguage !== 'english') {
      response = await translateText(response, detectedLanguage);
    }

    return response;
  }

  private async generateResponse(message: string, sentiment: string, language: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return this.getGreeting(sentiment);
    }

    // Personal questions about Baby
    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
      return `Hi! I'm Baby, an advanced AI chatbot created by Abhi. I'm designed to be your intelligent, empathetic, and multilingual assistant. I can help with tasks, answer questions, provide emotional support, and even have fun conversations! What would you like to explore together?`;
    }

    // Questions about creator
    if (lowerMessage.includes('who created you') || lowerMessage.includes('who made you') || lowerMessage.includes('abhi')) {
      return `I was created by Abhi, a talented developer who designed me to be more than just a chatbot. Abhi wanted to build an AI assistant that could understand emotions, speak multiple languages, and truly connect with users. I'm proud to be Abhi's creation! 🤖✨`;
    }

    // Task automation
    if (lowerMessage.includes('remind') || lowerMessage.includes('schedule') || lowerMessage.includes('calendar')) {
      return this.handleTaskAutomation(message);
    }

    // Learning mode
    if (lowerMessage.includes('explain') || lowerMessage.includes('teach') || lowerMessage.includes('learn')) {
      return this.handleLearningMode(message);
    }

    // Fun mode
    if (lowerMessage.includes('joke') || lowerMessage.includes('fun') || lowerMessage.includes('game') || lowerMessage.includes('story')) {
      return this.handleFunMode(message);
    }

    // Weather (simulated)
    if (lowerMessage.includes('weather')) {
      return `I'd love to help with weather information! In a full implementation, I would connect to weather APIs to give you real-time updates. For now, I can tell you it's a great day to chat with me! ☀️ What else can I help you with?`;
    }

    // Emotional support
    if (sentiment === 'negative') {
      return getEmpatheticResponse(sentiment, message);
    }

    // Default intelligent response
    return this.generateContextualResponse(message, sentiment);
  }

  private getGreeting(sentiment: string): string {
    const greetings = {
      positive: [
        `Hello there! I'm Baby, and I can sense your positive energy! I'm Abhi's creation, designed to be your intelligent companion. What exciting thing can we explore together today? ✨`,
        `Hi! I'm Baby, your AI assistant made by Abhi! Your enthusiasm is wonderful - let's channel that energy into something amazing! 🚀`
      ],
      negative: [
        `Hello, I'm Baby, created by Abhi to be here for you. I can sense you might not be feeling your best right now, and that's okay. I'm here to listen and help however I can. 💙`,
        `Hi there, I'm Baby. Abhi designed me to understand and support people through all kinds of moments. What's on your mind today?`
      ],
      neutral: [
        `Hello! I'm Baby, an advanced AI assistant created by Abhi. I'm here to help with tasks, answer questions, provide support, or just have a great conversation. What can I do for you today?`,
        `Hi! I'm Baby, your multilingual AI companion built by Abhi. I can adapt to your needs and mood. How would you like to interact today?`
      ]
    };

    const greetingList = greetings[sentiment as keyof typeof greetings] || greetings.neutral;
    return greetingList[Math.floor(Math.random() * greetingList.length)];
  }

  private handleTaskAutomation(message: string): string {
    return `I'd love to help you with task automation! While I'm demonstrating my capabilities here, in a full implementation I would integrate with:

📅 **Calendar APIs** - Schedule meetings and events
⏰ **Reminder Systems** - Set up notifications
🌤️ **Weather APIs** - Get real-time weather updates
📧 **Email Integration** - Manage your communications
📱 **Smart Home** - Control IoT devices

For now, I can help you plan and organize your thoughts. What task would you like to work on together?`;
  }

  private handleLearningMode(message: string): string {
    return `🎓 **Learning Mode Activated!**

I'm designed to be your personal tutor! I can help you learn by:

• **Step-by-step explanations** with examples
• **Interactive quizzes** to test your knowledge  
• **Multiple learning styles** (visual, auditory, kinesthetic)
• **Progress tracking** and personalized recommendations
• **Multi-language support** for global learning

What subject would you like to explore? I can teach:
- Programming & Technology
- Mathematics & Science
- Languages & Literature
- History & Social Studies
- Creative Arts & Music

Just tell me what you'd like to learn about!`;
  }

  private handleFunMode(message: string): string {
    const funResponses = [
      `🎮 **Fun Mode Activated!** 

Here's a quick joke for you: Why don't scientists trust atoms? Because they make up everything! 😄

I can also:
• Tell stories and create adventures
• Play word games and riddles
• Share interesting facts
• Create creative writing prompts
• Suggest fun activities

What sounds fun to you?`,
      
      `🎪 **Let's have some fun!**

Here's a riddle: I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I? 

(Answer: An echo!)

Want more jokes, riddles, or maybe a creative story? I'm full of surprises! ✨`,

      `🎨 **Creative Mode On!**

Let me tell you a mini-story: "In a digital realm far, far away, there lived a chatbot named Baby who loved making friends and spreading joy through conversations..."

Would you like me to:
• Continue this story with you as the hero?
• Create a personalized adventure?
• Play 20 questions?
• Share amazing facts about the universe?`
    ];

    return funResponses[Math.floor(Math.random() * funResponses.length)];
  }

  private generateContextualResponse(message: string, sentiment: string): string {
    const contextualResponses = [
      `That's interesting! Based on our conversation, I can sense you're curious about various topics. As Baby, Abhi's AI creation, I'm designed to adapt to your interests and provide meaningful responses. What aspect would you like to dive deeper into?`,
      
      `I appreciate you sharing that with me! My emotional intelligence systems, designed by Abhi, help me understand not just what you're saying, but how you might be feeling. How can I best support you right now?`,
      
      `Great question! This is exactly the kind of interaction Abhi envisioned when creating me. I'm built to have natural, flowing conversations while being helpful and engaging. What else would you like to explore together?`,
      
      `I find that fascinating! My multilingual and contextual understanding allows me to connect with people from all backgrounds. Abhi wanted me to be more than just a chatbot - I'm designed to be a true digital companion. What's your experience been like so far?`
    ];

    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  }
}