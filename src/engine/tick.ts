import { log } from "../util/logger";
import { GlobalGameState } from "./types";

export const tick = (state: GlobalGameState): GlobalGameState => {
  log("@@tick");
  const now = Date.now();
  const delta = now - state.last;
  log(`tick: ${delta}ms`);
  const elapsed = state.elapsed + delta;
  log(`elapsed: ${elapsed}ms`);
  if (elapsed > 1000) {
    const count = state.count + 1;
    log(`count: ${count}`);
    const newElapsed = elapsed - 1000;
    log(`newElapsed: ${newElapsed}ms`);
    return { ...state, count, elapsed: newElapsed, last: now };
  }
  return { ...state, elapsed, last: now };
};
