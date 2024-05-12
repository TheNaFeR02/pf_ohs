import { z } from "zod";
import { dateTimeSchema } from "@/features/questionnaire_creator/types/dataTypes";

export const periodSchema = z.object({
  start: dateTimeSchema.optional(),
  end: dateTimeSchema.optional(),
});

export type Period = z.infer<typeof periodSchema>;
