const { commentsTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const feedback_id = event.queryStringParameters.id;
  let comments = [];
  let replies = [];

  try {
    const commentsList = await commentsTable
      .select({
        filterByFormula: `{FeedbackId} = '${feedback_id}'`,
        sort: [{ field: 'Timestamp' }],
      })
      .all();

    commentsList
      .map((comment) => ({
        fields: comment.fields,
      }))
      .filter(function (comment) {
        if (!comment.fields.ParentId) {
          comments.push(comment);
          return true;
        }
        replies.push(comment);
        return false;
      });

    return {
      statusCode: 200,
      body: JSON.stringify({ comments, replies }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
