import React, { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { QuestionnaireFormValues } from "@/features/questionnaire_creator/types/QuestionnaireFormValues";
import ItemsFormField from "@/features/questionnaire_creator/components/ItemsFormField";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";

const QuestionnaireFormField: FunctionComponent = () => {
  const { control, watch } =
    useFormContext<QuestionnaireFormValues>();

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    control,
    name: "item",
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

  return (
    <div>
      <FormField
        control={control}
        name="resourceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resource type</FormLabel>
            <FormControl>
              <Input placeholder="Resource Type" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input placeholder="URL" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <Input placeholder="Status" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
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
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
      
      {itemFields.map((item, index) => (
        <div key={item.id}>
          Item {index}
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem(index)}
          >
            - Item
          </Button>
          <ItemsFormField
            prefix={`item.${index}.`}
            watch={watch}
            control={control}
          />
        </div>
      ))}
      <Button type="button" onClick={addNewItem}>
        + Item
      </Button>
    </div>
  );
};

export default QuestionnaireFormField;
