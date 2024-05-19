import appointmentStatus from "@/data/appointmentStatus.json";
import Concept from "../types/Concept";

// Process appointmentStatus and create the necessary arrays in a single loop
const appointmentStatusObj: Concept[] = [];
const appointmentStatusCode: [string, ...string[]] = [""];
const appointmentStatusDisplay: [string, ...string[]] = [""];
const appointmentStatusDefinition: [string, ...string[]] = [""];

appointmentStatus.concept.forEach((item) => {
  appointmentStatusObj.push(item);
  appointmentStatusCode.push(item.code);
  appointmentStatusDisplay.push(item.display);
  appointmentStatusDefinition.push(item.definition);
});


// Remove the initial empty string
appointmentStatusCode.shift();
appointmentStatusDisplay.shift();
appointmentStatusDefinition.shift();

// Export all the processed data
export { appointmentStatusObj, appointmentStatusCode, appointmentStatusDisplay, appointmentStatusDefinition };
