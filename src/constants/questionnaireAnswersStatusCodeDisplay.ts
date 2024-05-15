import questionnaireAnswersStatus from "@/data/questionnaireAnswersStatus.json";
import Concept from "../types/Concept";

// Process questionnaireAnswersStatus and create the necessary arrays in a single loop
const questionnaireAnswersStatusObj: Concept[] = [];
const questionnaireAnswersStatusCode: [string, ...string[]] = [""];
const questionnaireAnswersStatusDisplay: [string, ...string[]] = [""];
const questionnaireAnswersStatusDefinition: [string, ...string[]] = [""];

questionnaireAnswersStatus.concept.forEach((item) => {
  questionnaireAnswersStatusObj.push(item);
  questionnaireAnswersStatusCode.push(item.code);
  questionnaireAnswersStatusDisplay.push(item.display);
  questionnaireAnswersStatusDefinition.push(item.definition);
});

// Remove the initial empty string
questionnaireAnswersStatusCode.shift();
questionnaireAnswersStatusDisplay.shift();
questionnaireAnswersStatusDefinition.shift();

// Export all the processed data
export { questionnaireAnswersStatusObj, questionnaireAnswersStatusCode, questionnaireAnswersStatusDisplay, questionnaireAnswersStatusDefinition };
