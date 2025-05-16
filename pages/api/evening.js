const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;


export default async function handler(req, res) {
  const message = `😊 오늘 하루도 수고 많으셨습니다 😊

🌙 편안한 밤 되시고  🌙
💪 내일도 힘내요! 💪`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const facebookUrl = `https://graph.facebook.com/${FACEBOOK_PAGE_ID}/feed`;
  try {
    // 1️⃣ Telegram руу илгээх
    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramRes.ok) {
      throw new Error(`Telegram error: ${telegramRes.statusText}`);
    }

    // 2️⃣ Facebook руу пост хийх
    const facebookRes = await fetch(facebookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        access_token: FACEBOOK_PAGE_ACCESS_TOKEN,
      }),
    });

    if (!facebookRes.ok) {
      const fbErr = await facebookRes.text();
      throw new Error(`Facebook error: ${facebookRes.status} ${fbErr}`);
    }

    return res.status(200).json({ status: "sent", message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
