const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;
  const mechanism = await query({
    query: `
        query {
            mechanisms_by_pk(id: ${id}) {
                id, name, webname, description
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(mechanism.mechanisms_by_pk);
};
