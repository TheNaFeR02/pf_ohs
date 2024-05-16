import { z } from "zod";
import { quantitySchema } from "./Quantity";

export const rangeSchema = z.object({
  numerator: quantitySchema.optional(),
  denominator: quantitySchema.optional(),
});

export type Range = z.infer<typeof rangeSchema>;
