import issueSeverity from "@/data/issueSeverity.json";
import Concept from "../types/Concept";

// Process issueSeverity and create the necessary arrays in a single loop
const issueSeverityObj: Concept[] = [];
const issueSeverityCode: [string, ...string[]] = [""];
const issueSeverityDisplay: [string, ...string[]] = [""];
const issueSeverityDefinition: [string, ...string[]] = [""];

issueSeverity.concept.forEach((item) => {
  issueSeverityObj.push(item);
  issueSeverityCode.push(item.code);
  issueSeverityDisplay.push(item.display);
  issueSeverityDefinition.push(item.definition);
});

// Remove the initial empty string
issueSeverityCode.shift();
issueSeverityDisplay.shift();
issueSeverityDefinition.shift();

// Export all the processed data
export { issueSeverityObj, issueSeverityCode, issueSeverityDisplay, issueSeverityDefinition };
