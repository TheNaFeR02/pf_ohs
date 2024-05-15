import narrativeStatus from "@/data/narrativeStatus.json";
import Concept from "../types/Concept";

// Process narrativeStatus and create the necessary arrays in a single loop
const narrativeStatusObj: Concept[] = [];
const narrativeStatusCode: [string, ...string[]] = [""];
const narrativeStatusDisplay: [string, ...string[]] = [""];
const narrativeStatusDefinition: [string, ...string[]] = [""];

narrativeStatus.concept.forEach((item) => {
  narrativeStatusObj.push(item);
  narrativeStatusCode.push(item.code);
  narrativeStatusDisplay.push(item.display);
  narrativeStatusDefinition.push(item.definition);
});
// Remove the initial empty string
narrativeStatusCode.shift();
narrativeStatusDisplay.shift();
narrativeStatusDefinition.shift();

// Export all the processed data
export { narrativeStatusObj, narrativeStatusCode, narrativeStatusDisplay, narrativeStatusDefinition };
