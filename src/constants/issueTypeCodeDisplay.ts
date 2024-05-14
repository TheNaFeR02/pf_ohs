import issueType from "@/data/issueType.json";
import Concept from "../types/Concept";

const issueTypeCodeDisplay: Concept[] = issueType.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default issueTypeCodeDisplay;
