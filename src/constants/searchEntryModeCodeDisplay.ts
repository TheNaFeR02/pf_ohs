import searchEntryMode from "@/data/searchEntryMode.json";
import Concept from "../types/Concept";

const searchEntryModeCodeDisplay: Concept[] = searchEntryMode.concept.map(
  (item) => ({
    display: item.display,
    code: item.code,
  })
);

export default searchEntryModeCodeDisplay;
