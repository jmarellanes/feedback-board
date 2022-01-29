const { feedbackTable } = require('./utils/airtable');

exports.handler = async () => {
  try {
    const statusRecords = await feedbackTable
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

    statusRecords
      .map((status) => ({
        fields: status.fields,
      }))
      .filter((status) => {
        if (status.fields.Status === 'Planned') {
          return planned.push(status);
        } else if (status.fields.Status === 'In-Progress') {
          return inProgress.push(status);
        } else {
          return live.push(status);
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
