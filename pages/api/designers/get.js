const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;
  const designer = await query({
    query: `
        query {
            designers_by_pk(id: ${id}) {
                id, name, description
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(designer.designers_by_pk);
};
