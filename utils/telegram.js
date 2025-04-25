// utils/telegram.js
const fetch = require('node-fetch');

const BOT_TOKEN = '7878265469:AAH8TxZeYpbsaox9KyhysyodRHvrrtPzcTQ';
const CHAT_ID = '-1002378968334'; // @-тай бичнэ

async function sendMessage(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown'
    })
  });
}

module.exports = sendMessage;
