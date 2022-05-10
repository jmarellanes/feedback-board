const { feedbackTable, commentsTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const { id, comments } = JSON.parse(event.body);

  function formatArrayComments(arr, arrSize) {
    if (arrSize <= 0) return;

    let formattedArray = [];
    for (var i = 0, len = arr.length; i < len; i += arrSize) {
      formattedArray.push(arr.slice(i, i + arrSize));
    }
    return formattedArray;
  }

  try {
    // No Delete example feeback!!
    if (id === 'recHCLDVqqxozJ2P4') return { statusCode: 200 };

    const deleteFeedback = await feedbackTable.destroy(id);

    if (Array.isArray(comments)) {
      comments.length > 10
        ? await Promise.all(
            formatArrayComments(comments, 10).map((arr) =>
              commentsTable.destroy(arr)
            )
          )
        : await commentsTable.destroy(comments);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        deleteFeedback,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
