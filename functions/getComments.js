const { commentsTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const feedback_id = event.queryStringParameters.id;

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

    const topLevelComments = commentsList
      .map((comment) => ({
        fields: comment.fields,
      }))
      .filter((comment) => {
        if (!comment.fields.ParentID) return comment;
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
