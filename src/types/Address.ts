import { addressTypeCode } from "@/constants/addressTypeCodeDisplay";
import { addressUseCode } from "@/constants/addressUseCodeDisplay";
import { z } from "zod";
import { periodSchema } from "@/types/Period";
import { stringSchema } from "@/types/dataTypes";

export const addressSchema = z.object({
  use: z.enum(addressUseCode).optional(),
  type: z.enum(addressTypeCode).optional(),
  text: stringSchema.optional(),
  line: z.array(stringSchema).optional(),
  city: stringSchema.optional(),
  district: stringSchema.optional(),
  state: stringSchema.optional(),
  postalCode: stringSchema.optional(),
  country: stringSchema.optional(),
  period: periodSchema.optional(),
});

export type Address = z.infer<typeof addressSchema>;
