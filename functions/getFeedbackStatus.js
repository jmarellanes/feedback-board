const { feedbackTable, statusTable } = require('./utils/airtable');

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

    const statusRecords = await statusTable
      .select({
        sort: [{ field: 'Order' }],
      })
      .all();

    const formattedRecords = feedbackRecords
      .map((feedback) => ({
        fields: feedback.fields,
      }))
      .reduce(
        (acc, value) => {
          const { live, planned, inProgress } = acc;

          if (value.fields.Status === 'Planned') {
            planned.push(value);
          } else if (value.fields.Status === 'In-Progress') {
            inProgress.push(value);
          } else {
            live.push(value);
          }
          return { planned, inProgress, live };
        },
        {
          planned: [],
          inProgress: [],
          live: [],
        }
      );

    const statusList = statusRecords
      .map((status) => status.fields)
      .filter((status) => status['Status'] !== 'Suggestion');

    return {
      statusCode: 200,
      body: JSON.stringify({
        statusList,
        planned: formattedRecords.planned,
        inProgress: formattedRecords.inProgress,
        live: formattedRecords.live,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
