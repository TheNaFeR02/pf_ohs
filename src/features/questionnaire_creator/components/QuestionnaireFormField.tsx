// Questionnaire Form Field Component

import React, { FunctionComponent } from "react";
import useQuestionnaireFormField from "./useQuestionnaireFormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@radix-ui/react-select";
import useItemsFormField from "./useItemsFormField";

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
  } = useQuestionnaireFormField(prefix);

  return (
    <div>
      <Input {...register(resourceTypeInputPath)} placeholder="Questionnaire" />
      <Input {...register(titleInputPath)} placeholder="Title" />
      <Input {...register(urlInputPath)} placeholder="URL" />
      <Input {...register(statusInputPath)} placeholder="Status" />
      <Input {...register(subjectTypeInputPath)} placeholder="Subject Type" />
      <Input {...register(dateInputPath)} placeholder="Date" />
      <Button onClick={addNewItem}>Add Item</Button>
      {fields.map((item, index) => (
        <div key={item.id}>
          {/* {fields.map((field, index) => (
            <div key={field.id} className="flex flex-row space-x-4">
              <Button variant="destructive" onClick={() => removeItem(index)}>
                -
              </Button>
              <ItemsFormField prefix={`${prefix}item.${index}.`} />
            </div>
          ))} */}
          <ItemsFormField prefix={`${prefix}item.${index}.`} />
          {item.answerOption?.map((answerOption, answerOptionIndex) => (
            <div key={answerOptionIndex}>
              <Input
                {...register(itemValueCodingCodeInputPath)}
                placeholder="Code"
              />
              <Input
                {...register(itemValueCodingDisplayInputPath)}
                placeholder="Display"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireFormField;

interface ItemsFormFieldProps {
  prefix?: string;
}

const ItemsFormField: FunctionComponent<ItemsFormFieldProps> = ({
  prefix = "",
}) => {
  const {
    fields,
    register,
    addNewItem,
    removeItem,
    linkIdInputPath,
    textInputPath,
    typeInputPath,
  } = useItemsFormField(prefix);

  return (
    <div>
      <div className="space-y-2">
        <Input {...register(linkIdInputPath)} placeholder="linkId" />
        <Input {...register(textInputPath)} placeholder="text" />
        <Input {...register(typeInputPath)} placeholder="Type" />

        <Button onClick={addNewItem}>+</Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row space-x-4">
          <Button variant="destructive" onClick={() => removeItem(index)}>
            -
          </Button>
          <ItemsFormField prefix={`${prefix}item.${index}.`} />
        </div>
      ))}
    </div>
  );
};
