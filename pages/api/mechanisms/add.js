const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id, name, webname = "", description = "" } = req.body;
  const mechanism = await query({
    query: `
    mutation {
      insert_mechanisms_one(object: {id: ${id}, name: "${name}", webname: "${webname}", description: "${description}"}) {
        id
        name,
        webname,
        description
      }
    }
    `,
  });
  res.statusCode = 200;
  res.json(mechanism.insert_mechanisms_one);
};
