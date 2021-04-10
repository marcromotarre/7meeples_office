const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;

  const queryString = `
    mutation MyMutation {
        delete_publishers_by_pk(id: ${id}) {
        id
        }
    }
`;

  const { delete_publishers_by_pk } = await query({
    query: queryString,
  });
  res.statusCode = 200;
  res.json(delete_publishers_by_pk);
};
