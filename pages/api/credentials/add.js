const { query } = require("../../../utils/hasura");

export default async (req, res) => {
  const { email, password } = req.body;
  const user = await query({
    query: `
        mutation {
            insert_users(objects: {email: "${email}", password: "${password}"}) {
                id
                email
            }
        }
    `,
  });
  res.statusCode = 200;
  res.json(user);
};
