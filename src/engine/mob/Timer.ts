import { action, makeObservable, observable } from "mobx";
import { Game } from "./Game";

export type PlayerActivity = "idle" | "explore" | "search" | "hide" | "exit";

export class Timer {
  currentTime: number = Date.now();
  elapsedMS: number = 0;
  activity: PlayerActivity = "idle";
  game: Game;
  constructor(game: Game) {
    makeObservable(this, {
      currentTime: observable,
      elapsedMS: observable,
      activity: observable,
      tick: action,
      setActivity: action,
    });
    this.game = game;
  }

  tick = () => {
    const newTime = Date.now();
    const gainedElapsed = newTime - this.currentTime;
    this.currentTime = newTime;
    this.elapsedMS += gainedElapsed;
    if (this.elapsedMS >= 1000) {
      this.elapsedMS -= 1000;
      this.activityTick();
    }
  };

  setActivity = (activity: PlayerActivity) => {
    this.activity = activity;
  };

  activityTick() {
    switch (this.activity) {
      case "idle":
        break;
      case "explore":
        this.game.playerAgent.exploreTick();
        break;
      case "search":
        break;
      case "hide":
        break;
      case "exit":
        break;
      default:
        throw new Error("Invalid activity: " + this.activity);
    }
  }
}
