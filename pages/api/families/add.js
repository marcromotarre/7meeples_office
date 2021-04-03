const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id, name } = req.body;
  const { insert_families_one } = await query({
    query: `
    mutation {
      insert_families_one(object: {id: ${id}, name: "${name}"}) {
        id
        name
      }
    }
    `,
  });

  res.statusCode = 200;
  res.json(insert_families_one);
};
