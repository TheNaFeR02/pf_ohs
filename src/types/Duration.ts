import { z } from "zod";
import { quantitySchema } from "./Quantity";

// This is a schema for a duration of time
// Need to be checked with the FHIR spec
export const durationSchema = quantitySchema.extend({
  unit: z.enum(["s", "min", "h", "d", "wk", "mo", "a"]).optional(),
});

export type Duration = z.infer<typeof durationSchema>;
