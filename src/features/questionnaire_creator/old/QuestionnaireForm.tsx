"use client";
import react from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useController,
  useFormContext,
  useFieldArray,
  UseFormReturn,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import {
  questionnaireSchema,
  Questionnaire,
  Item,
  itemSchema,
} from "@/features/questionnaire_creator/types/Questionnaire";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "@radix-ui/react-icons";
import ItemsFormField from "../components/ItemsFormField";

import React from "react";

const QuestionnaireForm = () => {
  const form = useForm<Questionnaire>({
    mode: "onBlur",
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      resourceType: "Questionnaire",
      title: "",
      url: "",
      status: "",
      subjectType: [],
      date: new Date(),
      item: [],
    },
  });


  const { fields, append, remove } = useFieldArray({
    name: "item",
    control: form.control,
  });

  const onSubmit = (data: Questionnaire) =>
    console.log("Datos del formulario", data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <ItemsFormField prefix="item" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;