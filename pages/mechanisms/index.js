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
import { get_mechanism, get_mechanisms } from "../../src/api/mechanisms";

export default function Home() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getMechanisms();
  }, []);

  let getMechanisms = async () => {
    const mechanisms = await get_mechanisms();
    setRows(
      mechanisms.map(({ id, name, webname, description }) =>
        createData(id, name, webname, description)
      )
    );
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

  const clickOnCategory = (index) => {
    console.log("category", index);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Mechanisms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        <h1>Mechanisms</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Webname</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Link href={`/mechanisms/${rows[index].id}`}>
                  <StyledTableRow
                    key={row.id}
                    onClick={() => clickOnCategory(index)}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.webname}
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
