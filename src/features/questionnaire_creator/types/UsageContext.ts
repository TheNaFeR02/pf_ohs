import { z } from "zod";
import { codingSchema } from "@/features/questionnaire_creator/types/Coding";
import { codeableConceptSchema } from "@/features/questionnaire_creator/types/CodeableConcept";
import { referenceSchema } from "@/features/questionnaire_creator/types/Reference";
import { quantitySchema } from "@/features/questionnaire_creator/types/Quantity";
import { rangeSchema } from "@/features/questionnaire_creator/types/Range";

export const usageContextSchema = z.object({
  code: codingSchema,
  // value[x]: Value that defines the context. One of these 4:
  valueCodeableConcept: codeableConceptSchema.optional(),
  valueQuantity: quantitySchema.optional(),
  valueRange: rangeSchema.optional(),
  valueReference: referenceSchema.optional(),
});

export type UsageContext = z.infer<typeof usageContextSchema>;
