const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const publishers = await query({
    query: `
      query {
        publishers {
            id
            name
            image
            description
            color
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(publishers);
};
