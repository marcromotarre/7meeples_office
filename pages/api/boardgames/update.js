const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const {
    id,
    PVP,
    active,
    stock,
    price,
    webname,
    publishers,
    description,
  } = req.body;
  const boardgame = await query({
    query: `
    mutation {
        update_boardgames_by_pk(pk_columns: {id: ${id}}, 
            _set: {
                PVP: ${PVP}, 
                active: ${active}, 
                stock: ${stock}, 
                price: ${price}, 
                webname: "${webname}",
                description:"${description}",
                publishers: [${publishers}]
            }) {
                active
                stock
                price
                webname
                PVP
                publishers
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.boardgames_by_pk);
};
