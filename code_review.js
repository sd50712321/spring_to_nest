const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

async function requestCodeReview(code) {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Please review the following TypeScript code:\n\n${code}\n`;

  console.log('리뷰 요청 프롬프트: ');
  console.log(prompt);

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
      timeout: 60000, // 60초로 설정합니다.
    },
  );

  return response.data.choices[0].text.trim();
}

async function main() {
  const changedFiles = process.argv.slice(2);
  const reviews = {};

  for (const file of changedFiles) {
    if (!fs.existsSync(file)) {
      console.log(`파일 ${file} 이 존재하지 않습니다.`);
      continue;
    }

    const code = fs.readFileSync(file, 'utf-8');
    try {
      const review = await requestCodeReview(code);
      reviews[file] = review;
    } catch (error) {
      console.error(
        `파일 ${file}에 대한 코드 리뷰 중 오류가 발생했습니다:`,
        error,
      );
    }
  }

  console.log(Buffer.from(JSON.stringify(reviews)).toString('base64'));
}

main();
