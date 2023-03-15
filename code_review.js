const axios = require('axios');
const fs = require('fs');

async function requestCodeReview(code) {
  const apiKey = 'your_openai_api_key';
  const prompt = `Please review the following JavaScript code:\n\n${code}\n`;

  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );

  return response.data.choices[0].text.trim();
}

async function main() {
  const code = fs.readFileSync('code_to_review.js', 'utf-8');
  const review = await requestCodeReview(code);
  console.log(`Code Review 결과:\n${review}`);
}

main();
