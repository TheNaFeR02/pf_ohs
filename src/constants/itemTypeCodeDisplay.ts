import itemType from "@/data/itemType.json";
import Concept from "../types/Concept";

// Process itemType and create the necessary arrays in a single loop
const itemTypeObj: Concept[] = [];
const itemTypeCode: [string, ...string[]] = [""];
const itemTypeDisplay: [string, ...string[]] = [""];
const itemTypeDefinition: [string, ...string[]] = [""];

// The structure of itemType is different from the previous examples
// The concept array is nested inside the concept array
itemType.concept.forEach((item) => {
  if (item.concept) {
    item.concept.forEach((concept) => {
      itemTypeObj.push(concept);
      itemTypeCode.push(concept.code);
      itemTypeDisplay.push(concept.display);
      itemTypeDefinition.push(concept.definition);
    });
  } else {
    itemTypeObj.push(item);
    itemTypeCode.push(item.code);
    itemTypeDisplay.push(item.display);
    itemTypeDefinition.push(item.definition);
  }
});

// Remove the initial empty string
itemTypeCode.shift();
itemTypeDisplay.shift();
itemTypeDefinition.shift();

// Export all the processed data
export { itemTypeObj, itemTypeCode, itemTypeDisplay, itemTypeDefinition };
