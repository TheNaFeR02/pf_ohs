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
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Check, ChevronsUpDown, Link } from "lucide-react";
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

import statusCodeDisplay from "@/features/questionnaire_creator/utils/statusCodeDisplay";
import subjectTypesCodeDisplay from "@/features/questionnaire_creator/utils/subjectTypesCodeDisplay";

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
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                          <Check
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
