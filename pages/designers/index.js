/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import { get_designers } from "../../src/api/designers";
import { get_boardgames } from "../../src/api/boardgames";

import Table from "../../src/components/common/table";

import Header from "../../src/components/header";
import { useRouter } from "next/router";

export default function Designers() {
  const router = useRouter();
  const [designers, setDesigners] = useState([]);
  useEffect(() => {
    getDesigners();
  }, []);

  let getDesigners = async () => {
    const boardgames = await get_boardgames();
    const designers = await get_designers();
    if (designers) {
      setDesigners(
        designers
          .map((designer) => {
            const points = boardgames
              .filter((boardgame) => boardgame.designers.includes(designer.id))
              .reduce((acc, { numVotes }) => acc + numVotes, 0);
            return {
              ...designer,
              points,
              description: designer?.description
                ?.substring(0, 70)
                .concat("..."),
            };
          })
          .sort((a, b) => (a.points > b.points ? -1 : 1))
          .map((designer, index) => {
            return { ...designer, index: index + 1 };
          })
      );
    }
  };

  const columns = [
    { name: " ", field: "index", width: "min-content" },
    { name: "points", field: "points", width: "min-content" },
    { name: "ID", field: "id", width: "min-content" },
    { name: "Nombre", field: "name", width: "min-content" },
    { name: "Imagen", field: "image", width: "min-content" },
    { name: "Description", field: "description" },
  ];

  const goToDesignerEdit = (id) => {
    router.push(`/designers/${id}`);
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
