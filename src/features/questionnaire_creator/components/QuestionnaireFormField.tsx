// Questionnaire Form Field Component

import React, { FunctionComponent } from "react";
import useQuestionnaireFormField from "./useQuestionnaireFormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuestionnaireFormFieldProps {
  prefix?: string;
}

const QuestionnaireFormField: FunctionComponent<
  QuestionnaireFormFieldProps
> = ({ prefix = "" }) => {
  const {
    resourceTypeInputPath,
    titleInputPath,
    urlInputPath,
    statusInputPath,
    subjectTypeInputPath,
    dateInputPath,
    itemFields,
    register,
    addNewItem,
    removeItem,
  } = useQuestionnaireFormField(prefix);

  return (
    <div>
      <Input {...register(resourceTypeInputPath)} placeholder="Questionnaire" />
      <Input {...register(titleInputPath)} placeholder="Title" />
      <Input {...register(urlInputPath)} placeholder="URL" />
      <Input {...register(statusInputPath)} placeholder="Status" />
      <Input {...register(subjectTypeInputPath)} placeholder="Subject Type" />
      <Input {...register(dateInputPath)} placeholder="Date" />
      {itemFields.map((item, index) => (
        <div key={item.id}>
          <Button variant="destructive" onClick={() => removeItem(index)}>
            - Item
          </Button>
          <ItemsFormField prefix={`${prefix}item.${index}.`} />
        </div>
      ))}
      <Button onClick={addNewItem}>+ Item</Button>
    </div>
  );
};

export default QuestionnaireFormField;

interface ItemsFormFieldProps {
  prefix?: string;
}

// Nota: Añadir la opción de agregar y eliminar answerOptions

const ItemsFormField: FunctionComponent<ItemsFormFieldProps> = ({
  prefix = "",
}) => {
  const {
    itemFields,
    answerOptionFields,
    register,
    addNewItem,
    removeItem,
    addNewAnswerOption,
    removeAnswerOption,
    itemLinkIdInputPath,
    itemTextInputPath,
    itemTypeInputPath,
    watch,
  } = useQuestionnaireFormField(prefix);

  const watchType = watch(itemTypeInputPath);

  return (
    <div>
      <h1 className="text-2xl font-bold">{prefix}</h1>
      <div className="space-y-2">
        <Input {...register(itemLinkIdInputPath)} placeholder="linkId" />
        <Input {...register(itemTextInputPath)} placeholder="text" />
        <Input {...register(itemTypeInputPath)} placeholder="Type" />

        {watchType === "choice" && (
          <div className="flex flex-row space-x-4">
            <Button onClick={() => addNewAnswerOption(1)}>+ Option</Button>
            {answerOptionFields.map((field, index) => (
              <div key={field.id}>
            <Button variant="destructive" onClick={() => removeAnswerOption(index)}>- Option</Button>
                <AnswerOptionsFormField 
                  prefix={`${prefix}answerOption.${index}.`}
                />
              </div>
            ))}
          </div>
        )}
        {watchType === "group" && (
          <div className="flex flex-row space-x-4">
            <Button onClick={() => addNewItem()}>+ Item</Button>
            {itemFields.map((field, index) => (
              <div key={field.id}>
                <Button variant="destructive" onClick={() => removeItem(index)}>
                  - .item
                </Button>
                <ItemsFormField prefix={`${prefix}item.${index}.`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface AnswerOptionsFormFieldProps {
  prefix?: string;
}

const AnswerOptionsFormField: FunctionComponent<
  AnswerOptionsFormFieldProps
> = ({ prefix = "" }) => {
  const {
    register,
    itemValueCodingCodeInputPath,
    itemValueCodingDisplayInputPath,
  } = useQuestionnaireFormField(prefix);

  return (
    <div>
        <h1 className="text-2xl font-bold">{prefix}</h1>
        
      <div className="space-y-2">
        <Input {...register(itemValueCodingCodeInputPath)} placeholder="Code" />
        <Input
          {...register(itemValueCodingDisplayInputPath)}
          placeholder="Display"
        />
      </div>
    </div>
  );
};
