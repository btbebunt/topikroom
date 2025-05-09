export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const body = req.body;

  console.log("📥 Telegram Webhook body:", JSON.stringify(body, null, 2));

  try {
    if (body?.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      if (text === '/start') {
        const message = `Сайн байна уу!
Та <b>TOPIK рүүм</b>-д элсэхийг хүсвэл дараах дансанд 
төлбөрөө шилжүүлсний дараа доорх <b>"Төлбөр төлсөн"</b> 
товчин дээр даран гүйлгээний screenshot илгээнэ үү. <b>Баярлалаа 🙏</b>

<b>🏦 Банк:</b> Голомт банк
<b>🔢 Дансны дугаар:</b> <code>3455177388</code>
<b>🌍 IBAN дугаар:</b> <code>MN510015003455177388</code>
<b>👤 Хүлээн авагч:</b> Энхбаяр Түвшинбаяр

<b>💸 Төлбөрийн мэдээлэл</b>
- 1 сарын төлбөр: <code>20,000₮</code>
- 3 сарын төлбөр: <code>50,000₮</code>
- <i>Хэрвээ та 2 найзтайгаа хамт элсвэл таны төлбөрийг <b>100%</b> хөнгөлнө.</i>
`;

        const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Төлбөр төлсөн 👇",
                    url: "https://t.me/joetutu96"
                  }
                ]
              ]
            }
          })
        });

        const data = await response.json();
        console.log("✅ Telegram response:", data);
      }
    }
  } catch (error) {
    console.error("❌ Telegram send error:", error);
  }

  return res.status(200).json({ ok: true });
}
