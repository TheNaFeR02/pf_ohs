import bundleType from "@/data/bundleType.json";
import Concept from "../types/Concept";

// Process bundleType and create the necessary arrays in a single loop
const bundleTypeObj: Concept[] = [];
const bundleTypeCode: [string, ...string[]] = [""];
const bundleTypeDisplay: [string, ...string[]] = [""];
const bundleTypeDefinition: [string, ...string[]] = [""];

bundleType.concept.forEach((item) => {
  bundleTypeObj.push(item);
  bundleTypeCode.push(item.code);
  bundleTypeDisplay.push(item.display);
  bundleTypeDefinition.push(item.definition);
});

// Remove the initial empty string
bundleTypeCode.shift();
bundleTypeDisplay.shift();
bundleTypeDefinition.shift();

// Export all the processed data
export { bundleTypeObj, bundleTypeCode, bundleTypeDisplay, bundleTypeDefinition };
