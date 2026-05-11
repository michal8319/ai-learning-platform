const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // המפתח יישמר בקובץ .env שלנו
});

exports.generateLearningContent = async (category, subCategory) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // או gpt-4
      messages: [
        {
          role: "system",
          content: "You are a helpful learning assistant. Provide clear and educational content."
        },
        {
          role: "user",
          content: `Explain the topic of ${subCategory} in the field of ${category}.`
        }
      ],
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate content from AI');
  }
};