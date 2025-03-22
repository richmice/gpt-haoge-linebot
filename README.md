# GPT 郝哥 LINE Bot

這是一個結合 LINE Bot + ChatGPT + Render 的個人成長助手專案。

## 🚀 快速部署步驟

1. 將這份程式碼上傳至你的 GitHub Repository
2. 使用 [Render](https://render.com/) 建立 Web Service：
   - Build Command：`npm install`
   - Start Command：`npm start`
3. 加入環境變數（Environment Variables）：
   - `CHANNEL_SECRET`
   - `CHANNEL_ACCESS_TOKEN`
   - `OPENAI_API_KEY`
4. Webhook URL 設定為：`https://你的-render-url.onrender.com/webhook`
5. 在 LINE Developers Console 開啟 Use Webhook 並驗證成功

部署完成後，就可以在 LINE 上和 GPT 郝哥互動啦 🎉