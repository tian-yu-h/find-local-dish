
import { OpenAI } from "https://cdn.skypack.dev/openai@4.0.0";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // This allows using the API key in the browser (not recommended for production)
});

document.getElementById('foodForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  console.log('Form submitted');

  const likedFoods = [
    document.getElementById('like1').value,
    document.getElementById('like2').value,
    document.getElementById('like3').value,
    document.getElementById('like4').value,
    document.getElementById('like5').value
  ].filter(food => food.trim() !== '').join(', ');

  const dislikedFoods = [
    document.getElementById('dislike1').value,
    document.getElementById('dislike2').value,
    document.getElementById('dislike3').value,
    document.getElementById('dislike4').value,
    document.getElementById('dislike5').value
  ].filter(food => food.trim() !== '').join(', ');

  const allergies = [
    document.getElementById('allergy1').value,
    document.getElementById('allergy2').value,
    document.getElementById('allergy3').value
  ].filter(food => food.trim() !== '').join(', ');

  const location = document.getElementById('location').value;

  try {
    console.log('Sending request with:', {
      likedFoods,
      dislikedFoods,
      location
    }); 
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that suggests local dishes based on food preferences, allergies, and location." },
        { role: "user", content: `I like ${likedFoods}. I dislike ${dislikedFoods}. I'm allergic to ${allergies}. I'm in ${location}. Suggest a local dish.` }
      ],
    });

    console.log('Response received:', completion); 

    document.getElementById('result').innerHTML = `
      <h2>Suggested Local Dish:</h2>
      <p>${completion.choices[0].message.content}</p>
    `;
    

  } catch (error) {

    console.error('Detailed Error:', error);
    document.getElementById('result').innerHTML = '<p>An error occurred. Please try again.</p>';
  }
});