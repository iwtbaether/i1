import React from "react";
import { GameAction, GlobalGameState, initialGameState } from "../engine/types";

interface EngineContextProps {
  state: GlobalGameState;
  dispatch: React.Dispatch<GameAction>;
}

const EngineContext = React.createContext<EngineContextProps>({
  state: initialGameState,
  dispatch: () => null,
});

export { EngineContext };
