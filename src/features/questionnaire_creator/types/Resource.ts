import { z } from "zod";
import { metaSchema } from "@/features/questionnaire_creator/types/Meta";
import {
  stringSchema,
  uriSchema,
  idSchema,
} from "@/features/questionnaire_creator/types/dataTypes";
import languagesCodeDisplay from "@/features/questionnaire_creator/constants/languagesCodeDisplay";

export const resourceSchema = z.object({
  resourceType: stringSchema.optional(),
  id: idSchema.optional(),
  meta: metaSchema.optional(),
  implicitRules: uriSchema.optional(),
  language: z
    .enum(
      JSON.parse(
        JSON.stringify(languagesCodeDisplay.map((language) => language.code))
      )
    )
    .optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
