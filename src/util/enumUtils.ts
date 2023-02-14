const getRandomEnumValue = <T extends Object>(
  valueToMod: number,
  enumToUse: T
): T[keyof T] => {
  const enumValues = Object.values(enumToUse);
  const enumLength = enumValues.length;
  const randomIndex = Math.floor(valueToMod % enumLength);
  return enumValues[randomIndex];
};

const getWeightedRandomEnumValue = <T>(
  valueToMod: number,
  enumToUse: T,
  weightMap: { [key in keyof T]: number }
): T[keyof T] => {
  // create a range map of the weights
  const weightRangeMap: { [key in keyof T]: number } = {} as any;
  let weightRange = 0;
  for (const key in weightMap) {
    weightRange += weightMap[key];
    weightRangeMap[key] = weightRange;
  }

  // get a random value within the range
  const randomValue = Math.floor(valueToMod % weightRange);

  // find the enum value that corresponds to the random value
  for (const key in weightRangeMap) {
    if (randomValue < weightRangeMap[key]) {
      return enumToUse[key];
    }
  }

  // if we get here, something went wrong
  throw new Error("getWeightedRandomEnumValue failed");

  // const enumValues = Object.values(enumToUse);
  // const enumLength = enumValues.length;
  // const randomIndex = Math.floor(valueToMod % enumLength);
  // return enumValues[randomIndex];
};

export { getRandomEnumValue, getWeightedRandomEnumValue };

// function randomEnum<T>(anEnum: T): T[keyof T] {
//   const enumValues = Object.keys(anEnum)
//     .map((n) => Number.parseInt(n))
//     .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
//   const randomIndex = Math.floor(Math.random() * enumValues.length);
//   const randomEnumValue = enumValues[randomIndex];
//   return randomEnumValue;
// }

// function randomEnum2<T>(anEnum: T): T[keyof T] {
//   const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
//   const randomIndex = Math.floor(Math.random() * enumValues.length);
//   return enumValues[randomIndex];
// }

// function randEnumValue<T>(enumObj: T): T[keyof T] {
//   const enumValues = Object.values(enumObj);
//   const index = Math.floor(Math.random() * enumValues.length);

//   return enumValues[index];
// }

// const randomEnumKey = <T>(enumeration: T): keyof T => {
//   const keys = Object.keys(enumeration).filter(
//     (k) => !(Math.abs(Number.parseInt(k)) + 1)
//   );
//   const enumKey = keys[Math.floor(Math.random() * keys.length)];

//   return enumKey;
// };
