const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const families = await query({
    query: `
      query {
        families {
            id
            name
            description
            webname
            description
            type
            color
            full
            image
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(families);
};
