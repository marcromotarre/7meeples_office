const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { id, PVP, active, stock, price, webname } = req.body;
  console.log(id, PVP, active, stock, price, webname);
  const boardgame = await query({
    query: `
    mutation {
        update_boardgames_by_pk(pk_columns: {id: ${id}}, 
            _set: {
                PVP: ${PVP}, 
                active: ${active}, 
                stock: ${stock}, 
                price: ${price}, 
                webname: "${webname}"
            }) {
                active
                stock
                price
                webname
                PVP
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(boardgame.boardgames_by_pk);
};
