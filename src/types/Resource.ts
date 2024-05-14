import { z } from "zod";
import { metaSchema } from "./Meta";
import {
  stringSchema,
  uriSchema,
  idSchema,
} from "./dataTypes";
import languagesCodeDisplay from "@/constants/languagesCodeDisplay";

export const resourceSchema = z.object({
  resourceType: stringSchema.optional(),
  id: idSchema.optional(),
  meta: metaSchema.optional(),
  implicitRules: uriSchema.optional(),
  language: z
    .enum(
      JSON.parse(
        JSON.stringify(languagesCodeDisplay.map((language) => language.code))
      )
    )
    .optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
