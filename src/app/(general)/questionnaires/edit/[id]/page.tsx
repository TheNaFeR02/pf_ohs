"use client";
import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import { questionnaireSchema } from "@/types/Questionnaire";
import { getResource } from "@/server/getResource";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function QuestionnairesIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  try {
    const questionnaire = await getResource({
      id: params.id,
      resourceType: "Questionnaire",
      schema: questionnaireSchema,
      access_token: session?.user?.access_token,
    });
    if (!questionnaire) {
      return <div>Questionnaire not found.</div>;
    }

    return <QuestionnaireForm data={questionnaire} id={params.id} />;
  } catch (error) {
    return (
      <h1 className="text-4xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Error fetching questionnaire.
      </h1>
    );
  }
}
