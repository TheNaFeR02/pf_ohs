import questionnaireEnableBehavior from "@/data/questionnaireEnableBehavior.json";
import Concept from "../types/Concept";

// Process questionnaireEnableBehavior and create the necessary arrays in a single loop
const questionnaireEnableBehaviorObj: Concept[] = [];
const questionnaireEnableBehaviorCode: [string, ...string[]] = [""];
const questionnaireEnableBehaviorDisplay: [string, ...string[]] = [""];
const questionnaireEnableBehaviorDefinition: [string, ...string[]] = [""];

questionnaireEnableBehavior.concept.forEach((item) => {
  questionnaireEnableBehaviorObj.push(item);
  questionnaireEnableBehaviorCode.push(item.code);
  questionnaireEnableBehaviorDisplay.push(item.display);
  questionnaireEnableBehaviorDefinition.push(item.definition);
});

// Remove the initial empty string
questionnaireEnableBehaviorCode.shift();
questionnaireEnableBehaviorDisplay.shift();
questionnaireEnableBehaviorDefinition.shift();

// Export all the processed data
export { questionnaireEnableBehaviorObj, questionnaireEnableBehaviorCode, questionnaireEnableBehaviorDisplay, questionnaireEnableBehaviorDefinition };
