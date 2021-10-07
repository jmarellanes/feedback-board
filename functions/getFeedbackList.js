const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const categorySlug = event.queryStringParameters.categorySlug;

  const filterSlug = () => {
    return categorySlug === 'undefined'
      ? `AND({Status} = 'Suggestion', NOT({Category} = ''))`
      : `AND({Status} = 'Suggestion', {Category} = '${categorySlug}')`;
  };

  try {
    const feedbackRecords = await feedbackTable
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
    const categoriesRecords = await feedbackTable
      .select({
        sort: [{ field: 'Status' }],
        fields: ['Category', 'Status'],
      })
      .all();

    // Formatting Data
    const feedbackList = feedbackRecords.map((feedback) => ({
      fields: feedback.fields,
    }));

    const formattedCategoryList = categoriesRecords
      .map((category) => category.fields.Category)
      .filter((category, index, array) => array.indexOf(category) === index);
    const categoriesList = ['All'].concat(formattedCategoryList);

    const statusList = categoriesRecords
      .map((status) => status.fields.Status)
      .filter((status) => status !== 'Suggestion')
      .reduce(
        (acc, value) => {
          const { data, map } = acc;
          const index = map.get(value);
          if (map.has(value)) {
            data[index][1]++;
          } else {
            map.set(value, data.push([value, 1]) - 1);
          }
          return { data, map };
        },
        {
          data: [],
          map: new Map(),
        }
      ).data;

    return {
      statusCode: 200,
      body: JSON.stringify({
        feedbackList,
        categoriesList,
        statusList,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to query records on Database'),
    };
  }
};
