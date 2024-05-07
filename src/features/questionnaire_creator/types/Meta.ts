import { z } from "zod";
import { CodingSchema } from "@/features/questionnaire_creator/types/Coding";

export const MetaSchema = z.object({
  versionId: z.string().optional(),
  lastUpdated: z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/
    )
    .optional(),
  source: z.string().url().optional(),
  profile: z.array(z.string().url()).optional(),
  security: z.array(CodingSchema).optional(),
  tag: z.array(CodingSchema).optional(),
});

export type Meta = z.infer<typeof MetaSchema>;
