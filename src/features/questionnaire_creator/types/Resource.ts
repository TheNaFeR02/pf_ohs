import { z } from "zod";
import { MetaSchema } from "@/features/questionnaire_creator/types/Meta";

export const ResourceSchema = z.object({
  resourceType: z.string().optional(),
  id: z.string().optional(),
  meta: MetaSchema.optional(),
  implicitRules: z.string().url().optional(),
  language: z.string().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;
