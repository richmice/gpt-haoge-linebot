const express = require('express');
const OpenAI = require("openai");
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();
app.use(express.json());

const lineConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(lineConfig);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.status(200).send('No events');
  }

  const promises = events.map(async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const userMessage = event.message.text;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      });

      const gptReply = completion.choices[0].message.content;
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: gptReply
      });
    } catch (error) {
      console.error('GPT error:', error.message);
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '郝哥今天有點累，稍後再試一次 😅'
      });
    }
  });

  await Promise.all(promises);
  res.status(200).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
