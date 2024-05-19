import { Resource } from "@/types/Resource";
import { parseURL } from "@/utils/parseURL";
import { ZodSchema } from "zod";

interface createResourceProps<T extends Resource> {
  data: T;
  schema: ZodSchema<T>;
}

export async function createResource<T extends Resource>({
  data,
  schema,
}: createResourceProps<T>) {
//   console.log("Creating resource:", data);

  // Validar datos con Zod
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error.errors);
    return;
  }

  try {
    const res = await fetch(parseURL(`${data.resourceType}`), {
      method: "POST",
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
