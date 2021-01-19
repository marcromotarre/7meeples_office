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

export const add_boardgame = async ({
  id,
  name,
  age,
  webname,
  year,
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
