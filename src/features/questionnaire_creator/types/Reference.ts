import { z } from "zod";
import { identifierSchema } from "@/features/questionnaire_creator/types/Identifier";
import { stringSchema, uriSchema } from "@/features/questionnaire_creator/types/dataTypes";

export const referenceSchema = z.object({
  reference: stringSchema.optional(),
  type: uriSchema.optional(),
  identifier: identifierSchema.optional(),
  display: stringSchema.optional(),
});

export type Reference = z.infer<typeof referenceSchema>;
