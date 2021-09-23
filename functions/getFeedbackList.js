require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = require('airtable').base(process.env.AIRTABLE_BASE);
const table = base(process.env.AIRTABLE_TABLE);

exports.handler = async (event) => {
  try {
    const feedbackList = await table.select().firstPage();
    const formattedFeedbackList = feedbackList.map((feedback) => ({
      fields: feedback.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedFeedbackList),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
