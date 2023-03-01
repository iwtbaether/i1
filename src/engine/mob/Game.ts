import { GameModule } from "./interfaces/GameModule";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { PlayerAgent } from "./PlayerAgent";
import { Room } from "./Room";
import { Timer } from "./Timer";
import { Nav } from "./Nav";

class Game {
  saveKey = "i1Game";
  timer: Timer = new Timer(this);
  playerAgent: PlayerAgent = new PlayerAgent(this);
  room: Room = new Room({ game: this });
  nav: Nav = new Nav(this);
  constructor() {
    makeObservable(this, {
      newRoom: action,
      exitRoom: action,
      load: action,
      playerAgent: observable,
      room: observable,
      modules: computed,
    });
    this.room = this.createDefaultRoom();
  }
  get modules() {
    return [this.timer, this.playerAgent, this.room, this.nav];
  }
  createDefaultRoom = () => {
    return new Room({ game: this });
  };
  newRoom = () => {
    this.room = this.createDefaultRoom();
    this.timer.setActivity("idle");
  };
  exitRoom = () => {
    this.timer.setActivity("idle");
    this.room = new Room({ game: this, level: this.room.level + 1 });
  };

  save = () => {
    const saveData: any = {};
    this.modules.forEach((module) => {
      saveData[module.saveKey] = module.getSaveData();
    });
    localStorage.setItem(this.saveKey, JSON.stringify(saveData));
  };

  load = () => {
    const saveData = JSON.parse(localStorage.getItem(this.saveKey) || "{}");
    this.modules.forEach((module) => {
      module.loadSaveData(saveData[module.saveKey] || {});
    });
  };
}

export { Game };
