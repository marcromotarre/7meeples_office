const { query } = require("../../../utils/hasura");
var passwordHash = require("password-hash");

export default async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  const user = await query({
    query: `
      query {
          credentials(where: {email: {_eq: "${email}"}}) {
            id
            email
            password
          }
        }
    `,
  });
  if (user.credentials.length > 0) {
    const credentials = user.credentials[0];
    console.log(
      "credentials",
      passwordHash.verify(password, credentials.password),
      user.credentials[0].password,
      password
    );
    if (passwordHash.verify(password, credentials.password)) {
      res.json({ id: credentials.id, email: credentials.email });
    } else {
      res.statusCode = 200;
      res.json({ error: "password incorrect" });
    }
  }

  res.statusCode = 200;
  res.json({ error: "user does not exist" });
};
