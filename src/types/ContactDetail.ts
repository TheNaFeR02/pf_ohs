import { z } from "zod";
import { stringSchema } from "@/types/dataTypes";
import { contactPointSchema } from "@/types/ContactPoint";

export const contactDetailSchema = z.object({
  name: stringSchema.optional(),
  telecom: z.array(contactPointSchema).optional(),
});

export type ContactDetail = z.infer<typeof contactDetailSchema>;
