const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);

  try {
    const editFeedback = await feedbackTable.update([{ id, fields }]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        editFeedback,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
