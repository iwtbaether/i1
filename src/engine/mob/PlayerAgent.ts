import { makeObservable, observable, action } from "mobx";
import { Game } from "./Game";
import { PlayerSkills, PlayerSkillData, PlayerSkillCalcs } from "./SnakeTypes";

class PlayerAgent {
  skills: Map<PlayerSkills, PlayerSkillData> = new Map();
  skillCalcs: Map<PlayerSkills, PlayerSkillCalcs> = new Map();
  game: Game;
  constructor(game: Game) {
    makeObservable(this, {
      skills: observable,
      skillCalcs: observable,
      calculateSkillCalcs: action,
      calculateSingleSkillCalc: action,
      addXp: action,
    });
    this.game = game;
    // initialize skills by iterating over the enum
    Object.values(PlayerSkills).forEach((skill, index) => {
      this.skills.set(skill, { xp: index * 2, level: index + 1 });
    });
    this.calculateSkillCalcs();
  }

  calculateSkillCalcs() {
    this.skills.forEach((value, key) => {
      this.calculateSingleSkillCalc(key);
    });
  }

  calculateSingleSkillCalc(skill: PlayerSkills) {
    const skillData = this.skills.get(skill);
    if (skillData) {
      const multiplier = 1.1;
      const skillMultiplier = Math.pow(multiplier, skillData.level - 1);
      const requiredXp = Math.floor(
        Math.pow(skillData.level, multiplier) * 100
      );
      const xpToNextLevel = requiredXp - skillData.xp;
      this.skillCalcs.set(skill, {
        multiplier: skillMultiplier,
        requiredXp,
        xpToNextLevel,
      });
    }
  }

  addXp = (skill: PlayerSkills, xp: number) => {
    xp = Math.floor(xp);
    const skillData = this.skills.get(skill);
    const skillCalc = this.skillCalcs.get(skill);
    if (skillData && skillCalc) {
      skillData.xp += xp;
      if (skillData.xp >= skillCalc.requiredXp) {
        skillData.level += 1;
        skillData.xp -= skillCalc.requiredXp;
      }
      this.skills.set(skill, skillData);
      this.calculateSingleSkillCalc(skill);
    }
  };

  exploreTick = () => {
    const mult = this.skillCalcs.get(PlayerSkills.search)?.multiplier;
    if (!mult) {
      throw new Error("Invalid mult: " + mult);
    }
    this.addXp(PlayerSkills.search, mult);
    this.game.room.gainExplore(mult);
  };
}

export { PlayerAgent };
