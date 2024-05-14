import addressUse from "@/data/addressUse.json";
import Concept from "../types/Concept";

const addressUseCodeDisplay: Concept[] = addressUse.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default addressUseCodeDisplay;