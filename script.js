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
    const response = await fetch('/.netlify/functions/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant that suggests local dishes based on food preferences, allergies, and location." },
          { role: "user", content: `I like ${likedFoods}. I dislike ${dislikedFoods}. I'm allergic to ${allergies}. I'm in ${location}. Suggest a local dish.` }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const completion = await response.json();
    if (!completion || !completion.choices || !completion.choices[0]) {
      throw new Error('Invalid response format');
    }

    document.getElementById('result').innerHTML = `
      <h2>Suggested Local Dish:</h2>
      <p>${completion.choices[0].message.content}</p>
    `;

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerHTML = '<p>An error occurred. Please try again.</p>';
  }
});