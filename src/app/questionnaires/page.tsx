import { FhirError } from "@/errors/FhirError";
import QuestionnaireResponseForm from "@/features/questionnaires/components/QuestionnaireResponseForm";
import getQuestionnaire from "@/features/questionnaires/server/getQuestionnaire";
import { FC, ReactElement } from "react";


const QuestionnairePage: FC = async (): Promise<ReactElement> => {
    try {
        const questionnaire = await getQuestionnaire()
        // console.log("HADHA",JSON.stringify(questionnaire))
        // // const questionnaireJson = `{
        //     "resourceType": "Questionnaire",
        //     "title": "Patient Information",
        //     "url": "http://hl7.org/fhir/Questionnaire/patient_information02",
        //     "status": "active ",
        //     "subjectType": ["Patient"],
        //     "date": "2024-04-29T13:33:43.056Z",
        //     "item": [
        //         {
        //             "linkId": "1",
        //             "text": "Tipo de documento",
        //             "type": "choice",
        //             "required": true,
        //             "answerOption": [
        //                 {
        //                     "valueCoding": {
        //                         "code": "CC",
        //                         "display": "Cédula de ciudadanía"
        //                     }
        //                 },
        //                 {
        //                     "valueCoding": {
        //                         "code": "CE",
        //                         "display": "Cédula de extranjería"
        //                     }
        //                 }
        //             ]
        //         },
        //         {
        //             "linkId": "2",
        //             "text": "Número de dentificaión",
        //             "type": "integer"
        //         },
        //         {
        //             "linkId": "3",
        //             "text": "Nombre",
        //             "type": "string"
        //         },
        //         {
        //             "linkId": "15",
        //             "text": "Información de contacto",
        //             "type": "group",
        //             "item": [
        //                 {
        //                     "linkId": "15.1",
        //                     "text": "Teléfono",
        //                     "type": "string"
        //                 },
        //                 {
        //                     "linkId": "15.2",
        //                     "text": "Celular",
        //                     "type": "string"
        //                 },
        //                 {
        //                     "linkId": "15.3",
        //                     "text": "Email",
        //                     "type": "group",
        //                     "item": [
        //                         {
        //                             "linkId": "15.3.1",
        //                             "text": "email1",
        //                             "type": "group",
        //                             "item": [
        //                                 {
        //                                     "linkId": "15.3.1.1",
        //                                     "text": "domain",
        //                                     "type": "string"
        //                                 },
        //                                 {
        //                                     "linkId": "15.3.1.1",
        //                                     "text": "provider",
        //                                     "type": "string"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "linkId": "15.3.2",
        //                             "text": "email2",
        //                             "type": "string"
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "linkId": "15.4",
        //                     "text": "Dirección",
        //                     "type": "string"
        //                 }                        
        //             ]
        //         },
        //         {
        //             "linkId": "16",
        //             "text": "Diabético?",
        //             "type": "boolean"
        //         },
        //         {
        //             "linkId": "17",
        //             "text": "Ingresa Decimal",
        //             "type": "decimal"
        //         },
        //         {
        //             "linkId": "18",
        //             "text": "Observaciones",
        //             "type": "text"
        //         }
        //     ]
        // //}`;

        // const questionnaireObject = JSON.parse(questionnaireJSON);


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


export default QuestionnairePage;