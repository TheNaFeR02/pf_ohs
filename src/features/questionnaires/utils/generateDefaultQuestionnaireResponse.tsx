import { Questionnaire } from "../types/Questionnaire";
import { Item as QuestionnaireResponseItem, QuestionnaireResponse } from "../types/QuestionnaireResponse";
import { Item as QuestionnaireItem } from "../types/Questionnaire"

// export function initializeResponseWithQuestionnaireDefaults(questionnaire: Questionnaire): QuestionnaireResponse {
//     return {
//       resourceType: "QuestionnaireResponse",
//       questionnaire: questionnaire.url,
//       status: "completed",
//       authored: new Date().toISOString(),
//       author: {
//         reference: "",
//         type: ""
//       },
//       item: questionnaire.item.map((item) => ({
//         linkId: item.linkId,
//         answer: item.type === 'choice' ? [{ valueCoding: { code: "", display: "" } }] :  item.type === 'string' ? [{ valueString: "" }] : item.type === "integer" ? [{ valueInteger: 0 }] 
//         : item.type === "group" ? (item.item?.map()) 
//       })),
//     };
//   }

export function generateDefaultQuestionnaireResponse(questionnaire: { item: QuestionnaireItem[] }): QuestionnaireResponse {
  function generateDefaultItem(item: QuestionnaireItem): QuestionnaireResponseItem {
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
        case 'string':
          defaultItem.answer = [{ valueString: '' }];
          break;
        case 'integer':
          defaultItem.answer = [{ valueInteger: 0 }];
          break;
        case 'choice':
          defaultItem.answer = [{ valueCoding: { code: '', display: '' } }]
          break;
        default:
          defaultItem.answer = [{ valueString: '' }];
          break;
      }
    }

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