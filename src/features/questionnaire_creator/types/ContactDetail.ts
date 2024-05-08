import { z } from "zod";
import { stringSchema } from "@/features/questionnaire_creator/types/dataTypes";
import { ContactPointSchema } from "@/features/questionnaire_creator/types/contactPoint";

export const ContactDetailSchema = z.object({
  name: stringSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
});

export type ContactDetail = z.infer<typeof ContactDetailSchema>;
