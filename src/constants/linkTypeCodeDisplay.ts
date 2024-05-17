import linkType from "@/data/linkType.json";
import Concept from "../types/Concept";

// Process linkType and create the necessary arrays in a single loop
const linkTypeObj: Concept[] = [];
const linkTypeCode: [string, ...string[]] = [""];
const linkTypeDisplay: [string, ...string[]] = [""];
const linkTypeDefinition: [string, ...string[]] = [""];

linkType.concept.forEach((item) => {
  linkTypeObj.push(item);
  linkTypeCode.push(item.code);
  linkTypeDisplay.push(item.display);
  linkTypeDefinition.push(item.definition);
});

// Remove the initial empty string
linkTypeCode.shift();
linkTypeDisplay.shift();

// Export all the processed data
export { linkTypeObj, linkTypeCode, linkTypeDisplay, linkTypeDefinition };
