enum EncounterType {
  Enemy = "Enemy",
  AggressiveEnemy = "Aggressive Enemy",
  Trap = "Trap",
  TreasureBlockade = "Treasure Blockade",
  Scout = "Scout",
  FishingSpot = "Fishing Spot",
  Tree = "Tree",
  Ore = "Ore",
}

enum RoomHidingSpot {
  none = "None",
  weak = "Weak",
  deep = "Deep",
  strong = "Strong",
  perfect = "Perfect",
}

const EncounterTypeOcurrences: { [key in keyof typeof EncounterType]: number } =
  {
    Enemy: 1000,
    TreasureBlockade: 100,
    AggressiveEnemy: 1000,
    Trap: 1000,
    Scout: 1000,
    FishingSpot: 100,
    Tree: 100,
    Ore: 100,
  };

enum RoomPurpose {
  storage = "Storage",
  cafeteria = "Cafeteria",
  kitchen = "Kitchen",
  office = "Office",
  bedroom = "Bedroom",
  bathroom = "Bathroom",
  forest = "Forest",
  river = "River",
  mountain = "Mountain",
}

enum ChestTypes {
  primitive = "Primitive",
  supplies = "Supplies",
  basic = "Basic",
}

enum ChestRarities {
  common = "Common",
  rare = "Rare",
  epic = "Epic",
}

const ChestRarityOcurrences: { [key in ChestRarities]: number } = {
  [ChestRarities.common]: 80,
  [ChestRarities.rare]: 15,
  [ChestRarities.epic]: 5,
};

// ChestRarityOcurrences with the enum keys instead of values
const ChestRarityOcurrences2: { [key in keyof typeof ChestRarities]: number } =
  {
    common: 80,
    rare: 15,
    epic: 5,
  };

export {
  ChestTypes,
  ChestRarities,
  ChestRarityOcurrences,
  ChestRarityOcurrences2,
  EncounterTypeOcurrences,
  EncounterType,
  RoomHidingSpot,
  RoomPurpose,
};
