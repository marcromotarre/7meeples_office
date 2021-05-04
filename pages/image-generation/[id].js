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
import time_white from "../../src/assets/time-white.svg";
import age_black from "../../src/assets/age-black.svg";
import age_white from "../../src/assets/age-white.svg";
import weight_black from "../../src/assets/weight-black.svg";
import weight_white from "../../src/assets/weight-white.svg";
import players_black from "../../src/assets/players-black.svg";
import players_white from "../../src/assets/players-white.svg";
import designers_black from "../../src/assets/designers-black.svg";
import designers_white from "../../src/assets/designers-white.svg";
import { get_designers } from "../../src/api/designers";
import { get_categories } from "../../src/api/categories";
import { get_mechanisms } from "../../src/api/mechanisms";
import { get_publishers } from "../../src/api/publishers";
import { getPublisherImage } from "../../src/components/boardgame/publishers";

export default function Boardgame() {
  const router = useRouter();
  const { addToast } = useToast();

  const [theme, setTheme] = useState("white");

  const [nameFontSize, setNameFontSize] = useState(73);
  const [designersFontSize, setDesignersFontSize] = useState(60);
  const [descriptionFontSize, setDescriptionFontSize] = useState(37);
  const [tagsFontSize, setTagsFontSize] = useState(37);
  const [publisherSize, setPublisherSize] = useState(200);
  const [publisherXPosition, setPublisherXPosition] = useState(30);
  const [publisherYPosition, setPublisherYPosition] = useState(10);

  const [backgroundTransparency, setBackgroundTransparency] = useState(0.5);
  const [backgroundImage, setBackgroundImage] = useState();
  const [backgroundSize, setBackgroundSize] = useState(100);
  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const [backgroundPositionY, setBackgroundPositionY] = useState(0);
  const [boardgame, setBoardgame] = useState();
  const [designers, setDesigners] = useState();
  const [categories, setCategories] = useState();
  const [mechanisms, setMechanisms] = useState();
  const [publishers, setPublishers] = useState();
  console.log(boardgame);
  useEffect(() => {}, []);

  useEffect(() => {
    if (router.query.id) {
      getBoardgame(router.query.id);
      getDesigners();
      getCategories();
      getMechanisms();
      getPublishers();
    }
  }, [router.query.id]);
  let getBoardgame = async (id) => {
    const boardgame = await get_boardgame({ id });
    if (boardgame) {
      setBoardgame(boardgame);
    }
  };

  let getPublishers = async (id) => {
    const publishers = await get_publishers({ id });
    if (publishers) {
      setPublishers(publishers);
      console.log(publishers);
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
      return acc + "#" + elem.replaceAll(" and", "&").replaceAll(" ", "") + " ";
    }, []);
  }
  const publishers_images = boardgame?.publishers.map((publisher) =>
    getPublisherImage({ id: publisher })
  );

  return (
    <div sx={{ display: "flex" }}>
      {boardgame && designers && categories && mechanisms && (
        <>
          <div sx={{ position: "relative" }}>
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
                backgroundColor:
                  theme === "white"
                    ? `rgba(255,255,255,${backgroundTransparency})`
                    : `rgba(0,0,0,${backgroundTransparency})`,
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
                  "30px 150px min-content max-content max-content 20px 48px 48px 48px 48px 48px 48px 48px 48px 48px",
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
                  theme={theme}
                  numVotes={boardgame.numVotes}
                  styles={{ gridArea: "average" }}
                />
                <h1
                  sx={{
                    gridArea: "name",
                    fontSize: `${nameFontSize}px`,
                    justifySelf: "start",
                    fontWeight: "400",
                    color: theme === "white" ? "black" : "white",
                  }}
                >
                  {boardgame.webname + "    "}
                  <span
                    sx={{
                      fontSize: "41px",
                      fontWeight: "300",
                      height: "100%",
                      verticalAlign: "middle",
                      color: theme === "white" ? "black" : "white",
                    }}
                  >
                    ({boardgame.year})
                  </span>
                </h1>
                <p
                  sx={{
                    gridArea: "description",
                    fontSize: `${descriptionFontSize}px`,
                    justifySelf: "start",
                    fontStyle: "italic",
                    padding: "5px 0px",
                    color: theme === "white" ? "black" : "white",
                  }}
                >
                  {boardgame.description}
                </p>
                <p
                  sx={{
                    lineHeight: "1em",
                    padding: "10px 0px",
                    gridArea: "categories",
                    fontSize: `${tagsFontSize}px`,
                    justifySelf: "start",
                    fontWeight: "300",
                    color: theme === "white" ? "#53a0bf" : "#27AAE0",
                  }}
                >
                  {hashtags}
                </p>
                <img
                  sx={{ gridArea: "time-icon", height: "59px" }}
                  src={theme === "white" ? time_black : time_white}
                ></img>
                <p
                  sx={{
                    gridArea: "time",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                    color: theme === "white" ? "black" : "white",
                  }}
                >
                  {play_time_string(
                    boardgame.playTimeMin,
                    boardgame.playTimeMax
                  )}
                </p>

                <img
                  sx={{ gridArea: "age-icon", height: "39px" }}
                  src={theme === "white" ? age_black : age_white}
                ></img>
                <p
                  sx={{
                    gridArea: "age",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                    color: theme === "white" ? "black" : "white",
                  }}
                >
                  {age_string(boardgame.age)}
                </p>

                <img
                  sx={{ gridArea: "players-icon", height: "39px" }}
                  src={theme === "white" ? players_black : players_white}
                ></img>
                {boardgame && (
                  <Players
                    numberOfPlayersBest={boardgame.numberOfPlayersBest}
                    numberOfPlayersNotRecommended={
                      boardgame.numberOfPlayersNotRecommended
                    }
                    numberOfPlayers={boardgame.numberOfPlayers}
                    theme={theme}
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
                  src={theme === "white" ? weight_black : weight_white}
                ></img>
                <p
                  sx={{
                    gridArea: "weight",
                    fontSize: "60px",
                    justifySelf: "start",
                    fontWeight: "300",
                    color: theme === "white" ? "black" : "white",
                  }}
                >
                  {weight_string(boardgame.weight)}
                </p>

                <img
                  sx={{ gridArea: "designers-icon", height: "50px" }}
                  src={theme === "white" ? designers_black : designers_white}
                ></img>
                <p
                  sx={{
                    gridArea: "designers",
                    fontSize: `${designersFontSize}px`,
                    justifySelf: "start",
                    fontWeight: "300",
                    color: theme === "white" ? "black" : "white",
                  }}
                >
                  {boardgame.designers
                    .map(
                      (designer) =>
                        designers.find(({ id }) => id === designer).name
                    )
                    .reduce((acc, elem) => {
                      return acc + ", " + elem;
                    }, [])
                    .substring(2)}
                </p>
              </>
            </div>
            <div
              sx={{
                position: "absolute",
                right: `${publisherXPosition}px`,
                bottom: `${publisherYPosition}px`,
              }}
            >
              {publishers_images.map((image) => (
                <img sx={{ width: `${publisherSize}px` }} src={image}></img>
              ))}
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
              <div
                sx={{
                  height: "20px",
                  width: "20px",
                  color: "white",
                  border: "1px solid black",
                }}
                onClick={() => {
                  setTheme("white");
                }}
              ></div>
              <div
                sx={{
                  height: "20px",
                  width: "20px",
                  color: "black",
                  border: "1px solid white",
                }}
                onClick={() => {
                  setTheme("black");
                }}
              ></div>
            </div>
            <div>
              <button
                onClick={() => {
                  setNameFontSize(nameFontSize + 1);
                }}
              >
                + name
              </button>
              <button
                onClick={() => {
                  setNameFontSize(nameFontSize - 1);
                }}
              >
                - name
              </button>
              <button
                onClick={() => {
                  setDescriptionFontSize(descriptionFontSize + 1);
                }}
              >
                + description
              </button>
              <button
                onClick={() => {
                  setDescriptionFontSize(descriptionFontSize - 1);
                }}
              >
                - description
              </button>
              <button
                onClick={() => {
                  setTagsFontSize(tagsFontSize + 1);
                }}
              >
                + tags
              </button>
              <button
                onClick={() => {
                  setTagsFontSize(tagsFontSize - 1);
                }}
              >
                - tags
              </button>
              <button
                onClick={() => {
                  setDesignersFontSize(designersFontSize + 1);
                }}
              >
                + designers
              </button>
              <button
                onClick={() => {
                  setDesignersFontSize(designersFontSize - 1);
                }}
              >
                - designers
              </button>
            </div>
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
            <div>
              <button
                onClick={() => {
                  setPublisherSize(publisherSize - 1);
                }}
              >
                Publisher --
              </button>
              <button
                onClick={() => {
                  setPublisherSize(publisherSize + 1);
                }}
              >
                Publisher ++
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setPublisherXPosition(publisherXPosition + 1);
                }}
              >
                Publisher Left
              </button>
              <button
                onClick={() => {
                  setPublisherXPosition(publisherXPosition - 1);
                }}
              >
                Publisher Right
              </button>
              <button
                onClick={() => {
                  setPublisherYPosition(publisherYPosition + 1);
                }}
              >
                Publisher Top
              </button>
              <button
                onClick={() => {
                  setPublisherYPosition(publisherYPosition - 1);
                }}
              >
                Publisher Bottom
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
