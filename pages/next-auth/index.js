import React, { useState } from "react";
import { signOut, useSession, signIn } from "next-auth/client";
import SignIn from "../auth/credentials-signin";
import axios from "axios";
import { get_user } from "../../src/api/credentials";
import jwt from "next-auth/jwt";
export default function Page() {
  const [session, loading] = useSession();
  const [email, setEmail] = useState("marcromotarre@gmail.com");
  const [password, setPassword] = useState("1234");
  console.log(session);

  const t = async () => {
    const token = await jwt.getToken({ req, secret });
    console.log("token", token);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const goIn = async () => {
    const user = await get_user({ email, password });
    console.log(user);
    if (!user.error) {
      const { id, email } = user;
      if (id && email) {
        signIn("credentials", { id, email });
      }
    }
  };
  return (
    <>
      {!session && (
        <>
          <label>
            Username
            <input
              name="username"
              onChange={onEmailChange}
              type="text"
              value={email}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="text"
              onChange={onPasswordChange}
              value={password}
            />
          </label>
          <button onClick={goIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
          <button onClick={t}>token</button>
        </>
      )}
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
