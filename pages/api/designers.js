const { query } = require("./../../utils/hasura");

export default async (req, res) => {
  const boardgames = await query({
    query: `
      query {
          desginers {
              id
              image
              images
              name
              playMaxTime
              playMinTime
              numberOfPlayers
          }
      }
    `,
  });
  res.statusCode = 200;
  res.json(boardgames);
};
