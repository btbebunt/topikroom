// utils/fetchJson.js
const fetch = require('node-fetch');

const sheetUrls = {
  1: 'https://script.google.com/macros/s/AKfycbwXRNSsyuYMFMnAzahBrQGLMHh40GRQlf17dK2j8awFoTwDYaBK193thf0J_g-qfD6K/exec',
  2: 'https://script.google.com/macros/s/AKfycbzRsqeAWcIHxo4unPf1qtYPOG5pDZLNdKb4iPQMvKgVCOzzBmbuCCqI3lLll48cg7vv2Q/exec',
  3: 'https://script.google.com/macros/s/AKfycbxr6KxcgnDWd73Gst7XhlduIdA3PjQzwMolqsl6Fj2GlIoIBy8LMjfwUKt3QZo77mHW-A/exec'
};

async function fetchData(id) {
  const res = await fetch(sheetUrls[id]);
  const json = await res.json();
  return json;
}

module.exports = fetchData;
