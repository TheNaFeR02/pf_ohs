import { parseURL } from "@/utils/parseURL";
import { Questionnaire, questionnaireSchema } from "@/types/Questionnaire";
import { OperationOutcomeSchema } from "@/types/OperationOutcomeSchema";
import { FhirError } from "@/errors/FhirError";

async function getQuestionnaire(id?:string): Promise<Questionnaire> {
  // console.log(parseURL("https://mpba1805f7e1ac736364.free.beeceptor.com"))
  try {
    const res = await fetch(`http://localhost:8080/fhir/Questionnaire/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate"
      },
    });

    const data = await res.json();

    console.log(data)
    const questionnaire = questionnaireSchema.safeParse(data);
    if (questionnaire.success) {
      console.log("Successful retrieve of Questionnaire", questionnaire.data);
      return questionnaire.data;
    }

    const fhirError = OperationOutcomeSchema.safeParse(data);
    if (fhirError.success) {
      console.log(
        console.error("Server responded with FHIR error: ", fhirError.data)
      );
      throw new FhirError("", fhirError.data);
    }

    throw new Error(
      "Unexpected server response during retrieve of Questionnaire."
    );
  } catch (error) {
    throw error;
  }
}

export default getQuestionnaire;
