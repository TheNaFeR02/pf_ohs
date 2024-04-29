'use client';
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useQuestionnaireForm from "./useQuestionnaireForm";
import QuestionnaireFormField from "./QuestionnaireFormField";

const QuestionnaireForm = () => {
  const { handleSubmit, methods } = useQuestionnaireForm();
  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <QuestionnaireFormField />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;