import linkType from "@/data/linkType.json";
import Concept from "../types/Concept";

const linkTypeCodeDisplay: Concept[] = linkType.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default linkTypeCodeDisplay;