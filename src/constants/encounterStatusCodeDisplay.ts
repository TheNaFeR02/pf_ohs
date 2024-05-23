import encounterStatus from "@/data/encounterStatus.json";
import Concept from "@/types/Concept";

// Process encounterStatus and create the necessary arrays in a single loop
const encounterStatusObj: Concept[] = [];
const encounterStatusCode: [string, ...string[]] = [""];
const encounterStatusDisplay: [string, ...string[]] = [""];
const encounterStatusDefinition: [string, ...string[]] = [""];

encounterStatus.concept.forEach((item) => {
  encounterStatusObj.push(item);
  encounterStatusCode.push(item.code);
  encounterStatusDisplay.push(item.display);
  encounterStatusDefinition.push(item.definition);
});

// Remove the initial empty string
encounterStatusCode.shift();
encounterStatusDisplay.shift();
encounterStatusDefinition.shift();

// Export all the processed data
export { encounterStatusObj, encounterStatusCode, encounterStatusDisplay, encounterStatusDefinition };
