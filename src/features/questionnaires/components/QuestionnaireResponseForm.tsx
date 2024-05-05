"use client"
import React, { FC, ReactElement } from "react";
import { Item, Questionnaire } from "@/types/Questionnaire"
import { QuestionnaireResponse, questionnaireResponseSchema } from "@/types/QuestionnaireResponse"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDefaultQuestionnaireResponse } from "@/features/questionnaires/utils/generateDefaultQuestionnaireResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import QuestionnaireResponseLayout from "./QuestionnaireResponseLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

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
            <>
                {item.map((itemObj, index) => (
                    <div key={index}
                        className={`${itemObj.type === "group" ? 'col-span-full' : ''}`}
                    >
                        {itemObj.type === "string" ?
                            (< FormField
                                key={index}
                                control={form.control}
                                name={`${prefix}item.${index}.answer.0.valueString` as `item.${number}.answer.0.valueString`}
                                render={({ field }): ReactElement => (
                                    <FormItem className="w-100 py-3 px-5 font-medium">
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
                                    name={`${prefix}item.${index}.answer.0.valueInteger` as `item.${number}.answer.0.valueInteger`}
                                    defaultValue={0}
                                    render={({ field }): ReactElement => (
                                        <FormItem className="w-100 py-3 px-5 font-medium">
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
                                    name={`${prefix}item.${index}.answer.0.valueCoding` as `item.${number}.answer.0.valueCoding`}
                                    render={({ field }): ReactElement => (
                                        <FormItem className="w-100 py-3 px-5 font-medium">
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
                                    <fieldset className="border border-solid border-opacity-60 rounded-lg p-3 mb-5 w-full">
                                        <legend className="text-sm opacity-60">{itemObj.text}</legend>
                                        {/* <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5"> */}
                                        <div className="grid sm:grid-cols-2 grid-cols-1">
                                            {renderQuestionnaireResponse(itemObj.item, `${prefix}item.${index}.`)}
                                        </div>
                                        {/* </div> */}
                                    </fieldset>
                                )
                                : itemObj.type === "boolean" ?
                                    (
                                        <div className="w-100 py-3 px-5 font-medium">
                                            <FormField
                                                control={form.control}
                                                name={`${prefix}item.${index}.answer.0.valueBoolean` as `item.${number}.answer.0.valueBoolean`}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 
                                                    // shadow
                                                    // border
                                                    ">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                Diabético?
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Estás Diabético?
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )
                                    : itemObj.type === "decimal" ?
                                        (
                                            < FormField
                                                key={index}
                                                control={form.control}
                                                name={`${prefix}item.${index}.answer.0.valueDecimal` as `item.${number}.answer.0.valueDecimal`}
                                                defaultValue={0.00}
                                                render={({ field }): ReactElement => (
                                                    <FormItem className="w-100 py-3 px-5 font-medium">
                                                        <FormLabel>{itemObj.text}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={"Ingresa tu " + itemObj.text} {...field} type="number" onChange={e => field.onChange(parseFloat(e.target.value))} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {itemObj.text} Ej: <i>0,00</i>
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                        : itemObj.type === "text" ?
                                            (
                                                <FormField
                                                    control={form.control}
                                                    name={`${prefix}item.${index}.answer.0.valueString` as `item.${number}.answer.0.valueString`}
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
                                                            <FormDescription>
                                                                {itemObj.text}
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                            : <React.Fragment />
                        }
                    </div>)
                )}
                {/* </div> */}
            </>
        )
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <QuestionnaireResponseLayout title={questionnaire.title} >

                    <div className="flex flex-col justify-center pt-4">
                        <div className="grid sm:grid-cols-2 grid-cols-1">
                            {renderQuestionnaireResponse(questionnaire.item, "")}
                        </div>
                        <Button className="shadow-xl self-end"
                            type="submit">Submit</Button>
                    </div>
                </QuestionnaireResponseLayout>

            </form>
        </Form >
    )
}


export default QuestionnaireResponseForm;