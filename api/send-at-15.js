// api/send-at-15.js
const fs = require('fs');
const path = require('path');
const fetchData = require('/utils/fetchJson');
const sendMessage = require('/utils/telegram');

module.exports = async (req, res) => {
  const filePath = path.join(__dirname, '../data/sent.json');
  const sentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const data = await fetchData(2);

  for (const row of data) {
    if (!sentData["2"].includes(row.id)) {
      await sendMessage(`🕒 15:00 мэдээ: ${row.text}`);
      sentData["2"].push(row.id);
      break;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(sentData, null, 2));
  res.status(200).send('Sent 15:00 message');
};
