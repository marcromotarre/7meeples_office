const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { id, name, webname, description, image } = req.body;

  const { update_categories_by_pk } = await query({
    query: `
    mutation {
        update_categories_by_pk(pk_columns: {id: ${id}}, _set: {description: "${description}", name: "${name}", webname: "${webname}", image: "${image}"}) {
          description
          id
          name
          webname
          image
        }
      }
      
    `,
  });

  res.statusCode = 200;
  res.json(update_categories_by_pk);
};
