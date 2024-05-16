import { z } from "zod";
import { codingSchema } from "@/types/Coding";
import {
  idSchema,
  instantSchema,
  uriSchema,
  canonicalSchema,
} from "@/types/dataTypes";

export const metaSchema = z.object({
  versionId: idSchema.optional(),
  lastUpdated: instantSchema.optional(),
  source: uriSchema.optional(),
  profile: z.array(canonicalSchema).optional(),
  security: z.array(codingSchema).optional(),
  tag: z.array(codingSchema).optional(),
});

export type Meta = z.infer<typeof metaSchema>;