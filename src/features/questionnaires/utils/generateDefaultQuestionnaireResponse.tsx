import {
  QuestionnaireResponseItem,
  QuestionnaireResponse,
} from "../../../types/QuestionnaireResponse";
import { Questionnaire, QuestionnaireItem } from "../../../types/Questionnaire";

export function generateDefaultQuestionnaireResponse(
  questionnaire: Questionnaire,
  encounter?: {
    reference: string;
  },
  questionnaireResponse?: QuestionnaireResponse
): QuestionnaireResponse {
  function generateDefaultItem(
    item: QuestionnaireItem
  ): QuestionnaireResponseItem {
    const defaultItem: QuestionnaireResponseItem = {
      linkId: item.linkId,
    };

    if (item.text) {
      defaultItem.text = item.text;
    }

    if (item.type === "group" && item.item) {
      defaultItem.item = item.item.map((subItem) =>
        generateDefaultItem(subItem)
      );
    } else {
      const existingAnswer = questionnaireResponse?.item?.find(
        (qrItem) => qrItem.linkId === item.linkId
      )?.answer;
      switch (item.type) {
        case "string":
        case "text":
          defaultItem.answer = existingAnswer ?? [{ valueString: "" }];
          break;
        case "integer":
          defaultItem.answer = existingAnswer ?? [{ valueInteger: 0 }];
          break;
        case "choice":
          defaultItem.answer = existingAnswer ?? [
            { valueCoding: { code: "", display: "" } },
          ];
          break;
        case "boolean":
          defaultItem.answer = existingAnswer ?? [{ valueBoolean: false }];
          break;
        case "decimal":
          defaultItem.answer = existingAnswer ?? [{ valueDecimal: 0.0 }];
          break;
        case "date":
          defaultItem.answer = existingAnswer ?? [
            { valueDate: new Date().toISOString().split("T")[0] },
          ];
          break;
      }
    }

    return defaultItem;
  }

  return {
    resourceType: "QuestionnaireResponse",
    questionnaire: questionnaire.id,
    encounter: encounter,
    status: "completed",
    item: questionnaire.item?.map((item) => generateDefaultItem(item)),
  };
}
