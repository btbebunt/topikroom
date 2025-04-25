import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import fetchData from './utils/fetchJson.js';
import sendMessage from './utils/telegram.js';

const sentPath = path.resolve('data/sent.json');

function loadSent() {
  return JSON.parse(fs.readFileSync(sentPath, 'utf-8'));
}

function saveSent(data) {
  fs.writeFileSync(sentPath, JSON.stringify(data, null, 2));
}

async function processJob(sheetId, label) {
  const sentData = loadSent();
  const data = await fetchData(sheetId);

  for (const row of data) {
    if (!sentData[sheetId].includes(row.id)) {
      await sendMessage(`${label} ${row.text}`);
      sentData[sheetId].push(row.id);
      saveSent(sentData);
      break;
    }
  }
}

// ⏰ Цаг тутам
cron.schedule('*/2 * * * *', () => {
  processJob(1, '🕐 Цаг тутмын мэдээ:');
});

// // 🕒 15:00
// cron.schedule('0 15 * * *', () => {
//   processJob(2, '🕒 15:00 мэдээ:');
// });

// // 🕗 20:00
// cron.schedule('0 20 * * *', () => {
//   processJob(3, '🕗 20:00 мэдээ:');
// });

console.log('Telegram cron bot started ✅');
