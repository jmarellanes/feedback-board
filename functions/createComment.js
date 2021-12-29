const { commentsTable } = require('./utils/airtable');

exports.handler = async (event) => {
  const fields = JSON.parse(event.body);

  try {
    const createdComment = await commentsTable.create([{ fields }]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        createdComment,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
