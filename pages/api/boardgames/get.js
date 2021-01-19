const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;
  const boardgame = await query({
    query: `
        query {
            boardgames_by_pk(id: ${id}) {
                id,
                name, 
                webname, 
                playTimeMin, 
                playTimeMax, 
                numberOfPlayers, 
                categories,
                designers,
                description,
                mechanisms,
                numberOfPlayersBest,
                numberOfPlayersNotRecommended,
                expansions,
                expansionsOf,
                year
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.boardgames_by_pk);
};
