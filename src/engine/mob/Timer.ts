import { GameModule } from "./interfaces/GameModule";
import { action, makeObservable, observable } from "mobx";
import { Game } from "./Game";

export type PlayerActivity = "idle" | "explore" | "search" | "hide" | "exit";

export interface TimerSave {
  currentTime: number;
  elapsedMS: number;
  activity: PlayerActivity;
}

export class Timer implements GameModule<TimerSave> {
  saveKey = "timer";
  getSaveData = () => {
    return {
      currentTime: this.currentTime,
      elapsedMS: this.elapsedMS,
      activity: this.activity,
    };
  };
  loadSaveData = (data: Partial<TimerSave>) => {
    this.currentTime = data.currentTime || this.currentTime;
    this.elapsedMS = data.elapsedMS || this.elapsedMS;
    this.activity = data.activity || this.activity;
  };

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
      loadSaveData: action,
    });
    this.game = game;
  }

  tick = () => {
    const newTime = Date.now();
    const gainedElapsed = newTime - this.currentTime;
    this.currentTime = newTime;
    this.elapsedMS += gainedElapsed;
    if (this.elapsedMS >= 1000) {
      //this.elapsedMS -= 1000; // allows for stored offline time
      this.elapsedMS = this.elapsedMS % 1000; // prevents stored offline time
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
        this.game.playerAgent.exitTick();
        break;
      default:
        throw new Error("Invalid activity: " + this.activity);
    }
  }
}
