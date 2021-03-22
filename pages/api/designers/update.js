const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { id, name, description } = req.body;
  const { update_designers_by_pk } = await query({
    query: `
    mutation {
        update_designers_by_pk(pk_columns: {id: ${id}}, _set: {description: "${description}", name: "${name}"}) {
          description
          id
          name
        }
      }
      
    `,
  });
  res.statusCode = 200;
  res.json(update_designers_by_pk);
};