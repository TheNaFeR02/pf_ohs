import nameUse from "@/data/nameUse.json";
import Concept from "../types/Concept";

// Process nameUse and create the necessary arrays in a single loop
const nameUseObj: Concept[] = [];
const nameUseCode: [string, ...string[]] = [""];
const nameUseDisplay: [string, ...string[]] = [""];
const nameUseDefinition: [string, ...string[]] = [""];

// The structure of nameUse is different from the previous examples
// The concept array is nested inside the concept array

nameUse.concept.forEach((item) => {
  if (item.concept) {
    item.concept.forEach((concept) => {
      nameUseObj.push(concept);
      nameUseCode.push(concept.code);
      nameUseDisplay.push(concept.display);
      nameUseDefinition.push(concept.definition);
    });
  } else {
    nameUseObj.push(item);
    nameUseCode.push(item.code);
    nameUseDisplay.push(item.display);
    nameUseDefinition.push(item.definition);
  }
});

// Remove the initial empty string
nameUseCode.shift();
nameUseDisplay.shift();
nameUseDefinition.shift();

// Export all the processed data
export { nameUseObj, nameUseCode, nameUseDisplay, nameUseDefinition };