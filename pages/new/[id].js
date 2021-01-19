import Head from "next/head";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BGGParser } from "../../utils/BGGParser";
import { useRouter } from "next/router";
import xml2json from "../../utils/xml2json";
import BoardGameManagerDetails from "../../src/components/boardgame-details";

import styles from "../../styles/Home.module.css";
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

import { List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";
import { add_boardgame } from "../../src/api/boardgames";
import { get_designers, add_designer } from "../../src/api/designers";
import { get_categories, add_category } from "../../src/api/categories";
import { get_mechanisms, add_mechanism } from "../../src/api/mechanisms";

export default function New() {
  const [data, setData] = useState(null);
  const [webname, setWebName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      getGameFromApiBGG(router.query.id);
    }
  }, [router.query.id]);

  const webnameChange = (event) => {
    setWebName(event.target.value);
  };

  const getGameFromApiBGG = async (id) => {
    const result = await axios(
      `https://www.boardgamegeek.com/xmlapi/boardgame/${id}?stats=1`
    );
    var domParser = new DOMParser();
    var xmlDocument = domParser.parseFromString(result.data, "text/xml");
    setData(BGGParser(xml2json(xmlDocument)));
  };

  const onSave = async () => {
    const {
      id,
      name,
      age,
      year,
      players,
      playTime,
      rating,
      categories,
      designers,
      mechanisms,
      expansions,
      expansionOf,
    } = data;

    const _designers = await get_designers();
    designers.forEach((designer) => {
      if (!_designers.some(({ id }) => id === parseInt(designer.id))) {
        add_designer({ id: designer.id, name: designer.name });
        console.log(
          `designer ${designer.id} with name ${designer.name} added `
        );
      }
    });
    const _categories = await get_categories();
    categories.forEach((category) => {
      if (!_categories.some(({ id }) => id === parseInt(category.id))) {
        add_category({ id: category.id, name: category.name });
        console.log(
          `category ${category.id} with name ${category.name} added `
        );
      }
    });
    const _mechanisms = await get_mechanisms();
    mechanisms.forEach((mechanism) => {
      if (!_mechanisms.some(({ id }) => id === parseInt(mechanism.id))) {
        add_mechanism({ id: mechanism.id, name: mechanism.name });
        console.log(
          `mechanism ${mechanism.id} with name ${mechanism.name} added `
        );
      }
    });

    await add_boardgame({
      id: parseInt(id),
      name,
      year,
      webname,
      age,
      categories: categories.map((category) => parseInt(category.id)),
      designers: designers.map((designer) => parseInt(designer.id)),
      playTimeMin: parseInt(playTime.min),
      playTimeMax: parseInt(playTime.max),
      expansions: expansions.map((expansion) => parseInt(expansion)),
      expansionOf: expansionOf.map((expansion) => parseInt(expansion)),
      mechanisms: mechanisms.map((mechanism) => parseInt(mechanism.id)),
      average: parseFloat(rating.average),
      numVotes: parseInt(rating.numVotes),
      numberOfPlayers: players.number,
      numberOfPlayersBest: players.best,
      numberOfPlayersNotRecommended: players.no,
    });
  };
  console.log("data", data);

  return (
    <div>
      <Head>
        <title>Nuevo Juego de mesa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data && (
        <main>
          <div>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Link href={`/new/`}>
                <ArrowBackIosIcon />
              </Link>
            </IconButton>
            <TextField
              label="id"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={data.id}
              variant="filled"
            />
            <TextField
              label="name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={data.name}
              variant="filled"
            />
            <TextField
              label="webname"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={
                "Escribe aqui el nombre que quieres que se vea en la web"
              }
              onChange={webnameChange}
              value={webname}
              variant="filled"
            />
            <List>
              <li key={`designers`}>
                <ul>
                  <ListSubheader>{`designers`}</ListSubheader>
                  {data.designers.map((designer) => (
                    <ListItem key={`${designer.id}`}>
                      <ListItemText primary={`${designer.id}`} />
                      <ListItemText primary={`${designer.name}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            </List>
            <List>
              <li key={`categories`}>
                <ul>
                  <ListSubheader>{`categories`}</ListSubheader>
                  {data.categories.map((category) => (
                    <ListItem key={`${category.id}`}>
                      <ListItemText primary={`${category.id}`} />
                      <ListItemText primary={`${category.name}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            </List>
            <List>
              <li key={`mechanisms`}>
                <ul>
                  <ListSubheader>{`mechanisms`}</ListSubheader>
                  {data.mechanisms.map((mechanism) => (
                    <ListItem key={`${mechanism.id}`}>
                      <ListItemText primary={`${mechanism.id}`} />
                      <ListItemText primary={`${mechanism.name}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            </List>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={onSave}
            >
              <SaveIcon />
            </IconButton>
          </div>
        </main>
      )}
    </div>
  );
}
