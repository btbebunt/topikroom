// utils/fetchJson.js
const fetch = require('node-fetch');

const sheetUrls = {
  1: 'https://script.google.com/macros/s/AKfycbwXRNSsyuYMFMnAzahBrQGLMHh40GRQlf17dK2j8awFoTwDYaBK193thf0J_g-qfD6K/exec',
  2: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_2/exec',
  3: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_3/exec'
};

async function fetchData(id) {
  const res = await fetch(sheetUrls[id]);
  const json = await res.json();
  return json;
}

module.exports = fetchData;
