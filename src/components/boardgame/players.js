/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import number_of_players_best_icon from "../../assets/best-black.svg";
import number_of_players_not_recommended_icon from "../../assets/not-recommended-black.svg";

export default function SectionNumberOfPlayers({
  numberOfPlayersBest,
  numberOfPlayersNotRecommended,
  numberOfPlayers,
  styles,
}) {
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
      {numberOfPlayers.slice(0, 8).map((numPlayers) => (
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
                marginTop: "-7px",
              }}
              src={number_of_players_best_icon}
            ></img>
          )}
          {numberOfPlayersNotRecommended.includes(numPlayers) && (
            <img
              sx={{
                position: "absolute",
                width: "75px",
                height: "75px",
              }}
              src={number_of_players_not_recommended_icon}
            ></img>
          )}
        </div>
      ))}
    </div>
  );
}
