/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { get_boardgame, update_boardgame } from "../../src/api/boardgames";
import { useToast } from "../../src/components/common/toast-provider";
import Average from "../../src/components/boardgame/average";
import Players from "../../src/components/boardgame/players";

import time_black from "../../src/assets/time-black.svg";
import age_black from "../../src/assets/age-black.svg";
import weight_black from "../../src/assets/weight-black.svg";
import players_black from "../../src/assets/players-black.svg";
import designers_black from "../../src/assets/designers-black.svg";
import { get_designers } from "../../src/api/designers";
import { get_categories } from "../../src/api/categories";
import { get_mechanisms } from "../../src/api/mechanisms";

export default function Boardgame() {
  const router = useRouter();
  const { addToast } = useToast();

  const [backgroundTransparency, setBackgroundTransparency] = useState(0.5);
  const [backgroundImage, setBackgroundImage] = useState();
  const [backgroundSize, setBackgroundSize] = useState(100);
  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const [backgroundPositionY, setBackgroundPositionY] = useState(0);
  const [boardgame, setBoardgame] = useState();
  const [designers, setDesigners] = useState();
  const [categories, setCategories] = useState();
  const [mechanisms, setMechanisms] = useState();
  console.log(boardgame);
  useEffect(() => {}, []);

  useEffect(() => {
    if (router.query.id) {
      getBoardgame(router.query.id);
      getDesigners();
      getCategories();
      getMechanisms();
    }
  }, [router.query.id]);
  let getBoardgame = async (id) => {
    const boardgame = await get_boardgame({ id });
    if (boardgame) {
      setBoardgame(boardgame);
    }
  };

  let getDesigners = async () => {
    const designers = await get_designers();
    if (designers) {
      setDesigners(designers);
    }
  };

  let getCategories = async () => {
    const categories = await get_categories();
    if (categories) {
      setCategories(categories);
    }
  };

  let getMechanisms = async () => {
    const mechanisms = await get_mechanisms();
    if (mechanisms) {
      setMechanisms(mechanisms);
    }
  };

  let imageLoaded = (event) => {
    var tgt = event.target,
      files = tgt.files;
    // FileReader support
    var fr = new FileReader();
    fr.onload = function () {
      setBackgroundImage(fr.result);
    };
    fr.readAsDataURL(files[0]);
  };

  const deleteMechanism = (id) => {
    const newBoardgame = {
      ...boardgame,
      mechechanisms: boardgame.mechechanisms.filter(
        (mechanism) => mechanism !== id
      ),
    };
    setBoardgame(newBoardgame);
  };

  const play_time_string = (play_time_min, play_time_max) =>
    play_time_min === play_time_max
      ? `${play_time_min} minutos`
      : `${play_time_min} - ${play_time_max} minutos`;

  const age_string = (age) => `${age}+ años`;
  const weight_string = (weight) => `${round_weight(weight)} / 5`;
  const round_weight = (weight) =>
    Math.round((weight + Number.EPSILON) * 100) / 100;

  let hashtags = [];
  if (mechanisms && categories && boardgame) {
    hashtags = [
      ...boardgame.categories.map(
        (category) => categories.find(({ id }) => id === category).webname
      ),
      ...boardgame.mechechanisms.map(
        (mechanism) => mechanisms.find(({ id }) => id === mechanism).name
      ),
    ].reduce((acc, elem) => {
      return acc + "#" + elem.replace(" and", "&").replace(" ", "") + " ";
    }, []);
  }

  return (
    <div sx={{ display: "flex" }}>
      {boardgame && designers && categories && mechanisms && (
        <>
          <div>
            <div
              sx={{
                zIndex: "-2",
                width: "1000px",
                height: "1000px",
                position: "absolute",
                objectFit: "cover",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: `${backgroundSize}%`,
                backgroundPositionX: `${backgroundPositionX}%`,
                backgroundPositionY: `${backgroundPositionY}%`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              sx={{
                zIndex: "-1",
                width: "1000px",
                height: "1000px",
                position: "absolute",
                backgroundColor: `rgba(255,255,255,${backgroundTransparency})`,
              }}
            ></div>
            <div
              sx={{
                zIndex: "2",
                width: "1000px",
                height: "1000px",
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                gridTemplateColumns: "85px 67px 55px 64px auto 45px",
                gridTemplateRows:
                  "30px 150px 80px 90px 90px 20px 50px 50px 50px 50px 50px 50px 50px 50px 50px",
                gridTemplateAreas: ` 
            ". . . . . ."
            "average average average average average average"
            ". name name name name ."
            ". description description description description ."
            ". categories categories categories categories ."
            ". . . . . ."
            ". . time-icon . time ."
            ". . . . . ."
            ". . age-icon . age ."
            ". . . . . ."
            ". . players-icon . players ."
            ". . . . . ."
            ". . weight-icon . weight ."
            ". . . . . ."
            ". . designers-icon . designers ."
        `,
              }}
            >
              <>
                <Average
                  average={boardgame.average}
                  numVotes={boardgame.numVotes}
                  styles={{ gridArea: "average" }}
                />
                <p
                  sx={{
                    gridArea: "name",
                    fontSize: "73px",
                    justifySelf: "start",
                    fontWeight: "400",
                  }}
                >
                  {boardgame.webname}
                </p>
                <p
                  sx={{
                    gridArea: "description",
                    fontSize: "37px",
                    justifySelf: "start",
                    fontStyle: "italic",
                  }}
                >
                  {boardgame.description}
                </p>
                <p
                  sx={{
                    gridArea: "categories",
                    fontSize: "37px",
                    justifySelf: "start",
                    fontWeight: "300",
                    color: "#27AAE0",
                  }}
                >
                  {hashtags}
                </p>
                <img
                  sx={{ gridArea: "time-icon", height: "59px" }}
                  src={time_black}
                ></img>
                <p
                  sx={{
                    gridArea: "time",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                  }}
                >
                  {play_time_string(
                    boardgame.playTimeMin,
                    boardgame.playTimeMax
                  )}
                </p>

                <img
                  sx={{ gridArea: "age-icon", height: "39px" }}
                  src={age_black}
                ></img>
                <p
                  sx={{
                    gridArea: "age",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                  }}
                >
                  {age_string(boardgame.age)}
                </p>

                <img
                  sx={{ gridArea: "players-icon", height: "39px" }}
                  src={players_black}
                ></img>
                {boardgame && (
                  <Players
                    numberOfPlayersBest={boardgame.numberOfPlayersBest}
                    numberOfPlayersNotRecommended={
                      boardgame.numberOfPlayersNotRecommended
                    }
                    numberOfPlayers={boardgame.numberOfPlayers}
                    styles={{
                      gridArea: "players",
                      fontSize: "60px",
                      justifySelf: "start",
                      fontWeight: "300",
                    }}
                  />
                )}
                <img
                  sx={{ gridArea: "weight-icon", height: "20px" }}
                  src={weight_black}
                ></img>
                <p
                  sx={{
                    gridArea: "weight",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                  }}
                >
                  {weight_string(boardgame.weight)}
                </p>

                <img
                  sx={{ gridArea: "designers-icon", height: "50px" }}
                  src={designers_black}
                ></img>
                <p
                  sx={{
                    gridArea: "designers",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                  }}
                >
                  {boardgame.designers.map(
                    (designer) =>
                      designers.find(({ id }) => id === designer).name
                  )}
                </p>
              </>
            </div>
          </div>
          <div
            sx={{
              height: "1000px",
              width: "300px",
              backgroundColor: "rgba(255,0,0,0.1)",
              display: "grid",
              rowGap: "10px",
            }}
          >
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={imageLoaded}
            ></input>
            <input
              sx={{ width: "90%" }}
              type="range"
              min="0"
              max="100"
              value={backgroundTransparency * 100}
              onChange={(event) => {
                setBackgroundTransparency(event.target.value / 100);
              }}
            ></input>
            <div>
              <button
                onClick={() => {
                  setBackgroundSize(backgroundSize + 1);
                }}
              >
                Big
              </button>
              <button
                onClick={() => {
                  setBackgroundSize(backgroundSize + 10);
                }}
              >
                Big x10
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setBackgroundSize(backgroundSize - 1);
                }}
              >
                Small
              </button>
              <button
                onClick={() => {
                  setBackgroundSize(backgroundSize - 10);
                }}
              >
                Small x10
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setBackgroundPositionX(backgroundPositionX - 1);
                }}
              >
                Left
              </button>
              <button
                onClick={() => {
                  setBackgroundPositionX(backgroundPositionX - 10);
                }}
              >
                Left x10
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setBackgroundPositionX(backgroundPositionX + 1);
                }}
              >
                Right
              </button>
              <button
                onClick={() => {
                  setBackgroundPositionX(backgroundPositionX + 10);
                }}
              >
                Right x10
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setBackgroundPositionY(backgroundPositionY - 1);
                }}
              >
                Top
              </button>
              <button
                onClick={() => {
                  setBackgroundPositionY(backgroundPositionY - 10);
                }}
              >
                Top x10
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setBackgroundPositionY(backgroundPositionY + 1);
                }}
              >
                Bottom
              </button>
              <button
                onClick={() => {
                  setBackgroundPositionY(backgroundPositionY + 10);
                }}
              >
                Bottom x10
              </button>
            </div>
            <div
              sx={{
                display: "grid",
                gridTemplateColumns: "100%",
                rowGap: "5px",
              }}
            >
              {boardgame.categories
                .map(
                  (category) =>
                    categories.find(({ id }) => id === category).webname
                )
                .map((category) => (
                  <p>{category}</p>
                ))}
              {boardgame.mechechanisms
                .map((mechanism) =>
                  mechanisms.find(({ id }) => id === mechanism)
                )
                .map((mechanism) => (
                  <p onClick={() => deleteMechanism(mechanism.id)}>
                    {mechanism.name}
                  </p>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
