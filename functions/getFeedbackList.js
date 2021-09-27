const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  try {
    const feedbackList = await feedbackTable
      .select({
        fields: [
          'Title',
          'FeedbackId',
          'Description',
          'Upvotes',
          'Category',
          'Comments',
        ],
      })
      .firstPage();
    const formattedFeedbackList = feedbackList.map((feedback) => ({
      fields: feedback.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedFeedbackList),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};