import bundleType from "@/data/bundleType.json";
import Concept from "../types/Concept";

const bundleTypeCodeDisplay: Concept[] = bundleType.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default bundleTypeCodeDisplay;
