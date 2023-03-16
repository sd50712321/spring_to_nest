const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { Configuration, OpenAIApi } = require('openai');

const readFile = promisify(fs.readFile);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function main() {
  const files = process.argv.slice(2);
  const reviews = {};

  for (const file of files) {
    const code = await readFile(file, 'utf-8');
    const prompt = `Please review the following TypeScript code:\n\n${code}\n`;

    const chatMessages = [
      {
        role: 'system',
        content:
          'You are a code reviewer focusing on identifying structural improvements and duplicated code in TypeScript. please reply korean',
      },
      { role: 'user', content: prompt },
    ];
    const completions = await openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: chatMessages,
        temperature: 0.7,
      },
      {
        timeout: 60000,
        maxBodyLength: 4096,
      },
    );

    const review = completions.data.choices[0].message.content;
    console.log('review => ', review);
    reviews[path.basename(file)] = review;
  }

  console.log(JSON.stringify(reviews));
}

main().catch((error) => {
  // console.error(error);
  console.log('error', error.response);
  process.exit(1);
});
