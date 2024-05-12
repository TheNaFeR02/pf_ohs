import narrativeStatus from "@/features/questionnaire_creator/data/narrativeStatus.json";
import Concept from "@/types/Concept";

const narrativeStatusCodeDisplay: Concept[] = narrativeStatus.concept.map(
  (item) => ({
    display: item.display,
    code: item.code,
  })
);

export default narrativeStatusCodeDisplay;
