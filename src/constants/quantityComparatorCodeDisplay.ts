import quantityComparator from "@/data/quantityComparator.json";
import Concept from "../types/Concept";

const quantityComparatorCodeDisplay: Concept[] = quantityComparator.concept.map(
  (item) => ({
    display: item.display,
    code: item.code,
  })
);

export default quantityComparatorCodeDisplay;
