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
    const completions = await openai.createCompletion(
      {
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150,
        n: 1,
        stop: ['\n'],
        temperature: 0.7,
      },
      {
        timeout: 60000,
      },
    );

    const review = completions.data.choices[0].text.trim();
    reviews[path.basename(file)] = review;
  }

  console.log(JSON.stringify(reviews));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
