const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const {
    id,
    name,
    categories,
    mechanisms,
    designers,
    age,
    playTimeMin,
    playTimeMax,
    numberOfPlayers,
    numberOfPlayersBest,
    numberOfPlayersNotRecommended,
    webname = "",
    description = "",
    average,
    numVotes,
    expansions,
    expansionOf,
    year,
    active = false,
    stock = 0,
    PVP = 0,
    price = 0,
  } = req.body;
  console.log("average", average);
  console.log("numVotes", numVotes);
  const boardgame = await query({
    query: `
    mutation MyMutation {
        insert_boardgames_one(object: {
            webname: "${webname}", 
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
            stock: ${stock}, 
            active: ${active}, 
            PVP: ${PVP}, 
            price: ${price}, 
            age: ${age}, 
            average: ${average},
            numVotes: ${numVotes},
            categories: [${categories}],}) {
          id,
          name, 
        }
      }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.insert_boardgames_one);
};
