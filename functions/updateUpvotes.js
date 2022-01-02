const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);

  try {
    const updateUpvotes = await feedbackTable.update([{ id, fields }]);

    return {
      statusCode: 200,
      body: JSON.stringify(updateUpvotes),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
