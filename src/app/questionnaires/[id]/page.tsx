import { FhirError } from "@/errors/FhirError";
import QuestionnaireResponseForm from "@/features/questionnaires/components/QuestionnaireResponseForm";
import { getResource } from "@/server/getResource";
import { questionnaireSchema } from "@/types/Questionnaire";

export default async function QuestionnairesIdPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const questionnaire = await getResource({
      id: params.id,
      resourceType: "Questionnaire",
      schema: questionnaireSchema,
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
    return <div>Error fetching questionnaire.</div>;
  }
}
