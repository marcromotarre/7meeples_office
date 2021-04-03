const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const {
    id,
    name,
    categories,
    mechanisms,
    designers,
    families,
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
    imageDefault = "",
  } = req.body;

  const queryString = `
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
            families: [${families}], 
            expansions: [${expansions}], 
            expansionOf: [${expansionOf}], 
            age: ${age}, 
            average: ${average},
            numVotes: ${numVotes},
            imageDefault: "${imageDefault}",
            categories: [${categories}]
          }) {
              id
          }
      }
  `;

  const { boardgames_by_pk } = await query({
    query: queryString,
  });
  res.statusCode = 200;
  res.json(boardgames_by_pk);
};
