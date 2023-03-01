import character from "./character.json";

type characterRace = typeof character.classes[number];

const ok: characterRace = "human";
