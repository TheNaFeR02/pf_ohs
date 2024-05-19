import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import { questionnaireSchema } from "@/types/Questionnaire";
import { getResource } from "@/server/getResource";

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

    return <QuestionnaireForm data={questionnaire} id={params.id} />;
  } catch (error) {
    return <div>Error fetching questionnaire.</div>;
  }
}
