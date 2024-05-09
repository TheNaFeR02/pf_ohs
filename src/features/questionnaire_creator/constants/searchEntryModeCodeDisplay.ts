import searchEntryMode from "@/features/questionnaire_creator/data/searchEntryMode.json";
import Concept from "@/types/Concept";

const searchEntryModeCodeDisplay: Concept[] = searchEntryMode.concept.map(
  (item) => ({
    display: item.display,
    code: item.code,
  })
);

export default searchEntryModeCodeDisplay;
