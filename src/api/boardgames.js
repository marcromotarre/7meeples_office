import axios from "axios";

export const add_boardgame = async ({
  id,
  name,
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
  year,
}) => {
  console.log("expansions", expansions);
  return await axios
    .post("/api/boardgames/add", {
      id,
      name,
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
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
