import { z } from "zod";
import {
  decimalSchema,
  stringSchema,
  uriSchema,
  codeSchema,
} from "./dataTypes";
import { quantityComparatorCode } from "@/constants/quantityComparatorCodeDisplay";

export const quantitySchema = z.object({
  value: decimalSchema.optional(),
  comparator: z.enum(quantityComparatorCode).optional(),
  unit: stringSchema.optional(),
  system: uriSchema.optional(),
  code: codeSchema.optional(),
});

export type Quantity = z.infer<typeof quantitySchema>;
