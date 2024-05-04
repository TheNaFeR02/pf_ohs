import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FunctionComponent, use, useEffect } from "react";
import {
  UseFormWatch,
  Control,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";
import { Questionnaire } from "@/types/Questionnaire";
import AnswerOptionsFormField from "@/features/questionnaire_creator/components/AnswerOptionsFormField";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import itemTypesCodeDisplay from "@/features/questionnaire_creator/constants/itemTypesCodeDisplay";

interface ItemsFormFieldProps {
  prefix: string;
  watch: UseFormWatch<Questionnaire>;
  setValue: UseFormSetValue<Questionnaire>;
  control: Control<Questionnaire> | undefined;
}

const ItemsFormField: FunctionComponent<ItemsFormFieldProps> = ({
  prefix,
  watch,
  setValue,
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
        {/* <FormField
          control={control}
          name={itemLinkIdInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>link Id</FormLabel>
              <FormControl>
                <Input
                  placeholder="link Id"
                  type="hidden"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={control}
          name={itemTextInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Text" {...field} 
                onBlur={()=>{
                  setValue(itemLinkIdInputPath, prefix.replace(/item\./g, "").slice(0, -1))
                }
                }/>
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
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {itemTypesCodeDisplay.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  setValue={setValue}
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
