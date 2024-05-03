import { Input } from "@/components/ui/input";
import { FunctionComponent } from "react";
import { Control, UseFormRegister } from "react-hook-form";
import { Questionnaire } from "@/types/Questionnaire";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface AnswerOptionsFormFieldProps {
  prefix?: string;
  control: Control<Questionnaire> | undefined;
}

const AnswerOptionsFormField: FunctionComponent<
  AnswerOptionsFormFieldProps
> = ({ prefix, control }) => {
  const itemValueCodingCodeInputPath =
    `${prefix}valueCoding.code` as `item.${number}.answerOption.${number}.valueCoding.code`;
  const itemValueCodingDisplayInputPath =
    `${prefix}valueCoding.display` as `item.${number}.answerOption.${number}.valueCoding.display`;

  return (
    <div>
      <h1 className="text-2xl font-bold">{prefix}</h1>
      {itemValueCodingCodeInputPath}
      <div className="space-y-2">
        <FormField
          control={control}
          name={itemValueCodingCodeInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={itemValueCodingDisplayInputPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AnswerOptionsFormField;
