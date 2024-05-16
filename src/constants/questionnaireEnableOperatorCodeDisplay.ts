import questionnaireEnableOperator from "@/data/questionnaireEnableOperator.json";
import Concept from "../types/Concept";

// Process questionnaireEnableOperator and create the necessary arrays in a single loop
const questionnaireEnableOperatorObj: Concept[] = [];
const questionnaireEnableOperatorCode: [string, ...string[]] = [""];
const questionnaireEnableOperatorDisplay: [string, ...string[]] = [""];
const questionnaireEnableOperatorDefinition: [string, ...string[]] = [""];

questionnaireEnableOperator.concept.forEach((item) => {
  questionnaireEnableOperatorObj.push(item);
  questionnaireEnableOperatorCode.push(item.code);
  questionnaireEnableOperatorDisplay.push(item.display);
  questionnaireEnableOperatorDefinition.push(item.definition);
});

// Remove the initial empty string
questionnaireEnableOperatorCode.shift();
questionnaireEnableOperatorDisplay.shift();
questionnaireEnableOperatorDefinition.shift();

// Export all the processed data
export { questionnaireEnableOperatorObj, questionnaireEnableOperatorCode, questionnaireEnableOperatorDisplay, questionnaireEnableOperatorDefinition };
