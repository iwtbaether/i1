import React from "react";
import { Game } from "../engine/mob/Game";

interface MobGameContextProps {
  game: Game;
}

export const MobGameContext = React.createContext<MobGameContextProps>({
  game: new Game(),
});
