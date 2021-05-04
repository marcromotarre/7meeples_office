/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import number_of_players_best_icon from "../../assets/best-black.svg";
import number_of_players_best_white_icon from "../../assets/best-white.svg";
import number_of_players_not_recommended_icon from "../../assets/not-recommended-black.svg";
import number_of_players_not_recommended_white_icon from "../../assets/not-recommended-white.svg";

export default function SectionNumberOfPlayers({
  numberOfPlayersBest,
  numberOfPlayersNotRecommended,
  numberOfPlayers,
  theme = "white",
  styles,
}) {
  const numPlayersInfo =
    numberOfPlayersBest.length <= 1 &&
    numberOfPlayersNotRecommended.length <= 1 &&
    numberOfPlayers.length <= 1 &&
    numberOfPlayers[0] === 0
      ? false
      : true;
  return (
    <div
      sx={{
        display: "grid",
        gridAutoFlow: "column",
        marginLeft:
          numberOfPlayersNotRecommended.includes(numberOfPlayers[0]) ||
          numberOfPlayersBest.includes(numberOfPlayers[0])
            ? "0"
            : "-20px",
        ...styles,
      }}
    >
      {!numPlayersInfo && (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            sx={{
              justifySelf: "center",
              alignSelf: "center",
              fontSize: "57px",
              fontWeight: "300",
              color: theme === "white" ? "black" : "white",
            }}
          >
            {"?"}
          </span>
        </div>
      )}
      {numPlayersInfo &&
        numberOfPlayers.slice(0, 8).map((numPlayers) => (
          <div
            key={numPlayers}
            sx={{
              display: "flex",
              width: "83px",
              height: "83px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              sx={{
                justifySelf: "center",
                alignSelf: "center",
                fontSize: "57px",
                fontWeight: "300",
                color: theme === "white" ? "black" : "white",
              }}
            >
              {numPlayers}
            </span>
            {numberOfPlayersBest.includes(numPlayers) && (
              <img
                sx={{
                  position: "absolute",
                  width: "83px",
                  height: "83px",
                  marginLeft: "2px",
                  marginTop: "-15px",
                }}
                src={
                  theme === "white"
                    ? number_of_players_best_icon
                    : number_of_players_best_white_icon
                }
              ></img>
            )}
            {numberOfPlayersNotRecommended.includes(numPlayers) && (
              <img
                sx={{
                  position: "absolute",
                  width: "75px",
                  height: "75px",
                }}
                src={
                  theme === "white"
                    ? number_of_players_not_recommended_icon
                    : number_of_players_not_recommended_white_icon
                }
              ></img>
            )}
          </div>
        ))}
    </div>
  );
}
