const { feedbackTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const categoryParam = event.queryStringParameters.categoryParam;

  // First letter to uppercase to match categories on database.
  const categoryParamFormatted =
    categoryParam === 'all'
      ? categoryParam
      : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

  const filterCategoryParam = () => {
    return categoryParamFormatted === 'all'
      ? `AND({Status} = 'Suggestion', NOT({Category} = ''))`
      : `AND({Status} = 'Suggestion', {Category} = '${categoryParamFormatted}')`;
  };

  const sortByParam = event.queryStringParameters.sortBy;
  const filterSortByParam = () => {
    switch (sortByParam) {
      case 'least-upvotes':
        return [{ field: 'TotalUpvotes' }];
      case 'most-comments':
        return [{ field: 'TotalComments', direction: 'desc' }];
      case 'least-comments':
        return [{ field: 'TotalComments' }];
      default:
        return [{ field: 'TotalUpvotes', direction: 'desc' }];
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
          'UpvotedBy',
          'TotalUpvotes',
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

    /* Remove duplicates with filter and indexOf methods
    const categories = ['a', 'b', 'a']
    category    index   indexOf  Condition
        a        0   ===   0       true
        b        1   ===   1       true
        a        2   ===   0       false < removed 
    */
    const formattedCategoryList = categoriesRecords
      .map((category) => category.fields.Category.toLocaleLowerCase())
      .filter((category, index, array) => array.indexOf(category) === index);
    const categoriesList = ['all'].concat(formattedCategoryList);

    /* Group and count elements with reduce method
    > Source:
    const statusList = ['a', 'a', 'b', 'c', 'b', 'b'];
    > Result:
    const statusList = [ ["a",2], ["b",3], ["c",1] ] 

    > The reduce method use two accumulators: 
      array to store the matches ( data: [] ) and map ( controlMap: new Map() ) to compare the data.
      - 1st reducer execution:
        - 'a' value, index 0 from statusList:
          1. index value is 'undefined': map.get('a'),
          2. if statement executes else block because map has() method returns false, 
          3. map set() add { a -> 0 } to controlMap (push returns the length of the array and then minus 1) and push ['a', 1] to the data accumulator array.
          acc = data: [ ['a', 1] ], controlMap: { a -> 0 }
      - 2nd reducer execution:
        - 'a' value, index 1 from statusList:
        1. index value is 0: map.get('a'),
        2. the condition is true and the if statement add 1 to the existing array. After execution returns: 
        acc = data: [ ['a', 2] ], controlMap: { a -> 0 }
    */
    const statusList = categoriesRecords
      .map((status) => status.fields.Status)
      .filter((status) => status !== 'Suggestion')
      .reduce(
        (acc, value) => {
          const { data, controlMap } = acc;
          const index = controlMap.get(value);
          if (controlMap.has(value)) {
            data[index][1]++;
          } else {
            controlMap.set(value, data.push([value, 1]) - 1);
          }
          return { data, controlMap };
        },
        {
          data: [],
          controlMap: new Map(),
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
