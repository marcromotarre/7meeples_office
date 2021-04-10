const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { id, name, image, description, color } = req.body;
  const { update_publishers_by_pk } = await query({
    query: `
    mutation {
        update_publishers_by_pk(pk_columns: {id: ${id}}, 
            _set: {
                name: "${name}", 
                image: "${image}", 
                description: "${description}"
                color: "${color}"
            }) {
                name
                image
                description
                color
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(update_publishers_by_pk);
};
