const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { id, boardgame } = req.body;
  const designers = await query({
    query: `
      mutation {
        update_designers_by_pk(pk_columns: {id: ${id}}, _append: {boardgames: ${boardgame}}) {
          id,boardgames
        }
      }
    `,
  });
  res.statusCode = 200;
  res.json(designers.update_designers_by_pk);
};
