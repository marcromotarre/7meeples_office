/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import { getGameFromApiBGG } from "../../utils/BGGParser";
import { useRouter } from "next/router";
import { add_boardgame, get_boardgame } from "../../src/api/boardgames";
import { get_designers, add_designer } from "../../src/api/designers";
import { get_categories, add_category } from "../../src/api/categories";
import { get_mechanisms, add_mechanism } from "../../src/api/mechanisms";
import { get_publishers } from "../../src/api/publishers";
import { get_families, add_family } from "../../src/api/families";
import Input from "../../src/components/common/input";
import Field from "../../src/components/common/field";
import Select from "../../src/components/common/multiple-select";
import save_icon from "../../src/assets/save-icon.svg";
import { useToast } from "../../src/components/common/toast-provider";
import { TYPES } from "../../src/components/common/toast";

export default function New() {
  const router = useRouter();
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [webname, setWebname] = useState("");
  const [allPublishers, setAllPublishers] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    if (router?.query?.id) {
      getData(router.query.id);
    }
  }, [router.query.id]);

  const getData = async (id) => {
    const boardgame = await get_boardgame({ id });
    if (boardgame) {
      router.push(`/boardgames/${id}`);
    } else {
      getPublishers();

      setDataFromBBG(id);
    }
  };

  let getPublishers = async (id) => {
    const publishers = await get_publishers();
    setAllPublishers(publishers);
  };

  const setDataFromBBG = async (id) => {
    const _data = await getGameFromApiBGG(id);
    setWebname(_data.spanish_name);
    setData(_data);
  };

  const onSave = async () => {
    const {
      id,
      name,
      age,
      year,
      weight,
      players,
      playTime,
      rating,
      categories,
      designers,
      mechanisms,
      families,
      expansions,
      expansionOf,
      image,
    } = data;
    const _designers = await get_designers();
    designers.forEach((designer) => {
      if (!_designers.some(({ id }) => id === parseInt(designer.id))) {
        add_designer({ id: designer.id, name: designer.name });
        console.log(
          `designer ${designer.id} with name ${designer.name} added `
        );
      }
    });
    const _categories = await get_categories();
    categories.forEach((category) => {
      if (!_categories.some(({ id }) => id === parseInt(category.id))) {
        add_category({ id: category.id, name: category.name });
        console.log(
          `category ${category.id} with name ${category.name} added `
        );
      }
    });
    const _mechanisms = await get_mechanisms();
    mechanisms.forEach((mechanism) => {
      if (!_mechanisms.some(({ id }) => id === parseInt(mechanism.id))) {
        add_mechanism({ id: mechanism.id, name: mechanism.name });
        console.log(
          `mechanism ${mechanism.id} with name ${mechanism.name} added `
        );
      }
    });

    const _families = await get_families();
    families.forEach((family) => {
      if (!_families.some(({ id }) => id === parseInt(family.id))) {
        add_family({ id: family.id, name: family.name });
        console.log(`family ${family.id} with name ${family.name} added `);
      }
    });

    const { error } = await add_boardgame({
      id: parseInt(id),
      name,
      year,
      webname,
      age,
      publishers,
      weight,
      categories: categories.map((category) => parseInt(category.id)),
      designers: designers.map((designer) => parseInt(designer.id)),
      families: families.map((family) => parseInt(family.id)),
      playTimeMin: parseInt(playTime.min),
      playTimeMax: parseInt(playTime.max),
      expansions: expansions.map((expansion) => parseInt(expansion)),
      expansionOf: expansionOf.map((expansion) => parseInt(expansion)),
      mechanisms: mechanisms.map((mechanism) => parseInt(mechanism.id)),
      average: parseFloat(rating.average),
      numVotes: parseInt(rating.numVotes),
      numberOfPlayers: players.number,
      numberOfPlayersBest: players.best,
      numberOfPlayersNotRecommended: players.no,
      imageDefault: image,
    });

    if (error) {
      addToast({
        type: TYPES.ERROR,
        message: "No se ha podido crear el juego",
        time: "4000",
      });
    } else {
      addToast({
        type: TYPES.SUCCESS,
        message: "Juego creado correctamente",
        time: "4000",
      });
      router.push(`/new/`);
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
        <Field text={"Original Name"} defaultValue={data?.name} />
        <Input
          onChange={(value) => setWebname(value)}
          text={"Name"}
          defaultValue={webname}
        ></Input>
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
