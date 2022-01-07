const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const feedback_id = event.queryStringParameters.id;
  console.log(feedback_id);

  try {
    const upvotesRecords = await feedbackTable
      .select({
        filterByFormula: `RECORD_ID() = '${feedback_id}'`,
        fields: ['UpvotedBy'],
      })
      .all();

    const upvotesList = upvotesRecords.map((upvote) => {
      return upvote.fields.UpvotedBy;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(upvotesList),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
