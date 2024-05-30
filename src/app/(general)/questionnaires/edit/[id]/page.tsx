"use client";
import React, { useEffect, useState } from "react";
import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import { Questionnaire, questionnaireSchema } from "@/types/Questionnaire";
import { getResource } from "@/server/getResource";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function QuestionnairesIdPage({
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

  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const fetchedQuestionnaire = await getResource({
          id: params.id,
          resourceType: "Questionnaire",
          schema: questionnaireSchema,
          access_token: session?.user?.access_token,
        });
        setQuestionnaire(fetchedQuestionnaire);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchQuestionnaire();
  }, [params.id, session]);

  if (error) {
    return (
      <h1 className="text-4xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Error fetching questionnaire.
      </h1>
    );
  }

  if (!questionnaire) {
    return <div>Questionnaire not found.</div>;
  }

  return <QuestionnaireForm data={questionnaire} id={params.id} />;
}
