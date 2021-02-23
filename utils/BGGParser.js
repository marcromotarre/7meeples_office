import { playersPoll } from "./number-of-players";
import axios from "axios";
import xml2json from "./xml2json";

export const getGameFromApiBGG = async (id) => {
  const result = await axios(
    `https://www.boardgamegeek.com/xmlapi/boardgame/${id}?stats=1`
  );
  var domParser = new DOMParser();
  var xmlDocument = domParser.parseFromString(result.data, "text/xml");
  return BGGParser(xml2json(xmlDocument));
};

export const BGGParser = (gameData) => {
  console.log(gameData.boardgames.boardgame);
  return {
    id: gameData.boardgames.boardgame["@attributes"].objectid,
    name: gameData.boardgames.boardgame.name[0]["#text"],
    year: gameData.boardgames.boardgame.yearpublished["#text"],
    age: gameData.boardgames.boardgame.age["#text"],
    players: playersPoll(gameData),
    playTime: {
      min: gameData.boardgames.boardgame.minplaytime["#text"],
      max: gameData.boardgames.boardgame.maxplaytime["#text"],
    },
    weight:
      gameData.boardgames.boardgame.statistics.ratings.averageweight["#text"],
    rating: {
      average:
        gameData.boardgames.boardgame.statistics.ratings.average["#text"],
      numVotes:
        gameData.boardgames.boardgame.statistics.ratings.usersrated["#text"],
      ranks: Array.isArray(
        gameData.boardgames.boardgame.statistics.ratings.ranks.rank
      )
        ? gameData.boardgames.boardgame.statistics.ratings.ranks.rank.map(
            (rank) => ({
              id: rank["@attributes"].id,
              position: parseInt(rank["@attributes"].value),
              name: rank["@attributes"].name,
            })
          )
        : [],
    },
    expansions: Array.isArray(gameData.boardgames.boardgame.boardgameexpansion)
      ? gameData.boardgames.boardgame.boardgameexpansion
          .filter((expansion) => !expansion["@attributes"].inbound)
          .map((expansion) => expansion["@attributes"].objectid)
      : [
          {
            id:
              gameData.boardgames.boardgame.boardgameexpansion["@attributes"]
                .objectid,
            name: gameData.boardgames.boardgame.boardgameexpansion["#text"],
          },
        ],
    expansionOf: Array.isArray(gameData.boardgames.boardgame.boardgameexpansion)
      ? gameData.boardgames.boardgame.boardgameexpansion
          .filter((expansion) => expansion["@attributes"].inbound)
          .map((expansion) => expansion["@attributes"].objectid)
      : [
          {
            id:
              gameData.boardgames.boardgame.boardgameexpansion["@attributes"]
                .objectid,
            name: gameData.boardgames.boardgame.boardgameexpansion["#text"],
          },
        ],
    designers: Array.isArray(gameData.boardgames.boardgame.boardgamedesigner)
      ? gameData.boardgames.boardgame.boardgamedesigner.map((designer) => ({
          id: designer["@attributes"].objectid,
          name: designer["#text"],
        }))
      : [
          {
            id:
              gameData.boardgames.boardgame.boardgamedesigner["@attributes"]
                .objectid,
            name: gameData.boardgames.boardgame.boardgamedesigner["#text"],
          },
        ],
    categories: Array.isArray(gameData.boardgames.boardgame.boardgamecategory)
      ? gameData.boardgames.boardgame.boardgamecategory.map((category) => ({
          id: category["@attributes"].objectid,
          name: category["#text"],
        }))
      : [
          {
            id:
              gameData.boardgames.boardgame.boardgamecategory["@attributes"]
                .objectid,
            name: gameData.boardgames.boardgame.boardgamecategory["#text"],
          },
        ],
    mechanisms: Array.isArray(gameData.boardgames.boardgame.boardgamemechanic)
      ? gameData.boardgames.boardgame.boardgamemechanic.map((mechanism) => ({
          id: mechanism["@attributes"].objectid,
          name: mechanism["#text"],
        }))
      : [
          {
            id:
              gameData.boardgames.boardgame.boardgamemechanic["@attributes"]
                .objectid,
            name: gameData.boardgames.boardgame.boardgamemechanic["#text"],
          },
        ],
    /*family: gameData.boardgames.boardgame.boardgamefamily.map((familyType) => ({
      id: familyType["@attributes"].objectid,
      name: familyType["#text"],
    })),*/
  };
};
