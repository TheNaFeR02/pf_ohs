import addressType from "@/data/addressType.json";
import Concept from "../types/Concept";

// Process addressType and create the necessary arrays in a single loop
const addressTypeObj: Concept[] = [];
const addressTypeCode: [string, ...string[]] = [""];
const addressTypeDisplay: [string, ...string[]] = [""];
const addressTypeDefinition: [string, ...string[]] = [""];

addressType.concept.forEach((item) => {
  addressTypeObj.push(item);
  addressTypeCode.push(item.code);
  addressTypeDisplay.push(item.display);
  addressTypeDefinition.push(item.definition);
});

// Remove the initial empty string
addressTypeCode.shift();
addressTypeDisplay.shift();
addressTypeDefinition.shift();

export { addressTypeObj, addressTypeCode, addressTypeDisplay, addressTypeDefinition };
