const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id, name } = req.body;
  const designers = await query({
    query: `
    mutation {
      insert_designers_one(object: {id: ${id}, name: "${name}"}) {
        id
        name
      }
    }
    `,
  });
  res.statusCode = 200;
  res.json(designers.insert_designers_one);
};
