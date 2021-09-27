require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = require('airtable').base(process.env.AIRTABLE_BASE);
const feedbackTable = base(process.env.AIRTABLE_TABLE_MAIN);
const commentsTable = base(process.env.AIRTABLE_TABLE_COMMENTS);

module.exports = { feedbackTable, commentsTable };
