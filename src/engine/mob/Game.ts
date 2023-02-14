import { makeAutoObservable } from "mobx";
import { PlayerAgent } from "./PlayerAgent";
import { Room } from "./Room";
import { Timer } from "./Timer";

class Game {
  timer: Timer;
  playerAgent: PlayerAgent;
  room: Room;
  constructor() {
    makeAutoObservable(this);
    this.timer = new Timer(this);
    this.playerAgent = new PlayerAgent(this);
    this.room = this.createDefaultRoom();
  }
  createDefaultRoom = () => {
    return new Room({ game: this });
  };
  newRoom = () => {
    this.room = this.createDefaultRoom();
    this.timer.setActivity("idle");
  };
}

export { Game };
