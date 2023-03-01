import { observer } from "mobx-react-lite";
import React from "react";
import { MobGameContext } from "../../context/MobGameContext";
import { gameReducer } from "../../engine/reducer";
import { initialGameState } from "../../engine/types";

const ExtraTime = observer(() => {
  const { game } = React.useContext(MobGameContext);
  const elpasedMS = game.timer.elapsedMS;

  const hasExtraTime = elpasedMS > 1000;
  const extraTime = hasExtraTime ? Math.floor(elpasedMS / 1000) : 0;
  return (
    <div>
      {hasExtraTime && (
        <div>
          <div>Extra Time: {extraTime}</div>
        </div>
      )}
    </div>
  );
});
const FileOptions = () => {
  const { game } = React.useContext(MobGameContext);
  return (
    <>
      <button onClick={game.save}>Save</button>
      <button onClick={game.load}>Load</button>
      <button
        onClick={() => {
          game.room.rename(prompt("Enter new game name") || "");
        }}
      >
        Rename Game
      </button>
    </>
  );
};

function Footer() {
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div> {state.count} seconds elapsed.</div>
      <FileOptions />
      <ExtraTime />
    </div>
  );
}

export default Footer;
