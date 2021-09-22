require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = require('airtable').base(process.env.AIRTABLE_BASE);
const table = base(process.env.AIRTABLE_TABLE);

exports.handler = async (event) => {
  try {
    const tasks = await table.select().firstPage();
    const formattedTasks = tasks.map((task) => ({
      fields: task.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedTasks),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
