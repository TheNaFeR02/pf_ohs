import languages from "@/data/languages.json";
import Concept from "../types/Concept";

const languagesCodeDisplay: Concept[] =
  languages.compose.include.flatMap((item) =>
    item.concept.map((concept) => ({
      code: concept.code,
      display: concept.display,
    }))
  );

export default languagesCodeDisplay;
