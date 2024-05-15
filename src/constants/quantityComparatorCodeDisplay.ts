import quantityComparator from "@/data/quantityComparator.json";
import Concept from "../types/Concept";

// Process quantityComparator and create the necessary arrays in a single loop
const quantityComparatorObj: Concept[] = [];
const quantityComparatorCode: [string, ...string[]] = [""];
const quantityComparatorDisplay: [string, ...string[]] = [""];
const quantityComparatorDefinition: [string, ...string[]] = [""];

quantityComparator.concept.forEach((item) => {
  quantityComparatorObj.push(item);
  quantityComparatorCode.push(item.code);
  quantityComparatorDisplay.push(item.display);
  quantityComparatorDefinition.push(item.definition);
});

// Remove the initial empty string
quantityComparatorCode.shift();
quantityComparatorDisplay.shift();
quantityComparatorDefinition.shift();

// Export all the processed data
export { quantityComparatorObj, quantityComparatorCode, quantityComparatorDisplay, quantityComparatorDefinition };
