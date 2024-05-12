import { z } from 'zod';
import { codingSchema } from "@/features/questionnaire_creator/types/Coding";
import { stringSchema } from "@/features/questionnaire_creator/types/dataTypes";

export const codeableConceptSchema = z.object({
    coding: z.array(codingSchema).optional(),
    text: stringSchema.optional(),
  });

export type CodeableConcept = z.infer<typeof codeableConceptSchema>;