// index.js
const express = require("express");
const app = express();
const moment = require('moment');
require('@thyrith/momentkh')(moment);


// simple API route
app.get("/", (req, res) => {
  res.send("Hello from Node.js");
});

// Date khmer lunar route
app.get("/date-khmer-lunar", (req, res) => {
  // Try to read date from query param (?date=2025-01-01) or request body
  const inputDate = req.query.date || req.body?.date;

  // If inputDate exists, parse it, otherwise default to today
  const date = inputDate ? moment(inputDate) : moment();

  // Build Khmer date object
  // const khmerDate = {
  //   gregorian: date.format(), // ISO format
  //   khmer_lunar: date.toLunarDate(),
  //   khmer_day_name: date.toLunarDate('ថ្ងៃW dN ខែm ឆ្នាំa e ព.ស.b'),
  //   khmer_day_index: date.khDay(),
  //   khmer_month_index: date.khMonth(),
  //   khmer_year_buddhist_era: date.khYear(),
  //   khmer_new_year_2025: moment.getKhNewYearMoment(2025).format()
  // };

  // logger.info("Khmer Lunar Date:", { structuredData: true, date.toLunarDate('ថ្ងៃW dN ខែm ឆ្នាំa e ព.ស.b') });
  res.json(date.toLunarDate('ថ្ងៃW d N ខែm ឆ្នាំa e ព.ស.b'));
});
// must listen to the port Vercel provides
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
