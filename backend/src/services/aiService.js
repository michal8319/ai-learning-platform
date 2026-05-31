const { GoogleGenerativeAI } = require('@google/generative-ai');

// אתחול עם המפתח מה-.env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateLearningContent = async (category, subCategory) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const sanitizedCategory = String(category).slice(0, 200);
    const sanitizedSubCategory = String(subCategory).slice(0, 200);
    const prompt = `הסבר בצורה לימודית ומפורטת על הנושא ${sanitizedSubCategory} מתוך עולם ה-${sanitizedCategory}.`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI request timed out')), 30000)
    );

    const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error('Gemini Service Error:', error.message || error);
    throw new Error(`נכשלה הפקת תוכן מ-Gemini: ${error.message}`);
  }
};