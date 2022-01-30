const { feedbackTable } = require('./utils/airtable');

exports.handler = async () => {
  try {
    const feedbackRecords = await feedbackTable
      .select({
        filterByFormula: `NOT({Status} = 'Suggestion')`,
        fields: [
          'Title',
          'FeedbackId',
          'Description',
          'UpvotedBy',
          'TotalUpvotes',
          'Category',
          'Comments',
          'TotalComments',
          'Status',
        ],
      })
      .all();

    const planned = [];
    const inProgress = [];
    const live = [];

    feedbackRecords
      .map((feedback) => ({
        fields: feedback.fields,
      }))
      .filter((feedback) => {
        if (feedback.fields.Status === 'Planned') {
          return planned.push(feedback);
        } else if (feedback.fields.Status === 'In-Progress') {
          return inProgress.push(feedback);
        } else {
          return live.push(feedback);
        }
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        planned,
        inProgress,
        live,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
