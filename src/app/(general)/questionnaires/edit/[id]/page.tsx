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
    return (
      <h1 className="text-4xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Error fetching questionnaire.
      </h1>
    );
  }
}