import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import { useState } from "react";
import { get_user } from "../api/credentials";

export default function Header() {
  const router = useRouter();
  const [session] = useSession();
  console.log(session);
  if (session === null) {
    router.push(`../login`);
  }
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  const [email, setEmail] = useState("marcromotarre@gmail.com");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignIn = async () => {
    const user = await get_user({ email, password });
    if (!user.error) {
      const { id, email } = user;
      if (id && email) {
        signIn("credentials", { id, email });
      }
    }
  };

  return <div className="header"></div>;
}
