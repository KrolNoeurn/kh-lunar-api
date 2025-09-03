// index.js
// const express = require("express");
// const app = express();
// const moment = require('moment');
// require('@thyrith/momentkh')(moment);


// index.js
// const express = require("express");
import express from "express";
const app = express();
// const moment = require('moment');
import moment from 'moment';
// require('@thyrith/momentkh')(moment);
import momentKh from '@thyrith/momentkh';
momentKh(moment);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
import { currencyToWord } from "./currencyToWord.js";

import { numberToWord } from "./numberToWord.js";



// simple API route
// app.get("/", (req, res) => {
//   res.send("Hello from Node.js");
// });

// Date khmer lunar route /date-khmer-lunar
app.get("/", (req, res) => {
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
  res.send(date.toLunarDate('ថ្ងៃW d N ខែm ឆ្នាំa e ព.ស.b'));
});
// must listen to the port Vercel provides
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


app.get("/number-to-word", (req, res) => {
  const { number } = req.query;
  if (!number) {
    return res.status(400).json({ error: "Missing 'number' query parameter" });
  }
  try {
    const result = numberToWord(number);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});
app.get("/kh", (req, res) => {
  const { number } = req.query;
  if (!number) {
    return res.status(400).json({ error: "Missing 'number' query parameter" });
  }
  try {
    const result = currencyToWord(number,"KHR");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});
app.get("/en", (req, res) => {
  const { number } = req.query;
  if (!number) {
    return res.status(400).json({ error: "Missing 'number' query parameter" });
  }
  try {
    const result = currencyToWord(number, "USD");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});


app.get("/currency-to-word", (req, res) => { 
  const { number, currency } = req.query;
  if (!number || !currency) {
    return res.status(400).json({ error: "Missing 'number' or 'currency' query parameter" });
  }
  try {
    const result = currencyToWord(number, currency);
    res.send( result );
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  } 
}); 



