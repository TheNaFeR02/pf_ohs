import identifierUse from "@/data/identifierUse.json";
import Concept from "../types/Concept";

// Process identifierUse and create the necessary arrays in a single loop
const identifierUseObj: Concept[] = [];
const identifierUseCode: [string, ...string[]] = [""];
const identifierUseDisplay: [string, ...string[]] = [""];
const identifierUseDefinition: [string, ...string[]] = [""];

identifierUse.concept.forEach((item) => {
  identifierUseObj.push(item);
  identifierUseCode.push(item.code);
  identifierUseDisplay.push(item.display);
  identifierUseDefinition.push(item.definition);
});

// Remove the initial empty string
identifierUseCode.shift();
identifierUseDisplay.shift();
identifierUseDefinition.shift();

// Export all the processed data
export { identifierUseObj, identifierUseCode, identifierUseDisplay, identifierUseDefinition };
