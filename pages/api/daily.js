// pages/api/daily-message.js
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

export default async function handler(req, res) {
  const now = new Date();
  const weekdaysKo = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = weekdaysKo[now.getDay()];

  const message = `🇲🇳 | 🇰🇷안녕하세요 여러분

🌥️ 오늘은 ${year}년 ${month}월 ${date}일 ${day}입니다

🖐 좋은 하루 되세요 🤲
🔥 오늘도 한국어 공부 화이팅!`;

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const facebookUrl = `https://graph.facebook.com/${FACEBOOK_PAGE_ID}/feed`;
  try {
    // 1️⃣ Telegram руу илгээх
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error(`Telegram error: ${telegramResponse.statusText}`);
    }

    // 2️⃣ Facebook рүү пост хийх
    const facebookResponse = await fetch(facebookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        access_token: FACEBOOK_PAGE_ACCESS_TOKEN,
      }),
    });

    if (!facebookResponse.ok) {
      const fbErr = await facebookResponse.text();
      throw new Error(`Facebook error: ${facebookResponse.status} ${fbErr}`);
    }

    return res.status(200).json({ status: "sent", message });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    return res.status(500).json({ error: error.message });
  }
}
