export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
    }
  
    const body = req.body;
  
    if (body?.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
  
      if (text === '/start signup') {
        const message = `Сайн байна уу!<br><br>
  
  Та <b>TOPIK рүүм</b>-д элсэхийг хүсвэл дараах дансанд 
  төлбөрөө шилжүүлсний дараа доорх <b>"Төлбөр төлсөн"</b> 
  товчин дээр даран гүйлгээний screenshot илгээнэ үү. <b>Баярлалаа 🙏</b><br><br>
  
  <b>🏦 Банк:</b> Голомт банк<br>
  <b>🔢 Дансны дугаар:</b> <code>3455177388</code><br>
  <b>🌍 IBAN дугаар:</b> <code>MN510015003455177388</code><br>
  <b>👤 Хүлээн авагч:</b> Энхбаяр Түвшинбаяр<br><br>
  
  <b>💸 Төлбөрийн мэдээлэл</b><br>
  - 1 сарын төлбөр: <code>20,000₮</code><br>
  - 3 сарын төлбөр: <code>50,000₮</code><br>
  - <i>Хэрвээ та 2 найзтайгаа хамт элсвэл таны төлбөрийг <b>100%</b> хөнгөлнө.</i>
  `;
  
        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
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
      }
    }
  
    return res.status(200).json({ ok: true });
  }
  