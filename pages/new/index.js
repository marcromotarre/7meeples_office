import Head from "next/head";

import React, { useState, useEffect } from "react";
import { BGGParser } from "../../utils/BGGParser";
import xml2json from "../../utils/xml2json";
import BoardGameManagerDetails from "../../src/components/boardgame-details";

import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

export default function New() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const idChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Nuevo Juego de mesa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!data && (
          <div>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Link href={`/`}>
                <ArrowBackIosIcon />
              </Link>
            </IconButton>
            <TextField
              label="Id"
              style={{ margin: 8 }}
              onChange={idChange}
              placeholder={id ? id : "Añade el id de un juego de la BGG"}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={id}
              variant="filled"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Link href={`/new/${id}`}>
                <SearchIcon />
              </Link>
            </IconButton>
          </div>
        )}
        {data && (
          <BoardGameManagerDetails
            boardGameData={data}
          ></BoardGameManagerDetails>
        )}
      </main>
    </div>
  );
}

/*

<div>
            <label>
              Id:
              <input
                onChange={onInputchange}
                value={id}
                type="text"
                name="name"
              />
            </label>
            <button onClick={() => getBoardgameBGG()}>Buscar</button>
          </div>
*/
