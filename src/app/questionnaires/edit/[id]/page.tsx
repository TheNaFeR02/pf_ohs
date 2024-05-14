import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import { Questionnaire } from "../../../../types/Questionnaire";
import getQuestionnaire from "@/features/questionnaire_creator/server/getQuestionnaire";

export default async function QuestionnairesIdPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const questionnaire = await getQuestionnaire(params.id);

    return <QuestionnaireForm data={questionnaire} id={params.id} />;
  } catch (error) {
    return <div>Error fetching questionnaire.</div>;
  }
}
