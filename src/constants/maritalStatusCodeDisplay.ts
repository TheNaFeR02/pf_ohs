import maritalStatus from "@/data/maritalStatus.json";
import Concept from "../types/Concept";

// Process maritalStatus and create the necessary arrays in a single loop
const maritalStatusObj: Concept[] = [];
const maritalStatusCode: [string, ...string[]] = [""];
const maritalStatusDisplay: [string, ...string[]] = [""];
const maritalStatusDefinition: [string, ...string[]] = [""];

maritalStatus.concept.forEach((item) => {
  maritalStatusObj.push(item);
  maritalStatusCode.push(item.code);
  maritalStatusDisplay.push(item.display);
  maritalStatusDefinition.push(item.definition);
});


// Remove the initial empty string
maritalStatusCode.shift();
maritalStatusDisplay.shift();
maritalStatusDefinition.shift();

// Export all the processed data
export { maritalStatusObj, maritalStatusCode, maritalStatusDisplay, maritalStatusDefinition };
