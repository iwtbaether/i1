import { makeAutoObservable } from "mobx";
import { INIT } from "./../../util/consts";

export type enemyType = "normal" | "aggresive" | "scout";

export const EnemyNoticeRequirements: { [key in enemyType]: number } = {
  normal: 100,
  aggresive: 50,
  scout: 200,
};

export const CombatTick = 100;

export class Enemy {
  // used to be called ID
  seed: number = INIT.number;
  name: string = INIT.string;
  level: number = INIT.number;
  health: number = INIT.number;
  type: enemyType = "normal";

  noticed: number = INIT.number;
  inCombat: boolean = false;
  attackProgress: number = INIT.number;

  constructor(seed: number) {
    makeAutoObservable(this);
  }

  get perception() {
    return this.level;
  }

  get attack() {
    return this.level;
  }

  get speed() {
    return this.level;
  }

  get maxNotice() {
    return EnemyNoticeRequirements[this.type];
  }

  get maxHealth() {
    return this.level * 10;
  }

  get isDead() {
    return this.health <= 0;
  }

  combatTick = (deltaS: number) => {
    this.attackProgress += deltaS * this.speed;
    if (this.attackProgress >= CombatTick) {
      this.attackProgress -= CombatTick;
      // this.attack();
    }
  };

  noticeTick = (deltaS: number) => {
    this.noticed += deltaS * this.perception;
    // if scout, also add progression to each enemy, probably should handle externally
    if (this.noticed >= this.maxNotice) {
      this.inCombat = true;
    }
  };
}
