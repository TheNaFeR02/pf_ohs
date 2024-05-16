import { z } from "zod";
import {
  stringSchema,
  positiveIntSchema,
} from "@/types/dataTypes";
import { periodSchema } from "@/types/Period";

export const contactPointSchema = z.object({
  system: stringSchema.optional(), // C? phone | fax | email | pager | url | sms | other
  value: stringSchema.optional(), // The actual contact point details
  use: stringSchema.optional(), // home | work | temp | old | mobile - purpose of this contact point
  rank: positiveIntSchema.optional(), // Specify preferred order of use (1 = highest)
  period: periodSchema.optional(), // Time period when the contact point was/is in use
});

export type ContactPoint = z.infer<typeof contactPointSchema>;
