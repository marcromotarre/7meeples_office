import Head from "next/head";
import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { get_user } from "../src/api/credentials";
import Header from "../src/components/header";
var passwordHash = require("password-hash");
/*
  next auth
  https://next-auth.js.org/getting-started/example
 */

export default function Home() {
  useEffect(() => {
    var hashedPassword = passwordHash.generate("1234");
    console.log(hashedPassword);
    boom();
  }, []);
  const boom = async () => {
    const user = await get_user({
      email: "marcromotarre@gmail.com",
      password: "1234",
    });
    console.log("user", user);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>

      <main className={styles.main}>
        <Link href={`/new`}>
          <Button variant="outlined" color="primary">
            Add new game
          </Button>
        </Link>
        <Link href={`/boardgames`}>
          <Button variant="outlined" color="primary">
            Boardgames
          </Button>
        </Link>
        <Link href={`/categories`}>
          <Button variant="outlined" color="primary">
            Categories
          </Button>
        </Link>
        <Link href={`/mechanisms`}>
          <Button variant="outlined" color="primary">
            mechanisms
          </Button>
        </Link>
        <Link href={`/designers`}>
          <Button variant="outlined" color="primary">
            Designers
          </Button>
        </Link>
      </main>
    </div>
  );
}
