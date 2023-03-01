import { observer } from "mobx-react-lite";
import React, { ReactNode, useContext } from "react";
import { MobGameContext } from "../../context/MobGameContext";
import { Pages } from "../../engine/mob/Nav";
import { Sneak } from "../pages/Sneak";

const pageComponentMap = {
  [Pages.main]: <div>Main</div>,
  [Pages.options]: <div>Options</div>,
  [Pages.sneak]: <Sneak />,
};

const Router = observer(() => {
  const page = useContext(MobGameContext).game.nav.currentPage;
  return pageComponentMap[page];
});

export default Router;
