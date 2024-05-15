import addressUse from "@/data/addressUse.json";
import Concept from "../types/Concept";

// Process addressUse and create the necessary arrays in a single loop
const addressUseObj: Concept[] = [];
const addressUseCode: [string, ...string[]] = [""];
const addressUseDisplay: [string, ...string[]] = [""];
const addressUseDefinition: [string, ...string[]] = [""];

addressUse.concept.forEach((item) => {
  addressUseObj.push(item);
  addressUseCode.push(item.code);
  addressUseDisplay.push(item.display);
  addressUseDefinition.push(item.definition);
});

// Remove the initial empty string
addressUseCode.shift();
addressUseDisplay.shift();
addressUseDefinition.shift();

export {
  addressUseObj,
  addressUseCode,
  addressUseDisplay,
  addressUseDefinition,
};
