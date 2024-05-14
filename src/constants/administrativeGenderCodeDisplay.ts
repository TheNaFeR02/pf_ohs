import administrativeGender from "@/data/administrativeGender.json";
import Concept from "../types/Concept";

const administrativeGenderCodeDisplay: Concept[] = administrativeGender.concept.map((item) => ({
  display: item.display,
  code: item.code,
}));

export default administrativeGenderCodeDisplay;