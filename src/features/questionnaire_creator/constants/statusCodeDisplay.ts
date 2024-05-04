import status from "@/features/questionnaire_creator/data/status.json";
import Concept from "@/types/Concept";

const statusCodeDisplay:Concept[] = status.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default statusCodeDisplay;