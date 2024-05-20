import { parseURL } from "@/utils/parseURL";
import { Bundle, bundleSchema } from "@/types/Bundle";
import { operationOutcomeSchema } from "@/types/OperationOutcome";
import { FhirError } from "@/errors/FhirError";

interface getBundleProps {
  resourceType: string;
}

export async function getResourceBundle({
  resourceType,
}: getBundleProps): Promise<Bundle> {
  try {
    const res = await fetch(parseURL(`/${resourceType}`), {
      method: "GET",
    });
    const data: Bundle = await res.json();
    // console.log(data);
    const bundle = bundleSchema.safeParse(data);
    if (bundle.success) {
      return data;
    }
    const fhirError = operationOutcomeSchema.safeParse(data);
    if (fhirError.success) {
      throw new FhirError("", fhirError.data);
    }
    throw new Error("Unexpected server response during retrieve of Resoruce.");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
