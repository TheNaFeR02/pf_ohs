import questionnaireEnableOperator from "@/features/questionnaire_creator/data/questionnaireEnableOperator.json";
import Concept from "@/types/Concept";

const questionnaireEnableOperatorCodeDisplay: Concept[] =
  questionnaireEnableOperator.concept.map((item) => ({
    display: item.display,
    code: item.code,
  }));

export default questionnaireEnableOperatorCodeDisplay;
