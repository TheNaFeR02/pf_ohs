"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import QuestionnaireFormField from "@/features/questionnaire_creator/components/QuestionnaireFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Questionnaire, questionnaireSchema } from "@/types/Questionnaire";
import { updateResource } from "@/server/updateResource";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { createResource } from "@/server/createResource";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface QuestionnaireFormProps {
  data?: Questionnaire;
  id?: string;
}

const QuestionnaireForm = ({ data, id }: QuestionnaireFormProps) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const router = useRouter();

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
      // await form.handleSubmit(async (data) => {
      if (data && id) {
        await updateResource({
          id: id,
          data: questionnaire,
          schema: questionnaireSchema,
          access_token: session?.user?.access_token,
        });
      } else {
        await createResource({
          data: questionnaire,
          schema: questionnaireSchema,
          access_token: session?.user?.access_token,
        });
      }
      router.push("/questionnaires");
      // })();
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
