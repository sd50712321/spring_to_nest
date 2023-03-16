const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const openai = require('openai');

const readFile = promisify(fs.readFile);

const openaiClient = new openai.OpenAi(process.env.OPENAI_API_KEY);

async function main() {
  const files = process.argv.slice(2);
  const reviews = {};

  for (const file of files) {
    const code = await readFile(file, 'utf-8');
    const prompt = `Please review the following TypeScript code:\n\n${code}\n`;
    const completions = await openaiClient.Completion.create({
      engine: 'text-davinci-002',
      prompt,
      max_tokens: 150,
      n: 1,
      stop: ['\n'],
      temperature: 0.7,
    });

    const review = completions.choices[0].text.trim();
    reviews[path.basename(file)] = review;
  }

  console.log(Buffer.from(JSON.stringify(reviews)).toString('base64'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
