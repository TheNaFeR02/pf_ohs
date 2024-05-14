import subjectTypes from "@/data/subjectTypes.json";
import Concept from "../types/Concept";

const subjectTypesCodeDisplay: Concept[] = subjectTypes.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default subjectTypesCodeDisplay;
