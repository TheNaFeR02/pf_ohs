import subjectTypes from "@/features/questionnaire_creator/data/subjectTypes.json";
import Concept from "@/types/Concept";

const subjectTypesCodeDisplay: Concept[] = subjectTypes.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default subjectTypesCodeDisplay;
