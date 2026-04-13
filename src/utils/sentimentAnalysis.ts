export const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveWords = [
    'happy', 'great', 'awesome', 'wonderful', 'amazing', 'fantastic', 'excellent',
    'love', 'like', 'enjoy', 'excited', 'thrilled', 'delighted', 'pleased',
    'good', 'nice', 'beautiful', 'perfect', 'brilliant', 'outstanding'
  ];

  const negativeWords = [
    'sad', 'angry', 'frustrated', 'annoyed', 'disappointed', 'upset', 'mad',
    'hate', 'dislike', 'terrible', 'awful', 'horrible', 'bad', 'worst',
    'annoying', 'stupid', 'dumb', 'useless', 'pathetic', 'disgusting'
  ];

  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

export const getEmpatheticResponse = (sentiment: string, userMessage: string): string => {
  const responses = {
    positive: [
      "That's wonderful to hear! I'm so happy for you! 😊",
      "Your positive energy is contagious! Keep it up! ✨",
      "I love your enthusiasm! Tell me more about what's making you happy!",
      "That sounds amazing! I'm excited to hear more!"
    ],
    negative: [
      "I'm sorry you're feeling this way. I'm here to help and support you. 💙",
      "That sounds tough. Would you like to talk about it or would you prefer a distraction?",
      "I understand this must be difficult. Remember, I'm here for you.",
      "I hear you, and your feelings are valid. How can I help make things better?"
    ],
    neutral: [
      "I understand. How can I assist you today?",
      "Thanks for sharing. What would you like to explore together?",
      "I'm here to help with whatever you need.",
      "What can I do for you today?"
    ]
  };

  const responseList = responses[sentiment as keyof typeof responses] || responses.neutral;
  return responseList[Math.floor(Math.random() * responseList.length)];
};