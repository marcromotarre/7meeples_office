/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import Input from "../../src/components/common/input";
import InputTextArea from "../../src/components/common/input-text-area";
import Field from "../../src/components/common/field";
import ToastManager from "../../src/components/common/toast-manager";
import Select from "../../src/components/common/multiple-select";
import { get_publishers, add_publisher } from "../../src/api/publishers";

import save_icon from "../../src/assets/save-icon.svg";
import { useRouter } from "next/router";
import { get_boardgame, update_boardgame } from "../../src/api/boardgames";
import ToastProvider, {
  useToast,
} from "../../src/components/common/toast-provider";
import { TYPES } from "../../src/components/common/toast";

export default function PublisherCreation() {
  const router = useRouter();
  const { addToast } = useToast();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const addPublisher = async () => {
    const { error } = await add_publisher({
      id,
      name,
      image,
      description,
      color,
    });
    if (error) {
      addToast({
        type: TYPES.ERROR,
        message: "No se ha podido crear editoriar",
        time: "4000",
      });
    } else {
      addToast({
        type: TYPES.SUCCESS,
        message: "Editorial Creada Correctamente",
        time: "4000",
      });
      router.push(`/publishers/`);
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
          <h3 sx={{ justifySelf: "center" }}>
            Crear Nueva Editorial (No funciona aun)
          </h3>
          <Input onChange={(value) => setId(value)} text={"Id"}></Input>
          <Input onChange={(value) => setName(value)} text={"Nombre"}></Input>
          <Input onChange={(value) => setImage(value)} text={"Imagen"}></Input>
          <Input onChange={(value) => setColor(value)} text={"Color"}></Input>
          <InputTextArea
            onChange={(value) => setDescription(value)}
            text={"Descripcion"}
          ></InputTextArea>
          <img
            onClick={addPublisher}
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
