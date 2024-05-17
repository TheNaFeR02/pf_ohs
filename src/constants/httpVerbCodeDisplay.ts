import httpVerb from "@/data/httpVerb.json";
import Concept from "../types/Concept";

// Process httpVerb and create the necessary arrays in a single loop
const httpVerbObj: Concept[] = [];
const httpVerbCode: [string, ...string[]] = [""];
const httpVerbDisplay: [string, ...string[]] = [""];
const httpVerbDefinition: [string, ...string[]] = [""];

httpVerb.concept.forEach((item) => {
  httpVerbObj.push(item);
  httpVerbCode.push(item.code);
  httpVerbDisplay.push(item.display);
  httpVerbDefinition.push(item.definition);
});


// Remove the initial empty string
httpVerbCode.shift();
httpVerbDisplay.shift();
httpVerbDefinition.shift();

// Export all the processed data
export { httpVerbObj, httpVerbCode, httpVerbDisplay, httpVerbDefinition };
