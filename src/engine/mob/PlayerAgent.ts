import { makeObservable, observable, action } from "mobx";
import { Game } from "./Game";
import { GameModule } from "./interfaces/GameModule";
import { PlayerSkills, PlayerSkillData, PlayerSkillCalcs } from "./SnakeTypes";

interface PlayerAgentSave {
  skills: { [key in PlayerSkills]: PlayerSkillData };
}

class PlayerAgent implements GameModule<PlayerAgentSave> {
  saveKey = "playerAgent";
  getSaveData = () => {
    return {
      skills: this.skills,
    };
  };
  loadSaveData = (data: Partial<PlayerAgentSave>) => {
    console.log("Player Agent Load", data, this.skills);
    this.skills = data.skills || this.skills;
    // data.skills?.forEach((value, key) => {
    //   console.log("KEY / VALUE");
    //   console.log(key);
    //   console.log(value[0]);
    //   this.skills.set(key, value);
    // });
  };

  skills: { [key in PlayerSkills]: PlayerSkillData } = Object.values(
    PlayerSkills
  ).reduce((acc, skill) => {
    acc[skill] = { xp: 0, level: 1 };
    return acc;
  }, {} as { [key in PlayerSkills]: PlayerSkillData });
  skillCalcs: { [key in PlayerSkills]: PlayerSkillCalcs } = Object.values(
    PlayerSkills
  ).reduce((acc, skill) => {
    acc[skill] = {
      multiplier: 1,
      requiredXp: 100,
      xpToNextLevel: 100,
    };
    return acc;
  }, {} as { [key in PlayerSkills]: PlayerSkillCalcs });

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
      this.skills[skill] = { xp: index * 2, level: index + 1 };
    });
    this.calculateSkillCalcs();
  }

  calculateSkillCalcs() {
    Object.values(PlayerSkills).forEach((skill, index) => {
      this.calculateSingleSkillCalc(skill);
    });
  }

  calculateSingleSkillCalc(skill: PlayerSkills) {
    const skillData = this.skills[skill];
    if (skillData) {
      const multiplier = 1.1;
      const skillMultiplier = Math.pow(multiplier, skillData.level - 1);
      const requiredXp = Math.floor(
        Math.pow(skillData.level, multiplier) * 100
      );
      const xpToNextLevel = requiredXp - skillData.xp;
      this.skillCalcs[skill] = {
        multiplier: skillMultiplier,
        requiredXp,
        xpToNextLevel,
      };
    }
  }

  addXp = (skill: PlayerSkills, xp: number) => {
    xp = Math.floor(xp);
    const skillData = this.skills[skill];
    const skillCalc = this.skillCalcs[skill];
    if (skillData && skillCalc) {
      skillData.xp += xp;
      if (skillData.xp >= skillCalc.requiredXp) {
        skillData.level += 1;
        skillData.xp -= skillCalc.requiredXp;
      }
      this.skills[skill] = skillData;
      this.calculateSingleSkillCalc(skill);
    }
  };

  exploreTick = () => {
    const mult = this.skillCalcs[PlayerSkills.search].multiplier;
    this.addXp(PlayerSkills.search, mult);
    this.game.room.gainExplore(mult);
  };

  exitTick = () => {
    const mult = this.skillCalcs[PlayerSkills.agility].multiplier;
    this.addXp(PlayerSkills.agility, mult);
    this.game.room.gainExit(mult);
  };
}

export { PlayerAgent };
