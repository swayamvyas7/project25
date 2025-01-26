document.addEventListener('DOMContentLoaded', () => {
    populateLanguageOptions();
    document.getElementById('submit-btn').addEventListener('click', translateText);
  });
  
  function populateLanguageOptions() {
    const languageSelect = document.getElementById('language-select');
  
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'zh', name: 'Chinese (Simplified)' },
      { code: 'hi', name: 'Hindi' },
    ];
  
    languageSelect.innerHTML = '';
  
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a Language --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    languageSelect.appendChild(defaultOption);
  
    languages.forEach(language => {
      const option = document.createElement('option');
      option.value = language.code;
      option.textContent = language.name;
      languageSelect.appendChild(option);
    });
  }
  
  async function translateText() {
    const textField = document.getElementById('text-input');
    const languageSelect = document.getElementById('language-select');
    const exchangeBox = document.getElementById('exchangeBox');
    const text = textField.value.trim();
    const targetLanguage = languageSelect.value;
  
    if (!text || !targetLanguage) {
      alert('Please enter text and select a language.');
      return;
    }
  
    textField.value = '';
  
    const userMessage = document.createElement('div');
    userMessage.className = 'message question';
    userMessage.textContent = `Input: ${text}`;
    exchangeBox.appendChild(userMessage);
  
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message answer';
    loadingMessage.textContent = 'Translating...';
    exchangeBox.appendChild(loadingMessage);
  
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText?key= AIzaSyDJZnyHLYiEnS_kZCLp9whyVvG9PsCsbKk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: { text: `Translate this to ${targetLanguage}: ${text}` },
            temperature: 0.7,
            maxOutputTokens: 200,
          }),
        }
      );
  
      const data = await response.json();
      const translation = data?.candidates?.[0]?.output || "No translation received.";
  
      loadingMessage.textContent = `Translated: ${translation}`;
    } catch (error) {
      loadingMessage.textContent = 'Error during translation.';
      console.error('Translation error:', error);
    }
  
    exchangeBox.scrollTop = exchangeBox.scrollHeight;
  }
  
  
