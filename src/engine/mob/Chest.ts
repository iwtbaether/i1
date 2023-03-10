import { makeAutoObservable, makeObservable, observable } from "mobx";
import { createUsableNumbers, mulberry32 } from "../../util/mulberry32";
import {
  getRandomEnumValue,
  getWeightedRandomEnumValue,
} from "../../util/enumUtils";
import { GameModule } from "./interfaces/GameModule";
import {
  ChestRarities,
  ChestRarityOcurrences2,
  ChestTypes,
} from "./SnakeTypes";

export interface ChestSave {
  discovered: boolean;
  completed: boolean;
}

export class Chest implements GameModule<ChestSave> {
  saveKey = "chest";
  getSaveData = () => {
    return {
      discovered: this.discovered,
      completed: this.completed,
    };
  };
  loadSaveData = (data: Partial<ChestSave>) => {
    this.discovered = data.discovered || this.discovered;
    this.completed = data.completed || this.completed;
  };

  id = Math.random() * 10000;
  nums: number[] = [];
  name = "";
  chestType = ChestTypes.primitive;
  chestRarity = ChestRarities.common;
  discovered: boolean = false;
  completed: boolean = false;

  constructor(name?: string, id?: number) {
    makeAutoObservable(this);
    this.name = name || "";
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
