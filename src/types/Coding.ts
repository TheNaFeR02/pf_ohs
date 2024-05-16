import { z } from 'zod';
import { stringSchema, booleanSchema, uriSchema, codeSchema} from "@/types/dataTypes";

export const codingSchema = z.object({
    system: uriSchema.optional(),
    version: stringSchema.optional(),
    code: codeSchema.optional(),
    display: stringSchema.optional(),
    userSelected: booleanSchema.optional(),
  });

export type Coding = z.infer<typeof codingSchema>;