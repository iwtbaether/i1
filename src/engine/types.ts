interface GlobalGameState {
  count: number;
  last: number;
  elapsed: number;
  active: boolean;
  activeOnly: {
    maxHP: number;
    currentHP: number;
    maxEnergy: number;
    currentEnergy: number;
  };
  nav: GameNav;
}

const initialGameState: GlobalGameState = {
  count: 0,
  last: Date.now(),
  elapsed: 0,
  active: false,
  activeOnly: {
    maxHP: 0,
    currentHP: 0,
    maxEnergy: 0,
    currentEnergy: 0,
  },
  nav: "home",
};

type GameActions = "tick" | "reset" | "start" | "end" | "nav";
type GameNav = "home" | "game" | "settings" | "about";

type GameAction = {
  type: GameActions;
  payload?: any;
};

export { initialGameState };
export type { GlobalGameState, GameActions, GameAction, GameNav };
