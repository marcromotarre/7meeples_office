/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import Input from "../../src/components/common/input";
import InputTextArea from "../../src/components/common/input-text-area";
import Field from "../../src/components/common/field";
import ToastManager from "../../src/components/common/toast-manager";
import Select from "../../src/components/common/multiple-select";
import { get_family, update_family } from "../../src/api/families";

import save_icon from "../../src/assets/save-icon.svg";
import { useRouter } from "next/router";
import { get_boardgame, update_boardgame } from "../../src/api/boardgames";
import ToastProvider, {
  useToast,
} from "../../src/components/common/toast-provider";
import { TYPES } from "../../src/components/common/toast";

export default function FamilyCreation() {
  const router = useRouter();
  const { addToast } = useToast();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [webname, setWebname] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (router.query.id) {
      getFamily(router.query.id);
    }
  }, [router.query.id]);
  let getFamily = async (id) => {
    const family = await get_family({ id });

    if (family) {
      setName(family.name);
      setWebname(family.webname);
      setImage(family.image);
      setType(family.type);
      setDescription(family.description);
      setId(family.id);
      setColor(family.color);
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

  const saveFamily = async () => {
    const { error } = await update_family({
      id,
      name,
      image,
      description,
      color,
      webname,
      type,
    });
    if (error) {
      addToast({
        type: TYPES.ERROR,
        message: "No se ha podido guardar la familia",
        time: "4000",
      });
    } else {
      addToast({
        type: TYPES.SUCCESS,
        message: "Familia Guardada Correctamente",
        time: "4000",
      });
      router.push(`/families/`);
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
          <h3 sx={{ justifySelf: "center" }}>Editar Familia</h3>
          <Field text={"Id"} defaultValue={id}></Field>
          <Field text={"Nombre"} defaultValue={name}></Field>
          <Input
            onChange={(value) => setWebname(value)}
            text={"Webname"}
            defaultValue={webname}
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
          <Input
            onChange={(value) => setType(value)}
            text={"Tipo"}
            defaultValue={type}
          ></Input>
          <InputTextArea
            onChange={(value) => setDescription(value)}
            text={"Descripcion"}
            defaultValue={description}
          ></InputTextArea>
          <img
            onClick={saveFamily}
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
