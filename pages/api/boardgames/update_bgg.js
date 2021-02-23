const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const {
    id,
    name,
    categories,
    mechanisms,
    designers,
    age,
    weight,
    playTimeMin,
    playTimeMax,
    numberOfPlayers,
    numberOfPlayersBest,
    numberOfPlayersNotRecommended,
    average,
    numVotes,
    expansions,
    expansionOf,
    year,
  } = req.body;
  const boardgame = await query({
    query: `
    mutation {
        update_boardgames_by_pk(pk_columns: {id: ${id}}, 
            _set: {
              playTimeMin: ${playTimeMin}, 
              playTimeMax: ${playTimeMax}, 
              numberOfPlayersNotRecommended: [${numberOfPlayersNotRecommended}], 
              numberOfPlayersBest: [${numberOfPlayersBest}], 
              numberOfPlayers: [${numberOfPlayers}], 
              name: "${name}",
              mechechanisms: [${mechanisms}], 
              year: ${year}, 
              weight: ${weight},
              designers: [${designers}], 
              expansions: [${expansions}], 
              expansionOf: [${expansionOf}], 
              age: ${age}, 
              average: ${average},
              numVotes: ${numVotes},
              categories: [${categories}]
            }) {
                id
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.boardgames_by_pk);
};
