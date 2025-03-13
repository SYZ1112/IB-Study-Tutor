import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 对话 API 端点
app.post('/api/conversation', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一个专业的 IB 学习辅导老师，擅长用简单易懂的方式解释复杂的概念。" },
        { role: "user", content: message }
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
}); 