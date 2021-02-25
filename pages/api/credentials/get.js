const { query } = require("../../../utils/hasura");
var passwordHash = require("password-hash");

export default async (req, res) => {
  const { email, password } = req.body;
  const { credentials } = await query({
    query: `
      query {
          credentials(where: {email: {_eq: "${email}"}}) {
            email
            password
          }
        }
    `,
  });
  if (credentials?.length > 0) {
    if (passwordHash.verify(password, credentials[0].password)) {
      res.statusCode = 200;
      res.json({ email: credentials[0].email });
    } else {
      res.statusCode = 200;
      res.json({ error: "password incorrect" });
    }
  }

  res.statusCode = 200;
  res.json({ error: "user does not exist" });
};
