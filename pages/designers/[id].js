/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
import { get_designer, update_designer } from "../../src/api/designers";
import { useToast } from "../../src/components/common/toast-provider";
import save_icon from "../../src/assets/save-icon.svg";
import Input from "../../src/components/common/input";
import InputTextArea from "../../src/components/common/input-text-area";
import Field from "../../src/components/common/field";
import { TYPES } from "../../src/components/common/toast";

export default function Designer() {
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { addToast } = useToast();
  useEffect(() => {
    if (router.query.id) {
      getDesigner(router.query.id);
    }
  }, [router.query.id]);
  let getDesigner = async (id) => {
    const designer = await get_designer({ id });
    setId(id);
    setImage(designer.image);
    setName(designer.name);
    setDescription(designer.description);
  };

  const saveDesigner = async () => {
    const { error } = await update_designer({ id, name, description, image });
    if (error) {
      addToast({
        type: TYPES.ERROR,
        message: "No se ha podido guardar el diseñador",
        time: "4000",
      });
    } else {
      addToast({
        type: TYPES.SUCCESS,
        message: "Diseñador guardado correctamente",
        time: "4000",
      });
      router.push(`/designers/`);
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
        <h3 sx={{ justifySelf: "center" }}>Editar Familia</h3>
        <Field text={"Id"} defaultValue={id}></Field>
        <Field text={"Nombre"} defaultValue={name}></Field>
        <Input
          onChange={(value) => setImage(value)}
          text={"Imagen"}
          defaultValue={image}
        ></Input>
        <InputTextArea
          onChange={(value) => setDescription(value)}
          text={"Descripcion"}
          defaultValue={description}
        ></InputTextArea>
        <img
          onClick={saveDesigner}
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
