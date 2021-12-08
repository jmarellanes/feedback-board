const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  try {
    const deleteFeedback = await feedbackTable.destroy(id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        deleteFeedback,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
