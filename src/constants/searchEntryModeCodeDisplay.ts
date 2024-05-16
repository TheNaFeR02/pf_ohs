import searchEntryMode from "@/data/searchEntryMode.json";
import Concept from "../types/Concept";

// Process searchEntryMode and create the necessary arrays in a single loop
const searchEntryModeObj: Concept[] = [];
const searchEntryModeCode: [string, ...string[]] = [""];
const searchEntryModeDisplay: [string, ...string[]] = [""];
const searchEntryModeDefinition: [string, ...string[]] = [""];

searchEntryMode.concept.forEach((item) => {
  searchEntryModeObj.push(item);
  searchEntryModeCode.push(item.code);
  searchEntryModeDisplay.push(item.display);
  searchEntryModeDefinition.push(item.definition);
});

// Remove the initial empty string
searchEntryModeCode.shift();
searchEntryModeDisplay.shift();
searchEntryModeDefinition.shift();

// Export all the processed data
export { searchEntryModeObj, searchEntryModeCode, searchEntryModeDisplay, searchEntryModeDefinition };
