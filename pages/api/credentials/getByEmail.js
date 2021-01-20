const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { email } = req.body;
  const user = await query({
    query: `
      query {
        credentials(where: {email: {_eq: "${email}"}}) {
          id
        }
      }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.user);
};
