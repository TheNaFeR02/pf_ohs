"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import QuestionnaireFormField from "@/features/questionnaire_creator/components/QuestionnaireFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  QuestionnaireFormValues,
  QuestionnaireFormValuesSchema,
} from "@/features/questionnaire_creator/types/QuestionnaireFormValues";

const QuestionnaireForm = () => {
  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(QuestionnaireFormValuesSchema),
    defaultValues: {
      resourceType: "Questionnaire",
      title: "Mi Title",
      url: "http:url.com",
      status: "draft",
      subjectType: "Patient",
      date: new Date(),
      item: [],
    },
  });

  const onSubmit = (data: QuestionnaireFormValues) => {
    console.log("Datos del formulario", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <QuestionnaireFormField />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;
