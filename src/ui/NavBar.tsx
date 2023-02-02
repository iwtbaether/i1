import React, { useContext } from "react";
import { EngineContext } from "../context/EngineContext";
import { GameNav } from "../engine/types";

function NavBar() {
  const { state, dispatch } = useContext(EngineContext);

  const navTo = (nav: GameNav) => {
    dispatch({ type: "nav", payload: { nav } });
  };

  return (
    <div>
      <div>Current: {state.nav}</div>
    </div>
  );
}

export default NavBar;
