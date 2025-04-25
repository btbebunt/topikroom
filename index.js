import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import fetchData from './utils/fetchJson.js';
import sendMessage from './utils/telegram.js';

const sentPath = path.resolve('data/sent.json');

function loadSent() {
  if (!fs.existsSync(sentPath)) {
    return { "1": [], "2": [], "3": [] };
  }
  return JSON.parse(fs.readFileSync(sentPath, 'utf-8'));
}

function saveSent(data) {
  fs.writeFileSync(sentPath, JSON.stringify(data, null, 2));
}

// ✨ Sheet 1: Солонгос үг
function formatSheet1({ id, word, meaning }) {
  return `
📚 *Шинэ үг*: ${id}

🧾 *Үг:* **${word}**
💡 *Утга:* ${meaning}

📌 Шинэ үгээ тогтоогоорой!
`;
}

// ✨ Sheet 2: Эшлэл
function formatSheet2({ id, quotekr, quotemn }) {
  return `
🌟 *Өдрийн ишлэл*: ${id}

_"${quotekr}"_

— *${quotemn}*
`;
}

// ✨ Sheet 3: Асуулт
function formatSheet3({ id, grammarkr, grammarmn, example }) {
  return `
📌 *Өдрийн дүрэм*: ${id}

🧾 *Дүрэм:* **${grammarkr}**
💡 *Тайлбар:* ${grammarmn}
    *Жишээ:* ${example}
`;
}

// 🔁 Нийтлэг процесс
async function processJob(sheetId, formatter) {
  const sentData = loadSent();
  const data = await fetchData(sheetId);

  if (!sentData[sheetId]) {
    sentData[sheetId] = [];
  }

  for (const row of data) {
    if (!sentData[sheetId].includes(row.id)) {
      await sendMessage(formatter(row));
      sentData[sheetId].push(row.id);
      saveSent(sentData);
      break;
    }
  }
}

cron.schedule('0 10-20 * * *', () => {
    processJob(1, formatSheet1);
  }, {
    timezone: 'Asia/Ulaanbaatar'  // Монголын цагийн бүс
  });

// // ⏰ Sheet 1 — Цаг тутам
// cron.schedule('*/1 * * * *', () => {
//   processJob(1, formatSheet1);
// });

// 🕒 Sheet 2 — Өдөр бүр 15:00
cron.schedule('0 15 * * *', () => {
  processJob(2, formatSheet2);
});

// 🕗 Sheet 3 — Өдөр бүр 20:00
cron.schedule('0 20 * * *', () => {
  processJob(3, formatSheet3);
});

console.log('⏳ Telegram bot 3 төрлийн Sheet-ээс ажиллаж эхэллээ ✅');
