// useQuestionnaire Form Field Component
import { useFieldArray, useFormContext } from "react-hook-form";

interface QuestionnaireFormValues {
  resourceType: string;
  title: string;
  url: string;
  status: string;
  subjectType: string[];
  date: Date;
  item: {
    linkId: string;
    text: string;
    type: string;
    answerOption?: {
      valueCoding: {
        code: string;
        display: string;
      };
    }[];
  }[];
}

function useQuestionnaireFormField(prefix: string) {
  const { control, register } = useFormContext<QuestionnaireFormValues>();
  const resourceTypeInputPath = `${prefix}resourceType` as "resourceType";
  const titleInputPath = `${prefix}title` as "title";
  const urlInputPath = `${prefix}url` as "url";
  const statusInputPath = `${prefix}status` as "status";
  const subjectTypeInputPath = `${prefix}subjectType` as "subjectType";
  const dateInputPath = `${prefix}date` as "date";
  const itemInputPath = `${prefix}item` as "item";
  const itemLinkIdInputPath = `item.${prefix}.linkId` as `item.${number}.linkId`;
  const itemTextInputPath = `item.${prefix}text` as `item.${number}.text`
  const itemTypeInputPath = `${prefix}type` as `item.${number}.type`
  const itemAnswerOptionInputPath = `${prefix}answerOption` as `item.${number}.answerOption`
  const itemValueCodingCodeInputPath = `${prefix}valueCoding.code` as `item.${number}.answerOption.${number}.valueCoding.code`;
    const itemValueCodingDisplayInputPath = `${prefix}valueCoding.display` as `item.${number}.answerOption.${number}.valueCoding.display`;

    const { fields, append, remove } = useFieldArray({
        control,
        name: itemInputPath,
    });

    const addNewItem = () => {
        append({
            linkId: '',
            text: '',
            type: '',
        });
    };
    const removeItem = (index: number) => {
        remove(index);
    };

    const addNewAnswerOption = (index: number) => {
        append(
            {
                linkId: `item${index}.answerOption`,
                text: `item${index}.answerOption`,
                type: `item${index}.answerOption`,
                answerOption: [
                    {
                        valueCoding: {
                            code: '',
                            display: '',
                        },
                    },
                ],
            },
        );
    }

    const removeAnswerOption = (index: number) => {
        remove(index);
    }
    return {
        resourceTypeInputPath,
        titleInputPath,
        urlInputPath,
        statusInputPath,
        subjectTypeInputPath,
        dateInputPath,
        itemInputPath,
        itemLinkIdInputPath,
        itemTextInputPath,
        itemTypeInputPath,
        itemAnswerOptionInputPath,
        itemValueCodingCodeInputPath,
        itemValueCodingDisplayInputPath,
        fields,
        register,
        addNewItem,
        removeItem,
        addNewAnswerOption,
        removeAnswerOption,
    };

}

export default useQuestionnaireFormField;
