const RNGBOOST = 100000;

function mulberry32(a: any): () => number {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function get0to100(gen: () => number): number {
  return Math.floor(gen() * 100);
}

function createUsableNumbers(gen: () => number, count: number): number[] {
  return Array.from({ length: count }, () => {
    return Math.floor(gen() * RNGBOOST);
  });
}

export { mulberry32, get0to100, createUsableNumbers, RNGBOOST };
