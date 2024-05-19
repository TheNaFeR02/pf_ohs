import { Resource } from "@/types/Resource";
import { parseURL } from "@/utils/parseURL";
import { ZodSchema } from "zod";

interface updateResourceProps<T> {
  id: string;
  data: T;
  schema: ZodSchema<T>; // Agregamos el esquema Zod como propiedad
}

export async function updateResource<T extends Resource>({
  id,
  data,
  schema,
}: updateResourceProps<T>) {
//   console.log("Updating resource:", data);

  // Validar datos con Zod
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error.errors);
    return;
  }

  try {
    console.log(parseURL(`/${data.resourceType}/${id}`));
    const res = await fetch(parseURL(`/${data.resourceType}/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    // console.log("Response:", response);
  } catch (error) {
    console.error(error);
  }
}
