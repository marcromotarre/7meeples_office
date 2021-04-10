/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import Input from "../../src/components/common/input";
import InputTextArea from "../../src/components/common/input-text-area";
import Field from "../../src/components/common/field";
import ToastManager from "../../src/components/common/toast-manager";
import Select from "../../src/components/common/multiple-select";
import {
  delete_publisher,
  get_publisher,
  update_publisher,
} from "../../src/api/publishers";

import save_icon from "../../src/assets/save-icon.svg";
import { useRouter } from "next/router";
import { get_boardgame, update_boardgame } from "../../src/api/boardgames";
import ToastProvider, {
  useToast,
} from "../../src/components/common/toast-provider";
import { TYPES } from "../../src/components/common/toast";
import Button from "../../src/components/common/button";

export default function PublisherCreation() {
  const router = useRouter();
  const { addToast } = useToast();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (router.query.id) {
      getPublisher(router.query.id);
    }
  }, [router.query.id]);
  let getPublisher = async (id) => {
    const publisher = await get_publisher({ id });

    if (publisher) {
      setName(publisher.name);
      setImage(publisher.image);
      setDescription(publisher.description);
      setId(publisher.id);
      setColor(publisher.color);
    }
  };
  const onSave = async () => {
    const b = await update_boardgame({
      id: boardgame.id,
      webname,
      price: parseFloat(price),
      PVP: parseFloat(PVP),
      active,
      stock: parseInt(stock),
      publishers,
    });
  };

  const savePublisher = async () => {
    const { error } = await update_publisher({
      id,
      name,
      image,
      description,
      color,
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
      router.push(`/publishers/`);
    }
  };

  const deletePublisher = async () => {
    const { id: deleted_id } = await delete_publisher({ id });
    if (deleted_id) {
      addToast({
        type: TYPES.SUCCESS,
        message: "Editorial Borrada Correctamente",
        time: "4000",
      });
      router.push(`/publishers/`);
    } else {
      addToast({
        type: TYPES.ERROR,
        message: "No se ha podido borrar editoriar",
        time: "4000",
      });
    }
  };
  return (
    <ToastProvider>
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
          <h3 sx={{ justifySelf: "center" }}>Editar Editorial</h3>
          <Button styles={{ justifySelf: "end" }} onClick={deletePublisher}>
            <h3>Eliminar Editorial</h3>
          </Button>
          <Field text={"Id"} defaultValue={id}></Field>
          <Input
            onChange={(value) => setName(value)}
            text={"Nombre"}
            defaultValue={name}
          ></Input>
          <Input
            onChange={(value) => setImage(value)}
            text={"Imagen"}
            defaultValue={image}
          ></Input>
          <Input
            onChange={(value) => setColor(value)}
            text={"Color"}
            defaultValue={color}
          ></Input>
          <InputTextArea
            onChange={(value) => setDescription(value)}
            text={"Descripcion"}
            defaultValue={description}
          ></InputTextArea>
          <img
            onClick={savePublisher}
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
    </ToastProvider>
  );
}
