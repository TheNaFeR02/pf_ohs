"use client";
import { Questionnaire } from "@/types/Questionnaire";
import React, { FunctionComponent } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formatTextToUrl from "../utils/formatTextToUrl";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { ChevronsUpDown, Check } from "lucide-react";
import subjectTypesCodeDisplay from "../constants/subjectTypesCodeDisplay";
import ItemsFormField from "./ItemsFormField";

const PreviewQuestionnaireForm: FunctionComponent = () => {
  const { control, watch, setValue } = useFormContext<Questionnaire>();

  const [titleDisabled, setTitleDisabled] = React.useState(true);

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
    <div className="w-full min-w-96">
      <div className="border-b pb-2 border-stroke">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  disabled={titleDisabled}
                  onBlur={() => setTitleDisabled(true)}
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
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTitleDisabled(!titleDisabled)}
              >
                <Pencil1Icon className="h-4 w-4" />
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="subjectType"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormLabel>Subject type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="flex flex-row items-center space-x-2">
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
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
                <PopoverContent className="p-0">
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
      </div>

      <div className="rounded-2xl border shadow-default mt-4">
        <div className="px-5">
          <div className="flex flex-col justify-center py-4">
            <div className="grid md:grid-cols-2 space-x-4">
              {itemFields.map((item, index) => (
                <div key={item.id}> 
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeItem(index)}
                  >
                    ➖
                  </Button>
                  <ItemsFormField
                    prefix={`item.${index}.`}
                    watch={watch}
                    setValue={setValue}
                    control={control}
                  />
                </div>
              ))}
              <Button type="button" className="bg-slate-500" onClick={addNewItem}>
                ➕
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewQuestionnaireForm;
