import { Questionnaire } from "../../../types/Questionnaire";
import { Item as QuestionnaireResponseItem, QuestionnaireResponse } from "../../../types/QuestionnaireResponse";
import { Item as QuestionnaireItem } from "../../../types/Questionnaire"

export function generateDefaultQuestionnaireResponse(questionnaire: { item: QuestionnaireItem[] }): QuestionnaireResponse {
  function generateDefaultItem(item: QuestionnaireItem): QuestionnaireResponseItem {
    // console.log("Item id:", item.linkId)
    const defaultItem: QuestionnaireResponseItem = {
      linkId: item.linkId,
    };

    if (item.text) {
      defaultItem.text = item.text;
    }

    if (item.type === 'group' && item.item) {
      defaultItem.item = item.item.map(subItem => generateDefaultItem(subItem));
    } else {
      switch (item.type) {
        case 'string' || 'text':
          defaultItem.answer = [{ valueString: '' }];
          break;
        case 'integer':
          defaultItem.answer = [{ valueInteger: 0 }];
          break;
        case 'choice':
          defaultItem.answer = [{ valueCoding: { code: '', display: '' } }]
          break;
        case 'boolean':
          defaultItem.answer = [{ valueBoolean: false }]
          break;
        case 'decimal':
          defaultItem.answer = [{ valueDecimal: 0 }]
          break;
        default:
          defaultItem.answer = [{ valueString: '' }];
          break;
      }
    }
    // console.log("Return of Item id:", item.linkId, defaultItem)
    return defaultItem;
  }

  return {
    resourceType: 'QuestionnaireResponse',
    questionnaire: 'http://hl7.org/fhir/Questionnaire/patient_information02',
    status: 'completed',
    authored: '2024-04-26T14:30:00Z',
    author: {
      reference: "Practitioner/355",
      type: "Practitioner"
    },
    item: questionnaire.item.map(item => generateDefaultItem(item)),
  };
}