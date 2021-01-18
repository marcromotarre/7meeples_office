const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { id, name, webname, description } = req.body;
  const mechanism = await query({
    query: `
    mutation {
        update_mechanisms_by_pk(pk_columns: {id: ${id}}, _set: {description: "${description}", name: "${name}", webname: "${webname}"}) {
          description
          id
          name
          webname
        }
      }
      
    `,
  });
  res.statusCode = 200;
  res.json(mechanism.update_mechanisms_by_pk);
};
