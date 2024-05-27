import { FhirError } from "@/errors/FhirError";
import QuestionnaireResponseForm from "@/features/questionnaires/components/QuestionnaireResponseForm";
import { getResource } from "@/server/getResource";
import { questionnaireSchema } from "@/types/Questionnaire";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function QuestionnairesIdPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

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
    return <QuestionnaireResponseForm questionnaire={questionnaire} />;
  } catch (error) {
    if (error instanceof FhirError) {
      // show here Fhir Error
      return <div>{error.errorSchema?.text?.div ?? ""}</div>;
    }
    return (
      <h1 className="text-4xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Error fetching questionnaire.
      </h1>
    );
  }
}
