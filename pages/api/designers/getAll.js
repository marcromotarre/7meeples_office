const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const designers = await query({
    query: `
      query {
        designers {
            id
            name
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(designers);
};
