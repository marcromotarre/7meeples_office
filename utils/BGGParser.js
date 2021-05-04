import { playersPoll } from "./number-of-players";
import axios from "axios";
import xml2json from "./xml2json";
import { parse } from "node-html-parser";

export const getGameFromApiBGG = async (id) => {
  const result = await axios(
    `https://www.boardgamegeek.com/xmlapi/boardgame/${id}?stats=1`
  );
  var domParser = new DOMParser();
  var xmlDocument = domParser.parseFromString(result.data, "text/xml");
  return BGGParser(xml2json(xmlDocument));
};

const getSpanishVersionId = async (gameData) => {
  let version = null;
  const versions = gameData.boardgames.boardgame.boardgameversion;
  if (!versions) {
    return { spanish_name: "" };
  }
  if (Array.isArray(versions)) {
    version = versions.find(
      (version) => version["#text"] === "Spanish edition"
    );
  } else {
    if (versions["#text"] === "Spanish edition") {
      version = versions;
    }
  }

  if (version) {
    const spanish_id = version["@attributes"].objectid;
    var request = await axios(
      `https://boardgamegeek.com/boardgameversion/${spanish_id}/spanish-edition`
    );
    const spanish_name = request.data
      .split("<title>")[1]
      .split("</title")[0]
      .split(" (Spanish edition)")[0];
    return {
      spanish_name,
    };
  } else {
    return { spanish_name: "" };
  }
};

export const BGGParser = async (gameData) => {
  console.log(gameData.boardgames.boardgame);
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

  const mechanisms = (mechanisms) => {
    if (!mechanisms) {
      return [];
    }
    if (Array.isArray(mechanisms)) {
      return mechanisms.map((mechanism) => ({
        id: mechanism["@attributes"].objectid,
        name: mechanism["#text"],
      }));
    } else {
      return [
        {
          id: mechanisms["@attributes"].objectid,
          name: mechanisms["#text"],
        },
      ];
    }
  };

  const designers = (designers) => {
    if (!designers) {
      return [];
    }
    if (Array.isArray(designers)) {
      return designers.map((designer) => ({
        id: designer["@attributes"].objectid,
        name: designer["#text"],
      }));
    } else {
      return [
        {
          id: designers["@attributes"].objectid,
          name: designers["#text"],
        },
      ];
    }
  };

  const families = (families) => {
    if (!families) {
      return [];
    }
    if (Array.isArray(families)) {
      return families.map((family) => ({
        id: family["@attributes"].objectid,
        name: family["#text"],
      }));
    } else {
      return [
        {
          id: families["@attributes"].objectid,
          name: families["#text"],
        },
      ];
    }
  };
  const spanish_data = await getSpanishVersionId(gameData);
  const data = {
    ...spanish_data,
    id: gameData.boardgames.boardgame["@attributes"].objectid,
    name: name(gameData.boardgames.boardgame.name),
    year:
      gameData.boardgames.boardgame.yearpublished["#text"] === undefined
        ? 0
        : gameData.boardgames.boardgame.yearpublished["#text"],
    age:
      gameData.boardgames.boardgame.age["#text"] === undefined
        ? 0
        : gameData.boardgames.boardgame.age["#text"],
    players: playersPoll(gameData),
    playTime: {
      min:
        gameData.boardgames.boardgame.minplaytime["#text"] === undefined
          ? 0
          : gameData.boardgames.boardgame.minplaytime["#text"],
      max:
        gameData.boardgames.boardgame.maxplaytime["#text"] === undefined
          ? 0
          : gameData.boardgames.boardgame.maxplaytime["#text"],
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
    image: gameData.boardgames.boardgame.image
      ? gameData.boardgames.boardgame.image["#text"]
      : "",
    expansions: expansions(gameData.boardgames.boardgame.boardgameexpansion),
    expansionOf: expansionOf(gameData.boardgames.boardgame.boardgameexpansion),
    designers: designers(gameData.boardgames.boardgame.boardgamedesigner),
    categories: categories(gameData.boardgames.boardgame.boardgamecategory),
    mechanisms: mechanisms(gameData.boardgames.boardgame.boardgamemechanic),
    families: families(gameData.boardgames.boardgame.boardgamefamily),
    /*family: gameData.boardgames.boardgame.boardgamefamily.map((familyType) => ({
      id: familyType["@attributes"].objectid,
      name: familyType["#text"],
    })),*/
  };
  console.log(data);
  return data;
};
