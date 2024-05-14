import questionnaireEnableBehavior from "@/data/QuestionnaireEnableBehavior.json";
import Concept from "../types/Concept";

const questionnaireEnableBehaviorCodeDisplay: Concept[] =
  questionnaireEnableBehavior.concept.map((item) => ({
    display: item.display,
    code: item.code,
  }));

export default questionnaireEnableBehaviorCodeDisplay;
