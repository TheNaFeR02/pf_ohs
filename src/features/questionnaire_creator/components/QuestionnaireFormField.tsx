"use client";
import React, { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Questionnaire } from "@/types/Questionnaire";
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
import { CalendarIcon, StarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CaretSortIcon, CheckIcon, TrashIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatTextToUrl from "@/features/questionnaire_creator/utils/formatTextToUrl";
import statusCodeDisplay from "@/features/questionnaire_creator/constants/statusCodeDisplay";
import subjectTypesCodeDisplay from "@/features/questionnaire_creator/constants/subjectTypesCodeDisplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const QuestionnaireFormField: FunctionComponent = () => {
  const { control, watch, setValue } = useFormContext<Questionnaire>();

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
    <div className="space-y-4">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Title"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue(
                    "url",
                    formatTextToUrl(
                      e.target.value,
                      "http://hl7.org/fhir/Questionnaire/"
                    )
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
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {statusCodeDisplay.map((item) => (
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

      <FormField
        control={control}
        name="subjectType"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Subject type</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? subjectTypesCodeDisplay.find(
                          (subjectType) => subjectType.code === field.value
                        )?.display
                      : "Select Subject type"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Subject type..." />
                  <CommandEmpty>No Subject type found.</CommandEmpty>
                  <CommandGroup>
                    {subjectTypesCodeDisplay.map((subjectType) => (
                      <CommandList key={subjectType.code}>
                        <CommandItem
                          value={subjectType.display}
                          key={subjectType.code}
                          onSelect={() => {
                            setValue("subjectType", subjectType.code);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              subjectType.code === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {subjectType.display}
                        </CommandItem>
                      </CommandList>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 ">
        {itemFields.map((item, index) => (
          <Accordion type="multiple" defaultValue={[item.id]} key={item.id} className="lg:col-span-2 col-span-1 border border-neutral-400 rounded-md p-5">
            <AccordionItem
              value={item.id}
            >
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
                  <AccordionTrigger>Item {index}</AccordionTrigger>
                </div>
              </div>

              <AccordionContent>
                <ItemsFormField
                  prefix={`item.${index}.`}
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
          type="button"
          variant='outline'
          onClick={addNewItem}
          className="lg:col-span-2"
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default QuestionnaireFormField;
