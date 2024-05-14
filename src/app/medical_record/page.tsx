import { FhirError } from "@/errors/FhirError";
import QuestionnaireResponseForm from "@/features/questionnaires/components/QuestionnaireResponseForm";
import getQuestionnaire from "@/features/questionnaires/server/getQuestionnaire";

export default async function MedicalRecordPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const questionnaire = await getQuestionnaire(params.id);
    // Create Tabs. + to Add new form for medical_record.
    return <QuestionnaireResponseForm questionnaire={questionnaire} />;
  } catch (error) {
    if (error instanceof FhirError) {
      return <div>{error.errorSchema?.text?.div ?? ""}</div>;
    }
    return <div>Error fetching questionnaire.</div>;
  }
}
