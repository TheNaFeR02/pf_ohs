import participantRequired from "@/data/participantRequired.json";
import Concept from "../types/Concept";

// Process participantRequired and create the necessary arrays in a single loop
const participantRequiredObj: Concept[] = [];
const participantRequiredCode: [string, ...string[]] = [""];
const participantRequiredDisplay: [string, ...string[]] = [""];
const participantRequiredDefinition: [string, ...string[]] = [""];

participantRequired.concept.forEach((item) => {
  participantRequiredObj.push(item);
  participantRequiredCode.push(item.code);
  participantRequiredDisplay.push(item.display);
  participantRequiredDefinition.push(item.definition);
});

// Remove the initial empty string
participantRequiredCode.shift();
participantRequiredDisplay.shift();
participantRequiredDefinition.shift();

// Export all the processed data
export {
  participantRequiredObj,
  participantRequiredCode,
  participantRequiredDisplay,
  participantRequiredDefinition,
};
