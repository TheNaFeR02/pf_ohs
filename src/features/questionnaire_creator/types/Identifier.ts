import { z } from "zod";
import { CodeableConceptSchema } from "@/features/questionnaire_creator/types/CodeableConcept";
import { PeriodSchema } from "@/features/questionnaire_creator/types/Period";
import { AssignerSchema } from "@/features/questionnaire_creator/types/Assigner";

export const IdentifierSchema = z.object({
  use: z.enum(["usual", "official", "temp", "secondary", "old"]),
  type: CodeableConceptSchema,
  system: z.string().url(),
  value: z.string(),
  period: PeriodSchema.optional(),
  assigner: AssignerSchema.optional(),
});

export type Identifier = z.infer<typeof IdentifierSchema>;
