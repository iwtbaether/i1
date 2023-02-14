const fs = require("fs");

// print the current working directory
console.log("Current directory: " + process.cwd());

// read the english file from src/assets/texts/en.json
const en = JSON.parse(fs.readFileSync("./src/assets/text/en.json", "utf8"));

// recursively parse through the en object and convert the values to pig latin
const pigLatin = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      newObj[key] = pigLatin(obj[key]);
    } else {
      // newObj[key] = obj[key].replace(/(\w)(\w*)/g, "$2$1ay");
      // convert to pig latin, capitalize only the first letter
      newObj[key] = obj[key]
        .replace(/(\w)(\w*)/g, "$2$1ay")
        .replace(
          /(\w)(\w*)/g,
          (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
        );
    }
  }
  return newObj;
};

// write the pig latin file to src/assets/texts/piglatin.json
fs.writeFile(
  "./src/assets/text/piglatin.json",
  JSON.stringify(pigLatin(en)),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
