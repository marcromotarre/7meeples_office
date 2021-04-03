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

export default function Category() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [category, setCategory] = useState({});
  const [webname, setWebname] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      getCategory(router.query.id);
    }
  }, [router.query.id]);
  let getCategory = async (id) => {
    const category = await get_category({ id });
    setId(id);
    setCategory(category);
    setWebname(category.webname);
    setName(category.name);
    setDescription(category.description);
    setImage(category.image);
  };

  const webnameChange = (event) => {
    setWebname(event.target.value);
  };
  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const imageChange = (event) => {
    setImage(event.target.value);
  };

  const onSave = async () => {
    const category = await update_category({
      id,
      name,
      webname,
      description,
      image,
    });
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
            Categoria guardada
          </Alert>
        </Snackbar>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Link href={`/categories/`}>
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

        <TextField
          label="imagen"
          style={{ margin: 8 }}
          onChange={imageChange}
          placeholder={image ? image : "Añade una imagen"}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={image}
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
