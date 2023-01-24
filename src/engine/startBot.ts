import { GlobalGameState } from "./types";

const startBot = (state: GlobalGameState): GlobalGameState => {
  // use a function to determine max hp and energy from seconds elapsed
  const calculateCurrentHP = (secondsElapsed: number): number => {
    if (secondsElapsed < 100) {
      return 0;
    }

    // now calculate max hp and energy
    const maxHpAndEnergy = Math.floor(Math.log(secondsElapsed) * 100);
    return maxHpAndEnergy;
  };

  return {
    ...state,
    active: true,
  };
};
