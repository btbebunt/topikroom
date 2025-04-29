export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
    }
  
    const body = req.body;
  
    if (body?.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
  
      if (text === '/start signup') {
        const message = `Сайн байна уу!
  
  Та *TOPIK рүүм*-д элсэхийг хүсвэл дараах дансанд 
  төлбөрөө шилжүүлсний дараа доорх "Төлбөр төлсөн" 
  товчин дээр даран гүйлгээний screenshot илгээнэ үү. Баярлалаа 🙏
  
 *Дансны мэдээлэл*
🏦 *Банк:* Голомт банк
🔢 *Дансны дугаар:* \`3455177388\`
🌍 *IBAN дугаар:* \`MN510015003455177388\`
👤 *Хүлээн авагч:* Энхбаяр Түвшинбаяр

💸 *Төлбөрийн мэдээлэл*
- 1 сарын төлбөр: \`20,000₮\`
- 3 сарын төлбөр: \`50,000₮\`
- Хэрвээ та 2 найзтайгаа хамт элсвэл таны төлбөрийг 100% хөнгөлнө.
`;
  
        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
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
  