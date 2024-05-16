import { z } from "zod";
import { codingSchema } from "./Coding";
import { codeableConceptSchema } from "./CodeableConcept";
import { referenceSchema } from "./Reference";
import { quantitySchema } from "./Quantity";
import { rangeSchema } from "./Range";

export const usageContextSchema = z.object({
  code: codingSchema,
  // value[x]: Value that defines the context. One of these 4:
  valueCodeableConcept: codeableConceptSchema.optional(),
  valueQuantity: quantitySchema.optional(),
  valueRange: rangeSchema.optional(),
  valueReference: referenceSchema.optional(),
});

export type UsageContext = z.infer<typeof usageContextSchema>;
