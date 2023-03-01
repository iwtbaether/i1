import { GameModule } from "./interfaces/GameModule";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { createUsableNumbers, mulberry32 } from "../../util/mulberry32";
import {
  getRandomEnumValue,
  getWeightedRandomEnumValue,
} from "../../util/enumUtils";
import {
  EncounterData,
  EncounterType,
  EncounterTypeOcurrences,
  RoomHidingSpot,
  RoomPurpose,
} from "./SnakeTypes";
import { Chest, ChestSave } from "./Chest";
import { Game } from "./Game";

interface RoomProps {
  game: Game;
  name?: string;
  id?: number;
  level?: number;
}

interface RoomSave {
  // simple
  id: number;
  nums: number[];
  name: string;
  explored: number;
  exit: number;
  level: number;
  encounters: EncounterData[];
  // class
  chests: ChestSave[];
}

class Room implements GameModule<RoomSave> {
  saveKey = "room";
  getSaveData = () => {
    return {
      id: this.id,
      nums: this.nums,
      name: this.name,
      explored: this.explored,
      exit: this.exit,
      level: this.level,
      encounters: this.encounters,
      // todo, store these differenlty
      chests: this.chests.map((c) => c.getSaveData()),
    };
  };

  loadSaveData = (data: Partial<RoomSave>) => {
    // restore name, id, and level
    this.name = data.name || this.name;
    this.id = data.id || this.id;
    this.level = data.level || this.level;

    // regenerate room
    this.generateRoomFromSeed(this.id);

    // restore other room properties
    this.explored = data.explored || this.explored;
    this.exit = data.exit || this.exit;
    this.encounters = data.encounters || this.encounters;

    // TODO, restore chests
    this.chests.forEach((c, i) => {
      if (data?.chests?.[i]) c.loadSaveData(data.chests[i]);
    });

    return;
  };

  game: Game;
  id = Math.random() * 10000;
  nums: number[] = [];
  name = "DEF";
  explored: number = 0;
  exit: number = 0;
  chestCount = 0;
  level: number = 1;
  chests: Chest[] = [];
  encounters: EncounterData[] = [];
  hidingSpot: RoomHidingSpot = RoomHidingSpot.none; // default to none
  purpose: RoomPurpose = RoomPurpose.bathroom; // default to bathroom

  constructor(props: RoomProps) {
    makeAutoObservable(this, { game: false, loadSaveData: action });
    this.level = props.level || 1;
    this.game = props.game;
    const seed = props.id || Math.floor(Math.random() * 10000);
    const name = props.name || `Room ${seed} (${this.level})`;
    this.id = seed;
    this.name = name;
    this.generateRoomFromSeed(seed);
  }

  rename = (name: string) => {
    this.name = name;
  };

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

    // use gens[5] to choose a room purpose
    this.purpose = getRandomEnumValue(gens[5], RoomPurpose);
  }

  createChests(gen: () => number, count: number) {
    this.chests = Array.from({ length: count }, () => {
      return new Chest("chest", gen() * 10000);
    });
  }

  createEncounters(gen: () => number, count: number) {
    this.encounters = Array.from({ length: count }, () => {
      const type = getWeightedRandomEnumValue(
        Math.floor(gen() * 10000),
        EncounterType,
        EncounterTypeOcurrences
      );
      return {
        type,
        discovered: false,
        completed: false,
      };
    });
  }

  gainExplore(count: number) {
    if (this.isExplored) {
      this.game.timer.setActivity("idle");
      return;
    }

    const newExplore = this.explored + count;
    if (newExplore < this.explorePerFind) {
      this.explored = newExplore;
      return;
    }

    const remainingExplore = newExplore - this.explorePerFind;
    this.explored = remainingExplore;
    this.findRandom();
  }

  findRandom = () => {
    if (this.isExplored) {
      this.game.timer.setActivity("idle");
      return;
    }

    const possibleFinds = this.possibleFinds;
    const randomIndex = Math.floor(Math.random() * possibleFinds.length);
    const randomFind = possibleFinds[randomIndex];
    if (randomFind.discovered === false) {
      randomFind.discovered = true;
    } else {
      console.log(
        `randomIndex: ${randomIndex}`,
        `randomFind: ${JSON.stringify(randomFind)}`,
        `possibleFinds: ${JSON.stringify(possibleFinds)}`
      );
      throw new Error("Found a find that was already discovered, or was null");
    }
  };

  get explorePercent() {
    return this.explored / this.totalExplore;
  }

  get isExplored() {
    return this.possibleFinds.length === 0;
  }

  get possibleFinds() {
    const undisoveredChests = this.chests.filter((c) => !c.discovered);
    const undiscoveredEncounters = this.encounters.filter((e) => !e.discovered);
    return [...undisoveredChests, ...undiscoveredEncounters];
  }

  get remainingFinds() {
    return this.totalFinds - this.possibleFinds.length;
  }

  get totalFinds() {
    return this.chests.length + this.encounters.length;
  }

  get totalExplore() {
    return this.explorePerFind * this.totalFinds;
  }

  get explorePerFind() {
    return this.level * 10;
  }

  get exitCost() {
    return this.level * 100;
  }

  gainExit(count: number) {
    if (this.exit >= this.exitCost) {
      this.game.timer.setActivity("idle");
      return;
    }
    this.exit += count;
  }

  get exitReady() {
    return this.exit >= this.exitCost;
  }
}

export { Room };
