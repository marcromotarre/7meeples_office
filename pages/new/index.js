import Head from "next/head";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BGGParser } from "../../utils/BGGParser";
import xml2json from "../../utils/xml2json";
import BoardGameManagerDetails from "../../src/components/boardgame-details";

export default function New() {
  const [id, setId] = useState("13");
  const [data, setData] = useState(null);

  const getBoardgameBGG = async () => {
    console.log("get boardgame BGG: " + id);
    const result = await axios(
      `https://www.boardgamegeek.com/xmlapi/boardgame/${id}?stats=1`
    );
    var domParser = new DOMParser();
    var xmlDocument = domParser.parseFromString(result.data, "text/xml");
    setData(BGGParser(xml2json(xmlDocument)));
  };

  const onInputchange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Nuevo Juego de mesa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!data && (
          <div>
            <label>
              Id:
              <input
                onChange={onInputchange}
                value={id}
                type="text"
                name="name"
              />
            </label>
            <button onClick={() => getBoardgameBGG()}>Buscar</button>
          </div>
        )}
        {data && (
          <BoardGameManagerDetails
            boardGameData={data}
          ></BoardGameManagerDetails>
        )}
      </main>
    </div>
  );
}
