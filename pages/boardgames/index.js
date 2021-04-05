import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { get_categories, add_category } from "../../src/api/categories";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import { get_boardgames, update_boardgame_bgg } from "../../src/api/boardgames";
import Header from "../../src/components/header";
import { BGGParser, getGameFromApiBGG } from "../../utils/BGGParser";
import xml2json from "../../utils/xml2json";
import { get_mechanisms } from "../../src/api/mechanisms";
import { get_families, add_family } from "../../src/api/families";
import { add_designer, get_designers } from "../../src/api/designers";

export default function Boardgames() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getBoardgames();
  }, []);

  let getBoardgames = async () => {
    const boardgames = await get_boardgames();
    if (boardgames) {
      setRows(
        boardgames
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(({ id, name, webname }) => createData(id, name, webname))
      );
    }
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function createData(id, name, webname, description) {
    return { id, name, webname, description };
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const updateBoardgamesBggData = async () => {
    //get all games
    //for each update data
    const boardgames = await get_boardgames();
    let index = 0;
    for (const boardgame of boardgames) {
      loop_boardgame(boardgame, index, boardgames);
      index = index + 1;
      //create designers, mechanics, families, categories
    }
  };

  async function loop_boardgame(boardgame, index, boardgames) {
    let subIndex = 0;
    setTimeout(async function () {
      const data = await getGameFromApiBGG(boardgame.id);
      const {
        id,
        name,
        age,
        year,
        weight,
        players,
        playTime,
        rating,
        categories,
        designers,
        families,
        mechanisms,
        expansions,
        expansionOf,
        image,
      } = data;
      const _designers = await get_designers();
      const _categories = await get_categories();
      const _mechanisms = await get_mechanisms();
      const _families = await get_families();

      designers.forEach((designer) => {
        if (!_designers.some(({ id }) => id === parseInt(designer.id))) {
          add_designer({ id: designer.id, name: designer.name });
          subIndex = subIndex + 1;
          console.log(
            `designer ${designer.id} with name ${designer.name} added `
          );
        }
      });

      categories.forEach((category) => {
        if (!_categories.some(({ id }) => id === parseInt(category.id))) {
          add_category({ id: category.id, name: category.name });
          subIndex = subIndex + 1;
          console.log(
            `category ${category.id} with name ${category.name} added `
          );
        }
      });

      mechanisms.forEach((mechanism) => {
        if (!_mechanisms.some(({ id }) => id === parseInt(mechanism.id))) {
          add_mechanism({ id: mechanism.id, name: mechanism.name });
          subIndex = subIndex + 1;
          console.log(
            `mechanism ${mechanism.id} with name ${mechanism.name} added `
          );
        }
      });

      families.forEach((family) => {
        if (!_families.some(({ id }) => id === parseInt(family.id))) {
          add_family({ id: family.id, name: family.name });
          subIndex = subIndex + 1;
          console.log(`family ${family.id} with name ${family.name} added `);
        }
      });

      update_boardgame_bgg({
        id: parseInt(id),
        name,
        year,
        age,
        weight,
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
        imageDefault: image,
        families: families.map((family) => parseInt(family.id)),
      });

      console.log(`boardgame ${index} of ${boardgames.length}`);
    }, 6000 * index + 1000 * subIndex);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Boardgames</title>
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Link href={`/`}>
            <ArrowBackIosIcon />
          </Link>
        </IconButton>
        <button onClick={updateBoardgamesBggData}>Update BGG Data</button>
        <h1>Boardgames</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Webname</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Link key={row.id} href={`/boardgames/${rows[index].id}`}>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.webname}
                    </StyledTableCell>
                  </StyledTableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}
