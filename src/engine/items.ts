type ItemType = "currency" | "consumable" | "equipment";
type ItemRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";
type CurrencyTypes =
  // the 5 currencies that upgrade an items rarity
  | "copper"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  // the 6 currencies that reroll an item of a specific rarity
  | "scrap"
  | "junk"
  | "metal"
  | "tech"
  | "gem"
  | "artifact";
type ConsumableTypes = "potion" | "scroll" | "food";
type EquipmentTypes =
  | "one-handed"
  | "two-handed"
  | "helmet"
  | "body"
  | "gloves"
  | "feet"
  | "ring"
  | "necklace"
  | "shield";

interface BaseItemInfo {
  name: string;
  description: string;
  type: ItemType;
}
interface CurrencyItemInfo extends BaseItemInfo {
  type: "currency";
  currencyType: CurrencyTypes;
}
interface ConsumableItemInfo extends BaseItemInfo {
  type: "consumable";
  consumableType: ConsumableTypes;
}
interface EquipmentItemInfo extends BaseItemInfo {
  type: "equipment";
  equipmentType: EquipmentTypes;
  rarity: ItemRarity;
}
type ItemInfo = CurrencyItemInfo | ConsumableItemInfo | EquipmentItemInfo;

interface ItemMap {
  [key: number]: ItemInfo;
}

const itemMap: ItemMap = {};

interface ItemData {
  id: number;
}

export { itemMap };
