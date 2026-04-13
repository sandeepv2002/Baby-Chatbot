export const detectLanguage = (text: string): string => {
  // Simple language detection based on common patterns
  const patterns = {
    spanish: /\b(hola|gracias|por favor|buenos días|buenas noches)\b/i,
    french: /\b(bonjour|merci|s'il vous plaît|bonsoir|au revoir)\b/i,
    german: /\b(hallo|danke|bitte|guten tag|auf wiedersehen)\b/i,
    italian: /\b(ciao|grazie|prego|buongiorno|buonasera)\b/i,
    portuguese: /\b(olá|obrigado|por favor|bom dia|boa noite)\b/i,
    hindi: /\b(नमस्ते|धन्यवाद|कृपया|सुप्रभात|शुभ रात्रि)\b/i,
    chinese: /[\u4e00-\u9fff]/,
    arabic: /[\u0600-\u06ff]/,
    russian: /[\u0400-\u04ff]/,
    japanese: /[\u3040-\u309f\u30a0-\u30ff]/,
  };

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return lang;
    }
  }
  
  return 'english';
};

export const translateText = async (text: string, targetLang: string): Promise<string> => {
  // Simulated translation - in production, use Google Translate API or similar
  const translations: Record<string, Record<string, string>> = {
    english: {
      greeting: "Hello! I'm Baby, your AI assistant created by Abhi. How can I help you today?",
      goodbye: "Goodbye! Have a wonderful day!",
      thanks: "You're welcome!",
      help: "I can help you with various tasks, answer questions, and have fun conversations!"
    },
    spanish: {
      greeting: "¡Hola! Soy Baby, tu asistente de IA creado por Abhi. ¿Cómo puedo ayudarte hoy?",
      goodbye: "¡Adiós! ¡Que tengas un día maravilloso!",
      thanks: "¡De nada!",
      help: "¡Puedo ayudarte con varias tareas, responder preguntas y tener conversaciones divertidas!"
    },
    french: {
      greeting: "Bonjour! Je suis Baby, votre assistant IA créé par Abhi. Comment puis-je vous aider aujourd'hui?",
      goodbye: "Au revoir! Passez une merveilleuse journée!",
      thanks: "Je vous en prie!",
      help: "Je peux vous aider avec diverses tâches, répondre aux questions et avoir des conversations amusantes!"
    },
    hindi: {
      greeting: "नमस्ते! मैं Baby हूं, अभि द्वारा बनाया गया आपका AI सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
      goodbye: "अलविदा! आपका दिन शुभ हो!",
      thanks: "आपका स्वागत है!",
      help: "मैं विभिन्न कार्यों में आपकी मदद कर सकता हूं, सवालों के जवाब दे सकता हूं और मजेदार बातचीत कर सकता हूं!"
    }
  };

  // Simple keyword-based translation
  const langTranslations = translations[targetLang] || translations.english;
  
  // Check for common phrases
  if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
    return langTranslations.greeting;
  }
  if (text.toLowerCase().includes('bye') || text.toLowerCase().includes('goodbye')) {
    return langTranslations.goodbye;
  }
  if (text.toLowerCase().includes('thank')) {
    return langTranslations.thanks;
  }
  if (text.toLowerCase().includes('help')) {
    return langTranslations.help;
  }

  return text; // Return original if no translation found
};