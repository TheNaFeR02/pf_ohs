import issueType from "@/data/issueType.json";
import Concept from "../types/Concept";

// Process issueType and create the necessary arrays in a single loop
const issueTypeObj: Concept[] = [];
const issueTypeCode: [string, ...string[]] = [""];
const issueTypeDisplay: [string, ...string[]] = [""];
const issueTypeDefinition: [string, ...string[]] = [""];

issueType.concept.forEach((item) => {
  issueTypeObj.push(item);
  issueTypeCode.push(item.code);
  issueTypeDisplay.push(item.display);
  issueTypeDefinition.push(item.definition);
});

// Remove the initial empty string
issueTypeCode.shift();
issueTypeDisplay.shift();
issueTypeDefinition.shift();

// Export all the processed data
export { issueTypeObj, issueTypeCode, issueTypeDisplay, issueTypeDefinition };
