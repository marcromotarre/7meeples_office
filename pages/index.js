/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import Button from "../src/components/common/button";
import Link from "next/link";
import { get_user } from "../src/api/credentials";
import Header from "../src/components/header";
import { useRouter } from "next/router";
var passwordHash = require("password-hash");

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    var hashedPassword = passwordHash.generate("1234");
    boom();
  }, []);
  const boom = async () => {
    const user = await get_user({
      email: "marcromotarre@gmail.com",
      password: "1234",
    });
  };

  const goToNew = () => {
    router.push(`/new`);
  };

  const goToBoardgames = () => {
    router.push(`/boardgames`);
  };
  const goToCategories = () => {
    router.push(`/categories`);
  };
  const goToMechanisms = () => {
    router.push(`/mechanisms`);
  };
  const goToDesigners = () => {
    router.push(`/designers`);
  };

  const goToPublishers = () => {
    router.push(`/publishers`);
  };
  return (
    <div className={styles.container}>
      <Header></Header>
      <div
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "100%",
          rowGap: "10px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Button sx={{ width: "fit-content" }} onClick={goToNew}>
          <h1>Añadir Juego</h1>
        </Button>
        <Button sx={{ width: "fit-content" }} onClick={goToBoardgames}>
          <h1>Juegos de Mesa</h1>
        </Button>
        <Button sx={{ width: "fit-content" }} onClick={goToCategories}>
          <h1>Categorias</h1>
        </Button>
        <Button sx={{ width: "fit-content" }} onClick={goToMechanisms}>
          <h1>Mecanicas</h1>
        </Button>
        <Button sx={{ width: "fit-content" }} onClick={goToDesigners}>
          <h1>Diseñadores</h1>
        </Button>
        <Button sx={{ width: "fit-content" }} onClick={goToPublishers}>
          <h1>Editoriales</h1>
        </Button>
      </div>
    </div>
  );
}
