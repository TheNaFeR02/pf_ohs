"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import QuestionnaireFormField from "@/features/questionnaire_creator/components/QuestionnaireFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Questionnaire,
  questionnaireSchema,
} from "../../../types/Questionnaire";
import QuestionnaireFormLayout from "@/features/questionnaire_creator/components/QuestionnaireFormLayout";
import { createQuestionnaire } from "@/features/questionnaire_creator/server/createQuestionnaire";
import { uptateQuestionnaire } from "@/features/questionnaire_creator/server/updateQuestionnaire";
interface QuestionnaireFormProps {
  data?: Questionnaire;
  id?: string;
}

const QuestionnaireForm = ({ data, id }: QuestionnaireFormProps) => {

  const form = useForm<Questionnaire>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: data
      ? data
      : {
          resourceType: "Questionnaire",
          title: "",
          status: "draft",
          date: new Date().toISOString(),
        },
  });

  async function onSubmit(questionnaire: Questionnaire) {
    try {
      await form.handleSubmit(async (data) => {
        data
          ? console.log("Updating questionnaire", id)
          : console.log("Creating questionnaire");
        console.log(JSON.stringify(questionnaire));
        if (data && id) {
          await uptateQuestionnaire({ id: id, data: questionnaire });
        } else {
          await createQuestionnaire(questionnaire);
        }
      })();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <QuestionnaireFormLayout>
            <div className="w-full">
              <QuestionnaireFormField />
            </div>
          </QuestionnaireFormLayout>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
          {form.formState.errors && (
            <div>
              {Object.keys(form.formState.errors).map((fieldName: string, index) => (
                <p key={index}>{fieldName}</p>
              ))}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;
