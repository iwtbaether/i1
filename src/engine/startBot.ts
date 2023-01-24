import { GlobalGameState } from "./types";

const startBot = (state: GlobalGameState): GlobalGameState => {
  // use a function to determine max hp and energy from seconds elapsed
  // at 0 seconds, max hp and energy are 0
  // at 100 seconds, max hp and energy are 1
  // at 1000 seconds, max hp and energy are 10
  // at 10000 seconds, max hp and energy are 100
  // at 20000 seconds, max hp and energy are 110
  // at 30000 seconds, max hp and energy are 120
  // at 100000 seconds, max hp and energy are 200
  // at 1000000 seconds, max hp and energy are 300
  // at 10000000 seconds, max hp and energy are 400
  // dont use a switch or a case statement, use algebra

    // use a function to determine current hp and energy from seconds elapsed
    const calculateCurrentHP = (secondsElapsed: number): number => {
        if (secondsElapsed < 100) {
            return 0;
        }

        // now calculate max hp and energy
        const maxHpAndEnergy = Math.floor(Math.log


  return {
    ...state,
    active: true,
  };
};
