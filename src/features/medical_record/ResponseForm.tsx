"use client"
import { FC, ReactElement, } from "react"
import { z } from "zod"
import qResponse from "./questionnaireResponseEx.json"
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionnaireResponse, questionnaireResponseSchema } from "./types/QuestionnaireResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Questionnarie } from "./types/Questionnarie";
import { Input } from "@/components/ui/input";
import React from "react";
import {Item as QItem} from "./types/Questionnarie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { register } from "module";

type ResponseFormProps = {
  questionnaire: Questionnarie;
  defaultQuestionnaireResponse: QuestionnaireResponse;
};

const ResponseForm: FC<ResponseFormProps> = ({ questionnaire, defaultQuestionnaireResponse }: { questionnaire: Questionnarie, defaultQuestionnaireResponse: QuestionnaireResponse }): ReactElement => {
  // console.log("q: ", questionnaire)
  // console.log("qResponse: ", defaultQuestionnaireResponse)
  // 1. Define your form.
  const form = useForm<z.infer<typeof questionnaireResponseSchema>>({
    resolver: zodResolver(questionnaireResponseSchema),

    defaultValues: defaultQuestionnaireResponse
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionnaireResponseSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
  }

  const groupItems = (item: QItem): ReactElement => {
    console.log(item)
    return(
      <div>
        {item.item?.map((item, index)=> (
          
          <div key={index}>
            
            {item.type === "string" ? (
              < FormField
              key={index}
              control={form.control}
              name={`item.${index}.answer.0.valueString`}
              defaultValue={""}
              render={({ field }): ReactElement => (
                <FormItem>
                  <FormLabel>{item.text}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Ingresa tu " + item.text} {...field} />
                  </FormControl>
                  <FormDescription>
                    {item.text}
                  </FormDescription>
                </FormItem>
              )}
            />
            ): item.type === "integer" ? (
              < FormField
                key={index}
                // control={form.control}
                name={`item.${index}.answer.0.valueInteger`}
                defaultValue={0}
                render={({ field }): ReactElement => (
                  <FormItem>
                    <FormLabel>{item.text}</FormLabel>
                    <FormControl>
                      <Input placeholder={"Ingresa tu " + item.text} {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormDescription>
                      {item.text}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : item.type === "choice" && item.answerOption ? (
              <FormField
                key={index}
                control={form.control}
                name={`item.${index}.answer.0.valueCoding.code`}
                render={({ field }): ReactElement => (
                  <FormItem>
                    <FormLabel>{item.text}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Identification Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {item.answerOption?.map((option, index) => (
                          <SelectItem key={index} value={option.valueCoding.code}>{option.valueCoding.display}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage identification types in your settings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : item.type === "group" ? (
              groupItems(item) 
            )
              :
              <React.Fragment /> }
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {questionnaire.item.map((item, index) => (
            <div key={index}>
              {questionnaire.item[index].type === "string" ? (
                < FormField
                  key={index}
                  control={form.control}
                  name={`item.${index}.answer.0.valueString`}
                  defaultValue={""}
                  render={({ field }): ReactElement => (
                    <FormItem>
                      <FormLabel>{questionnaire.item[index].text}</FormLabel>
                      <FormControl>
                        <Input placeholder={"Ingresa tu " + questionnaire.item[index].text} {...field} />
                      </FormControl>
                      <FormDescription>
                        {questionnaire.item[index].text}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              ) : questionnaire.item[index].type === "integer" ? (
                < FormField
                  key={index}
                  // control={form.control}
                  name={`item.${index}.answer.0.valueInteger`}
                  defaultValue={0}
                  render={({ field }): ReactElement => (
                    <FormItem>
                      <FormLabel>{questionnaire.item[index].text}</FormLabel>
                      <FormControl>
                        <Input placeholder={"Ingresa tu " + questionnaire.item[index].text} {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormDescription>
                        {questionnaire.item[index].text}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : questionnaire.item[index].type === "choice" && questionnaire.item[index].answerOption ? (
                <FormField
                  key={index}
                  control={form.control}
                  name={`item.${index}.answer.0.valueCoding`}
                  render={({ field }): ReactElement => (
                    <FormItem>
                      <FormLabel>{questionnaire.item[index].text}</FormLabel>
                      <Select
                        onValueChange={e => field.onChange(JSON.parse(e))}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Identification Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {questionnaire.item[index].answerOption?.map((option, index) => (
                            <SelectItem key={index} value={JSON.stringify(option.valueCoding)}>{option.valueCoding.display}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage identification types in your settings.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
                : questionnaire.item[index].type === "group" ? (
                  // groupItems(item) 
                  <div></div>
                )
                  :
                  <React.Fragment />
              }
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ResponseForm