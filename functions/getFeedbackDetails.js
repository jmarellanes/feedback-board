const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const feedback_id = event.queryStringParameters.id;

  try {
    const feedbackList = await feedbackTable
      .select({ filterByFormula: `RECORD_ID() = '${feedback_id}'` })
      .all();
    const formattedFeedbackList = feedbackList.map((feedback) => ({
      fields: feedback.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedFeedbackList),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};