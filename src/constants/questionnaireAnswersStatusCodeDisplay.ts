import questionnaireAnswersStatus from "@/data/QuestionnaireAnswersStatus.json";
import Concept from "../types/Concept";

const questionnaireAnswersStatusCodeDisplay: Concept[] =
  questionnaireAnswersStatus.concept.map((item) => ({
    display: item.display,
    code: item.code,
  }));

export default questionnaireAnswersStatusCodeDisplay;