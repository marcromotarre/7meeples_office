/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useEffect, useState } from "react";
import hexa_black from "../../assets/hexa-black.svg";

export default function BoardgameAverage({
  styles,
  average,
  numVotes,
  theme = "white",
}) {
  let num_votes_string = `${numVotes} votos`;
  if (numVotes >= 1000 && numVotes <= 10000) {
    num_votes_string = `${Math.round((numVotes / 1000) * 100) / 100}k votos`;
  } else if (numVotes >= 10000) {
    num_votes_string = `${Math.round(numVotes / 1000)}k votos`;
  }

  average = Math.round(average * 10) / 10;
  let average_string =
    average === 10 ? "10" : average % 1 === 0 ? `${average}.0` : average;

  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "auto",
        justifyItems: "center",
        alignItems: "center",
        rowGap: "0px",
        columnGap: "0px",
        ...styles,
      }}
    >
      <div
        sx={{
          position: "relative",
        }}
      >
        <img sx={{ height: "108px" }} src={hexa_black}></img>
        <span
          sx={{
            textAlign: "center",
            width: "min-content",
            left: "14%",
            fontSize: "18px",
            top: "22%",
            color: "white",
            fontWeight: "400",
            fontSize: "47px",
            position: "absolute",
          }}
        >
          {average_string}
        </span>
      </div>
      <span
        sx={{
          fontSize: "20px",
          fontWeight: "100",
          fontStyle: "italic",
          color: theme === "white" ? "black" : "white",
        }}
      >
        {num_votes_string}
      </span>
    </div>
  );
}
