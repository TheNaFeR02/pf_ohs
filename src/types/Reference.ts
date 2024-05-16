import { z } from "zod";
import { identifierSchema } from "./Identifier";
import { stringSchema, uriSchema } from "./dataTypes";

export const referenceSchema = z.object({
  reference: stringSchema.optional(),
  type: uriSchema.optional(),
  identifier: identifierSchema.optional(),
  display: stringSchema.optional(),
});

export type Reference = z.infer<typeof referenceSchema>;
