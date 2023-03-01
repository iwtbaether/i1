import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { EngineContext } from "../../context/EngineContext";
import { MobGameContext } from "../../context/MobGameContext";
import { Pages } from "../../engine/mob/Nav";
import { GameNav } from "../../engine/types";

const NavBar = observer(() => {
  const { game } = React.useContext(MobGameContext);

  const navTo = (nav: Pages) => {
    game.nav.setPage(nav);
  };

  return (
    <div>
      <div>Current: {game.nav.currentPage}</div>
      {Object.keys(Pages).map((key) => {
        const nav = Pages[key as keyof typeof Pages];
        return (
          <button key={key} onClick={() => navTo(nav)}>
            {nav}
          </button>
        );
      })}
    </div>
  );
});

export default NavBar;
