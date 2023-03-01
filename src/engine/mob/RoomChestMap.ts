import { ChestRarities, ChestTypes, RoomPurpose } from "./SnakeTypes";

export type RoomChestMap = { [key in RoomPurpose]: ChestTypeMap };

export type ChestTypeMap = { [key in ChestTypes]: ChestRarityMap };

export type ChestRarityMap = { [key in ChestRarities]: string };

export type ChestData = {
  name: string;
};

export const ChestNames: RoomChestMap = {
  [RoomPurpose.storage]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Storage Chest",
      [ChestRarities.rare]: "Primitive Storage Chest",
      [ChestRarities.epic]: "Primitive Storage Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Storage Chest",
      [ChestRarities.rare]: "Supplies Storage Chest",
      [ChestRarities.epic]: "Supplies Storage Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Storage Chest",
      [ChestRarities.rare]: "Basic Storage Chest",
      [ChestRarities.epic]: "Basic Storage Chest",
    },
  },
  [RoomPurpose.cafeteria]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Cafeteria Chest",
      [ChestRarities.rare]: "Primitive Cafeteria Chest",
      [ChestRarities.epic]: "Primitive Cafeteria Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Cafeteria Chest",
      [ChestRarities.rare]: "Supplies Cafeteria Chest",
      [ChestRarities.epic]: "Supplies Cafeteria Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Cafeteria Chest",
      [ChestRarities.rare]: "Basic Cafeteria Chest",
      [ChestRarities.epic]: "Basic Cafeteria Chest",
    },
  },
  [RoomPurpose.kitchen]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Kitchen Chest",
      [ChestRarities.rare]: "Primitive Kitchen Chest",
      [ChestRarities.epic]: "Primitive Kitchen Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Kitchen Chest",
      [ChestRarities.rare]: "Supplies Kitchen Chest",
      [ChestRarities.epic]: "Supplies Kitchen Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Kitchen Chest",
      [ChestRarities.rare]: "Basic Kitchen Chest",
      [ChestRarities.epic]: "Basic Kitchen Chest",
    },
  },
  [RoomPurpose.office]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Office Chest",
      [ChestRarities.rare]: "Primitive Office Chest",
      [ChestRarities.epic]: "Primitive Office Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Office Chest",
      [ChestRarities.rare]: "Supplies Office Chest",
      [ChestRarities.epic]: "Supplies Office Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Office Chest",
      [ChestRarities.rare]: "Basic Office Chest",
      [ChestRarities.epic]: "Basic Office Chest",
    },
  },
  [RoomPurpose.bedroom]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Bedroom Chest",
      [ChestRarities.rare]: "Primitive Bedroom Chest",
      [ChestRarities.epic]: "Primitive Bedroom Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Bedroom Chest",
      [ChestRarities.rare]: "Supplies Bedroom Chest",
      [ChestRarities.epic]: "Supplies Bedroom Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Bedroom Chest",
      [ChestRarities.rare]: "Basic Bedroom Chest",
      [ChestRarities.epic]: "Basic Bedroom Chest",
    },
  },
  [RoomPurpose.bathroom]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Bathroom Chest",

      [ChestRarities.rare]: "Primitive Bathroom Chest",
      [ChestRarities.epic]: "Primitive Bathroom Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Bathroom Chest",
      [ChestRarities.rare]: "Supplies Bathroom Chest",
      [ChestRarities.epic]: "Supplies Bathroom Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Bathroom Chest",
      [ChestRarities.rare]: "Basic Bathroom Chest",
      [ChestRarities.epic]: "Basic Bathroom Chest",
    },
  },
  [RoomPurpose.forest]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Forest Chest",
      [ChestRarities.rare]: "Primitive Forest Chest",
      [ChestRarities.epic]: "Primitive Forest Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Forest Chest",
      [ChestRarities.rare]: "Supplies Forest Chest",
      [ChestRarities.epic]: "Supplies Forest Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Forest Chest",
      [ChestRarities.rare]: "Basic Forest Chest",
      [ChestRarities.epic]: "Basic Forest Chest",
    },
  },
  [RoomPurpose.mountain]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive Mountain Chest",
      [ChestRarities.rare]: "Primitive Mountain Chest",
      [ChestRarities.epic]: "Primitive Mountain Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies Mountain Chest",
      [ChestRarities.rare]: "Supplies Mountain Chest",
      [ChestRarities.epic]: "Supplies Mountain Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic Mountain Chest",

      [ChestRarities.rare]: "Basic Mountain Chest",
      [ChestRarities.epic]: "Basic Mountain Chest",
    },
  },
  [RoomPurpose.river]: {
    [ChestTypes.primitive]: {
      [ChestRarities.common]: "Primitive River Chest",
      [ChestRarities.rare]: "Primitive River Chest",
      [ChestRarities.epic]: "Primitive River Chest",
    },
    [ChestTypes.supplies]: {
      [ChestRarities.common]: "Supplies River Chest",
      [ChestRarities.rare]: "Supplies River Chest",
      [ChestRarities.epic]: "Supplies River Chest",
    },
    [ChestTypes.basic]: {
      [ChestRarities.common]: "Basic River Chest",
      [ChestRarities.rare]: "Basic River Chest",

      [ChestRarities.epic]: "Basic River Chest",
    },
  },
};
