import { z } from "zod";

export const QuantitySchema = z.object({
  value: z.number(),
  comparator: z.enum(["<", "<=", ">=", ">"]).optional(),
  unit: z.string(),
  system: z.string().url().optional(),
  code: z.string().optional(),
});

export type Quantity = z.infer<typeof QuantitySchema>;
