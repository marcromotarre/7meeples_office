import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { get_category, update_category } from "../../src/api/categories";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

import MuiAlert from "@material-ui/lab/Alert";

import Button from "@material-ui/core/Button";
import { get_mechanisms, get_mechanism } from "../../src/api/mechanisms";
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90,
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Mechanism() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [category, setCategory] = useState({});
  const [webname, setWebname] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      getMechanism(router.query.id);
    }
  }, [router.query.id]);
  let getMechanism = async (id) => {
    const mechanism = await get_mechanism({ id });
    setId(mechanism.id);
    setCategory(mechanism);
    setWebname(mechanism.webname);
    setName(mechanism.name);
  };

  const webnameChange = (event) => {
    setWebname(event.target.value);
  };
  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSave = async () => {
    console.log("saved");
    const category = await update_category({ id, name, webname, description });
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const classes = useStyles();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Categoria guardada
          </Alert>
        </Snackbar>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Link href={`/mechanisms/`}>
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
          value={id}
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
          value={name}
          variant="filled"
        />
        <TextField
          label="webname"
          style={{ margin: 8 }}
          onChange={webnameChange}
          placeholder={
            webname
              ? webname
              : "Escribe aqui el nombre que quieres que se vea en la web"
          }
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={webname}
          variant="filled"
        />
        <TextField
          label="description"
          style={{ margin: 8 }}
          onChange={descriptionChange}
          placeholder={description ? description : "Añade una descripcion"}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={description}
          variant="filled"
        />

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={onSave}
        >
          <SaveIcon />
        </IconButton>
      </main>
    </div>
  );
}
