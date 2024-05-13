import addressType from "@/features/questionnaire_creator/data/addressType.json";
import Concept from "@/types/Concept";

const addressTypeCodeDisplay: Concept[] = addressType.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default addressTypeCodeDisplay;