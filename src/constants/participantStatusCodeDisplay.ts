import participantStatus from "@/data/participantStatus.json";
import Concept from "../types/Concept";

// Process participantStatus and create the necessary arrays in a single loop
const participantStatusObj: Concept[] = [];
const participantStatusCode: [string, ...string[]] = [""];
const participantStatusDisplay: [string, ...string[]] = [""];
const participantStatusDefinition: [string, ...string[]] = [""];

participantStatus.concept.forEach((item) => {
  participantStatusObj.push(item);
  participantStatusCode.push(item.code);
  participantStatusDisplay.push(item.display);
  participantStatusDefinition.push(item.definition);
});

// Remove the initial empty string
participantStatusCode.shift();
participantStatusDisplay.shift();
participantStatusDefinition.shift();

export {
  participantStatusObj,
  participantStatusCode,
  participantStatusDisplay,
  participantStatusDefinition,
};
