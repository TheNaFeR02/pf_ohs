import { z } from 'zod';
import { codingSchema } from "@/types/Coding";
import { stringSchema } from "@/types/dataTypes";

export const codeableConceptSchema = z.object({
    coding: z.array(codingSchema).optional(),
    text: stringSchema.optional(),
  });

export type CodeableConcept = z.infer<typeof codeableConceptSchema>;