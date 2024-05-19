import { parseURL } from "@/utils/parseURL";
import { Bundle, bundleSchema } from "../../../types/Bundle";
import { OperationOutcomeSchema } from "../../../types/OperationOutcome";
import { FhirError } from "@/errors/FhirError";

export async function getAppointments(): Promise<Bundle> {
  try {
    const res = await fetch(parseURL("/Appointment"), {
      method: "GET",
    });
    const data: Bundle = await res.json();
    const bundle = bundleSchema.safeParse(data);
    if (bundle.success) {
      // console.log("Successful retrieve of Bundle", bundle.data);
      return data;
    }
    const fhirError = OperationOutcomeSchema.safeParse(data);
    if (fhirError.success) {
      // console.log(
      //   console.error("Server responded with FHIR error: ", fhirError.data)
      // );
      throw new FhirError("", fhirError.data);
    }

    throw new Error(
      "Unexpected server response during retrieve of Appointment."
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
