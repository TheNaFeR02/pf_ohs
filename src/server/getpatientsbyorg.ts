import { parseURL } from "@/utils/parseURL";
import { Bundle, bundleSchema } from "@/types/Bundle";
import { operationOutcomeSchema } from "@/types/OperationOutcome";
import { FhirError } from "@/errors/FhirError";

interface getBundleProps {
  resourceType: string;
  id: string;
  access_token: string | undefined;
}

export async function getpatientsbyorg({
  resourceType,
  id,
  access_token,
}: getBundleProps): Promise<Bundle> {
  try {
    const res = await fetch(parseURL(`/${resourceType}?organization=${id}`), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data: Bundle = await res.json();
    console.log(data);
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
