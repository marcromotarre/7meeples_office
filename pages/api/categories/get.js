const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;
  const category = await query({
    query: `
        query {
            categories_by_pk(id: ${id}) {
                id, name, webname, description
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(category.categories_by_pk);
};
