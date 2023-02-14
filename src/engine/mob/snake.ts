import { makeObservable, observable, action, computed } from "mobx";
import {
  createUsableNumbers,
  get0to100,
  mulberry32,
} from "../../ui/mulberry32";
import {
  getRandomEnumValue,
  getWeightedRandomEnumValue,
} from "../../util/enumUtils";
import {
  ChestRarities,
  ChestRarityOcurrences,
  ChestRarityOcurrences2,
  ChestTypes,
  EncounterType,
  EncounterTypeOcurrences,
  RoomHidingSpot,
} from "./SnakeTypes";

class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title: string) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
    });
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}

class TodoList {
  todos: Todo[] = [];
  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }
  constructor(todos: Todo[]) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed,
    });
    this.todos = todos;
  }
}

class Chest {
  id = Math.random() * 10000;
  nums: number[] = [];
  name = "";
  chestType = ChestTypes.primitive;
  chestRarity = ChestRarities.common;
  constructor(name: string, id?: number) {
    makeObservable(this, {
      name: observable,
    });
    this.name = name;
    if (id) {
      this.generateChestFromSeed(id);
    } else {
      this.generateChestFromSeed(Math.random() * 10000);
    }
  }

  generateChestFromSeed(seed: number) {
    console.log("Generating chest from seed: " + seed);
    const gen = mulberry32(seed);
    const gens = createUsableNumbers(gen, 10);
    console.log("gens: " + gens);
    this.id = seed;
    this.nums = gens;

    // use gens[0] to choose a chest type
    const chestType = getRandomEnumValue(
      Math.floor(gens[0] * 10000),
      ChestTypes
    );
    console.log("Chest type: " + chestType);
    this.chestType = chestType;

    // use gens[1] to choose a chest rarity
    const chestRarity = getRandomEnumValue(
      Math.floor(gens[1] * 10000),
      ChestRarities
    );

    // use gens[1] to choose a weighted chest rarity
    const wChestRarity = getWeightedRandomEnumValue(
      Math.floor(gens[1] * 10000),
      ChestRarities,
      ChestRarityOcurrences2
    );

    console.log("Chest rarity 1: " + chestRarity);
    console.log("Chest rarity 2: " + wChestRarity);
    this.chestRarity = wChestRarity;
  }
}

class Room {
  id = Math.random() * 10000;
  nums: number[] = [];
  name = "";
  chestCount = 0;
  chests: Chest[] = [];
  encounters: EncounterType[] = [];
  hidingSpot: RoomHidingSpot = RoomHidingSpot.none;

  constructor(name: string, id?: number) {
    makeObservable(this, {
      name: observable,
    });
    this.name = name;
    if (id) {
      this.generateRoomFromSeed(id);
    } else {
      this.generateRoomFromSeed(Math.random() * 10000);
    }
  }

  generateRoomFromSeed(seed: number) {
    console.log("Generating room from seed: " + seed);
    const gen = mulberry32(seed);
    const gens = createUsableNumbers(gen, 10);
    console.log("gens: " + gens);
    this.id = seed;
    this.nums = gens;

    // use gens[0] to choose 0-5 chests
    this.chestCount = gens[0] % 6;

    // use gens[1] to create a new gen for the chests, generate chests
    if (this.chestCount > 0) {
      const chestGen = mulberry32(gens[1]);
      this.createChests(chestGen, this.chestCount);
    } else {
      this.chests = [];
    }

    // use gens[2] to choose 0-10 encounters
    const encounterCount = gens[2] % 11;

    // use gens[3] to create a new gen for the encounters, generate encounters
    if (encounterCount > 0) {
      const encounterGen = mulberry32(gens[3]);
      this.createEncounters(encounterGen, encounterCount);
    } else {
      this.encounters = [];
    }

    // use gens[4] to choose a hiding spot
    this.hidingSpot = getRandomEnumValue(gens[4], RoomHidingSpot);
  }

  createChests(gen: () => number, count: number) {
    this.chests = Array.from({ length: count }, () => {
      return new Chest("chest", gen() * 10000);
    });
  }

  createEncounters(gen: () => number, count: number) {
    this.encounters = Array.from({ length: count }, () => {
      return getWeightedRandomEnumValue(
        Math.floor(gen() * 10000),
        EncounterType,
        EncounterTypeOcurrences
      );
    });
  }
}

enum PlayerSkills {
  combat = "Combat",
  stealth = "Stealth",
  agility = "Agility",
  search = "Search",
  mining = "Mining",
  fishing = "Fishing",
  woodcutting = "Woodcutting",
}

interface PlayerSkillData {
  xp: number;
  level: number;
}

interface PlayerSkillCalcs {
  multiplier: number;
  requiredXp: number;
  xpToNextLevel: number;
}

class PlayerAgent {
  skills: Map<PlayerSkills, PlayerSkillData> = new Map();
  skillCalcs: Map<PlayerSkills, PlayerSkillCalcs> = new Map();
  constructor() {
    makeObservable(this, {
      skills: observable,
      skillCalcs: observable,
      calculateSkillCalcs: action,
      calculateSingleSkillCalc: action,
      addXp: action,
    });
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
      const requiredXp = Math.floor(
        Math.pow(skillData.level, multiplier) * 100
      );
      const xpToNextLevel = requiredXp - skillData.xp;
      this.skillCalcs.set(skill, {
        multiplier,
        requiredXp,
        xpToNextLevel,
      });
    }
  }

  addXp(skill: PlayerSkills, xp: number) {
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
  }
}

export { Todo, TodoList, Room, PlayerAgent, PlayerSkills };

export type { PlayerSkillData, PlayerSkillCalcs };
