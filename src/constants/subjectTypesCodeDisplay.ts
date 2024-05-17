import subjectTypes from "@/data/subjectTypes.json";
import Concept from "../types/Concept";

// Process subjectTypes and create the necessary arrays in a single loop
const subjectTypesObj: Concept[] = [];
const subjectTypesCode: [string, ...string[]] = [""];
const subjectTypesDisplay: [string, ...string[]] = [""];
const subjectTypesDefinition: [string, ...string[]] = [""];

subjectTypes.concept.forEach((item) => {
  subjectTypesObj.push(item);
  subjectTypesCode.push(item.code);
  subjectTypesDisplay.push(item.display);
  subjectTypesDefinition.push(item.definition);
});

// Remove the initial empty string
subjectTypesCode.shift();
subjectTypesDisplay.shift();
subjectTypesDefinition.shift();

// Export all the processed data
export { subjectTypesObj, subjectTypesCode, subjectTypesDisplay, subjectTypesDefinition };
