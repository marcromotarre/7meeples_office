/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import { get_designers } from "../../src/api/designers";

import Table from "../../src/components/common/table";

import Header from "../../src/components/header";

export default function Designers() {
  const [designers, setDesigners] = useState([]);
  useEffect(() => {
    getDesigners();
  }, []);

  let getDesigners = async () => {
    const designers = await get_designers();
    if (designers) {
      setDesigners(
        designers
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((designer, index) => {
            return { ...designer, index: index + 1 };
          })
      );
    }
  };

  const columns = [
    { name: " ", field: "index", width: "min-content" },
    { name: "ID", field: "id", width: "min-content" },
    { name: "Nombre", field: "name", width: "auto" },
    { name: "Imagen", field: "image" },
    { name: "Description", field: "description" },
  ];

  const goToDesignerEdit = (index) => {};
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
      <Table
        styles={{ width: "80%" }}
        columns={columns}
        data={designers}
        onClick={(id) => goToDesignerEdit(id)}
      ></Table>
      <div sx={{ height: "30px", width: "100%" }}></div>
    </div>
  );
}
