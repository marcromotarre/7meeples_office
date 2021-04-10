const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const {
    id,
    name,
    description,
    webname = "",
    full = false,
    type = "",
    color = "#fff",
    image = "",
  } = req.body;
  const { update_families_by_pk } = await query({
    query: `
    mutation {
        update_families_by_pk(pk_columns: {id: ${id}}, _set: {
          description: "${description}", 
          name: "${name}", 
          type: "${type}", 
          color: "${color}", 
          webname: "${webname}",
          image: "${image}"
        }) {
          description
          id
          name
          type
          full
          color
        }
      }
      
    `,
  });
  res.statusCode = 200;
  res.json(update_families_by_pk);
};
