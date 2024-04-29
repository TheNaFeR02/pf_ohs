import { QuestionnaireResponse } from "../types/QuestionnaireResponse";
import { Questionnarie } from "../types/Questionnarie";

export function generateQResponseFromQuestionnaire(questionnaire: Questionnarie): QuestionnaireResponse {
  return {
    resourceType: "QuestionnaireResponse",
    questionnaire: questionnaire.url,
    status: "completed",
    authored: new Date().toISOString(),
    author: {
      reference: "",
      type: ""
    },
    item: questionnaire.item.map((item) => ({
      linkId: item.linkId,
      answer: item.type === 'choice' ? [{ valueCoding: { code: "", display: "" } }] :  item.type === 'string' ? [{ valueString: "" }] : [{ valueInteger: 0 }]
    })),
  };
}

// Usage:
// const defaultValues = generateQResponseFromQuestionnaire(result.data);