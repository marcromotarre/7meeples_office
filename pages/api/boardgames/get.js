const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id } = req.body;
  const boardgame = await query({
    query: `
      query {
        boardgames_by_pk(id: ${id}) {
          id
          age
          average
          categories
          description
          designers
          expansionOf
          expansions
          year
          webname
          weight
          playTimeMin
          playTimeMax
          numberOfPlayersNotRecommended
          numberOfPlayersBest
          numberOfPlayers
          numVotes
          name
          mechechanisms
          images
          image
          PVP
          price
          stock
          active
          publishers
        }
      }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.boardgames_by_pk);
};
