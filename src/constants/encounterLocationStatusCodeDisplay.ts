import encounterLocationStatus from "@/data/encounterLocationStatus.json";
import Concept from "@/types/Concept";

// Process encounterLocationStatus and create the necessary arrays in a single loop
const encounterLocationStatusObj: Concept[] = [];
const encounterLocationStatusCode: [string, ...string[]] = [""];
const encounterLocationStatusDisplay: [string, ...string[]] = [""];
const encounterLocationStatusDefinition: [string, ...string[]] = [""];

encounterLocationStatus.concept.forEach((item) => {
  encounterLocationStatusObj.push(item);
  encounterLocationStatusCode.push(item.code);
  encounterLocationStatusDisplay.push(item.display);
  encounterLocationStatusDefinition.push(item.definition);
});

// Remove the initial empty string
encounterLocationStatusCode.shift();
encounterLocationStatusDisplay.shift();
encounterLocationStatusDefinition.shift();

// Export all the processed data
export {
  encounterLocationStatusObj,
  encounterLocationStatusCode,
  encounterLocationStatusDisplay,
  encounterLocationStatusDefinition,
};
