import { Resource } from "@/types/Resource";
import { parseURL } from "@/utils/parseURL";
import { ZodSchema } from "zod";
interface getResourceProps<T extends Resource> {
  id: string;
  schema: ZodSchema<T>;
}

export async function getResource<T extends Resource>({
  id,
  schema,
}: getResourceProps<T>): Promise<T | null> {
//   console.log("Fetching resource with ID:", id);

  try {
    const res = await fetch(parseURL(`/${id}`), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Error fetching resource: ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    // Validar datos con Zod
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return null;
    }

    // console.log("Fetched resource:", validationResult.data);
    return validationResult.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
