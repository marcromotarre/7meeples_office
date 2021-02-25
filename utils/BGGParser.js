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
  const name = (name) => {
    if (Array.isArray(name)) {
      return name[0]["#text"];
    } else {
      return name["#text"];
    }
  };

  const expansions = (expansions) => {
    if (!expansions) {
      return [];
    }
    if (Array.isArray(expansions)) {
      return expansions
        .filter((expansion) => !expansion["@attributes"].inbound)
        .map((expansion) => expansion["@attributes"].objectid);
    } else {
      return !expansions["@attributes"].inbound
        ? [expansions["@attributes"].objectid]
        : [];
    }
  };

  const expansionOf = (expansions) => {
    if (!expansions) {
      return [];
    }

    if (Array.isArray(expansions)) {
      return expansions
        .filter((expansion) => expansion["@attributes"].inbound)
        .map((expansion) => expansion["@attributes"].objectid);
    } else {
      return expansions["@attributes"].inbound
        ? [expansions["@attributes"].objectid]
        : [];
    }
  };

  const categories = (categories) => {
    if (!categories) {
      return [];
    }
    if (Array.isArray(categories)) {
      return categories.map((category) => ({
        id: category["@attributes"].objectid,
        name: category["#text"],
      }));
    } else {
      return [
        {
          id: categories["@attributes"].objectid,
          name: categories["#text"],
        },
      ];
    }
  };

  console.log(gameData.boardgames.boardgame);

  const data = {
    id: gameData.boardgames.boardgame["@attributes"].objectid,
    name: name(gameData.boardgames.boardgame.name),
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
    image: gameData.boardgames.boardgame.image["#text"],
    expansions: expansions(gameData.boardgames.boardgame.boardgameexpansion),
    expansionOf: expansionOf(gameData.boardgames.boardgame.boardgameexpansion),
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
    categories: categories(gameData.boardgames.boardgame.boardgamecategory),
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
  console.log(data);
  return data;
};
