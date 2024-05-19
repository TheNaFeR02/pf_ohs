import { toast } from "@/components/ui/use-toast";
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

    const response = await res.json();

    if (!res.ok) {
      console.error(`Error deleting resource: ${res.statusText}`);
      throw new Error(response);
    }

    toast({
      title: `${resourceType} ${id} deleted`,
      description: `The ${resourceType?.toLowerCase()} has been deleted`,
      variant: "destructive",
    });

    // Validar datos con Zod
    const validationResult = operationOutcomeSchema.safeParse(response);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      throw new Error("Validation error")
    }
    return validationResult.data;

  } catch (error) {
    console.error(error);
    toast({
      title: `${resourceType} not deleted`,
      description: `Failed to delete ${resourceType?.toLowerCase()}`,
      variant: "destructive",
    });
    throw new Error("Fetch error");
  }
}
