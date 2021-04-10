const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;

  const { publishers_by_pk } = await query({
    query: `
      query {
        publishers_by_pk(id: ${id}) {
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
  res.json(publishers_by_pk);
};
