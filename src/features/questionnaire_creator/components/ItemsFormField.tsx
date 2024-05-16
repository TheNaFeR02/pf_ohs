import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";
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
import {itemTypeObj} from "@/constants/itemTypeCodeDisplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrashIcon } from "@radix-ui/react-icons";

interface ItemsFormFieldProps {
  prefix: string;
  watch: UseFormWatch<Questionnaire>;
  setValue: UseFormSetValue<Questionnaire>;
  control: Control<Questionnaire> | undefined;
  index: number;
}

const ItemsFormField: FunctionComponent<ItemsFormFieldProps> = ({
  prefix,
  watch,
  setValue,
  control,
  index,
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
    <div className="space-y-4">
      <FormField
        control={control}
        name={itemTextInputPath}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Text</FormLabel>
            <FormControl>
              <Input
                placeholder="Text"
                {...field}
                onBlur={() => {
                  setValue(
                    itemLinkIdInputPath,
                    prefix.replace(/item\./g, "").slice(0, -1)
                  );
                }}
              />
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {itemTypeObj.map((item) => (
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
        <div className="ml-8">
          {answerOptionFields.map((field, index) => (
            <Accordion type="multiple" key={field.id} defaultValue={[field.id]}>
              <AccordionItem value={field.id}>
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAnswerOption(index)}
                  >
                    <TrashIcon color="red" />
                  </Button>
                  <div>
                    <AccordionTrigger>
                      Option {prefix.replace(/item\./g, "").slice(0, -1)}.
                      {index}
                    </AccordionTrigger>
                  </div>
                </div>
                <AccordionContent>
                  <AnswerOptionsFormField
                    prefix={`${prefix}answerOption.${index}.`}
                    control={control}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Button
            className="w-full mt-4"
            type="button"
            variant="outline"
            onClick={() => addNewAnswerOption()}
          >
            ➕
          </Button>
        </div>
      )}
      {watchType === "group" && (
        <div className="ml-8">
          {itemFields.map((field, index) => (
            <Accordion type="multiple" key={field.id} defaultValue={[field.id]}>
              <AccordionItem value={field.id}>
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <TrashIcon color="red" />
                  </Button>
                  <div>
                    <AccordionTrigger>
                      Item {prefix.replace(/item\./g, "").slice(0, -1)}.{index}
                    </AccordionTrigger>
                  </div>
                </div>
                <AccordionContent>
                  <ItemsFormField
                    prefix={`${prefix}item.${index}.`}
                    watch={watch}
                    setValue={setValue}
                    control={control}
                    index={index}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Button
            className="w-full mt-4"
            type="button"
            variant="outline"
            onClick={() => addNewItem()}
          >
            ➕
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItemsFormField;
