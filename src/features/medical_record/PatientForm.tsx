"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, JSXElementConstructor, ReactElement } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, useFieldArray, useForm, UseFormStateReturn } from "react-hook-form";
import { questionnarieSchema } from "./types/Questionnarie";
import { z } from "zod";
import formData from "./questionnaireEx.json"
import qResponse from "./questionnaireResponseEx.json"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const PatientForm: FC = (): ReactElement => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof questionnarieSchema>>({
    resolver: zodResolver(questionnarieSchema),
    defaultValues: {
      resourceType: "Questionnaire",
      title: "Patient Questionnaire",
      url: "http://example.org/fhir/Questionnaire/3141",
      status: "draft",
      subjectType: ["Patient"],
      date: "2021-06-01",
      item: formData.item.map((item) => ({
        ...item,
        linkId: '',
        text: '',
        type: '',
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "item",
  });



  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionnarieSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
  }



  return (
    <div>
      <h1>{formData.title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((item, index) => (

            <FormField
              key={index}
              name={`item[${index}].linkId`}
              render={function ({ field, fieldState, formState }: { field: ControllerRenderProps<FieldValues, string>; fieldState: ControllerFieldState; formState: UseFormStateReturn<FieldValues>; }): ReactElement<any, string | JSXElementConstructor<any>> {
                switch (formData.item[index].type) {
                  case 'string':
                    return (
                      <FormItem>
                        <FormLabel>{formData.item[index].text}</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa tu " + formData.item[index].text} {...field} />
                        </FormControl>
                        <FormDescription>
                          {formData.item[index].text}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  case 'integer':
                    return (
                      <FormItem>
                        <FormLabel>{formData.item[index].text}</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa tu " + formData.item[index].text} {...field} type="number" />
                        </FormControl>
                        <FormDescription>
                          {formData.item[index].text}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  default:
                    return <React.Fragment />;
                }
              }}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div >
  );
}


export default PatientForm;