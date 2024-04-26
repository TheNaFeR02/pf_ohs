"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, JSXElementConstructor, ReactElement } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, useFieldArray, useForm, UseFormStateReturn } from "react-hook-form";
import { questionnarieSchema } from "./types/Questionnarie";
import { z } from "zod";
import formData from "./form.json"
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
      item: [{
        "linkId": "3",
        "text": "Nombre",
        "type": "string"
      }]
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
            key={item.id}
            render={function ({ field, fieldState, formState, }: { field: ControllerRenderProps<FieldValues, string>; fieldState: ControllerFieldState; formState: UseFormStateReturn<FieldValues>; }): ReactElement<any, string | JSXElementConstructor<any>> {
              return (
                <FormItem>
                  <FormLabel>{formData.item[index].text}</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }} name={""}
            />
          ))}
          {/* <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div >
  );
}


export default PatientForm;