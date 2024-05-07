import { z } from "zod";
import { IdentifierSchema } from "@/features/questionnaire_creator/types/Identifier";

export const ReferenceSchema = z.object({
  reference: z.string().optional(),
  type: z.string().url(),
  identifier: IdentifierSchema.optional(),
  display: z.string().optional(),
});

export type Reference = z.infer<typeof ReferenceSchema>;
