require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = require('airtable').base(process.env.AIRTABLE_BASE);
const table = base(process.env.AIRTABLE_TABLE);

exports.handler = async (event) => {
  try {
    const records = await table.select().firstPage();
    const formattedRecords = records.map((record) => ({
      field: record.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Faled to query records on Database'),
    };
  }
};
