const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req, res) {
  const message = `오늘 하루도 수고 많으셨습니다 😊

편안한 밤 되시고  🌙
내일도 힘내요! 💪`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.statusText}`);
    }

    return res.status(200).json({ status: "sent", message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
