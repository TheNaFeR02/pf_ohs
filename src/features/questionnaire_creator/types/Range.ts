import { z } from "zod";

import { QuantitySchema } from "@/features/questionnaire_creator/types/Quantity";

export const RangeSchema = z.object({
  numerator: QuantitySchema,
  denominator: QuantitySchema,
});

export type Range = z.infer<typeof RangeSchema>;
