const { GoogleGenerativeAI } = require("@google/generative-ai");

class AiController {
  static async chatbot(req, res, next) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const { message } = req.body;
      const prompt = `You are an expert in using Notion as a dashboard or workspace for productivity. 
      And you only answer about dashboard templates or workspace notions along with explanations, please summarize the answer in 1 paragraph. 
      If the user input is unrelated to the notion dashboard, reply with "sorry I don't understand". 
      This is a message from the user ${message}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);

      res.status(200).json({ text });
    } catch (error) {}
  }
}

module.exports = AiController;
