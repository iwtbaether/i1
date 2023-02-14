import en from "../assets/text/en.json";
import piglatin from "../assets/text/piglatin.json";

type locales = "en" | "piglatin";

const getStringFile = (locale: locales) => {
  switch (locale) {
    case "en":
      return en;
    case "piglatin":
      return piglatin;
    default:
      return en;
  }
};
