import { QuestionnaireResponseItem, QuestionnaireResponse } from "../../../types/QuestionnaireResponse"
import { Questionnaire, QuestionnaireItem } from "../../../types/Questionnaire"


export function generateDefaultQuestionnaireResponse(questionnaire: Questionnaire): QuestionnaireResponse {
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
        case 'decimal':
          defaultItem.answer = [{ valueDecimal: 0.00 }]
        case 'date':
          defaultItem.answer = [{ valueDate: new Date().toISOString().split("T")[0] }]
      }
    }

    return defaultItem;
  }

  return {
    // ...questionnaire, // The data from the questionnaire does not match exactly the data from the questionnaire response.
    resourceType: "QuestionnaireResponse", // In questionnaire for example the resourceType is "Questionnaire".
    questionnaire: 'http://hl7.org/fhir/Questionnaire/patient_information02',
    status: 'completed',
    authored: '2024-04-26T14:30:00Z',
    author: {
      reference: "Practitioner/355",
      type: "Practitioner"
    },
    item: questionnaire.item?.map(item => generateDefaultItem(item)),
  };
}