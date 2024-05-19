import { operationOutcomeSchema } from "@/types/OperationOutcome";
import { parseURL } from "@/utils/parseURL";
import { z } from "zod";


export async function deleteResource({
  resourceType,
  id,
}: {
  resourceType: string;
  id: string;
}): Promise<z.infer<typeof operationOutcomeSchema> | null> {
  try {
    const res = await fetch(parseURL(`/${resourceType}/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Error deleting resource: ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    // Validar datos con Zod
    const validationResult = operationOutcomeSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return null;
    }

    console.log("Response:", validationResult.data);
    return validationResult.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
