import { z } from "zod";
import { CodingSchema } from "@/features/questionnaire_creator/types/Coding";
import { CodeableConceptSchema } from "@/features/questionnaire_creator/types/CodeableConcept";
import { ReferenceSchema } from "@/features/questionnaire_creator/types/Reference";
import { QuantitySchema } from "@/features/questionnaire_creator/types/Quantity";
import { RangeSchema } from "@/features/questionnaire_creator/types/Range";

const usageContextSchema = z.object({
  code: CodingSchema,
  // value[x]: Value that defines the context. One of these 4:
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
});

export default usageContextSchema;
