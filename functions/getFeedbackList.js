const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const categorySlug = event.queryStringParameters.categorySlug;

  const filterSlug = () => {
    return categorySlug === 'undefined'
      ? `AND({Status} = 'Suggestion', NOT({Category} = ''))`
      : `AND({Status} = 'Suggestion', {Category} = '${categorySlug}')`;
  };

  try {
    const feedbackList = await feedbackTable
      .select({
        filterByFormula: filterSlug(),
        sort: [{ field: 'Upvotes', direction: 'desc' }],
        fields: [
          'Title',
          'FeedbackId',
          'Description',
          'Upvotes',
          'Category',
          'Comments',
          'Status',
        ],
      })
      .all();
    const categories = await feedbackTable
      .select({
        filterByFormula: `{Status} = 'Suggestion'`,
        fields: ['Category'],
      })
      .all();

    const formattedFeedbackList = feedbackList.map((feedback) => ({
      fields: feedback.fields,
    }));
    const formattedCategoryList = categories
      .map((category) => category.fields.Category)
      .filter((category, index, array) => array.indexOf(category) === index);
    const categoriesList = ['All'].concat(formattedCategoryList);

    return {
      statusCode: 200,
      body: JSON.stringify({
        formattedFeedbackList,
        categoriesList,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
