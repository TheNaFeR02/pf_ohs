import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";
import {
  UseFormRegister,
  UseFormWatch,
  Control,
  useFieldArray,
} from "react-hook-form";
import { QuestionnaireFormValues } from "../types/QuestionnaireFormValues";
import AnswerOptionsFormField from "@/features/questionnaire_creator/components/AnswerOptionsFormField";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

interface ItemsFormFieldProps {
  prefix: string;
  watch: UseFormWatch<QuestionnaireFormValues>;
  control: Control<QuestionnaireFormValues> | undefined;
}

const ItemsFormField: FunctionComponent<ItemsFormFieldProps> = ({
  prefix,
  watch,
  control,
}) => {
  const itemLinkIdInputPath = `${prefix}linkId` as `item.${number}.linkId`;
  const itemTextInputPath = `${prefix}text` as `item.${number}.text`;
  const itemTypeInputPath = `${prefix}type` as `item.${number}.type`;
  const itemInputPath = `${prefix}item` as "item";
  const itemAnswerOptionInputPath =
    `${prefix}answerOption` as `item.${number}.answerOption`;
  const watchType = watch(itemTypeInputPath as `item.${number}.type`);

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    control,
    name: itemInputPath,
  });

  const addNewItem = () => {
    itemAppend({
      linkId: "",
      text: "",
      type: "string",
      answerOption: [],
    });
  };

  const removeItem = (index: number) => {
    itemRemove(index);
  };

  const {
    fields: answerOptionFields,
    append: answerOptionAppend,
    remove: answerOptionRemove,
  } = useFieldArray({
    control,
    name: itemAnswerOptionInputPath,
  });

  const addNewAnswerOption = () => {
    answerOptionAppend({
      valueCoding: {
        code: "",
        display: "",
      },
    });
  };

  const removeAnswerOption = (index: number) => {
    answerOptionRemove(index);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{prefix}</h1>

      <div className="space-y-2">
        <FormField
          control={control}
          name={itemLinkIdInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>link Id</FormLabel>
              <FormControl>
                <Input placeholder="link Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={itemTextInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={itemTypeInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchType === "choice" && (
          <div className="flex flex-row space-x-4">
            <Button type="button" onClick={() => addNewAnswerOption()}>
              + Option
            </Button>
            <br />
            {answerOptionFields.map((field, index) => (
              <div key={field.id}>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeAnswerOption(index)}
                >
                  - Option
                </Button>
                <AnswerOptionsFormField
                  prefix={`${prefix}answerOption.${index}.`}
                  control={control}
                />
              </div>
            ))}
          </div>
        )}
        {watchType === "group" && (
          <div className="flex flex-row space-x-4">
            <Button onClick={() => addNewItem()}>+ .Item</Button>
            {itemFields.map((field, index) => (
              <div key={field.id}>
                group item {index}
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeItem(index)}
                >
                  - .item
                </Button>
                <ItemsFormField
                  prefix={`${prefix}item.${index}.`}
                  watch={watch}
                  control={control}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsFormField;
