const { commentsTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const feedback_id = event.queryStringParameters.id;
  let topLevelComments = [];

  try {
    const commentsList = await commentsTable
      .select({
        filterByFormula: `{FeedbackId} = '${feedback_id}'`,
        sort: [{ field: 'Timestamp' }],
      })
      .all();

    const allComments = commentsList.map((comment) => ({
      fields: comment.fields,
    }));

    topLevelComments = commentsList
      .map((comment) => ({
        fields: comment.fields,
      }))
      .filter(function (comment) {
        if (!comment.fields.ParentId) return topLevelComments.push(comment);
        return null;
      });

    return {
      statusCode: 200,
      body: JSON.stringify({ allComments, topLevelComments }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
