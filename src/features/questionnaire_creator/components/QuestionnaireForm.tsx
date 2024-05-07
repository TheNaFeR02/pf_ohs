"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import QuestionnaireFormField from "@/features/questionnaire_creator/components/QuestionnaireFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionnaireSchema, Questionnaire } from "@/types/Questionnaire";
import QuestionnaireFormLayout from "@/features/questionnaire_creator/components/QuestionnaireFormLayout";
import { createQuestionnaire } from "../server/createQuestionnaire";

const QuestionnaireForm = () => {
  const form = useForm<Questionnaire>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      resourceType: "Questionnaire",
      title: "",
      url: "",
      status: "draft",
      subjectType: "",
      date: new Date(),
      item: [],
    },
  });

  async function onSubmit(questionnaire: Questionnaire) {
    console.log("Datos del formulario", questionnaire);
    console.log(JSON.stringify(questionnaire));
    try {
      await createQuestionnaire(questionnaire);
    } catch (error) {
      console.error(error)
    }
  };

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
        </div>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;
