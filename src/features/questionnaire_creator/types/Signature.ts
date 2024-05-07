import { z } from "zod";
import { CodingSchema } from "@/features/questionnaire_creator/types/Coding";
import { ReferenceSchema } from "@/features/questionnaire_creator/types/Reference";

export const SignatureSchema = z.object({
  type: z.array(CodingSchema),
  when: z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/
    ),
  who: ReferenceSchema, // { Reference(Practitioner|PractitionerRole|RelatedPerson|Patient|Device|Organization) }, Who signed
  onBehalfOf: ReferenceSchema.optional(),
  targetFormat: z.string().optional(),
  sigFormat: z.string().optional(),
  data: z.string().optional(),
});

export type Signature = z.infer<typeof SignatureSchema>;
