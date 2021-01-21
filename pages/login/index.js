import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import { useState } from "react";
import { get_user } from "../../src/api/credentials";

export default function Header() {
  const router = useRouter();
  const [session] = useSession();

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

  return (
    <div className="header">
      {session && (
        <>
          <Link href={`/`}>
            <Button variant="outlined" color="primary">
              Go to main
            </Button>
          </Link>
        </>
      )}
      {!session && (
        <>
          <TextField
            label="email"
            style={{ margin: 8 }}
            onChange={onEmailChange}
            placeholder={"email"}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            variant="filled"
          />
          <TextField
            label="password"
            style={{ margin: 8 }}
            onChange={onPasswordChange}
            placeholder={"password"}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={password}
            variant="filled"
          />
          <Button onClick={handleSignIn} variant="outlined" color="primary">
            Sign In
          </Button>
        </>
      )}
    </div>
  );
}
