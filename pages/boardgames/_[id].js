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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { useSession } from "next-auth/client";

import {
  get_boardgames,
  get_boardgame,
  update_boardgame,
} from "../../src/api/boardgames";
import { Checkbox } from "@material-ui/core";
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

export default function Boardgame() {
  const router = useRouter();
  const [boardgame, setBoardgame] = useState({});
  const [PVP, setPVP] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [webname, setWebname] = useState("");
  const [active, setActive] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (router.query.id) {
      getBoardgame(router.query.id);
    }
  }, [router.query.id]);
  let getBoardgame = async (id) => {
    const boardgame = await get_boardgame({ id });
    if (boardgame) {
      setBoardgame(boardgame);
      setWebname(boardgame.webname);
      setPVP(boardgame.PVP);
      setPrice(boardgame.price);
      setStock(boardgame.stock);
      setActive(boardgame.active);
    }
  };

  const webnameChange = (event) => {
    setWebname(event.target.value);
  };

  const stockChange = (event) => {
    setStock(event.target.value);
  };

  const priceChange = (event) => {
    setPrice(event.target.value);
  };

  const pvpChange = (event) => {
    setPVP(event.target.value);
  };

  const activeChange = (event) => {
    setActive(event.target.checked);
  };

  const onSave = async () => {
    const b = await update_boardgame({
      id: boardgame.id,
      webname,
      price: parseFloat(price),
      PVP: parseFloat(PVP),
      active,
      stock: parseInt(stock),
    });
    //setSnackbarOpen(true);
  };

  const changePublisher = (event, index) => {
    let new_publishers = [...publishers];
    new_publishers[index] = event.target.value;
    setPublishers([...new_publishers]);
  };
  const addPublisher = (event) => {
    setPublishers([...publishers, event.target.value]);
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
        {boardgame && (
          <>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Link href={`/boardgames/`}>
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
              value={boardgame.id}
              variant="filled"
            />
            <Checkbox
              checked={active}
              onChange={activeChange}
              color="primary"
            />
            <TextField
              label="name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={boardgame.name}
              variant="filled"
            />

            <TextField
              label="webname"
              style={{ margin: 8 }}
              onChange={webnameChange}
              placeholder={
                "Escribe aqui el nombre que quieres que se vea en la web"
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
              label="stock"
              style={{ margin: 8 }}
              onChange={stockChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={stock}
              variant="filled"
            />

            <TextField
              label="price"
              style={{ margin: 8 }}
              onChange={priceChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={price}
              variant="filled"
            />

            <TextField
              label="PVP"
              style={{ margin: 8 }}
              onChange={pvpChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={PVP}
              variant="filled"
            />

            <InputLabel id="demo-simple-select-label">Editoriales</InputLabel>
            {publishers.map((publisher, index) => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={publisher}
                onChange={(value) => changePublisher(value, index)}
              >
                <MenuItem value={"Devir"}>Devir</MenuItem>
                <MenuItem value={"Maldito Games"}>Maldito</MenuItem>
                <MenuItem value={"Tranjis Games"}>Tranjis</MenuItem>
              </Select>
            ))}

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"hola"}
              onChange={(value) => addPublisher(value)}
            >
              <MenuItem value={"Devir"}>Devir</MenuItem>
              <MenuItem value={"Maldito Games"}>Maldito</MenuItem>
              <MenuItem value={"Tranjis Games"}>Tranjis</MenuItem>
            </Select>

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={onSave}
            >
              <SaveIcon />
            </IconButton>
          </>
        )}
      </main>
    </div>
  );
}
