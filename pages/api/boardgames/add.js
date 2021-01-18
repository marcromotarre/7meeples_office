const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const {
    id,
    name,
    categories,
    mechanisms,
    designers,
    playTimeMin,
    playTimeMax,
    numberOfPlayers,
    numberOfPlayersBest,
    numberOfPlayersNotRecommended,
    webname = "",
    description = "",
    expansions,
    expansionOf,
    year,
  } = req.body;
  console.log(id, categories, name);
  const boardgame = await query({
    query: `
    mutation MyMutation {
        insert_boardgames_one(object: {
            webname: "", 
            playTimeMin: ${playTimeMin}, 
            playTimeMax: ${playTimeMax}, 
            numberOfPlayersNotRecommended: [${numberOfPlayersNotRecommended}], 
            numberOfPlayersBest: [${numberOfPlayersBest}], 
            numberOfPlayers: [${numberOfPlayers}], 
            name: "${name}",
            mechechanisms: [${mechanisms}], 
            id: ${id}, 
            year: ${year}, 
            description: "", 
            designers: [${designers}], 
            expansions: [${expansions}], 
            expansionOf: [${expansionOf}], 
            categories: [${categories}],}) {
          id,
          name, 
          categories,
        }
      }
    `,
  });
  console.log(boardgame);
  res.statusCode = 200;
  res.json(boardgame.insert_boardgames_one);
};
