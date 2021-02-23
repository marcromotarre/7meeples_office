import axios from "axios";

export const get_boardgames = async () => {
  return await axios
    .get("/api/boardgames/getAll")
    .then((response) => {
      return response.data.boardgames;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_boardgame = async ({ id }) => {
  return await axios
    .post("/api/boardgames/get", {
      id,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const update_boardgame = async ({
  id,
  webname,
  PVP,
  stock,
  price,
  active,
}) => {
  return await axios
    .post("/api/boardgames/update", {
      id,
      webname,
      PVP,
      stock,
      price,
      active,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const add_boardgame = async ({
  id,
  name,
  age,
  webname,
  year,
  weight,
  categories,
  mechanisms,
  designers,
  playTimeMin,
  playTimeMax,
  numberOfPlayers,
  numberOfPlayersBest,
  numberOfPlayersNotRecommended,
  expansions,
  expansionOf,
  numVotes,
  average,
}) => {
  return await axios
    .post("/api/boardgames/add", {
      id,
      name,
      year,
      weight,
      webname,
      age,
      categories,
      mechanisms,
      designers,
      playTimeMin,
      playTimeMax,
      numberOfPlayers,
      numberOfPlayersBest,
      numberOfPlayersNotRecommended,
      expansions,
      expansionOf,
      numVotes,
      average,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const update_boardgame_bgg = async ({
  id,
  name,
  age,
  webname,
  year,
  weight,
  categories,
  mechanisms,
  designers,
  playTimeMin,
  playTimeMax,
  numberOfPlayers,
  numberOfPlayersBest,
  numberOfPlayersNotRecommended,
  expansions,
  expansionOf,
  numVotes,
  average,
}) => {
  return await axios
    .post("/api/boardgames/update_bgg", {
      id,
      name,
      age,
      webname,
      year,
      weight,
      categories,
      mechanisms,
      designers,
      playTimeMin,
      playTimeMax,
      numberOfPlayers,
      numberOfPlayersBest,
      numberOfPlayersNotRecommended,
      expansions,
      expansionOf,
      numVotes,
      average,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
