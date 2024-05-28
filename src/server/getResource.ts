import { Resource } from "@/types/Resource";
import { parseURL } from "@/utils/parseURL";
import { ZodSchema } from "zod";
interface getResourceProps<T extends Resource> {
  id: string;
  resourceType: string;
  schema: ZodSchema<T>;
  access_token: string | undefined;
}

export async function getResource<T extends Resource>({
  id,
  resourceType,
  schema,
  access_token,
}: getResourceProps<T>): Promise<T | null> {
  console.log("Fetching resource with ID:", id);

  try {
    console.log(parseURL(`/${resourceType}/${id}`));
    const res = await fetch(parseURL(`/${resourceType}/${id}`), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      console.error(`Error fetching resource: ${res}`);
    }

    const data = await res.json();

    // console

    // Validar datos con Zod
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return null;
    } 
    return data;
    // console.log("Fetched resource:", validationResult.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
