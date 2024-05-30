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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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


type DateFieldProps = {
  index: number;
  control: Control<QuestionnaireResponse>;
  prefix: string;
  itemObj: QuestionnaireItem;
};

export const DateField: React.FC<DateFieldProps> = ({ index, control, prefix, itemObj }) => (
  <FormField
    control={control}
    name={`${prefix}item.${index}.answer.0.valueDate` as `item.${number}.answer.0.valueDate`}
    render={({ field }) => (
      <FormItem className="flex flex-col w-100 py-3 px-5 font-medium">
        <FormLabel>{itemObj.text}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                suppressHydrationWarning // To supress warning about Date mismatch
                variant={"outline"}
                className={cn(
                  "pl-3 text-left font-normal w-full", // w-full just to match the entire width.
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  // format(field.value, "PPP")
                  format(new Date(field.value.split('-').join(' ')), "PPP") // -> This seems to show the date correctly on the input button.
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              defaultMonth={new Date()}
              selected={
                field.value
                  ? new Date(field.value.split('-').join(' '))
                  : undefined
                // this seems to work but field.value is not a Date object, it's a string. Therefore 
                // field.value ? new Date(new Date(field.value).toLocaleString('es-CO', {timeZone: 'America/Bogota', day: "2-digit"})): undefined

                // this is a complete Workaround to avoid the warning about Date mismatch.
                // new Date(field.value || '').toString() !== 'Invalid Date' ? new Date(field.value as string) : undefined
              }
              onSelect={
                // (e) => field.onChange(e?.toISOString().split("T")[0])
                (date) => date ? field.onChange(format(date, 'yyyy-MM-dd')) : field.onChange('')
              }
              disabled={(date: Date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Fecha de nacimiento del paciente.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

