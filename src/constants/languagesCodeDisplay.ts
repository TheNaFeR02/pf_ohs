import languages from "@/data/languages.json";
import Concept from "../types/Concept";

// Process languages and create the necessary arrays in a single loop
const languagesObj: Concept[] = [];
const languagesCode: [string, ...string[]] = [""]; // Initialize with an empty string
const languagesDisplay: [string, ...string[]] = [""];

languages.compose.include.forEach((item) => {
  item.concept.forEach((concept) => {
    languagesObj.push(concept);
    languagesCode.push(concept.code);
    languagesDisplay.push(concept.display);
  });
});

// Remove the initial empty string
languagesCode.shift();
languagesDisplay.shift();

export { languagesObj, languagesCode, languagesDisplay };
