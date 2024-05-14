import { parseURL } from "@/utils/parseURL";
import {
  Questionnaire,
  questionnaireSchema,
} from "../../../types/Questionnaire";
import { OperationOutcomeSchema } from "../../../types/OperationOutcome";
import { FhirError } from "@/errors/FhirError";

async function getQuestionnaire(id: string): Promise<Questionnaire> {
  try {
    const res = await fetch(parseURL("/Questionnaire/" + id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    const data: Questionnaire = await res.json();
    const questionnaire = questionnaireSchema.safeParse(data);
    if (questionnaire.success) {
      console.log("Successful retrieve of Questionnaire", questionnaire.data);
      return data;
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
