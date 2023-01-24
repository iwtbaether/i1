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
};

type GameActions = "tick" | "reset" | "start";

type GameAction = {
  type: GameActions;
  payload?: any;
};

export { initialGameState };
export type { GlobalGameState, GameActions, GameAction };
