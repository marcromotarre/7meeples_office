const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const boardgames = await query({
    query: `
      query {
        boardgames {
            id
            name
            webname
            designers
            numVotes
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(boardgames);
};
