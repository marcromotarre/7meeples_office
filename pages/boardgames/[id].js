/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import Input from "../../src/components/common/input";
import Field from "../../src/components/common/field";
import InputTextArea from "../../src/components/common/input-text-area";
import Select from "../../src/components/common/multiple-select";
import { get_publishers } from "../../src/api/publishers";

import save_icon from "../../src/assets/save-icon.svg";
import { useRouter } from "next/router";
import { get_boardgame, update_boardgame } from "../../src/api/boardgames";
import { useToast } from "../../src/components/common/toast-provider";
import { TYPES } from "../../src/components/common/toast";
export default function Boardgame() {
  const router = useRouter();
  const { addToast } = useToast();

  const [allPublishers, setAllPublishers] = useState([]);

  const [boardgame, setBoardgame] = useState();
  const [PVP, setPVP] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [webname, setWebname] = useState("");
  const [active, setActive] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    getPublishers();
  }, []);
  let getPublishers = async (id) => {
    const publishers = await get_publishers();
    setAllPublishers(publishers);
  };

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
      setDescription(boardgame.description);
      setPVP(boardgame.PVP);
      setPrice(boardgame.price);
      setStock(boardgame.stock);
      setActive(boardgame.active);
      setPublishers(boardgame.publishers ? boardgame.publishers : []);
    }
  };
  const onSave = async () => {
    const { error } = await update_boardgame({
      id: boardgame.id,
      webname,
      description,
      price: parseFloat(price),
      PVP: parseFloat(PVP),
      active,
      stock: parseInt(stock),
      publishers,
    });

    if (error) {
      addToast({
        type: TYPES.ERROR,
        message: "No se ha podido guardar editoriar",
        time: "4000",
      });
    } else {
      addToast({
        type: TYPES.SUCCESS,
        message: "Editorial Guardada Correctamente",
        time: "4000",
      });
      router.push(`/boardgames/`);
    }
  };
  return (
    <div
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div sx={{ width: "100%", height: "50px" }}></div>
      <div
        sx={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "100%",
          justifyItems: "flex-start",
          alignItems: "center",
          rowGap: "20px",
        }}
      >
        <Field text={"Original Name"} defaultValue={boardgame?.name} />
        {boardgame && (
          <>
            <Input
              onChange={(value) => setWebname(value)}
              text={"Name"}
              defaultValue={webname}
            ></Input>

            <InputTextArea
              onChange={(value) => setDescription(value)}
              text={"Descripcion"}
              defaultValue={description}
            ></InputTextArea>
          </>
        )}
        {allPublishers.length > 0 && (
          <Select
            onChange={(value) => setPublishers(value)}
            options={allPublishers}
            text={"Editoriales"}
            defaultValue={publishers}
          ></Select>
        )}
        <img
          onClick={onSave}
          sx={{
            width: "25px",
            height: "auto",
            alignSelf: "center",
            justifySelf: "center",
          }}
          src={save_icon}
        ></img>
      </div>
    </div>
  );
}
