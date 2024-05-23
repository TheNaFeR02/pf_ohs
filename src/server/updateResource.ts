import { toast } from "@/components/ui/use-toast";
import { Resource } from "@/types/Resource";
import { parseURL } from "@/utils/parseURL";
import { ZodSchema } from "zod";

interface updateResourceProps<T> {
  id: string;
  data: T;
  schema: ZodSchema<T>; // Agregamos el esquema Zod como propiedad
  access_token: string | undefined;
}

export async function updateResource<T extends Resource>({
  id,
  data,
  schema,
  access_token,
}: updateResourceProps<T>) {

  // Validar datos con Zod
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error.errors);
    throw new Error("Validation error");
  }

  try {
    const res = await fetch(parseURL(`/${data.resourceType}/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/fhir+json;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response);
    }

    toast({
      title: `${data.resourceType} updated`,
      description: `The ${data.resourceType?.toLowerCase()} has been updated`,
      variant: "default",
    });

  } catch (error) {
    console.error(error);
    toast({
      title: `${data.resourceType} not updated`,
      description: `Failed to update ${data.resourceType?.toLowerCase()}`,
      variant: "destructive",
    });
    throw new Error("Fetch error");
  }
}
