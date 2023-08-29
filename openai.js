const OpenAI = require("openai");
const os = require("os");

async function getComplexity(code) {
  const apiKey = os.getenv("OPENAI_API_KEY");
  const openai = new OpenAI({ apiKey });

  const prompt = `
  What is the time complexity of the following code?

  `;
  prompt += code;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [prompt],
    temperature: 0,
    max_tokens: 256,
  });

  const complexity = response["choices"][0]["text"].trim();
  return complexity;
}

async function main() {
  const code = `
  function factorial(n) {
    if (n == 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  `;

  const complexity = await getComplexity(code);
  console.log("The time complexity of the code is:", complexity);
}

if (require.main === module) {
  main();
}
