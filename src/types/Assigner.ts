import { z } from "zod";
import { identifierSchema } from "@/types/Identifier";

const baseAssignerSchema = z.object({
  reference: z.string().optional(),
  type: z.string().url().optional(),
  display: z.string().optional(),
});

type BaseAssigner = z.infer<typeof baseAssignerSchema>;

export const assignerSchema: z.ZodType<BaseAssigner> =
  baseAssignerSchema.extend({
    identifier: z.lazy(() => identifierSchema).optional(),
  });

export type Assigner = z.infer<typeof assignerSchema>;
