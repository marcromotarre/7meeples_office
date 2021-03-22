import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { get_designers } from "../../src/api/designers";

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
import Header from "../../src/components/header";

export default function Designers() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getDesigners();
  }, []);

  let getDesigners = async () => {
    const designers = await get_designers();
    if (designers) {
      setRows(
        designers
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(({ id, name, description }) => createData(id, name, description))
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

  function createData(id, name, description) {
    return { id, name, description };
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const clickOnDesigner = (index) => {};
  return (
    <div className={styles.container}>
      <Head>
        <title>Designers</title>
        <link rel="icon" href="/favicon.ico" />
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
        <h1>Designers</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Link key={row.id} href={`/designers/${rows[index].id}`}>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.description}
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
