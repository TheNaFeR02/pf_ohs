import { z } from "zod";
import { QuantitySchema } from "@/features/questionnaire_creator/types/Quantity";

export const PeriodSchema = z.object({
  origin: QuantitySchema,
  period: z.number(),
  factor: z.number().optional(),
  lowerLimit: z.number().optional(),
  upperLimit: z.number().optional(),
  dimensions: z.number().int().positive(),
  data: z.string().optional(),
});

export type Period = z.infer<typeof PeriodSchema>;
