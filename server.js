import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.post('/api/chatgpt', async (req, res) => {
  const input = req.body.input;
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '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'
    },
    body: JSON.stringify({
      prompt: input,
      max_tokens: 60,
      temperature: 0.7
    })
  });
  const data = await response.json();
  const message = data.choices[0].text.trim();
  res.json({ response: message });
});
app.use(express.json());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
