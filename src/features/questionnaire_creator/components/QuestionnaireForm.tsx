"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import QuestionnaireFormField from "@/features/questionnaire_creator/components/QuestionnaireFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Questionnaire, questionnaireSchema } from "@/types/Questionnaire";
import { createQuestionnaire } from "@/features/questionnaire_creator/server/createQuestionnaire";
import { uptateQuestionnaire } from "@/features/questionnaire_creator/server/updateQuestionnaire";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
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
        <Card>
          <CardHeader>
            <CardTitle>Create questionnaire</CardTitle>
            <CardDescription>
              Use the form below to create a new questionnaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuestionnaireFormField />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/questionnaires">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;
