"use client";
import React, { FC, ReactElement } from "react";
import {
  QuestionnaireItem,
  Questionnaire,
} from "../../../types/Questionnaire";
import {
  QuestionnaireResponse,
  questionnaireResponseSchema,
} from "../../../types/QuestionnaireResponse";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDefaultQuestionnaireResponse } from "@/features/questionnaires/utils/generateDefaultQuestionnaireResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuestionnaireResponseLayout from "@/features/questionnaires/components/QuestionnaireResponseLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { BooleanField, ChoiceField, DateField, DecimalField, IntegerField, StringField, TextField } from "./QuestionnaireField";

type QuestionnaireResponseFormProps = {
  questionnaire: Questionnaire;
};

const QuestionnaireResponseForm: FC<QuestionnaireResponseFormProps> = ({
  questionnaire,
}): ReactElement => {
  // console.log("response from q: ", generateDefaultQuestionnaireResponse(questionnaire))
  const form = useForm<QuestionnaireResponse>({
    resolver: zodResolver(questionnaireResponseSchema),
    // defaultValues: initializeResponseWithQuestionnaireDefaults(questionnaire)
    defaultValues: generateDefaultQuestionnaireResponse(questionnaire),
  });

  function onSubmit(values: QuestionnaireResponse) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function renderQuestionnaireResponse<T extends QuestionnaireItem>(
    item: T[],
    prefix: string
  ): ReactElement {
    return (
      <>
        {item.map((itemObj, index) => (
          <div
            key={index}
            className={`${itemObj.type === "group" ? "col-span-full" : ""}`}
          >

            {(() => {
              switch (itemObj.type) {
                case "string":
                  return <StringField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "integer":
                  return <IntegerField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "choice":
                  return <ChoiceField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "boolean":
                  return <BooleanField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "decimal":
                  return <DecimalField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "text":
                  return <TextField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "date":
                  return <DateField index={index} control={form.control} prefix={prefix} itemObj={itemObj} />;
                case "group":
                  return (
                    <fieldset className="border border-solid border-opacity-60 rounded-lg p-3 mb-5 w-full">
                      <legend className="text-sm opacity-60">{itemObj.text}</legend>
                      <div className="grid sm:grid-cols-2 grid-cols-1">
                        {itemObj.item && renderQuestionnaireResponse(itemObj.item, `${prefix}item.${index}.`)}
                      </div>
                    </fieldset>
                  );
                default:
                  return <React.Fragment />
              }
            })()}
          </div>
        ))}
        {/* </div> */}
      </>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <QuestionnaireResponseLayout>
          <div className="flex flex-col justify-center pt-4">
            <div className="grid sm:grid-cols-2 grid-cols-1">
              {questionnaire.item &&
                renderQuestionnaireResponse(questionnaire.item, "")}
            </div>
            <Button className="shadow-xl self-end" type="submit">
              Submit
            </Button>
          </div>
        </QuestionnaireResponseLayout>
      </form>
    </Form>
  );
};

export default QuestionnaireResponseForm;
