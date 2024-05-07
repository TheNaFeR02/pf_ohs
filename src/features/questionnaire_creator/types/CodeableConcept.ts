import { z } from 'zod';
import { CodingSchema } from "@/features/questionnaire_creator/types/Coding";

export const CodeableConceptSchema = z.object({
    coding: z.array(CodingSchema),
    text: z.string(),
  });

export type CodeableConcept = z.infer<typeof CodeableConceptSchema>;