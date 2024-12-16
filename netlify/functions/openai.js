const { OpenAI } = require('openai');

exports.handler = async function(event) {
  const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY
  });

  try {
    const { messages } = JSON.parse(event.body);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages
    });

    return {
      statusCode: 200,
      body: JSON.stringify(completion)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};