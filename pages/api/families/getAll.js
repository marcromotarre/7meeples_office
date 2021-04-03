const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const families = await query({
    query: `
      query {
        families {
            id
            name
            description
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(families);
};
