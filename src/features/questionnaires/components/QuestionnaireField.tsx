import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuestionnaireResponseLayout from "@/features/questionnaires/components/QuestionnaireResponseLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ReactElement } from "react";
import { Control } from "react-hook-form";
import { QuestionnaireResponse } from "@/types/QuestionnaireResponse";
import { QuestionnaireItem } from "@/types/Questionnaire";


// StringField Component
type StringFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const StringField: React.FC<StringFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    key={index}
    control={control}
    name={
      `${prefix}item.${index}.answer.0.valueString` as `item.${number}.answer.0.valueString`
    }
    render={({ field }): ReactElement => (
      <FormItem className="w-100 py-3 px-5 font-medium">
        <FormLabel>{itemObj.text}</FormLabel>
        <FormControl>
          <Input
            placeholder={"Ingresa tu " + itemObj.text}
            {...field}
          />
        </FormControl>
        <FormDescription>{itemObj.text}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);


// IntegerField Component
type IntegerFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const IntegerField: React.FC<IntegerFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    key={index}
    control={control}
    name={
      `${prefix}item.${index}.answer.0.valueInteger` as `item.${number}.answer.0.valueInteger`
    }
    defaultValue={0}
    render={({ field }): ReactElement => (
      <FormItem className="w-100 py-3 px-5 font-medium">
        <FormLabel>{itemObj.text}</FormLabel>
        <FormControl>
          <Input
            placeholder={"Ingresa tu " + itemObj.text}
            {...field}
            type="number"
            onChange={(e) =>
              field.onChange(parseInt(e.target.value))
            }
          />
        </FormControl>
        <FormDescription>{itemObj.text}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

// ChoiceField Component
type ChoiceFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const ChoiceField: React.FC<ChoiceFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    key={index}
    control={control}
    name={
      `${prefix}item.${index}.answer.0.valueCoding` as `item.${number}.answer.0.valueCoding`
    }
    render={({ field }): ReactElement => (
      <FormItem className="w-100 py-3 px-5 font-medium">
        <FormLabel>{itemObj.text}</FormLabel>
        <Select
          onValueChange={(e) => field.onChange(JSON.parse(e))}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue
                placeholder={`Selecciona ${itemObj.text}`}
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {itemObj.answerOption?.map(
              (option, index) =>
                option &&
                option.valueCoding && (
                  <SelectItem
                    key={index}
                    value={JSON.stringify(option.valueCoding)}
                  >
                    {option.valueCoding.display}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
        <FormDescription>
          You can manage identification types in your settings.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

// DecimalField Component
type DecimalFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const DecimalField: React.FC<DecimalFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    key={index}
    control={control}
    name={
      `${prefix}item.${index}.answer.0.valueDecimal` as `item.${number}.answer.0.valueDecimal`
    }
    defaultValue={0.0}
    render={({ field }): ReactElement => (
      <FormItem className="w-100 py-3 px-5 font-medium">
        <FormLabel>{itemObj.text}</FormLabel>
        <FormControl>
          <Input
            placeholder={"Ingresa tu " + itemObj.text}
            {...field}
            type="number"
            onChange={(e) =>
              field.onChange(parseFloat(e.target.value))
            }
          />
        </FormControl>
        <FormDescription>
          {itemObj.text} Ej: <i>0,00</i>
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

// TextField Component
type TextFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const TextField: React.FC<TextFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    control={control}
    name={
      `${prefix}item.${index}.answer.0.valueString` as `item.${number}.answer.0.valueString`
    }
    render={({ field }) => (
      <FormItem className="w-100 py-3 px-5 font-medium">
        <FormLabel>{itemObj.text}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={itemObj.text}
            className="resize-none"
            {...field}
          />
        </FormControl>
        <FormDescription>{itemObj.text}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

// BooleanField Component
type BooleanFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const BooleanField: React.FC<BooleanFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    control={control}
    name={
      `${prefix}item.${index}.answer.0.valueBoolean` as `item.${number}.answer.0.valueBoolean`
    }
    render={({ field }) => (
      <FormItem
        className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4"
      >
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{itemObj.text}</FormLabel>
          <FormDescription>{itemObj.text}</FormDescription>
        </div>
      </FormItem>
    )}
  />
);

