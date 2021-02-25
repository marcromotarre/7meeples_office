import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { get_categories } from "../../src/api/categories";

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

export default function Boardgames() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getBoardgames();
  }, []);

  let getBoardgames = async () => {
    const boardgames = await get_boardgames();
    if (boardgames) {
      setRows(
        boardgames.map(({ id, name, webname }) => createData(id, name, webname))
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

    for (const boardgame of boardgames) {
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
        mechanisms,
        expansions,
        expansionOf,
        image,
      } = data;

      const game_updated = await update_boardgame_bgg({
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
      });
    }
  };

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
