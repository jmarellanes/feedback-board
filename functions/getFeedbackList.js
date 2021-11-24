const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const categoryParam = event.queryStringParameters.categoryParam;
  // First letter to uppercase to match categories on database.
  const categoryParamFormatted =
    categoryParam === 'undefined'
      ? categoryParam
      : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

  const filterCategoryParam = () => {
    return categoryParamFormatted === 'undefined'
      ? `AND({Status} = 'Suggestion', NOT({Category} = ''))`
      : `AND({Status} = 'Suggestion', {Category} = '${categoryParamFormatted}')`;
  };

  const sortByParam = event.queryStringParameters.sortBy;
  const filterSortByParam = () => {
    switch (sortByParam) {
      case 'least-upvotes':
        return [{ field: 'Upvotes' }];
      case 'most-comments':
        return [{ field: 'TotalComments', direction: 'desc' }];
      case 'least-comments':
        return [{ field: 'TotalComments' }];
      default:
        return [{ field: 'Upvotes', direction: 'desc' }];
    }
  };

  try {
    const feedbackRecords = await feedbackTable
      .select({
        filterByFormula: filterCategoryParam(),
        sort: filterSortByParam(),
        fields: [
          'Title',
          'FeedbackId',
          'Description',
          'Upvotes',
          'Category',
          'Comments',
          'TotalComments',
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

    // console.log(categoriesRecords);
    const formattedCategoryList = categoriesRecords
      .map((category) => category.fields.Category.toLocaleLowerCase())
      .filter((category, index, array) => array.indexOf(category) === index);
    const categoriesList = ['all'].concat(formattedCategoryList);

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
