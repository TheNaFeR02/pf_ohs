import { z } from "zod";
import { codeableConceptSchema } from "@/features/questionnaire_creator/types/CodeableConcept";
import { periodSchema } from "@/features/questionnaire_creator/types/Period";
import { assignerSchema } from "@/features/questionnaire_creator/types/Assigner";
import {
  uriSchema,
  stringSchema,
} from "@/features/questionnaire_creator/types/dataTypes";
import identifierUseCodeDisplay from "@/features/questionnaire_creator/constants/identifierUseCodeDisplay";

export const identifierSchema = z.object({
  use: z
    .enum(
      JSON.parse(
        JSON.stringify(identifierUseCodeDisplay.map((item) => item.code))
      )
    )
    .optional(),
  type: codeableConceptSchema.optional(),
  system: uriSchema.optional(),
  value: stringSchema.optional(),
  period: periodSchema.optional(),
  assigner: assignerSchema.optional(),
});

export type Identifier = z.infer<typeof identifierSchema>;
