import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { get_designer, update_designer } from "../../src/api/designers";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "../../src/components/header";

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

export default function Designer() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      getDesigner(router.query.id);
    }
  }, [router.query.id]);
  let getDesigner = async (id) => {
    const designer = await get_designer({ id });
    setId(id);
    setName(designer.name);
    setDescription(designer.description);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSave = async () => {
    const designer = await update_designer({ id, name, description });
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
      <Header></Header>

      <main className={styles.main}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Diseñador guardado
          </Alert>
        </Snackbar>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Link href={`/designers/`}>
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
