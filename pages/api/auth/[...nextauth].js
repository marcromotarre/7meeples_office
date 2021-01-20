import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { get_user } from "./../../../src/api/credentials";
//https://next-auth.js.org/providers/credentials
const options = {
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        const { id, email } = credentials;
        const user = {
          id,
          email,
          name: "marc romo",
        };
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
