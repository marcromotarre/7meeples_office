const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;
  const { families_by_pk } = await query({
    query: `
        query {
            families_by_pk(id: ${id}) {
                id, name, webname, description
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(families_by_pk);
};
