import itemType from "@/data/itemType.json";
import Concept from "../types/Concept";

function concatAllTypes(concepts: typeof itemType.concept) {
  let concatenatedTypes: Concept[] = [];

  // Iterate over each concept
  concepts.forEach((concept) => {
    concatenatedTypes.push({
      code: concept.code,
      display: concept.display,
    });
    // If the current concept has child concepts, recursively call the function to concatenate their codes
    if (concept.concept) {
      concatenatedTypes = concatenatedTypes.concat(
        concatAllTypes(concept.concept)
      );
    }
  });
  return concatenatedTypes;
}

const itemTypesCodeDisplay = concatAllTypes(itemType.concept).map((item) => ({
  code: item.code,
  display: item.display,
}));

export default itemTypesCodeDisplay;
