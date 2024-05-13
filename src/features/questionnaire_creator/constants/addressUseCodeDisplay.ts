import addressUse from "@/features/questionnaire_creator/data/addressUse.json";
import Concept from "@/types/Concept";

const addressUseCodeDisplay: Concept[] = addressUse.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default addressUseCodeDisplay;