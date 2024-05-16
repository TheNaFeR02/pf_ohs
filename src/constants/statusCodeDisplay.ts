import status from "@/data/status.json";
import Concept from "../types/Concept";

// Process status and create the necessary arrays in a single loop
const statusObj: Concept[] = [];
const statusCode: [string, ...string[]] = [""];
const statusDisplay: [string, ...string[]] = [""];
const statusDefinition: [string, ...string[]] = [""];

status.concept.forEach((item) => {
  statusObj.push(item);
  statusCode.push(item.code);
  statusDisplay.push(item.display);
  statusDefinition.push(item.definition);
});

// Remove the initial empty string
statusCode.shift();
statusDisplay.shift();
statusDefinition.shift();

// Export all the processed data
export { statusObj, statusCode, statusDisplay, statusDefinition };
