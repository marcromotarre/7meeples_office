/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import styles from "../../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import { get_categories, add_category } from "../../src/api/categories";

import Table from "../../src/components/common/table";
import Button from "../../src/components/common/button";
import Checkbox from "../../src/components/common/checkbox";

import { get_families } from "../../src/api/families";
import { useRouter } from "next/router";

export default function families() {
  const router = useRouter();
  const [allFamilies, setAllFamilies] = useState([]);
  const [onlyGames, setOnlyGames] = useState(false);
  useEffect(() => {
    getFamilies();
  }, []);
  let getFamilies = async (id) => {
    const families = await get_families();
    setAllFamilies(families);
  };

  const columns = [
    { name: "ID", field: "id", width: "min-content" },
    { name: "Nombre", field: "name", width: "auto" },
    { name: "Type", field: "type" },
    { name: "Imagen", field: "image" },
    { name: "Color", field: "color" },
  ];

  const goToFamilyCreation = () => {
    router.push(`/families/add`);
  };

  const goToFamilyEdit = (id) => {
    router.push(`/families/${id}`);
  };

  const onlyGameChange = (checked) => {
    setOnlyGames(checked);
  };

  const filteredFamilies = onlyGames
    ? allFamilies.filter((family) => family.name.startsWith("Game:"))
    : allFamilies;

  return (
    <div
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div sx={{ height: "30px", width: "100%" }}></div>
      <Button onClick={goToFamilyCreation}>
        <h3>Añadir Editorial</h3>
      </Button>
      <div sx={{ height: "30px", width: "100%" }}></div>
      <Checkbox
        text={"Solo Juegos"}
        defaultValue={onlyGames}
        onChange={onlyGameChange}
      />
      <Table
        styles={{ width: "80%" }}
        columns={columns}
        data={filteredFamilies}
        onClick={(id) => goToFamilyEdit(id)}
      ></Table>
      <div sx={{ height: "30px", width: "100%" }}></div>
    </div>
  );
}
