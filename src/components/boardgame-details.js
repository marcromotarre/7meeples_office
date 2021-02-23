import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  add_designer,
  get_designer,
  add_designer_boardgame,
  get_designers,
} from "../api/designers";
import { add_boardgame } from "../api/boardgames";
import { get_categories, add_category } from "../api/categories";
import { get_mechanisms, add_mechanism } from "../api/mechanisms";

function BoardGameManagerDetails({ boardGameData }) {
  const {
    id,
    name: nameBGG,
    age,
    year,
    players,
    playTime,
    rating,
    categories,
    designers,
    mechanisms,
    expansions,
    expansionOf,
    weight,
  } = boardGameData;
  console.log(boardGameData);
  const [name, setName] = useState(nameBGG);

  const CreateGameData = async () => {
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

    await add_boardgame({
      id: parseInt(id),
      name,
      year,
      categories: categories.map((category) => parseInt(category.id)),
      designers: designers.map((designer) => parseInt(designer.id)),
      playTimeMin: parseInt(playTime.min),
      playTimeMax: parseInt(playTime.max),
      expansions: expansions.map((expansion) => parseInt(expansion)),
      expansionOf: expansionOf.map((expansion) => parseInt(expansion)),
      mechanisms: mechanisms.map((mechanism) => parseInt(mechanism.id)),
      numberOfPlayers: players.number,
      numberOfPlayersBest: players.best,
      numberOfPlayersNotRecommended: players.no,
      weight,
    });
  };
  return (
    <>
      <span>ID: {id}</span>
      <label>
        Name of the Game
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Rate: {rating.average} --> {rating.numVotes}votes
      </label>
      <div>
        <h1>Categories</h1>
      </div>
      <input type="submit" value="Submit" />

      <p>
        Ranks:
        {rating.ranks
          .map(({ id, name, position }) => `${id}: ${name}(${position})`)
          .join()}
      </p>
      <p>Age: {age}+</p>
      <p>Year: {year}</p>
      <p>
        Players: {players.min} - {players.max} (Recomended:
        {players.recommended.join()}) (best:{players.best.join()})
      </p>
      <p>
        Play Time: {playTime.min}-{playTime.max} min
      </p>
      <button onClick={CreateGameData}>Create</button>
    </>
  );
}

export default BoardGameManagerDetails;
