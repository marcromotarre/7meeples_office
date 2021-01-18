import Head from "next/head";
import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
