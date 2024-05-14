import { z } from "zod";
import { codeableConceptSchema } from "@/types/CodeableConcept";
import { periodSchema } from "@/types/Period";
import { assignerSchema } from "@/types/Assigner";
import {
  uriSchema,
  stringSchema,
} from "./dataTypes";
import identifierUseCodeDisplay from "@/constants/identifierUseCodeDisplay";

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
