const { query } = require("./../../../utils/hasura");

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
    imageDefault = "",
  } = req.body;

  const queryString = `
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
        weight: ${weight},
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
        imageDefault: "${imageDefault}",
        categories: [${categories}],}) {
      id,
      name, 
    }
  }
`;

  const boardgame = await query({
    query: queryString,
  });
  res.statusCode = 200;
  res.json(boardgame.insert_boardgames_one);
};
