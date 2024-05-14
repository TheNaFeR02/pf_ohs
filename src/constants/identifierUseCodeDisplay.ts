import identifierUse from "@/data/identifierUse.json";
import Concept from "../types/Concept";

const identifierUseCodeDisplay: Concept[] = identifierUse.concept.map(
  (item) => ({
    display: item.display,
    code: item.code,
  })
);

export default identifierUseCodeDisplay;
