import administrativeGender from "@/data/administrativeGender.json";
import Concept from "../types/Concept";

// Process administrativeGender and create the necessary arrays in a single loop
const administrativeGenderObj: Concept[] = [];
const administrativeGenderCode: [string, ...string[]] = [""];
const administrativeGenderDisplay: [string, ...string[]] = [""];
const administrativeGenderDefinition: [string, ...string[]] = [""];

administrativeGender.concept.forEach((item) => {
  administrativeGenderObj.push(item);
  administrativeGenderCode.push(item.code);
  administrativeGenderDisplay.push(item.display);
  administrativeGenderDefinition.push(item.definition);
});

// Remove the initial empty string
administrativeGenderCode.shift();
administrativeGenderDisplay.shift();
administrativeGenderDefinition.shift();

// Export all the processed data
export { administrativeGenderObj, administrativeGenderCode, administrativeGenderDisplay, administrativeGenderDefinition };