import { tick } from "./tick";
import { GlobalGameState, GameAction } from "./types";

const gameReducer = (state: GlobalGameState, action: GameAction) => {
  switch (action.type) {
    case "tick":
      return tick(state);
    case "reset":
      return { ...state, count: 0 };
    case "start":
      if (state.active) {
        return state;
      }
      return {
        ...state,
        active: true,
      };

    default:
      return state;
  }
};

export { gameReducer };
