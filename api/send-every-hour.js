// api/send-every-hour.js
const fs = require('fs');
const path = require('path');
const fetchData = require('utils\fetchjson.js');
const sendMessage = require('utils\telegram.js');

module.exports = async (req, res) => {
  const filePath = path.join(__dirname, '../data/sent.json');
  const sentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const data = await fetchData(1);

  for (const row of data) {
    if (!sentData["1"].includes(row.id)) {
      await sendMessage(`📤 ${row.text}`);
      sentData["1"].push(row.id);
      break;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(sentData, null, 2));
  res.status(200).send('Sent hourly message');
};
