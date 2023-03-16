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
  console.log('files', files);
  let reviews = {};

  for (const file of files) {
    const code = await readFile(file, 'utf-8');
    const prompt = `Please review the following TypeScript code:\n\n${code}\n`;

    const chatMessages = [
      {
        role: 'system',
        content:
          'You are a code reviewer focusing on identifying structural improvements and duplicated code in TypeScript. Please provide a brief summary of the code and any suggestions for improvement in Korean. Do not include explanations of how the code works.',
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
    console.log('reviews', reviews);
  }

  const updatedReviews = Object.entries(reviews).map(([file, review]) => {
    // Markdown 형식으로 파일 이름을 두껍게 표시합니다.
    const updatedReview = review.replace(/File: /, '**File: ') + '**';
    return { [file]: updatedReview };
  });

  reviews = updatedReviews.reduce((acc, review) => {
    const [file, content] = Object.entries(review)[0];
    acc[file] = content;
    return acc;
  }, {});

  return JSON.stringify(reviews);
}

main()
  .then(console.log)
  .catch((error) => {
    // console.error(error);
    console.log('error', error.response);
    process.exit(1);
  });
