"use client"
import React, { FC, ReactElement } from "react";
import { Item, Questionnaire } from "../types/Questionnaire";
import { QuestionnaireResponse, questionnaireResponseSchema } from "../types/QuestionnaireResponse";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateQResponseFromQuestionnaire } from "@/features/medical_record/utils/generateQResponseFromQuestionnaire";
import { generateDefaultQuestionnaireResponse } from "../utils/generateDefaultQuestionnaireResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "module";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

type QuestionnaireResponseFormProps = {
    questionnaire: Questionnaire;
}

const QuestionnaireResponseForm: FC<QuestionnaireResponseFormProps> = ({ questionnaire }): ReactElement => {
    // console.log("response from q: ", generateDefaultQuestionnaireResponse(questionnaire))
    const form = useForm<QuestionnaireResponse>({
        resolver: zodResolver(questionnaireResponseSchema),
        // defaultValues: initializeResponseWithQuestionnaireDefaults(questionnaire)
        defaultValues: generateDefaultQuestionnaireResponse(questionnaire)
    })


    function onSubmit(values: QuestionnaireResponse) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    function renderQuestionnaireResponse<T extends Item>(item: T[], prefix: string): ReactElement {
        return (
            <div>
                {item.map((itemObj, index) => {
                    // console.log(itemValueStringPath);
                    const stringField = `${prefix}item.${index}.answer.0.valueString` as `item.${number}.answer.0.valueString`
                    const integerField = `${prefix}item.${index}.answer.0.valueInteger` as `item.${number}.answer.0.valueInteger`
                    const choiceField = `${prefix}item.${index}.answer.0.valueCoding` as `item.${number}.answer.0.valueCoding`
                    return (<div key={index}>
                        {itemObj.type === "string" ?
                            (< FormField
                                key={index}
                                control={form.control}
                                name={stringField}
                                render={({ field }): ReactElement => (
                                    <FormItem>
                                        <FormLabel>{itemObj.text}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"Ingresa tu " + itemObj.text} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {itemObj.text}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />)
                            : itemObj.type === "integer" ? (
                                < FormField
                                    key={index}
                                    control={form.control}
                                    name={integerField}
                                    defaultValue={0}
                                    render={({ field }): ReactElement => (
                                        <FormItem>
                                            <FormLabel>{itemObj.text}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Ingresa tu " + itemObj.text} {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} />
                                            </FormControl>
                                            <FormDescription>
                                                {itemObj.text}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : itemObj.type === "choice" ? (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={choiceField}
                                    render={({ field }): ReactElement => (
                                        <FormItem>
                                            <FormLabel>{itemObj.text}</FormLabel>
                                            <Select
                                                onValueChange={e => field.onChange(JSON.parse(e))}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={`Selecciona ${itemObj.text}`} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {itemObj.answerOption?.map((option, index) => (
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
                            ) : itemObj.type === "group" && itemObj.item ?
                                (
                                    <fieldset>
                                        <legend>{itemObj.text}</legend>
                                        {renderQuestionnaireResponse(itemObj.item, `${prefix}item.${index}.`)}
                                    </fieldset>
                                )
                                : <React.Fragment />
                        }
                    </div>)
                })}
            </div>
        )
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {renderQuestionnaireResponse(questionnaire.item, "")}
                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}


export default QuestionnaireResponseForm;