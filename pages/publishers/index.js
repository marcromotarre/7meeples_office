/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import styles from "../../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import { get_categories, add_category } from "../../src/api/categories";

import Table from "../../src/components/common/table";
import Button from "../../src/components/common/button";

import { get_publishers } from "../../src/api/publishers";
import { useRouter } from "next/router";

export default function publishers() {
  const router = useRouter();
  const [allPublishers, setAllPublishers] = useState([]);
  useEffect(() => {
    getPublishers();
  }, []);
  let getPublishers = async (id) => {
    const publishers = await get_publishers();
    setAllPublishers(publishers);
  };

  const columns = [
    { name: "ID", field: "id", width: "min-content" },
    { name: "Nombre", field: "name", width: "auto" },
    { name: "Imagen", field: "image" },
  ];

  const goToPublisherCreation = () => {
    router.push(`/publishers/add`);
  };

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
      <Button onClick={goToPublisherCreation}>
        <h3>Añadir Editorial</h3>
      </Button>
      <div sx={{ height: "30px", width: "100%" }}></div>
      <Table
        styles={{ width: "80%" }}
        columns={columns}
        data={allPublishers}
      ></Table>
      <div sx={{ height: "30px", width: "100%" }}></div>
    </div>
  );
}
