// app/api/telegram/route.js

export async function POST(req) {
    const body = await req.json();
  
    if (body?.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
  
      if (text === '/start signup') {
        const message = `Сайн байна уу! Та бүртгэл эхлүүллээ. 🚀
  
  Та *TOPIK рүүм*-д элсэхийг хүсвэл дараах дансанд төлбөрөө шилжүүлсний дараа
  доорх "Төлбөр төлсөн" товчин дээр дарна уу. Баярлалаа 🙏
  
  *Дансны мэдээлэл*
  🏦 *Банк:* Голомт банк
  🔢 *Дансны дугаар:* 3455177388
  🌍 *IBAN дугаар:* MN510015003455177388
  👤 *Хүлээн авагч:* Энхбаяр Түвшинбаяр`;
  
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
                    text: "TOPIK Рүүмд нэгдэх 👇",
                    url: "https://t.me/cromix_bot?start=signup"
                  }
                ]
              ]
            }
          })
        });
      }
    }
  
    return new Response("OK");
  }
  