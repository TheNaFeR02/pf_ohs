import { z } from "zod";
import { metaSchema } from "./Meta";
import { stringSchema, uriSchema, idSchema } from "./dataTypes";
import { languagesCode } from "@/constants/languagesCodeDisplay";

export const resourceSchema = z.object({
  resourceType: stringSchema.optional(),
  id: idSchema.optional(),
  meta: metaSchema.optional(),
  implicitRules: uriSchema.optional(),
  language: z.enum(languagesCode).optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
