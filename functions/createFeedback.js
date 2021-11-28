const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const fields = JSON.parse(event.body);
  Object.assign(fields, { Status: 'Suggestion', Upvotes: 0 });

  try {
    const createdFeedback = await feedbackTable.create([{ fields }]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        createdFeedback,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
