const { query } = require("./../../../utils/hasura");

export default async (req, res) => {
  const { id, name = "", description = "", image = "", color = "" } = req.body;

  const queryString = `
    mutation MyMutation {
        insert_publishers_one(object: {
            name: "${name}",
            id: ${id}, 
            description: "${description}", 
            image: "${image}",
            color: "${color}"
        }) {
            id,
            name,
            image,
            description 
            color
        }
    }
`;

  const { insert_publishers_one } = await query({
    query: queryString,
  });
  res.statusCode = 200;
  res.json(insert_publishers_one);
};
