const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const categories = await query({
    query: `
      query {
        categories {
            id
            name
            webname
            description
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(categories);
};
