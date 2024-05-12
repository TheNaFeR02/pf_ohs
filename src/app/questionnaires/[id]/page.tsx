import { FhirError } from "@/errors/FhirError"
import QuestionnaireResponseForm from "@/features/questionnaires/components/QuestionnaireResponseForm"
import getQuestionnaire from "@/features/questionnaires/server/getQuestionnaire"


export default async function QuestionnairesIdPage({ params }: { params: { id: string } }) {
    try {
        const questionnaire = await getQuestionnaire(params.id)

        return (
            <>
                {/* ...Building form */}
                <QuestionnaireResponseForm questionnaire={questionnaire} />
            </>
        )
    } catch (error) {
        if (error instanceof FhirError) {
            // show here Fhir Error
            return <div>{error.errorSchema?.text.div}</div>
        }
        return <div>Error fetching questionnaire.</div>
    }
  }