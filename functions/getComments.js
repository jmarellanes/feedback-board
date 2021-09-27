const { commentsTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const feedback_id = event.queryStringParameters.id;

  try {
    const commentsList = await commentsTable
      .select({ filterByFormula: `{FeedbackId} = '${feedback_id}'` })
      .all();
    const formattedCommentList = commentsList.map((feedback) => ({
      fields: feedback.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedCommentList),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
