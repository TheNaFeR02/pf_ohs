import issueSeverity from "@/features/questionnaire_creator/data/issueSeverity.json";
import Concept from "@/types/Concept";

const issueSeverityCodeDisplay: Concept[] = issueSeverity.concept.map(
  (item) => ({
    display: item.display,
    code: item.code,
  })
);

export default issueSeverityCodeDisplay;
