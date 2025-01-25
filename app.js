document.getElementById('submit-btn').addEventListener('click', generateAns);

    async function generateAns() {
      const questionField = document.getElementById('question');
      const exchangeBox = document.getElementById('exchangeBox');
      const question = questionField.value.trim();

      // Clear the input field
      questionField.value = '';

      if (question === '') {
        alert('Please ask a question.');
        return;
      }

      // Add the user's question to the exchange box
      const userMessage = document.createElement('div');
      userMessage.className = 'message question';
      userMessage.textContent = question;
      exchangeBox.appendChild(userMessage);

      // Scroll to the latest message
      exchangeBox.scrollTop = exchangeBox.scrollHeight;

      // Add a loading message for the answer
      const loadingMessage = document.createElement('div');
      loadingMessage.className = 'message answer';
      loadingMessage.textContent = 'Loading...';
      exchangeBox.appendChild(loadingMessage);

      try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDJZnyHLYiEnS_kZCLp9whyVvG9PsCsbKk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: question }]
            }]
          })
        });

        const data = await response.json();
        const answer = data.candidates[0].content.parts[0].text;

        // Update the loading message with the answer
        loadingMessage.textContent = answer;
      } catch (error) {
        loadingMessage.textContent = 'Sorry, there was an error generating the response.';
        console.error(error);
      }

      // Scroll to the latest message
      exchangeBox.scrollTop = exchangeBox.scrollHeight;
    }